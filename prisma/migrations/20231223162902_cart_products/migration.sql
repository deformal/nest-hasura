/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `carts_products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `carts_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."carts_products" ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "carts_products_product_id_key" ON "public"."carts_products"("product_id");

-- AddForeignKey
ALTER TABLE "public"."carts_products" ADD CONSTRAINT "carts_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"."products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
