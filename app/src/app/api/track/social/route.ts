import { NextRequest, NextResponse } from "next/server";
import { normalizeSocialAttribution } from "@/lib/social-funnel";
import { prisma } from "@/lib/prisma";
import { getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const attribution = normalizeSocialAttribution(body);
    const ip = getClientIp(request.headers);

    const campaign = await prisma.socialFunnelCampaign.upsert({
      where: { slug: attribution.campaignSlug },
      create: {
        slug: attribution.campaignSlug,
        name: attribution.campaignSlug.replace(/-/g, " "),
        channel: attribution.source,
        landingPath: attribution.landingPath,
        objective: "Topo de funil via Instagram",
        status: "active",
      },
      update: {
        channel: attribution.source,
        landingPath: attribution.landingPath,
        status: "active",
      },
    });

    await prisma.socialAttributionEvent.create({
      data: {
        campaignId: campaign.id,
        source: attribution.source,
        medium: attribution.medium,
        content: attribution.content,
        term: attribution.term,
        landingPath: attribution.landingPath,
        target: attribution.target,
        visitorId: typeof body.visitorId === "string" ? body.visitorId.slice(0, 120) : null,
        submittedFromIp: ip,
        metadata: {
          referrer: typeof body.referrer === "string" ? body.referrer.slice(0, 500) : null,
          segment: typeof body.segment === "string" ? body.segment.slice(0, 80) : null,
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Social attribution error:", e);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
