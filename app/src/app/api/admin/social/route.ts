import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { initialSocialIdeas } from "@/lib/social-content-ideas";

export const dynamic = "force-dynamic";

async function guard() {
  return (await isAuthenticated())
    ? null
    : NextResponse.json({ error: "Não autorizado" }, { status: 401 });
}

export async function GET() {
  const blocked = await guard();
  if (blocked) return blocked;

  const [campaigns, ideas, recentEvents] = await Promise.all([
    prisma.socialFunnelCampaign.findMany({
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { ideas: true, events: true } } },
    }),
    prisma.socialContentIdea.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      take: 80,
      include: { campaign: { select: { slug: true, name: true } } },
    }),
    prisma.socialAttributionEvent.findMany({
      orderBy: { createdAt: "desc" },
      take: 80,
      include: { campaign: { select: { slug: true } } },
    }),
  ]);

  return NextResponse.json({ campaigns, ideas, recentEvents, seedCount: initialSocialIdeas.length });
}

export async function POST(request: NextRequest) {
  const blocked = await guard();
  if (blocked) return blocked;

  const body = await request.json().catch(() => ({}));
  if (body.action !== "seed-initial-ideas") {
    return NextResponse.json({ error: "acao invalida" }, { status: 400 });
  }

  const campaign = await prisma.socialFunnelCampaign.upsert({
    where: { slug: "instagram-topo-funil" },
    create: {
      slug: "instagram-topo-funil",
      name: "Instagram topo de funil",
      channel: "instagram",
      landingPath: "/pt/instagram",
      objective: "Gerar audiência educacional e validar interesse no Radar.",
      status: "active",
    },
    update: {
      name: "Instagram topo de funil",
      landingPath: "/pt/instagram",
      objective: "Gerar audiência educacional e validar interesse no Radar.",
      status: "active",
    },
  });

  for (const idea of initialSocialIdeas) {
    await prisma.socialContentIdea.upsert({
      where: { externalId: idea.externalId },
      create: {
        campaignId: campaign.id,
        externalId: idea.externalId,
        pillar: idea.pillar,
        format: idea.format,
        hook: idea.hook,
        angle: idea.angle,
        target: idea.target,
        cta: idea.cta,
        status: "backlog",
      },
      update: {
        campaignId: campaign.id,
        pillar: idea.pillar,
        format: idea.format,
        hook: idea.hook,
        angle: idea.angle,
        target: idea.target,
        cta: idea.cta,
      },
    });
  }

  return NextResponse.json({ campaign, seeded: initialSocialIdeas.length });
}
