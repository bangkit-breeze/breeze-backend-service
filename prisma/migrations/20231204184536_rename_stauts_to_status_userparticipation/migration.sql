/*
  Warnings:

  - You are about to drop the column `stauts` on the `UserParticipation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserParticipation" DROP COLUMN "stauts",
ADD COLUMN     "status" TEXT;
