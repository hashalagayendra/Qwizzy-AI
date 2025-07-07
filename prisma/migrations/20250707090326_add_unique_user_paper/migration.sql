/*
  Warnings:

  - A unique constraint covering the columns `[userId,paperId]` on the table `AssignPaper` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AssignPaper_userId_paperId_key" ON "AssignPaper"("userId", "paperId");
