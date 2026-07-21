import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const body = await request.json();
    const {
      name,
      email,
      whatsapp,
      city,
      state,
      peptideInterest,
      sourcePage,
      contactMethod,
      consentDoctorShare,
      consentCommercial,
    } = body;

    if (!name || (!email && !whatsapp)) {
      return NextResponse.json(
        { error: "Nome e contato obrigatórios" },
        { status: 400 }
      );
    }

    const method = contactMethod || "form";
    const isCommercialClinicLead = method === "clinic-directory";

    if (isCommercialClinicLead && consentCommercial !== true) {
      return NextResponse.json(
        { error: "É necessário autorizar o contato comercial" },
        { status: 400 }
      );
    }

    if (!isCommercialClinicLead && consentDoctorShare !== true) {
      return NextResponse.json(
        { error: "É necessário autorizar o compartilhamento com um médico parceiro" },
        { status: 400 }
      );
    }

    const rateLimit = await checkRateLimit(ip, "lead_capture", 5, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Muitas solicitações. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

    await prisma.lead.create({
      data: {
        name: String(name).trim(),
        email: email?.toLowerCase().trim() || null,
        whatsapp: whatsapp?.trim() || null,
        city: city || null,
        state: state || null,
        peptideInterest: peptideInterest || [],
        sourcePage: sourcePage || "unknown",
        contactMethod: method,
        consentDoctorShare: !isCommercialClinicLead,
        consentDoctorShareAt: !isCommercialClinicLead ? new Date() : null,
        submittedFromIp: ip,
        notes: isCommercialClinicLead
          ? "Consentimento comercial para diretório pago: sim"
          : null,
      },
    });

    return NextResponse.json({ message: "Lead capturado com sucesso" });
  } catch (e) {
    console.error("Lead capture error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
