import { NextRequest, NextResponse } from "next/server";
import { sendQuoteAdminAlert, sendQuoteToPharmacy } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { matchPharmacies } from "@/lib/quote-routing";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const compoundSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function cleanText(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().replace(/[\r\n\t]+/g, " ");
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function cleanEmail(value: unknown): string | null {
  const email = cleanText(value, 160)?.toLowerCase() ?? null;
  return email && email.includes("@") ? email : null;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const body = await request.json();

    if (body.website) return NextResponse.json({ message: "ok" });

    const {
      name,
      whatsapp,
      email,
      city,
      state,
      compoundSlug,
      hasPrescription,
      message,
      sourcePage,
      consentLgpd,
    } = body;

    const normalizedName = cleanText(name, 120);
    const normalizedWhatsapp = cleanText(whatsapp, 40);
    const normalizedCompoundSlug = cleanText(compoundSlug, 120)?.toLowerCase() ?? "";
    if (!normalizedName || !normalizedWhatsapp || !normalizedCompoundSlug) {
      return NextResponse.json(
        { error: "Nome, WhatsApp e composto são obrigatórios" },
        { status: 400 }
      );
    }

    if (!compoundSlugPattern.test(normalizedCompoundSlug)) {
      return NextResponse.json({ error: "Composto inválido" }, { status: 400 });
    }

    if (!consentLgpd) {
      return NextResponse.json(
        { error: "É necessário autorizar o compartilhamento com a farmácia parceira" },
        { status: 400 }
      );
    }

    const rateLimit = await checkRateLimit(ip, "orcamento", 5, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Muitas solicitações. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

    const peptide = await prisma.peptide.findUnique({
      where: { slug: normalizedCompoundSlug },
      select: { slug: true },
    });
    if (!peptide) {
      return NextResponse.json({ error: "Composto desconhecido" }, { status: 400 });
    }

    const normalizedState = cleanText(state, 2)?.toUpperCase() ?? null;
    const quote = await prisma.quoteRequest.create({
      data: {
        name: normalizedName,
        whatsapp: normalizedWhatsapp,
        email: cleanEmail(email),
        city: cleanText(city, 120),
        state: normalizedState,
        compoundSlug: peptide.slug,
        hasPrescription: Boolean(hasPrescription),
        message: cleanText(message, 1000),
        sourcePage: cleanText(sourcePage, 500) ?? "unknown",
        consentLgpd: true,
        submittedFromIp: ip,
      },
    });

    const pharmacies = await prisma.pharmacy.findMany({
      where: { isActive: true },
    });
    const matched = matchPharmacies(pharmacies, quote.compoundSlug, quote.state);

    const emailData = {
      id: quote.id,
      name: quote.name,
      email: quote.email,
      whatsapp: quote.whatsapp,
      city: quote.city,
      state: quote.state,
      compoundSlug: quote.compoundSlug,
      hasPrescription: quote.hasPrescription,
      message: quote.message,
    };

    const sentTo: typeof matched = [];
    for (const pharmacy of matched) {
      const sent = await sendQuoteToPharmacy(pharmacy.email, pharmacy.name, emailData);
      if (sent.ok) sentTo.push(pharmacy);
    }

    if (sentTo.length > 0) {
      await prisma.quoteRequest.update({
        where: { id: quote.id },
        data: {
          status: "sent",
          sentAt: new Date(),
          pharmacyId: sentTo[0].id,
        },
      });
    }

    await sendQuoteAdminAlert(emailData, sentTo.map((p) => p.name));

    return NextResponse.json({
      message: sentTo.length
        ? "Pedido enviado. A farmácia parceira responde no seu WhatsApp."
        : "Pedido recebido. Nossa equipe vai rotear manualmente.",
      routedTo: sentTo.length,
    });
  } catch (e) {
    console.error("Quote request error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
