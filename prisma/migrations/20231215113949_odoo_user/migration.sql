/*
  Warnings:

  - You are about to drop the column `odoo_id` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `odoo_user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `odoo_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_odoo_id_fkey";

-- DropIndex
DROP INDEX "public"."users_odoo_id_key";

-- AlterTable
ALTER TABLE "odoo"."odoo_user" ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "odoo_id";

-- CreateIndex
CREATE UNIQUE INDEX "odoo_user_user_id_key" ON "odoo"."odoo_user"("user_id");

-- AddForeignKey
ALTER TABLE "odoo"."odoo_user" ADD CONSTRAINT "odoo_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
