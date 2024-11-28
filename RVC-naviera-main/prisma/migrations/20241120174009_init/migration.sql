-- CreateTable
CREATE TABLE "Anuncio" (
    "id_anuncio" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "estado_anuncio" VARCHAR(20) NOT NULL DEFAULT 'activo',

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id_anuncio")
);
