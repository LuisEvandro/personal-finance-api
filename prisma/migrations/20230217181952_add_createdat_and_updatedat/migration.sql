-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_installments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "startPay" DATETIME NOT NULL,
    "finalPay" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_installments" ("finalPay", "id", "quantity", "startPay") SELECT "finalPay", "id", "quantity", "startPay" FROM "installments";
DROP TABLE "installments";
ALTER TABLE "new_installments" RENAME TO "installments";
CREATE TABLE "new_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME
);
INSERT INTO "new_categories" ("color", "description", "id", "name", "status") SELECT "color", "description", "id", "name", "status" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
CREATE UNIQUE INDEX "categories_color_key" ON "categories"("color");
CREATE TABLE "new_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "type" TEXT NOT NULL,
    "payment_method" TEXT,
    "installmentId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    CONSTRAINT "transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transactions_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "installments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_transactions" ("categoryId", "description", "id", "installmentId", "name", "payment_method", "type", "value") SELECT "categoryId", "description", "id", "installmentId", "name", "payment_method", "type", "value" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
