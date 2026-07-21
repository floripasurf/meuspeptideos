import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { scorePharmacyProspect, prospectStatusFromScore } from "@/lib/b2b-scoring";
import { prisma } from "@/lib/prisma";
import {
  ProspectSource,
  ProspectStatus,
  type ProspectSource as ProspectSourceType,
  type ProspectStatus as ProspectStatusType,
} from "@/generated/prisma/enums";

export const dynamic = "force-dynamic";

const allowedStatuses = new Set<ProspectStatusType>(Object.values(ProspectStatus));
const allowedSources = new Set<ProspectSourceType>(Object.values(ProspectSource));

async function guard() {
  return (await isAuthenticated())
    ? null
    : NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
}

function nullableString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizeProspectBody(body: Record<string, unknown>) {
  const compounds = normalizeStringArray(body.compounds);
  const input = {
    name: String(body.name ?? "").trim(),
    email: nullableString(body.email)?.toLowerCase() ?? null,
    whatsapp: nullableString(body.whatsapp),
    website: nullableString(body.website),
    googlePlaceId: nullableString(body.googlePlaceId),
    googleMapsUrl: nullableString(body.googleMapsUrl),
    address: nullableString(body.address),
    city: nullableString(body.city),
    state: nullableString(body.state)?.toUpperCase() ?? null,
    googleRating: body.googleRating === "" || body.googleRating == null ? null : Number(body.googleRating),
    googleReviews: body.googleReviews === "" || body.googleReviews == null ? null : Number(body.googleReviews),
    compounds,
    source: allowedSources.has(String(body.source) as ProspectSourceType)
      ? (String(body.source) as ProspectSourceType)
      : ProspectSource.manual,
    outreachNotes: nullableString(body.outreachNotes ?? body.notes),
    evidence: body.evidence && typeof body.evidence === "object" ? body.evidence : undefined,
  };
  const score = scorePharmacyProspect({
    ...input,
    notes: input.outreachNotes,
  });
  return {
    ...input,
    fitScore: score.fitScore,
    riskScore: score.riskScore,
    riskFlags: score.riskFlags,
    status: allowedStatuses.has(String(body.status) as ProspectStatusType)
      ? (String(body.status) as ProspectStatusType)
      : prospectStatusFromScore(score),
  };
}

export async function GET(request: NextRequest) {
  const blocked = await guard();
  if (blocked) return blocked;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as ProspectStatusType | null;
  const source = searchParams.get("source") as ProspectSourceType | null;

  const prospects = await prisma.pharmacyProspect.findMany({
    where: {
      ...(status && allowedStatuses.has(status) && { status }),
      ...(source && allowedSources.has(source) && { source }),
    },
    orderBy: [{ fitScore: "desc" }, { createdAt: "desc" }],
    take: 300,
    include: {
      convertedPharmacy: { select: { id: true, name: true, slug: true } },
      _count: { select: { outreachEvents: true, applications: true } },
    },
  });

  return NextResponse.json({ prospects });
}

export async function POST(request: NextRequest) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = await request.json();
  const data = normalizeProspectBody(body);
  if (!data.name) {
    return NextResponse.json({ error: "name obrigatorio" }, { status: 400 });
  }

  if (data.googlePlaceId) {
    const prospect = await prisma.pharmacyProspect.upsert({
      where: { googlePlaceId: data.googlePlaceId },
      create: { ...data, slug: slugify(data.name) },
      update: data,
    });
    return NextResponse.json({ prospect });
  }

  const prospect = await prisma.pharmacyProspect.create({
    data: { ...data, slug: slugify(data.name) },
  });

  return NextResponse.json({ prospect });
}

export async function PATCH(request: NextRequest) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = await request.json();
  const id = String(body.id ?? "");
  if (!id) return NextResponse.json({ error: "id obrigatorio" }, { status: 400 });

  if (body.action === "convert") {
    const prospect = await prisma.pharmacyProspect.findUnique({ where: { id } });
    if (!prospect) return NextResponse.json({ error: "prospect nao encontrado" }, { status: 404 });
    if (prospect.riskScore >= 60 && body.allowHighRisk !== true) {
      return NextResponse.json(
        { error: "prospect com risco alto exige revisao manual antes de converter" },
        { status: 409 }
      );
    }

    const baseSlug = prospect.slug || slugify(prospect.name);
    let slug = baseSlug;
    let counter = 2;
    while (await prisma.pharmacy.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    const pharmacy = await prisma.pharmacy.create({
      data: {
        name: prospect.name,
        slug,
        email: prospect.email || `parcerias+${prospect.id}@meuspeptideos.com.br`,
        whatsapp: prospect.whatsapp,
        city: prospect.city,
        state: prospect.state,
        compounds: prospect.compounds,
        shipsNationwide: true,
        commissionPct: Number(body.commissionPct ?? 10),
        leadPrice: body.leadPrice === "" || body.leadPrice == null ? null : Number(body.leadPrice),
        notes: [
          prospect.outreachNotes,
          `Origem prospect: ${prospect.source}; fit ${prospect.fitScore}; risco ${prospect.riskScore}.`,
        ].filter(Boolean).join("\n"),
      },
    });

    const updated = await prisma.pharmacyProspect.update({
      where: { id },
      data: {
        status: "partner",
        convertedPharmacyId: pharmacy.id,
        outreachNotes: body.notes ? String(body.notes).slice(0, 2000) : prospect.outreachNotes,
      },
      include: { convertedPharmacy: { select: { id: true, name: true, slug: true } } },
    });

    return NextResponse.json({ prospect: updated, pharmacy });
  }

  const updateData = {
      ...(body.status !== undefined &&
      allowedStatuses.has(String(body.status) as ProspectStatusType) && {
        status: String(body.status) as ProspectStatusType,
      }),
    ...(body.outreachNotes !== undefined && { outreachNotes: nullableString(body.outreachNotes) }),
    ...(body.nextFollowUpAt !== undefined && {
      nextFollowUpAt: body.nextFollowUpAt ? new Date(String(body.nextFollowUpAt)) : null,
    }),
    ...(body.lastContactedAt !== undefined && {
      lastContactedAt: body.lastContactedAt ? new Date(String(body.lastContactedAt)) : null,
    }),
    ...(body.optedOut !== undefined && {
      optedOut: Boolean(body.optedOut),
      status: Boolean(body.optedOut) ? ProspectStatus.opted_out : undefined,
    }),
  };

  const prospect = await prisma.pharmacyProspect.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json({ prospect });
}
