/*
  Warnings:

  - A unique constraint covering the columns `[odoo_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "freshsales";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "odoo";

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "odoo_id" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "odoo"."odoo_user" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "odoo_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_odoo_id_key" ON "public"."users"("odoo_id");

-- AddForeignKey
ALTER TABLE "public"."users" ADD CONSTRAINT "users_odoo_id_fkey" FOREIGN KEY ("odoo_id") REFERENCES "odoo"."odoo_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
