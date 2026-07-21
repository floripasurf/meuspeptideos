import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const allowedStatus = new Set(["new", "sent", "quoted", "converted", "paid", "lost"]);

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  const quotes = await prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { pharmacy: { select: { id: true, name: true, commissionPct: true } } },
  });

  return NextResponse.json({ quotes });
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  const { id, status, orderValue, commissionValue, paidAt, pharmacyId } =
    await request.json();
  if (!id) return NextResponse.json({ error: "id obrigatorio" }, { status: 400 });
  if (status && !allowedStatus.has(status)) {
    return NextResponse.json({ error: "status invalido" }, { status: 400 });
  }

  const quote = await prisma.quoteRequest.update({
    where: { id: String(id) },
    data: {
      ...(status && { status }),
      ...(orderValue !== undefined && {
        orderValue: orderValue === "" || orderValue == null ? null : Number(orderValue),
      }),
      ...(commissionValue !== undefined && {
        commissionValue:
          commissionValue === "" || commissionValue == null
            ? null
            : Number(commissionValue),
      }),
      ...(paidAt !== undefined && { paidAt: paidAt ? new Date(paidAt) : null }),
      ...(pharmacyId !== undefined && { pharmacyId: pharmacyId || null }),
    },
  });

  return NextResponse.json({ quote });
}
