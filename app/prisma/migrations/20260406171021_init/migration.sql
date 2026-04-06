-- CreateEnum
CREATE TYPE "PeptideCategory" AS ENUM ('glp1', 'growth_hormone', 'healing', 'neuroprotective', 'cosmetic', 'immune', 'performance');

-- CreateEnum
CREATE TYPE "ResearchPhase" AS ENUM ('preclinical', 'phase1', 'phase2', 'phase3', 'approved');

-- CreateEnum
CREATE TYPE "RegulatoryStatus" AS ENUM ('approved', 'pending', 'not_regulated', 'banned', 'compounding_only');

-- CreateEnum
CREATE TYPE "StudyType" AS ENUM ('meta_analysis', 'systematic_review', 'rct', 'cohort', 'case_study', 'review', 'animal', 'in_vitro');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('new', 'contacted', 'matched', 'converted', 'lost');

-- CreateTable
CREATE TABLE "Peptide" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "aliases" TEXT[],
    "category" "PeptideCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "mechanism" TEXT NOT NULL,
    "researchPhase" "ResearchPhase" NOT NULL,
    "anvisaStatus" "RegulatoryStatus" NOT NULL DEFAULT 'not_regulated',
    "fdaStatus" "RegulatoryStatus" NOT NULL DEFAULT 'not_regulated',
    "emaStatus" "RegulatoryStatus" NOT NULL DEFAULT 'not_regulated',
    "benefits" JSONB NOT NULL,
    "risks" JSONB NOT NULL,
    "internetVsScience" JSONB NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Peptide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" TEXT NOT NULL,
    "peptideId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authors" TEXT NOT NULL,
    "journal" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "pubmedId" TEXT,
    "doi" TEXT,
    "abstract" TEXT,
    "keyFindings" TEXT NOT NULL,
    "studyType" "StudyType" NOT NULL,
    "sampleSize" INTEGER,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeptideFaq" (
    "id" TEXT NOT NULL,
    "peptideId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PeptideFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "reviewerName" TEXT,
    "reviewerCrm" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT[],

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "city" TEXT,
    "state" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "interests" TEXT[],
    "source" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "whatsapp" TEXT,
    "city" TEXT,
    "state" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "peptideInterest" TEXT[],
    "sourcePage" TEXT NOT NULL,
    "contactMethod" TEXT NOT NULL,
    "status" "LeadStatus" NOT NULL DEFAULT 'new',
    "clinicId" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clinic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "googlePlaceId" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "neighborhood" TEXT,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "phone" TEXT,
    "whatsapp" TEXT,
    "website" TEXT,
    "googleMapsUrl" TEXT,
    "googleRating" DOUBLE PRECISION,
    "googleReviews" INTEGER,
    "specialties" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clinic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Peptide_slug_key" ON "Peptide"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_slug_key" ON "Clinic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Clinic_googlePlaceId_key" ON "Clinic"("googlePlaceId");

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_peptideId_fkey" FOREIGN KEY ("peptideId") REFERENCES "Peptide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeptideFaq" ADD CONSTRAINT "PeptideFaq_peptideId_fkey" FOREIGN KEY ("peptideId") REFERENCES "Peptide"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_clinicId_fkey" FOREIGN KEY ("clinicId") REFERENCES "Clinic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
