import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
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
