import { NextRequest, NextResponse } from "next/server";
import { RadarAudience } from "@/generated/prisma/enums";
import { sendRadarInterestAdminAlert } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const audiences = new Set<RadarAudience>(Object.values(RadarAudience));
const plans = new Set(["consumer-monthly", "b2b-radar", "data-license"]);

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().replace(/[\r\n\t]+/g, " ").slice(0, maxLength);
  return normalized || null;
}

function isRadarAudience(value: string): value is RadarAudience {
  return audiences.has(value as RadarAudience);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ message: "Interesse registrado" });

    const audience = clean(body.audience, 40) || "";
    const plan = clean(body.plan, 60) || "";
    const email = clean(body.email, 160)?.toLowerCase() || "";
    if (!isRadarAudience(audience) || !plans.has(plan) || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json({ error: "Público, plano e email válido são obrigatórios" }, { status: 400 });
    }
    if (body.consentCommercial !== true) {
      return NextResponse.json({ error: "Autorize o contato sobre o Radar" }, { status: 400 });
    }

    const ip = getClientIp(request.headers);
    const rateLimit = await checkRateLimit(ip, "radar_interest", 5, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: "Muitas solicitações. Tente novamente em 1 hora." }, { status: 429 });
    }

    const interest = await prisma.radarInterest.upsert({
      where: { email_audience: { email, audience } },
      create: {
        audience,
        name: clean(body.name, 120),
        organization: clean(body.organization, 160),
        email,
        whatsapp: clean(body.whatsapp, 40),
        plan,
        sourcePage: clean(body.sourcePage, 500) || "unknown",
        consentCommercial: true,
        submittedFromIp: ip,
      },
      update: {
        name: clean(body.name, 120),
        organization: clean(body.organization, 160),
        whatsapp: clean(body.whatsapp, 40),
        plan,
        sourcePage: clean(body.sourcePage, 500) || "unknown",
        consentCommercial: true,
        submittedFromIp: ip,
        status: "new",
      },
    });

    await sendRadarInterestAdminAlert(interest);
    return NextResponse.json({ message: "Interesse registrado. Entraremos em contato sobre o piloto." });
  } catch (error) {
    console.error("Radar interest error:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
