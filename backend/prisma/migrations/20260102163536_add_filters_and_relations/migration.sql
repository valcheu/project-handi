/*
  Warnings:

  - The `status` column on the `Application` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `isInclusive` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `recruiterId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `disability` on the `User` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `companyId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contract` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('APPLICANT', 'RECRUITER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('CDI', 'CDD', 'INTERIM', 'STAGE', 'ALTERNANCE');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('JUNIOR', 'CONFIRME', 'SENIOR');

-- CreateEnum
CREATE TYPE "RemotePolicy" AS ENUM ('NO_REMOTE', 'HYBRID', 'FULL_REMOTE');

-- CreateEnum
CREATE TYPE "DisabilityCategory" AS ENUM ('MOTEUR', 'VISUEL', 'AUDITIF', 'PSYCHIQUE', 'COGNITIF', 'INVISIBLE');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "public"."Offer" DROP CONSTRAINT "Offer_recruiterId_fkey";

-- AlterTable
ALTER TABLE "Application" DROP COLUMN "status",
ADD COLUMN     "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "isInclusive",
DROP COLUMN "recruiterId",
ADD COLUMN     "companyId" INTEGER NOT NULL,
ADD COLUMN     "contract" "ContractType" NOT NULL,
ADD COLUMN     "disabilityCompatible" "DisabilityCategory"[],
ADD COLUMN     "experience" "ExperienceLevel" NOT NULL,
ADD COLUMN     "remote" "RemotePolicy" NOT NULL DEFAULT 'NO_REMOTE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "disability",
ADD COLUMN     "companyId" INTEGER,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'APPLICANT';

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sector" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adaptation" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "category" "DisabilityCategory" NOT NULL,

    CONSTRAINT "Adaptation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OfferToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OfferToSkill_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AdaptationToOffer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AdaptationToOffer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Adaptation_label_key" ON "Adaptation"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE INDEX "_OfferToSkill_B_index" ON "_OfferToSkill"("B");

-- CreateIndex
CREATE INDEX "_AdaptationToOffer_B_index" ON "_AdaptationToOffer"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfferToSkill" ADD CONSTRAINT "_OfferToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OfferToSkill" ADD CONSTRAINT "_OfferToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdaptationToOffer" ADD CONSTRAINT "_AdaptationToOffer_A_fkey" FOREIGN KEY ("A") REFERENCES "Adaptation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdaptationToOffer" ADD CONSTRAINT "_AdaptationToOffer_B_fkey" FOREIGN KEY ("B") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
