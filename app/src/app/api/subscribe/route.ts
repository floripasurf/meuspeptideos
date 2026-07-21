import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendSubscriberConfirmationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ message: "Verifique seu email" });

    const email = typeof body.email === "string" ? body.email.toLowerCase().trim().slice(0, 160) : "";
    const source = typeof body.source === "string" ? body.source.trim().slice(0, 160) : "unknown";

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    if (body.consentNewsletter !== true) {
      return NextResponse.json({ error: "Confirme que deseja receber a newsletter" }, { status: 400 });
    }

    const ip = getClientIp(request.headers);
    const rateLimit = await checkRateLimit(ip, "newsletter_subscribe", 5, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: "Muitas solicitações. Tente novamente em 1 hora." }, { status: 429 });
    }

    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing?.confirmed) {
      return NextResponse.json({ message: "Inscrição já confirmada" });
    }

    const confirmationToken = crypto.randomBytes(32).toString("hex");
    const unsubscribeToken = existing?.unsubscribeToken || crypto.randomBytes(32).toString("hex");
    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      create: {
        email,
        source,
        confirmationToken,
        unsubscribeToken,
        consentAt: new Date(),
        submittedFromIp: ip,
      },
      update: {
        source,
        confirmationToken,
        unsubscribeToken,
        consentAt: new Date(),
        submittedFromIp: ip,
      },
    });

    const sent = await sendSubscriberConfirmationEmail(
      subscriber.email,
      confirmationToken,
      unsubscribeToken
    );
    if (!sent.ok) {
      return NextResponse.json(
        { error: "Não foi possível enviar a confirmação. Tente novamente mais tarde." },
        { status: 503 }
      );
    }

    return NextResponse.json({ message: "Verifique seu email para confirmar a inscrição" });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
