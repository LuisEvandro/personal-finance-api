/*
  Warnings:

  - You are about to drop the `installment` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `categoryId` on table `transactions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `transactions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "installment";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "installments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "startPay" DATETIME NOT NULL,
    "finalPay" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "type" TEXT NOT NULL,
    "payment_method" TEXT,
    "installmentId" TEXT,
    CONSTRAINT "transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transactions_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "installments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_transactions" ("categoryId", "description", "id", "installmentId", "name", "payment_method", "type", "value") SELECT "categoryId", "description", "id", "installmentId", "name", "payment_method", "type", "value" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
