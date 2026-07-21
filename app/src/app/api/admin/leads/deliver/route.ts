import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { sendLeadToDoctor } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import {
  patientRoutingEnabled,
  regulatedFlowUnavailable,
} from "@/lib/regulated-flows";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Nao autorizado" }, { status: 401 });
  }

  if (!patientRoutingEnabled) {
    return NextResponse.json(regulatedFlowUnavailable, { status: 410 });
  }

  try {
    const { leadId, doctorId, price } = await request.json();

    if (!leadId || !doctorId || typeof price !== "number" || price < 0) {
      return NextResponse.json(
        { error: "leadId, doctorId e price sao obrigatorios" },
        { status: 400 }
      );
    }

    const [lead, doctor] = await Promise.all([
      prisma.lead.findUnique({ where: { id: leadId } }),
      prisma.doctor.findUnique({ where: { id: doctorId } }),
    ]);

    if (!lead || !doctor) {
      return NextResponse.json(
        { error: "Lead ou medico nao encontrado" },
        { status: 404 }
      );
    }

    if (!lead.consentDoctorShare) {
      return NextResponse.json(
        { error: "Lead sem consentimento explicito para compartilhamento" },
        { status: 400 }
      );
    }

    if (!doctor.emailVerified || !doctor.verified || !doctor.active || !doctor.acceptsPartnership) {
      return NextResponse.json(
        { error: "Medico nao verificado/ativo ou sem parceria ativa" },
        { status: 400 }
      );
    }

    const existingDelivery = await prisma.leadDelivery.findUnique({
      where: { leadId_doctorId: { leadId, doctorId } },
      select: { id: true },
    });
    if (existingDelivery) {
      return NextResponse.json(
        { error: "Este lead ja foi entregue a este medico" },
        { status: 409 }
      );
    }

    const sent = await sendLeadToDoctor(doctor.email, doctor.name, {
      name: lead.name,
      email: lead.email,
      whatsapp: lead.whatsapp,
      city: lead.city,
      state: lead.state,
      peptideInterest: lead.peptideInterest,
      sourcePage: lead.sourcePage,
    });

    if (!sent.ok) {
      return NextResponse.json(
        { error: "Falha ao enviar o lead. Nenhuma entrega foi registrada." },
        { status: 502 }
      );
    }

    const delivery = await prisma.leadDelivery.create({
      data: { leadId, doctorId, price },
    });

    await prisma.lead.update({
      where: { id: leadId },
      data: { status: "matched" },
    });

    return NextResponse.json({ delivery, emailSent: true });
  } catch (e: unknown) {
    if (
      typeof e === "object" &&
      e !== null &&
      "code" in e &&
      (e as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Este lead ja foi entregue a este medico" },
        { status: 409 }
      );
    }

    console.error("Lead delivery error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
