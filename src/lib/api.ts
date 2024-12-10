import { PrismaClient } from '@prisma/client';
import { MercadoPagoConfig, Preference } from 'mercadopago'; // Ajusta según tu configuración

// Lista de tipos de tickets y precios
const ticketTypes = [
  { name: 'Adulto', price: 500 },
  { name: 'Adulto Mayor', price: 250 },
  { name: 'Discapacitado', price: 250 },
  { name: 'Estudiantes', price: 0 },
];

const prisma = new PrismaClient();
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });

const api = {
  message: {
    async submit(
      tickets: { [key: string]: number },
      total: number,
      userId: number // ID del usuario que realiza la compra
    ): Promise<string> {
      try {
        // Construir los ítems según los tickets
        const items = Object.entries(tickets).map(([name, quantity], index) => {
          const ticketType = ticketTypes.find((ticket) => ticket.name === name);
          if (!ticketType) {
            throw new Error(`Tipo de ticket no reconocido: ${name}`);
          }
          return {
            id: `${index + 1}`, // Generar un identificador único basado en el índice
            title: `Ticket ${name}`,
            quantity,
            unit_price: ticketType.price,
            currency_id: "CLP", // Reemplazar según la moneda deseada
          };
        });

        // Inicializar Preference y crear la preferencia
        const preference = new Preference(client);
        const response = await preference.create({
          body: {
            items,
            payer: {
              email: "comprador@email.com", // Reemplazar con correo dinámico si es necesario
            },
            back_urls: {
              success: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
              failure: `${process.env.NEXT_PUBLIC_BASE_URL}/failure`,
              pending: `${process.env.NEXT_PUBLIC_BASE_URL}/pending`,
            },
            auto_return: "approved",
            metadata: {
              tickets: JSON.stringify(tickets),
            },
          },
        });

        // Acceder directamente a las propiedades de `response`
        const { id, init_point } = response;

        if (!id || !init_point) {
          throw new Error('Error inesperado al crear la preferencia');
        }

        // Crear la orden de pago en la base de datos
        const ordenPago = await prisma.ordenPago.create({
          data: {
            id_usuario: userId,
            monto_total: total,
            estado: 'pendiente',
            id_pago_mp: id,
            url_pago: init_point,
          },
        });

        // Crear boletos asociados a la orden
        const boletos = Object.entries(tickets).flatMap(([name, quantity]) => {
          const ticketType = ticketTypes.find((ticket) => ticket.name === name);
          if (!ticketType) return [];
          return Array.from({ length: quantity }, () => ({
            id_usuario: userId,
            id_orden_pago: ordenPago.id,
            precio: ticketType.price,
            fecha_compra: new Date(),
          }));
        });

        await prisma.boleto.createMany({ data: boletos });

        return init_point; // Retorna la URL de pago
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error al crear la preferencia:', error.message);
        } else {
          console.error('Error desconocido al crear la preferencia:', error);
        }
        console.log('tickets:', tickets);
        throw new Error('Error al crear la preferencia de pago');
      }
    },
  },
};

export default api;
