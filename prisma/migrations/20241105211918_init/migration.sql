-- CreateTable
CREATE TABLE "Boleto" (
    "id_boleto" SERIAL NOT NULL,
    "id_usuario" INTEGER,
    "id_horario" INTEGER,
    "precio" DECIMAL(10,2) NOT NULL,
    "fecha_compra" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Boleto_pkey" PRIMARY KEY ("id_boleto")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id_horario" SERIAL NOT NULL,
    "id_ruta" INTEGER,
    "hora_salida" TIMESTAMP(3) NOT NULL,
    "hora_llegada" TIMESTAMP(3) NOT NULL,
    "estado_horario" VARCHAR(20) NOT NULL DEFAULT 'en curso',

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id_horario")
);

-- CreateTable
CREATE TABLE "Reporte" (
    "id_reporte" SERIAL NOT NULL,
    "id_usuario" INTEGER,
    "id_horario" INTEGER,
    "descripcion" VARCHAR(255) NOT NULL,
    "fecha_reporte" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reporte_pkey" PRIMARY KEY ("id_reporte")
);

-- CreateTable
CREATE TABLE "Ruta" (
    "id_ruta" SERIAL NOT NULL,
    "origen" VARCHAR(100) NOT NULL,
    "destino" VARCHAR(100) NOT NULL,
    "distancia_km" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "Ruta_pkey" PRIMARY KEY ("id_ruta")
);

-- CreateTable
CREATE TABLE "Transaccion" (
    "id_transaccion" SERIAL NOT NULL,
    "id_boleto" INTEGER,
    "monto" DECIMAL(10,2) NOT NULL,
    "estado_transaccion" VARCHAR(20) NOT NULL DEFAULT 'exitosa',
    "fecha_transaccion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaccion_pkey" PRIMARY KEY ("id_transaccion")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "contrasena" VARCHAR(255) NOT NULL,
    "tipo_usuario" VARCHAR(20) NOT NULL DEFAULT 'turista',
    "telefono" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Boleto" ADD CONSTRAINT "Boleto_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Boleto" ADD CONSTRAINT "Boleto_id_horario_fkey" FOREIGN KEY ("id_horario") REFERENCES "Horario"("id_horario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_id_ruta_fkey" FOREIGN KEY ("id_ruta") REFERENCES "Ruta"("id_ruta") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reporte" ADD CONSTRAINT "Reporte_id_horario_fkey" FOREIGN KEY ("id_horario") REFERENCES "Horario"("id_horario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_id_boleto_fkey" FOREIGN KEY ("id_boleto") REFERENCES "Boleto"("id_boleto") ON DELETE SET NULL ON UPDATE CASCADE;
