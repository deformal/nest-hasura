/*
  Warnings:

  - You are about to drop the column `user_id` on the `carts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cart_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cart_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."carts" DROP CONSTRAINT "carts_user_id_fkey";

-- DropIndex
DROP INDEX "public"."carts_user_id_key";

-- AlterTable
ALTER TABLE "public"."carts" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "cart_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_cart_id_key" ON "public"."users"("cart_id");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
