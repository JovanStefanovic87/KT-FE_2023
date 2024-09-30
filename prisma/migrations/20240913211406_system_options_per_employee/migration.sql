/*
  Warnings:

  - Added the required column `description` to the `ServiceOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ServiceOption" ADD COLUMN     "description" VARCHAR(200) NOT NULL;

-- CreateTable
CREATE TABLE "SystemOption" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(200) NOT NULL,

    CONSTRAINT "SystemOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemOptionEmplyee" (
    "id" SERIAL NOT NULL,
    "systemOptionId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,

    CONSTRAINT "SystemOptionEmplyee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SystemOptionEmplyee" ADD CONSTRAINT "SystemOptionEmplyee_systemOptionId_fkey" FOREIGN KEY ("systemOptionId") REFERENCES "SystemOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemOptionEmplyee" ADD CONSTRAINT "SystemOptionEmplyee_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
