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
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      whatsapp: true,
      crm: true,
      crmState: true,
      specialty: true,
      address: true,
      city: true,
      state: true,
      peptidesPrescribed: true,
      yearsExperience: true,
      acceptsPartnership: true,
      emailVerified: true,
      verifiedAt: true,
      consentLgpd: true,
      consentLgpdAt: true,
      submittedFromIp: true,
      verified: true,
      active: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return NextResponse.json(doctors);
}
