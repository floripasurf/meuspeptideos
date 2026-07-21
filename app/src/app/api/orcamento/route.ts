import { NextRequest, NextResponse } from "next/server";
import { sendQuoteAdminAlert, sendQuoteToPharmacy } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { matchPharmacies } from "@/lib/quote-routing";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

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

    if (!name || !whatsapp || !compoundSlug) {
      return NextResponse.json(
        { error: "Nome, WhatsApp e composto sao obrigatorios" },
        { status: 400 }
      );
    }

    if (!consentLgpd) {
      return NextResponse.json(
        { error: "E necessario autorizar o compartilhamento com a farmacia parceira" },
        { status: 400 }
      );
    }

    const rateLimit = await checkRateLimit(ip, "orcamento", 5, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Muitas solicitacoes. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

    const normalizedState = state ? String(state).trim().toUpperCase() : null;
    const quote = await prisma.quoteRequest.create({
      data: {
        name: String(name).trim(),
        whatsapp: String(whatsapp).trim(),
        email: email ? String(email).toLowerCase().trim() : null,
        city: city ? String(city).trim() : null,
        state: normalizedState,
        compoundSlug: String(compoundSlug).trim(),
        hasPrescription: Boolean(hasPrescription),
        message: message ? String(message).slice(0, 1000) : null,
        sourcePage: sourcePage ? String(sourcePage).slice(0, 500) : "unknown",
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

    const sentTo: string[] = [];
    for (const pharmacy of matched) {
      const sent = await sendQuoteToPharmacy(pharmacy.email, pharmacy.name, emailData);
      if (sent.ok) sentTo.push(pharmacy.name);
    }

    if (matched.length > 0) {
      await prisma.quoteRequest.update({
        where: { id: quote.id },
        data: {
          status: "sent",
          sentAt: new Date(),
          pharmacyId: matched[0].id,
        },
      });
    }

    await sendQuoteAdminAlert(emailData, matched.map((p) => p.name));

    return NextResponse.json({
      message: "Pedido enviado. A farmacia parceira responde no seu WhatsApp.",
      routedTo: sentTo.length,
    });
  } catch (e) {
    console.error("Quote request error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
