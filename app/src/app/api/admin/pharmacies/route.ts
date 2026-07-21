import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function guard() {
  return (await isAuthenticated())
    ? null
    : NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
}

function normalizeCompounds(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }
  if (typeof value === "string") {
    return value.split(",").map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function nullableString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function GET() {
  const blocked = await guard();
  if (blocked) return blocked;

  const pharmacies = await prisma.pharmacy.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { quotes: true } } },
  });

  return NextResponse.json({ pharmacies });
}

export async function POST(request: NextRequest) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = await request.json();
  if (!body.name || !body.slug || !body.email) {
    return NextResponse.json(
      { error: "name, slug e email sao obrigatorios" },
      { status: 400 }
    );
  }

  const pharmacy = await prisma.pharmacy.create({
    data: {
      name: String(body.name).trim(),
      slug: String(body.slug).trim().toLowerCase(),
      email: String(body.email).trim().toLowerCase(),
      whatsapp: nullableString(body.whatsapp),
      city: nullableString(body.city),
      state: nullableString(body.state)?.toUpperCase() ?? null,
      shipsNationwide: body.shipsNationwide ?? true,
      compounds: normalizeCompounds(body.compounds),
      commissionPct: Number(body.commissionPct ?? 10),
      leadPrice: body.leadPrice === "" || body.leadPrice == null ? null : Number(body.leadPrice),
      isActive: body.isActive ?? true,
      notes: nullableString(body.notes),
    },
  });

  return NextResponse.json({ pharmacy });
}

export async function PATCH(request: NextRequest) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = await request.json();
  if (!body.id) {
    return NextResponse.json({ error: "id obrigatorio" }, { status: 400 });
  }

  const data = {
    ...(body.name !== undefined && { name: String(body.name).trim() }),
    ...(body.slug !== undefined && { slug: String(body.slug).trim().toLowerCase() }),
    ...(body.email !== undefined && { email: String(body.email).trim().toLowerCase() }),
    ...(body.whatsapp !== undefined && { whatsapp: nullableString(body.whatsapp) }),
    ...(body.city !== undefined && { city: nullableString(body.city) }),
    ...(body.state !== undefined && { state: nullableString(body.state)?.toUpperCase() ?? null }),
    ...(body.shipsNationwide !== undefined && { shipsNationwide: Boolean(body.shipsNationwide) }),
    ...(body.compounds !== undefined && { compounds: normalizeCompounds(body.compounds) }),
    ...(body.commissionPct !== undefined && { commissionPct: Number(body.commissionPct) }),
    ...(body.leadPrice !== undefined && {
      leadPrice: body.leadPrice === "" || body.leadPrice == null ? null : Number(body.leadPrice),
    }),
    ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
    ...(body.notes !== undefined && { notes: nullableString(body.notes) }),
  };

  const pharmacy = await prisma.pharmacy.update({
    where: { id: String(body.id) },
    data,
  });

  return NextResponse.json({ pharmacy });
}
