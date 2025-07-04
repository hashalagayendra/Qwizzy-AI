/*
  Warnings:

  - You are about to drop the column `name` on the `Paper` table. All the data in the column will be lost.
  - Added the required column `paper_name` to the `Paper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paper" DROP COLUMN "name",
ADD COLUMN     "paper_name" TEXT NOT NULL,
ADD COLUMN     "timeLimit" INTEGER;
