/*
  Warnings:

  - Added the required column `id_user` to the `_habits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "_habits" ADD COLUMN     "id_user" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "_habits" ADD CONSTRAINT "_habits_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "_users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
