/*
  Warnings:

  - You are about to drop the column `cart_id` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."users_cart_id_key";

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "cart_id";
