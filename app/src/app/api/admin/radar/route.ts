import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const allowedStatuses = new Set([
  "new",
  "contacted",
  "interview",
  "qualified",
  "pilot",
  "won",
  "lost",
  "opted_out",
]);

async function guard() {
  return (await isAuthenticated())
    ? null
    : NextResponse.json({ error: "Não autorizado" }, { status: 401 });
}

export async function GET() {
  const blocked = await guard();
  if (blocked) return blocked;

  const [interests, totalSubscribers, confirmedSubscribers] = await Promise.all([
    prisma.radarInterest.findMany({ orderBy: { createdAt: "desc" }, take: 300 }),
    prisma.subscriber.count(),
    prisma.subscriber.count({ where: { confirmed: true } }),
  ]);

  return NextResponse.json({ interests, totalSubscribers, confirmedSubscribers });
}

export async function PATCH(request: NextRequest) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = await request.json().catch(() => ({}));
  const id = typeof body.id === "string" ? body.id : "";
  const status = typeof body.status === "string" ? body.status : "";
  if (!id || !allowedStatuses.has(status)) {
    return NextResponse.json({ error: "ID ou estágio inválido" }, { status: 400 });
  }

  const interest = await prisma.radarInterest.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json({ interest });
}
