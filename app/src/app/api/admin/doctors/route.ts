import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const doctors = await prisma.doctor.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(doctors);
}
