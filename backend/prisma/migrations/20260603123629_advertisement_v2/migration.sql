/*
  Warnings:

  - You are about to drop the column `imagePath` on the `Advertisement` table. All the data in the column will be lost.
  - Added the required column `bannerPath` to the `Advertisement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Advertisement" DROP COLUMN "imagePath",
ADD COLUMN     "bannerPath" TEXT NOT NULL,
ADD COLUMN     "discountCode" TEXT;
