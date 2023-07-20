/*
  Warnings:

  - You are about to drop the column `indepence_level` on the `pets` table. All the data in the column will be lost.
  - Added the required column `independence_level` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "indepence_level",
ADD COLUMN     "independence_level" "IndependenceLevel" NOT NULL;

-- DropEnum
DROP TYPE "IndepenceLevel";
