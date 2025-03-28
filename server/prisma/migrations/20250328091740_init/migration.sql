/*
  Warnings:

  - Added the required column `edited_at` to the `collections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `collectionId` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `edited_at` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "edited_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "collectionId" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "edited_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "parentItemId" INTEGER;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_parentItemId_fkey" FOREIGN KEY ("parentItemId") REFERENCES "items"("id") ON DELETE SET NULL ON UPDATE CASCADE;
