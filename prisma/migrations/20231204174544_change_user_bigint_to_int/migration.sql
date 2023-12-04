/*
  Warnings:

  - You are about to alter the column `points` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `experiences` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `vehicle_emission_count` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `food_emission_count` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `food_footprint_sum` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `vehicle_footprint_sum` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `total_co2_removed` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "points" SET DATA TYPE INTEGER,
ALTER COLUMN "experiences" SET DATA TYPE INTEGER,
ALTER COLUMN "vehicle_emission_count" SET DATA TYPE INTEGER,
ALTER COLUMN "food_emission_count" SET DATA TYPE INTEGER,
ALTER COLUMN "food_footprint_sum" SET DATA TYPE INTEGER,
ALTER COLUMN "vehicle_footprint_sum" SET DATA TYPE INTEGER,
ALTER COLUMN "total_co2_removed" SET DATA TYPE INTEGER;
