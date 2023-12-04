/*
  Warnings:

  - You are about to alter the column `total_emission` on the `EmissionLog` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `reward_exp` on the `EmissionLog` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `reward_points` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "EmissionLog" ALTER COLUMN "total_emission" SET DATA TYPE INTEGER,
ALTER COLUMN "reward_exp" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "reward_points" SET DATA TYPE INTEGER;
