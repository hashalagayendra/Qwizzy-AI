/*
  Warnings:

  - Made the column `questions` on table `Paper` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Paper" ALTER COLUMN "questions" SET NOT NULL,
ALTER COLUMN "questions" SET DEFAULT '[]';
