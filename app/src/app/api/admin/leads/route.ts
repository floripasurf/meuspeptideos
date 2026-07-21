import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      clinic: { select: { name: true } },
      deliveries: {
        include: { doctor: { select: { name: true } } },
        orderBy: { deliveredAt: "desc" },
      },
    },
  });

  return NextResponse.json(leads);
}
