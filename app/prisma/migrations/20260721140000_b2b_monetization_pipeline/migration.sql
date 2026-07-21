-- B2B prospecting, partner applications, outreach and Instagram funnel tracking.

CREATE TYPE "ProspectSource" AS ENUM ('manual', 'csv', 'google_maps', 'inbound', 'instagram', 'partnership');
CREATE TYPE "ProspectStatus" AS ENUM ('discovered', 'qualified', 'contacted', 'negotiating', 'partner', 'rejected', 'opted_out');
CREATE TYPE "OutreachChannel" AS ENUM ('email', 'whatsapp', 'phone', 'instagram');
CREATE TYPE "SocialAttributionTarget" AS ENUM ('patient_quote', 'doctor_signup', 'pharmacy_partner', 'clinic_directory', 'education');

CREATE TABLE "PharmacyProspect" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT,
    "email" TEXT,
    "whatsapp" TEXT,
    "website" TEXT,
    "googlePlaceId" TEXT,
    "googleMapsUrl" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "googleRating" DOUBLE PRECISION,
    "googleReviews" INTEGER,
    "compounds" TEXT[],
    "source" "ProspectSource" NOT NULL DEFAULT 'manual',
    "status" "ProspectStatus" NOT NULL DEFAULT 'discovered',
    "fitScore" INTEGER NOT NULL DEFAULT 0,
    "riskScore" INTEGER NOT NULL DEFAULT 0,
    "riskFlags" TEXT[],
    "evidence" JSONB,
    "outreachNotes" TEXT,
    "lastContactedAt" TIMESTAMP(3),
    "nextFollowUpAt" TIMESTAMP(3),
    "optedOut" BOOLEAN NOT NULL DEFAULT false,
    "convertedPharmacyId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PharmacyProspect_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OutreachCampaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" "OutreachChannel" NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "OutreachCampaign_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "OutreachEvent" (
    "id" TEXT NOT NULL,
    "prospectId" TEXT NOT NULL,
    "campaignId" TEXT,
    "channel" "OutreachChannel" NOT NULL,
    "subject" TEXT,
    "message" TEXT,
    "status" TEXT NOT NULL DEFAULT 'planned',
    "scheduledAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "responseAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OutreachEvent_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PartnerApplication" (
    "id" TEXT NOT NULL,
    "prospectId" TEXT,
    "pharmacyName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "city" TEXT,
    "state" TEXT,
    "website" TEXT,
    "compounds" TEXT[],
    "monthlyDemand" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "consentCommercial" BOOLEAN NOT NULL DEFAULT false,
    "sourcePage" TEXT NOT NULL,
    "submittedFromIp" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "PartnerApplication_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SocialFunnelCampaign" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" TEXT NOT NULL DEFAULT 'instagram',
    "landingPath" TEXT NOT NULL,
    "objective" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SocialFunnelCampaign_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SocialContentIdea" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,
    "externalId" TEXT,
    "pillar" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "hook" TEXT NOT NULL,
    "angle" TEXT NOT NULL,
    "target" "SocialAttributionTarget" NOT NULL,
    "cta" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'backlog',
    "publishAfter" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SocialContentIdea_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SocialAttributionEvent" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT,
    "source" TEXT NOT NULL,
    "medium" TEXT,
    "content" TEXT,
    "term" TEXT,
    "landingPath" TEXT NOT NULL,
    "target" "SocialAttributionTarget" NOT NULL,
    "visitorId" TEXT,
    "submittedFromIp" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SocialAttributionEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PharmacyProspect_googlePlaceId_key" ON "PharmacyProspect"("googlePlaceId");
CREATE INDEX "PharmacyProspect_status_fitScore_idx" ON "PharmacyProspect"("status", "fitScore");
CREATE INDEX "PharmacyProspect_city_state_idx" ON "PharmacyProspect"("city", "state");
CREATE INDEX "PharmacyProspect_source_createdAt_idx" ON "PharmacyProspect"("source", "createdAt");
CREATE INDEX "OutreachEvent_prospectId_createdAt_idx" ON "OutreachEvent"("prospectId", "createdAt");
CREATE INDEX "OutreachEvent_campaignId_status_idx" ON "OutreachEvent"("campaignId", "status");
CREATE INDEX "PartnerApplication_status_createdAt_idx" ON "PartnerApplication"("status", "createdAt");
CREATE INDEX "PartnerApplication_submittedFromIp_createdAt_idx" ON "PartnerApplication"("submittedFromIp", "createdAt");
CREATE UNIQUE INDEX "SocialFunnelCampaign_slug_key" ON "SocialFunnelCampaign"("slug");
CREATE UNIQUE INDEX "SocialContentIdea_externalId_key" ON "SocialContentIdea"("externalId");
CREATE INDEX "SocialContentIdea_status_target_idx" ON "SocialContentIdea"("status", "target");
CREATE INDEX "SocialAttributionEvent_campaignId_createdAt_idx" ON "SocialAttributionEvent"("campaignId", "createdAt");
CREATE INDEX "SocialAttributionEvent_source_target_createdAt_idx" ON "SocialAttributionEvent"("source", "target", "createdAt");

ALTER TABLE "PharmacyProspect" ADD CONSTRAINT "PharmacyProspect_convertedPharmacyId_fkey" FOREIGN KEY ("convertedPharmacyId") REFERENCES "Pharmacy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "OutreachEvent" ADD CONSTRAINT "OutreachEvent_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "PharmacyProspect"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OutreachEvent" ADD CONSTRAINT "OutreachEvent_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "OutreachCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "PartnerApplication" ADD CONSTRAINT "PartnerApplication_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "PharmacyProspect"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SocialContentIdea" ADD CONSTRAINT "SocialContentIdea_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "SocialFunnelCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "SocialAttributionEvent" ADD CONSTRAINT "SocialAttributionEvent_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "SocialFunnelCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
