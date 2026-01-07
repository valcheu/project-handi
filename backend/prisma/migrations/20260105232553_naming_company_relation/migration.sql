-- DropForeignKey
ALTER TABLE "public"."Application" DROP CONSTRAINT "Application_companyId_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
