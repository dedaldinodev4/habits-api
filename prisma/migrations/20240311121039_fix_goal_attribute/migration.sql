/*
  Warnings:

  - You are about to drop the column `tag` on the `_categories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "_categories" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT;

-- AlterTable
ALTER TABLE "_habits" ADD COLUMN     "goal_value" TEXT;
