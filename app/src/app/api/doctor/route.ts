import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      whatsapp,
      crm,
      crmState,
      specialty,
      city,
      state,
      peptidesPrescribed,
      yearsExperience,
    } = body;

    if (!name || !email || !specialty) {
      return NextResponse.json(
        { error: "Nome, email e especialidade são obrigatórios" },
        { status: 400 }
      );
    }

    const existing = await prisma.doctor.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Já cadastrado" },
        { status: 200 }
      );
    }

    await prisma.doctor.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        whatsapp: whatsapp?.trim() || null,
        crm: crm?.trim() || null,
        crmState: crmState?.trim() || null,
        specialty: specialty.trim(),
        city: city?.trim() || null,
        state: state?.trim() || null,
        peptidesPrescribed: peptidesPrescribed || [],
        yearsExperience: yearsExperience ? parseInt(yearsExperience) : null,
      },
    });

    return NextResponse.json({ message: "Cadastrado com sucesso" });
  } catch (e) {
    console.error("Doctor signup error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
