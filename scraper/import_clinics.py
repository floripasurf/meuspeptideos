"""
Import scraped clinics into the Clinic table via psycopg2.
Uses googlePlaceId for upsert/dedup.

Usage:
    python3 import_clinics.py
    python3 import_clinics.py --file data/clinics/specific_file.json
    python3 import_clinics.py --dry-run
"""

import argparse
import glob
import json
import os
import sys
from datetime import datetime

try:
    import psycopg2
    from psycopg2.extras import execute_values
except ImportError:
    print("psycopg2 not installed. Run: pip install psycopg2-binary")
    sys.exit(1)

from slugify import slugify

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "clinics")


def generate_slug(name, city):
    """Generate a unique-ish slug from clinic name + city."""
    return slugify(f"{name}-{city}")[:200]


def load_json_files(file_path=None):
    """Load clinics from JSON files."""
    clinics = []
    seen_place_ids = set()

    if file_path:
        files = [file_path]
    else:
        files = sorted(glob.glob(os.path.join(DATA_DIR, "*.json")))

    if not files:
        print(f"No JSON files found in {DATA_DIR}")
        return []

    for f in files:
        print(f"Loading: {f}")
        with open(f, "r", encoding="utf-8") as fh:
            data = json.load(fh)

        items = data.get("clinics", [])
        for item in items:
            place_id = item.get("google_place_id")
            # Dedup within the loaded batch
            if place_id and place_id in seen_place_ids:
                continue
            if place_id:
                seen_place_ids.add(place_id)
            clinics.append(item)

    print(f"Loaded {len(clinics)} unique clinics from {len(files)} files.")
    return clinics


def upsert_clinics(clinics, dry_run=False):
    """Upsert clinics into the database."""
    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        print("ERROR: DATABASE_URL environment variable not set.")
        sys.exit(1)

    if dry_run:
        print(f"\n[DRY RUN] Would upsert {len(clinics)} clinics into the database.")
        for i, c in enumerate(clinics[:5], 1):
            print(f"  {i}. {c.get('name')} | {c.get('city')}, {c.get('state')} | place_id: {c.get('google_place_id', 'none')}")
        if len(clinics) > 5:
            print(f"  ... and {len(clinics) - 5} more")
        return

    conn = psycopg2.connect(db_url)
    cur = conn.cursor()

    inserted = 0
    updated = 0
    skipped = 0

    for clinic in clinics:
        name = clinic.get("name")
        if not name:
            skipped += 1
            continue

        place_id = clinic.get("google_place_id")
        city = clinic.get("city", "")
        state = clinic.get("state", "")
        slug = generate_slug(name, city)

        # Merge specialties from all occurrences
        specialties = clinic.get("specialties", [])
        if isinstance(specialties, str):
            specialties = [specialties]

        try:
            if place_id:
                # Upsert by googlePlaceId
                cur.execute(
                    """
                    INSERT INTO "Clinic" (
                        id, name, slug, "googlePlaceId", address, city, state,
                        neighborhood, lat, lng, phone, website, "googleMapsUrl",
                        "googleRating", "googleReviews", specialties,
                        "isActive", "createdAt", "updatedAt"
                    ) VALUES (
                        gen_random_uuid()::text, %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s,
                        %s, %s, %s,
                        true, now(), now()
                    )
                    ON CONFLICT ("googlePlaceId") DO UPDATE SET
                        name = EXCLUDED.name,
                        address = COALESCE(EXCLUDED.address, "Clinic".address),
                        city = COALESCE(EXCLUDED.city, "Clinic".city),
                        state = COALESCE(EXCLUDED.state, "Clinic".state),
                        neighborhood = COALESCE(EXCLUDED.neighborhood, "Clinic".neighborhood),
                        lat = COALESCE(EXCLUDED.lat, "Clinic".lat),
                        lng = COALESCE(EXCLUDED.lng, "Clinic".lng),
                        phone = COALESCE(EXCLUDED.phone, "Clinic".phone),
                        website = COALESCE(EXCLUDED.website, "Clinic".website),
                        "googleMapsUrl" = COALESCE(EXCLUDED."googleMapsUrl", "Clinic"."googleMapsUrl"),
                        "googleRating" = COALESCE(EXCLUDED."googleRating", "Clinic"."googleRating"),
                        "googleReviews" = COALESCE(EXCLUDED."googleReviews", "Clinic"."googleReviews"),
                        specialties = (
                            SELECT array_agg(DISTINCT elem)
                            FROM unnest("Clinic".specialties || EXCLUDED.specialties) AS elem
                        ),
                        "updatedAt" = now()
                    """,
                    (
                        name,
                        slug,
                        place_id,
                        clinic.get("address", ""),
                        city,
                        state,
                        clinic.get("neighborhood"),
                        clinic.get("lat"),
                        clinic.get("lng"),
                        clinic.get("phone"),
                        clinic.get("website"),
                        clinic.get("google_maps_url"),
                        clinic.get("google_rating"),
                        clinic.get("google_review_count"),
                        specialties,
                    ),
                )
            else:
                # No place_id — try slug-based dedup
                cur.execute(
                    """SELECT id FROM "Clinic" WHERE slug = %s""",
                    (slug,),
                )
                if cur.fetchone():
                    skipped += 1
                    continue

                cur.execute(
                    """
                    INSERT INTO "Clinic" (
                        id, name, slug, address, city, state,
                        neighborhood, lat, lng, phone, website, "googleMapsUrl",
                        "googleRating", "googleReviews", specialties,
                        "isActive", "createdAt", "updatedAt"
                    ) VALUES (
                        gen_random_uuid()::text, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s,
                        %s, %s, %s,
                        true, now(), now()
                    )
                    """,
                    (
                        name,
                        slug,
                        clinic.get("address", ""),
                        city,
                        state,
                        clinic.get("neighborhood"),
                        clinic.get("lat"),
                        clinic.get("lng"),
                        clinic.get("phone"),
                        clinic.get("website"),
                        clinic.get("google_maps_url"),
                        clinic.get("google_rating"),
                        clinic.get("google_review_count"),
                        specialties,
                    ),
                )

            if cur.statusmessage and "INSERT" in cur.statusmessage:
                inserted += 1
            else:
                updated += 1

        except Exception as e:
            print(f"  Error upserting {name}: {e}")
            conn.rollback()
            skipped += 1
            continue

    conn.commit()
    cur.close()
    conn.close()

    print(f"\nImport complete:")
    print(f"  Inserted: {inserted}")
    print(f"  Updated: {updated}")
    print(f"  Skipped: {skipped}")


def main():
    parser = argparse.ArgumentParser(description="Import scraped clinics into the database")
    parser.add_argument("--file", type=str, help="Import a specific JSON file")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be imported without writing to DB")
    args = parser.parse_args()

    clinics = load_json_files(args.file)
    if not clinics:
        print("No clinics to import.")
        return

    upsert_clinics(clinics, dry_run=args.dry_run)


if __name__ == "__main__":
    main()
