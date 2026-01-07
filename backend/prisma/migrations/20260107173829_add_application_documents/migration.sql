-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "additionalDocs" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "coverLetterUrl" TEXT,
ADD COLUMN     "cvUrl" TEXT;
