-- CreateTable
CREATE TABLE "paper" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "paper_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "paper" ADD CONSTRAINT "paper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
