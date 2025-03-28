-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_collectionId_fkey";

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "collections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
