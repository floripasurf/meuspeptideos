-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('new', 'sent', 'quoted', 'converted', 'paid', 'lost');

-- CreateTable
CREATE TABLE "Pharmacy" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "city" TEXT,
    "state" TEXT,
    "shipsNationwide" BOOLEAN NOT NULL DEFAULT true,
    "compounds" TEXT[],
    "commissionPct" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "leadPrice" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Pharmacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "whatsapp" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "compoundSlug" TEXT NOT NULL,
    "hasPrescription" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT,
    "sourcePage" TEXT NOT NULL,
    "consentLgpd" BOOLEAN NOT NULL DEFAULT false,
    "submittedFromIp" TEXT,
    "status" "QuoteStatus" NOT NULL DEFAULT 'new',
    "pharmacyId" TEXT,
    "sentAt" TIMESTAMP(3),
    "orderValue" DOUBLE PRECISION,
    "commissionValue" DOUBLE PRECISION,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadDelivery" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "deliveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),
    "notes" TEXT,
    CONSTRAINT "LeadDelivery_pkey" PRIMARY KEY ("id")
);

-- AlterTable (colunas novas SEMPRE antes dos índices que dependem delas)
ALTER TABLE "Clinic" ADD COLUMN "isPublic" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Clinic" ADD COLUMN "premiumUntil" TIMESTAMP(3);
ALTER TABLE "Clinic" ADD COLUMN "bookingUrl" TEXT;

-- Indexes (depois de todos os CREATE/ALTER)
CREATE UNIQUE INDEX "Pharmacy_slug_key" ON "Pharmacy"("slug");
CREATE UNIQUE INDEX "LeadDelivery_leadId_doctorId_key" ON "LeadDelivery"("leadId", "doctorId");
CREATE INDEX "QuoteRequest_status_idx" ON "QuoteRequest"("status");
CREATE INDEX "QuoteRequest_pharmacyId_idx" ON "QuoteRequest"("pharmacyId");

-- FKs
ALTER TABLE "QuoteRequest" ADD CONSTRAINT "QuoteRequest_pharmacyId_fkey" FOREIGN KEY ("pharmacyId") REFERENCES "Pharmacy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "LeadDelivery" ADD CONSTRAINT "LeadDelivery_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "LeadDelivery" ADD CONSTRAINT "LeadDelivery_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
