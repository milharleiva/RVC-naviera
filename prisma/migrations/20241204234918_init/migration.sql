/*
  Warnings:

  - You are about to drop the column `estado_anuncio` on the `Anuncio` table. All the data in the column will be lost.
  - You are about to drop the column `tipo_usuario` on the `Usuario` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('turista', 'administrador');

-- AlterTable
ALTER TABLE "Anuncio" DROP COLUMN "estado_anuncio",
ADD COLUMN     "importancia" VARCHAR(20) NOT NULL DEFAULT 'baja';

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "tipo_usuario",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'turista';
