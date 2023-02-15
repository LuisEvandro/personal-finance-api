-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL
);
INSERT INTO "new_categories" ("color", "description", "id", "name", "status") SELECT "color", "description", "id", "name", "status" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");
CREATE UNIQUE INDEX "categories_color_key" ON "categories"("color");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
