-- AlterTable
ALTER TABLE "Doctor" ADD COLUMN     "acceptsPartnership" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "phone" TEXT;
