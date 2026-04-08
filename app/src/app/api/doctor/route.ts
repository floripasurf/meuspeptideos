import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import {
  sendDoctorVerificationEmail,
  sendAdminNotification,
} from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);

    // Rate limit: max 3 cadastros por IP por hora
    const rateLimit = await checkRateLimit(ip, "doctor_signup", 3, 60);
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
      phone,
      whatsapp,
      crm,
      crmState,
      specialty,
      address,
      city,
      state,
      peptidesPrescribed,
      yearsExperience,
      consentLgpd,
      // Honeypot field — humans don't fill this
      website,
    } = body;

    // Honeypot check — if filled, it's a bot
    if (website && website.length > 0) {
      // Pretend success to confuse bot
      return NextResponse.json({ message: "Cadastrado com sucesso" });
    }

    // Validation
    if (!name || !email || !specialty || !city) {
      return NextResponse.json(
        { error: "Nome, email, especialidade e cidade são obrigatórios" },
        { status: 400 }
      );
    }

    if (!consentLgpd) {
      return NextResponse.json(
        { error: "Você precisa concordar com a política de privacidade" },
        { status: 400 }
      );
    }

    // Email format validation
    if (!email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if already exists
    const existing = await prisma.doctor.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      // Don't reveal whether email exists (info leak prevention)
      // Just say success and let them check email
      return NextResponse.json({
        message:
          "Cadastro recebido. Verifique seu email para confirmar.",
      });
    }

    // Generate secure verification token
    const token = crypto.randomBytes(32).toString("hex");

    const doctor = await prisma.doctor.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        phone: phone?.trim() || null,
        whatsapp: whatsapp?.trim() || null,
        crm: crm?.trim() || null,
        crmState: crmState?.trim() || null,
        specialty: specialty.trim(),
        address: address?.trim() || null,
        city: city.trim(),
        state: state?.trim() || null,
        peptidesPrescribed: peptidesPrescribed || [],
        yearsExperience: yearsExperience ? parseInt(yearsExperience) : null,
        consentLgpd: true,
        consentLgpdAt: new Date(),
        verificationToken: token,
        submittedFromIp: ip,
      },
    });

    // Send confirmation email (async, don't block response)
    sendDoctorVerificationEmail(cleanEmail, name.trim(), token).catch(
      (e) => console.error("Email error:", e)
    );

    // Notify admin
    sendAdminNotification({
      name: doctor.name,
      email: doctor.email,
      specialty: doctor.specialty,
      city: doctor.city,
      state: doctor.state,
      crm: doctor.crm,
    }).catch((e) => console.error("Admin notify error:", e));

    return NextResponse.json({
      message: "Cadastro recebido. Verifique seu email para confirmar.",
    });
  } catch (e) {
    console.error("Doctor signup error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
