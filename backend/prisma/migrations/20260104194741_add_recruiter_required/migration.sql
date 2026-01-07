/*
  Warnings:

  - Made the column `recruiterId` on table `Offer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Offer" DROP CONSTRAINT "Offer_recruiterId_fkey";

-- AlterTable
ALTER TABLE "Offer" ALTER COLUMN "recruiterId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
