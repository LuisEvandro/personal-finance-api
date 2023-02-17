-- CreateTable
CREATE TABLE "installment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "startPay" DATETIME NOT NULL,
    "finalPay" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" TEXT,
    "value" DECIMAL NOT NULL,
    "type" TEXT,
    "payment_method" TEXT,
    "installmentId" TEXT,
    CONSTRAINT "transactions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "transactions_installmentId_fkey" FOREIGN KEY ("installmentId") REFERENCES "installment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
