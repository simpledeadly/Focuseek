/*
  Warnings:

  - You are about to drop the `subitems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_parentItemId_fkey";

-- DropForeignKey
ALTER TABLE "subitems" DROP CONSTRAINT "subitems_parentId_fkey";

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "showSubItems" BOOLEAN;

-- DropTable
DROP TABLE "subitems";
