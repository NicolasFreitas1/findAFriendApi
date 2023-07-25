/*
  Warnings:

  - Added the required column `name_stored` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photos" ADD COLUMN     "name_stored" TEXT NOT NULL;
