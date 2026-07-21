-- CreateEnum
CREATE TYPE "RadarAudience" AS ENUM ('consumer', 'pharmacy', 'clinic', 'professional', 'supplier');

-- AlterEnum
ALTER TYPE "SocialAttributionTarget" ADD VALUE 'radar';

-- AlterTable
ALTER TABLE "Subscriber"
ADD COLUMN "confirmedAt" TIMESTAMP(3),
ADD COLUMN "confirmationToken" TEXT,
ADD COLUMN "unsubscribeToken" TEXT,
ADD COLUMN "consentAt" TIMESTAMP(3),
ADD COLUMN "submittedFromIp" TEXT;

-- CreateTable
CREATE TABLE "RadarInterest" (
    "id" TEXT NOT NULL,
    "audience" "RadarAudience" NOT NULL,
    "name" TEXT,
    "organization" TEXT,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "plan" TEXT NOT NULL,
    "sourcePage" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'new',
    "consentCommercial" BOOLEAN NOT NULL DEFAULT false,
    "submittedFromIp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RadarInterest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_confirmationToken_key" ON "Subscriber"("confirmationToken");
CREATE UNIQUE INDEX "Subscriber_unsubscribeToken_key" ON "Subscriber"("unsubscribeToken");
CREATE INDEX "Subscriber_submittedFromIp_createdAt_idx" ON "Subscriber"("submittedFromIp", "createdAt");
CREATE UNIQUE INDEX "RadarInterest_email_audience_key" ON "RadarInterest"("email", "audience");
CREATE INDEX "RadarInterest_audience_status_createdAt_idx" ON "RadarInterest"("audience", "status", "createdAt");
CREATE INDEX "RadarInterest_submittedFromIp_createdAt_idx" ON "RadarInterest"("submittedFromIp", "createdAt");

-- Remove unsupported regulatory claims from currently published content.
UPDATE "BlogPost"
SET "published" = false
WHERE "slug" = 'regulamentacao-peptideos-2026';

UPDATE "BlogPost"
SET "content" = replace(
  "content",
  'A boa notícia: o cenário está mudando. Em fevereiro de 2026, o FDA reclassificou 14 peptídeos para Category 1, permitindo que farmácias de manipulação os preparem sob prescrição médica. No Brasil, a ANVISA está formalizando regras para GLP-1s e outros peptídeos. A tendência é clara — regulamentação, não proibição.',
  'O cenário regulatório muda com frequência, mas processos de avaliação de insumos para manipulação não equivalem a aprovação de medicamentos. No Brasil, cada produto, indicação e forma de fabricação deve ser verificado nas fontes oficiais da Anvisa.'
)
WHERE "slug" = 'revolucao-dos-peptideos';

UPDATE "PeptideFaq" AS faq
SET "answer" = 'O Zadaxin (thymosin alpha-1) tem aprovações em alguns países, mas não é aprovado pelo FDA e não foi identificado registro na Anvisa. Uma categoria de avaliação de insumos para manipulação nos EUA não equivale a aprovação nem autoriza uso no Brasil.'
FROM "Peptide" AS peptide
WHERE faq."peptideId" = peptide."id"
  AND peptide."slug" = 'thymosin-alpha-1'
  AND faq."question" = 'Por que não é aprovado nos EUA/Brasil?';
