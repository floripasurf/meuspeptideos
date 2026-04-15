"""
Google Maps Clinic Scraper — Meus Peptideos
Scrapes clinics that prescribe peptides from Google Maps across 30 Brazilian cities.

Usage:
    python3 clinic_scraper.py
    python3 clinic_scraper.py --dry-run
    python3 clinic_scraper.py --city "Sao Paulo" --category "endocrinologista"
    python3 clinic_scraper.py --limit 5 --max-per-search 10
    python3 clinic_scraper.py --headless false
"""

import argparse
import json
import os
import random
import re
import time
from datetime import datetime
from slugify import slugify

# Lazy import — only needed when actually scraping
sync_playwright = None
PlaywrightTimeout = None


def _ensure_playwright():
    global sync_playwright, PlaywrightTimeout
    if sync_playwright is None:
        from playwright.sync_api import (
            sync_playwright as _sp,
            TimeoutError as _pt,
        )
        sync_playwright = _sp
        PlaywrightTimeout = _pt

# --- Config ---
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "clinics")
SCROLL_PAUSE_MIN = 1.5
SCROLL_PAUSE_MAX = 3.0
PAGE_ACTION_PAUSE_MIN = 2.0
PAGE_ACTION_PAUSE_MAX = 4.0

CATEGORIES = [
    "clinica medicina funcional",
    "endocrinologista",
    "clinica emagrecimento",
    "clinica longevidade",
    "clinica anti-aging",
    "medicina integrativa",
]

CITIES = [
    ("Sao Paulo", "SP"),
    ("Rio de Janeiro", "RJ"),
    ("Belo Horizonte", "MG"),
    ("Brasilia", "DF"),
    ("Curitiba", "PR"),
    ("Salvador", "BA"),
    ("Fortaleza", "CE"),
    ("Recife", "PE"),
    ("Porto Alegre", "RS"),
    ("Florianopolis", "SC"),
    ("Manaus", "AM"),
    ("Campinas", "SP"),
    ("Goiania", "GO"),
    ("Vitoria", "ES"),
    ("Natal", "RN"),
    ("Joao Pessoa", "PB"),
    ("Aracaju", "SE"),
    ("Maceio", "AL"),
    ("Campo Grande", "MS"),
    ("Cuiaba", "MT"),
    ("Ribeirao Preto", "SP"),
    ("Sorocaba", "SP"),
    ("Joinville", "SC"),
    ("Londrina", "PR"),
    ("Maringa", "PR"),
    ("Niteroi", "RJ"),
    ("Santos", "SP"),
    ("Sao Jose dos Campos", "SP"),
    ("Uberlandia", "MG"),
    ("Juiz de Fora", "MG"),
]

# Map categories to specialty tags for the Clinic model
CATEGORY_SPECIALTIES = {
    "clinica medicina funcional": ["medicina funcional"],
    "endocrinologista": ["endocrinologia"],
    "clinica emagrecimento": ["emagrecimento"],
    "clinica longevidade": ["longevidade"],
    "clinica anti-aging": ["anti-aging", "longevidade"],
    "medicina integrativa": ["medicina integrativa"],
}


def random_delay(min_s=SCROLL_PAUSE_MIN, max_s=SCROLL_PAUSE_MAX):
    time.sleep(random.uniform(min_s, max_s))


def accept_cookies(page):
    """Dismiss Google cookie consent if it appears."""
    try:
        btn = page.locator(
            "button",
            has_text=re.compile(r"Aceitar|Accept|Concordo", re.IGNORECASE),
        )
        if btn.count() > 0:
            btn.first.click()
            random_delay(1, 2)
    except Exception:
        pass


def search_google_maps(page, query):
    """Navigate to Google Maps and perform a search. Returns True if results found."""
    # Use direct URL search for reliability
    encoded_query = query.replace(" ", "+")
    url = f"https://www.google.com/maps/search/{encoded_query}"
    print(f"  Navigating to: {url}")

    try:
        page.goto(url, wait_until="domcontentloaded", timeout=60000)
        random_delay(3, 5)
    except PlaywrightTimeout:
        print(f"  Timeout loading Google Maps for query: {query}")
        return False

    accept_cookies(page)
    random_delay(1, 2)

    # Wait for results feed
    try:
        page.wait_for_selector("[role='feed']", timeout=15000)
        return True
    except PlaywrightTimeout:
        print(f"  No results feed found for: {query}")
        return False


def scroll_results(page, max_results):
    """Scroll the results panel to load more listings."""
    feed = page.locator("[role='feed']")
    last_count = 0
    stale_rounds = 0

    while True:
        items = feed.locator("> div > div > a[href*='/maps/place/']")
        current_count = items.count()
        print(f"  Loaded {current_count} listings so far...")

        if current_count >= max_results:
            print(f"  Reached target of {max_results} listings.")
            break

        if current_count == last_count:
            stale_rounds += 1
            if stale_rounds >= 3:
                print(f"  No new results after 3 scroll attempts. Total: {current_count}")
                break
        else:
            stale_rounds = 0

        last_count = current_count

        feed.evaluate("el => el.scrollTop = el.scrollHeight")
        random_delay()

        # Check for end of results
        end_marker = page.locator(
            "p.fontBodyMedium span",
            has_text=re.compile(
                r"final dos resultados|end of results|Voce chegou ao final",
                re.IGNORECASE,
            ),
        )
        if end_marker.count() > 0:
            print(f"  Reached end of results. Total: {current_count}")
            break

    return current_count


def extract_listing_urls(page, max_results):
    """Extract all listing URLs from the results panel."""
    feed = page.locator("[role='feed']")
    links = feed.locator("> div > div > a[href*='/maps/place/']")
    count = min(links.count(), max_results)

    urls = []
    for i in range(count):
        href = links.nth(i).get_attribute("href")
        if href and href not in urls:
            urls.append(href)

    print(f"  Extracted {len(urls)} unique listing URLs.")
    return urls


def extract_place_id_from_url(url):
    """Extract Google Place ID from a Maps URL."""
    # Pattern: ...!19s0x... or ChIJ...
    match = re.search(r"!1s(0x[a-f0-9]+:[a-f0-9]+)", url)
    if match:
        return match.group(1)
    match = re.search(r"!1s(ChIJ[A-Za-z0-9_-]+)", url)
    if match:
        return match.group(1)
    # Fallback: use place name from URL as identifier
    place_match = re.search(r"/place/([^/]+)", url)
    if place_match:
        return f"place:{place_match.group(1)[:100]}"
    return None


def extract_coords_from_url(url):
    """Extract latitude and longitude from a Maps URL."""
    match = re.search(r"@(-?\d+\.\d+),(-?\d+\.\d+)", url)
    if match:
        return float(match.group(1)), float(match.group(2))
    return None, None


def extract_clinic_details(page, url, index, total):
    """Navigate to a clinic listing and extract details."""
    print(f"\n[{index + 1}/{total}] Extracting: {url[:80]}...")

    try:
        page.goto(url, wait_until="domcontentloaded", timeout=20000)
        random_delay(PAGE_ACTION_PAUSE_MIN, PAGE_ACTION_PAUSE_MAX)
    except PlaywrightTimeout:
        print(f"  Timeout loading page, skipping.")
        return None

    clinic = {
        "url": url,
        "scraped_at": datetime.now().isoformat(),
    }

    # Name
    try:
        name_el = page.locator("h1").first
        clinic["name"] = name_el.inner_text(timeout=5000).strip()
    except Exception:
        clinic["name"] = None

    if not clinic["name"]:
        print(f"  Could not extract name, skipping.")
        return None

    # Rating
    try:
        rating_el = page.locator("div.fontDisplayLarge").first
        clinic["google_rating"] = float(
            rating_el.inner_text(timeout=3000).replace(",", ".").strip()
        )
    except Exception:
        clinic["google_rating"] = None

    # Review count
    try:
        review_count_found = False
        for sel in [
            "button[aria-label*='avalia']",
            "button[aria-label*='review']",
            "button[jsaction*='review']",
        ]:
            try:
                el = page.locator(sel).first
                aria = el.get_attribute("aria-label", timeout=2000) or ""
                text = el.inner_text(timeout=2000) or ""
                combined = f"{aria} {text}".replace(".", "").replace(",", "")
                match = re.search(
                    r"(\d+)\s*(?:avalia|review|coment)", combined, re.IGNORECASE
                ) or re.search(r"\((\d+)\)", combined)
                if match:
                    clinic["google_review_count"] = int(match.group(1))
                    review_count_found = True
                    break
            except Exception:
                continue

        if not review_count_found:
            spans = page.locator(
                "span", has_text=re.compile(r"\d+\s*avalia", re.IGNORECASE)
            )
            if spans.count() > 0:
                text = spans.first.inner_text(timeout=2000).replace(".", "").replace(",", "")
                match = re.search(r"(\d+)", text)
                if match:
                    clinic["google_review_count"] = int(match.group(1))
                    review_count_found = True

        if not review_count_found:
            clinic["google_review_count"] = None
    except Exception:
        clinic["google_review_count"] = None

    # Address
    try:
        addr_el = page.locator("[data-item-id='address'] .fontBodyMedium").first
        clinic["address"] = addr_el.inner_text(timeout=3000).strip()
    except Exception:
        clinic["address"] = None

    # Phone
    try:
        phone_el = page.locator("[data-item-id*='phone'] .fontBodyMedium").first
        clinic["phone"] = phone_el.inner_text(timeout=3000).strip()
    except Exception:
        clinic["phone"] = None

    # Website
    try:
        website_el = page.locator("[data-item-id='authority'] .fontBodyMedium").first
        clinic["website"] = website_el.inner_text(timeout=3000).strip()
    except Exception:
        clinic["website"] = None

    # Google Place ID from URL
    clinic["google_place_id"] = extract_place_id_from_url(url)

    # Coordinates from URL
    lat, lng = extract_coords_from_url(url)
    clinic["lat"] = lat
    clinic["lng"] = lng

    # Google Maps URL (current page URL which may have redirected)
    try:
        clinic["google_maps_url"] = page.url
    except Exception:
        clinic["google_maps_url"] = url

    print(
        f"  -> {clinic['name']} | {clinic.get('google_rating', '?')}* "
        f"({clinic.get('google_review_count', '?')} reviews) | {clinic.get('address', 'no address')}"
    )

    return clinic


def parse_city_state_from_address(address, search_city, search_state):
    """Try to extract city, state, neighborhood from address string."""
    result = {
        "city": search_city,
        "state": search_state,
        "neighborhood": None,
    }

    if not address:
        return result

    # Brazilian addresses often follow: Street, Number - Neighborhood, City - State, ZIP
    parts = address.split(" - ")
    if len(parts) >= 2:
        # Last part often has "City - State, ZIP" or "State, ZIP"
        result["neighborhood"] = parts[1].split(",")[0].strip() if len(parts) >= 3 else None
        if len(parts) >= 3:
            city_state = parts[-1].strip()
            # Try to extract state abbreviation
            state_match = re.search(r"\b([A-Z]{2})\b", city_state)
            if state_match:
                result["state"] = state_match.group(1)
            # City is usually before the state
            city_part = re.sub(r"\b[A-Z]{2}\b", "", city_state).strip(" ,.-0-9")
            if city_part:
                result["city"] = city_part

    return result


def save_results(clinics, city, category, dry_run=False):
    """Save scraped clinics to a JSON file."""
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    safe_city = slugify(city)
    safe_cat = slugify(category)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{safe_city}_{safe_cat}_{timestamp}.json"
    filepath = os.path.join(OUTPUT_DIR, filename)

    output = {
        "city": city,
        "category": category,
        "scraped_at": datetime.now().isoformat(),
        "total_clinics": len(clinics),
        "clinics": clinics,
    }

    if dry_run:
        print(f"\n[DRY RUN] Would save {len(clinics)} clinics to {filepath}")
        return filepath

    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n-> Saved {len(clinics)} clinics to {filepath}")
    return filepath


def scrape_city_category(page, city, state, category, max_per_search, dry_run=False):
    """Scrape one city+category combination."""
    query = f"{category} em {city}"
    print(f"\n{'='*60}")
    print(f"Scraping: {query}")
    print(f"{'='*60}")

    if dry_run:
        print(f"[DRY RUN] Would search Google Maps for: {query}")
        return []

    has_results = search_google_maps(page, query)
    if not has_results:
        return []

    scroll_results(page, max_per_search)
    urls = extract_listing_urls(page, max_per_search)

    clinics = []
    for i, url in enumerate(urls):
        clinic = extract_clinic_details(page, url, i, len(urls))
        if clinic:
            # Enrich with search context
            parsed = parse_city_state_from_address(clinic.get("address"), city, state)
            clinic["city"] = parsed["city"]
            clinic["state"] = parsed["state"]
            clinic["neighborhood"] = parsed["neighborhood"]
            clinic["specialties"] = CATEGORY_SPECIALTIES.get(category, [category])
            clinic["search_category"] = category
            clinic["search_city"] = city
            clinics.append(clinic)

    return clinics


def main():
    parser = argparse.ArgumentParser(description="Google Maps Clinic Scraper for Meus Peptideos")
    parser.add_argument("--dry-run", action="store_true", help="Print what would be done without scraping")
    parser.add_argument("--city", type=str, help="Scrape only this city (partial match)")
    parser.add_argument("--category", type=str, help="Scrape only this category (partial match)")
    parser.add_argument("--limit", type=int, help="Limit total number of city+category combinations")
    parser.add_argument("--max-per-search", type=int, default=20, help="Max clinics per search query (default: 20)")
    parser.add_argument("--headless", default="true", help="Run headless (true/false)")
    args = parser.parse_args()

    headless = args.headless.lower() != "false"

    # Filter cities and categories
    cities = CITIES
    categories = CATEGORIES

    if args.city:
        cities = [
            (c, s) for c, s in CITIES
            if args.city.lower() in c.lower()
        ]
        if not cities:
            print(f"No cities matching '{args.city}'. Available:")
            for c, s in CITIES:
                print(f"  {c} ({s})")
            return

    if args.category:
        categories = [
            cat for cat in CATEGORIES
            if args.category.lower() in cat.lower()
        ]
        if not categories:
            print(f"No categories matching '{args.category}'. Available:")
            for cat in CATEGORIES:
                print(f"  {cat}")
            return

    # Build work list
    work = [(city, state, cat) for city, state in cities for cat in categories]
    if args.limit:
        work = work[: args.limit]

    total_combos = len(work)
    print(f"Google Maps Clinic Scraper - Meus Peptideos")
    print(f"  Cities: {len(cities)}")
    print(f"  Categories: {len(categories)}")
    print(f"  Total combinations: {total_combos}")
    print(f"  Max per search: {args.max_per_search}")
    print(f"  Headless: {headless}")
    print(f"  Dry run: {args.dry_run}")
    print()

    if args.dry_run:
        print("[DRY RUN] Would scrape these combinations:")
        for i, (city, state, cat) in enumerate(work, 1):
            print(f"  {i}. {cat} em {city} ({state})")
        print(f"\nTotal: {total_combos} searches, up to {total_combos * args.max_per_search} clinics")
        return

    _ensure_playwright()
    all_clinics = []

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=headless,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--disable-dev-shm-usage",
                "--no-sandbox",
            ],
        )

        context = browser.new_context(
            viewport={"width": 1280, "height": 900},
            locale="pt-BR",
            timezone_id="America/Sao_Paulo",
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
        )

        page = context.new_page()

        for i, (city, state, cat) in enumerate(work, 1):
            print(f"\n[{i}/{total_combos}] ", end="")
            clinics = scrape_city_category(
                page, city, state, cat, args.max_per_search
            )

            if clinics:
                all_clinics.extend(clinics)
                save_results(clinics, city, cat)

            # Random delay between searches to avoid rate limiting
            if i < total_combos:
                delay = random.uniform(5, 10)
                print(f"  Waiting {delay:.1f}s before next search...")
                time.sleep(delay)

        browser.close()

    # Save combined results
    if all_clinics:
        os.makedirs(OUTPUT_DIR, exist_ok=True)
        combined_path = os.path.join(
            OUTPUT_DIR,
            f"all_clinics_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
        )
        with open(combined_path, "w", encoding="utf-8") as f:
            json.dump(
                {
                    "scraped_at": datetime.now().isoformat(),
                    "total_clinics": len(all_clinics),
                    "clinics": all_clinics,
                },
                f,
                ensure_ascii=False,
                indent=2,
            )
        print(f"\nCombined results: {combined_path}")

    print(f"\nDone! Scraped {len(all_clinics)} clinics total.")


if __name__ == "__main__":
    main()
