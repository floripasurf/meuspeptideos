import { NextRequest, NextResponse } from "next/server";
import { scorePharmacyProspect, prospectStatusFromScore } from "@/lib/b2b-scoring";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
  return [];
}

function nullableString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

// Cadastro de prospect (lista de espera) fica sempre aberto; o que é gateado
// por ENABLE_PHARMACY_QUOTE_PARTNERS é o roteamento de orçamentos (/api/orcamento).
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);
    const rateLimit = await checkRateLimit(ip, "pharmacy_partner_apply", 5, 60);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Muitas solicitações. Tente novamente em 1 hora." },
        { status: 429 }
      );
    }

    const body = await request.json();
    if (body.websiteTrap) return NextResponse.json({ message: "Cadastro recebido" });

    const pharmacyName = String(body.pharmacyName ?? "").trim();
    const contactName = String(body.contactName ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const compounds = normalizeStringArray(body.compounds);

    if (!pharmacyName || !contactName || !email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Farmácia, responsável e email válido são obrigatórios" },
        { status: 400 }
      );
    }

    if (body.consentCommercial !== true) {
      return NextResponse.json(
        { error: "É necessário autorizar contato comercial" },
        { status: 400 }
      );
    }

    const prospectScore = scorePharmacyProspect({
      name: pharmacyName,
      email,
      whatsapp: body.whatsapp,
      website: body.partnerWebsite,
      city: body.city,
      state: body.state,
      compounds,
      notes: body.notes,
    });

    const prospect = await prisma.pharmacyProspect.create({
      data: {
        name: pharmacyName,
        slug: slugify(pharmacyName),
        email,
        whatsapp: nullableString(body.whatsapp),
        website: nullableString(body.partnerWebsite),
        city: nullableString(body.city),
        state: nullableString(body.state)?.toUpperCase() ?? null,
        compounds,
        source: "inbound",
        status: prospectStatusFromScore(prospectScore),
        fitScore: prospectScore.fitScore,
        riskScore: prospectScore.riskScore,
        riskFlags: prospectScore.riskFlags,
        outreachNotes: nullableString(body.notes),
        evidence: {
          sourcePage: body.sourcePage || "unknown",
          monthlyDemand: body.monthlyDemand || null,
        },
      },
    });

    await prisma.partnerApplication.create({
      data: {
        prospectId: prospect.id,
        pharmacyName,
        contactName,
        email,
        whatsapp: nullableString(body.whatsapp),
        city: nullableString(body.city),
        state: nullableString(body.state)?.toUpperCase() ?? null,
        website: nullableString(body.partnerWebsite),
        compounds,
        monthlyDemand: nullableString(body.monthlyDemand),
        consentCommercial: true,
        sourcePage: String(body.sourcePage || "unknown").slice(0, 500),
        submittedFromIp: ip,
        notes: nullableString(body.notes),
      },
    });

    return NextResponse.json({
      message: "Cadastro recebido. Vamos revisar e entrar em contato.",
      prospectId: prospect.id,
    });
  } catch (e) {
    console.error("Partner application error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
