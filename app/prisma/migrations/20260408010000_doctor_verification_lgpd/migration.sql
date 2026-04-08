-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN "emailVerified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Doctor" ADD COLUMN "verificationToken" TEXT;
ALTER TABLE "Doctor" ADD COLUMN "verifiedAt" TIMESTAMP(3);
ALTER TABLE "Doctor" ADD COLUMN "consentLgpd" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Doctor" ADD COLUMN "consentLgpdAt" TIMESTAMP(3);
ALTER TABLE "Doctor" ADD COLUMN "submittedFromIp" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_verificationToken_key" ON "Doctor"("verificationToken");
CREATE INDEX "Doctor_submittedFromIp_createdAt_idx" ON "Doctor"("submittedFromIp", "createdAt");

-- CreateTable
CREATE TABLE "RateLimitEntry" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RateLimitEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RateLimitEntry_ip_endpoint_createdAt_idx" ON "RateLimitEntry"("ip", "endpoint", "createdAt");
