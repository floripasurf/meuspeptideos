import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    // Max 5 lead submissions per IP per hour. Matches the existing doctor signup pattern.
    const rateLimit = await checkRateLimit(ip, "lead_capture", 5, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

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
    } = body;

    if (!name || (!email && !whatsapp)) {
      return NextResponse.json(
        { error: "Nome e contato obrigatórios" },
        { status: 400 }
      );
    }

    await prisma.lead.create({
      data: {
        name,
        email: email?.toLowerCase().trim() || null,
        whatsapp: whatsapp?.trim() || null,
        city: city || null,
        state: state || null,
        peptideInterest: peptideInterest || [],
        sourcePage: sourcePage || "unknown",
        contactMethod: contactMethod || "form",
      },
    });

    return NextResponse.json({ message: "Lead capturado com sucesso" });
  } catch (e) {
    console.error("Lead capture error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
