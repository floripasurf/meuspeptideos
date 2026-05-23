import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    // Max 3 newsletter signups per IP per hour. Same conservative window as doctor signup.
    const rateLimit = await checkRateLimit(ip, "newsletter_signup", 3, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, source } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    const existing = await prisma.subscriber.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json({ message: "Já cadastrado" }, { status: 200 });
    }

    await prisma.subscriber.create({
      data: {
        email: email.toLowerCase().trim(),
        source: source || "unknown",
      },
    });

    return NextResponse.json({ message: "Cadastrado com sucesso" });
  } catch {
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
