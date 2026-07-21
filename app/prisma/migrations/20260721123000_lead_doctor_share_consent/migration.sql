-- Lead consent for sharing with doctor partners
ALTER TABLE "Lead" ADD COLUMN "consentDoctorShare" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Lead" ADD COLUMN "consentDoctorShareAt" TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN "submittedFromIp" TEXT;

CREATE INDEX "Lead_submittedFromIp_createdAt_idx" ON "Lead"("submittedFromIp", "createdAt");
