import { PrismaClient } from '@prisma/client'
import { Preference } from 'mercadopago'
import { mercadopago } from './mercadopagolib'

const prisma = new PrismaClient()

const api = {
  message: {
    async list() {
      return await prisma.ordenPago.findMany({
        where: { estado: 'aprobado' },
        include: { boletos: true }
      })
    },
    async submit(tickets: { [key: string]: number }, total: number): Promise<string> {
      try {
        const preference = await new Preference(mercadopago).create({
          body: {
            items: [
              {
                id: "tickets",
                unit_price: total,
                quantity: 1,
                title: "Compra de boletos",
              },
            ],
            metadata: {
              tickets: JSON.stringify(tickets),
            },
          },
        });

        if (!preference.id || !preference.init_point) {
          throw new Error('Respuesta inválida de Mercado Pago');
        }

        // Guardamos la orden en la base de datos
        await prisma.ordenPago.create({
          data: {
            id_usuario: 1,
            monto_total: total,
            estado: 'pendiente',
            id_pago_mp: preference.id,
            url_pago: preference.init_point,
          },
        });

        // Devolvemos el init point (url de pago) para que el usuario pueda pagar
        return preference.init_point;
      } catch (error) {
        console.error('Error creating preference:', error);
        throw new Error('Error al crear la preferencia de pago');
      }
    },
    async add(paymentId: string, tickets: { [key: string]: number }) {
      const existingOrder = await prisma.ordenPago.findUnique({
        where: { id_pago_mp: paymentId }
      })
      if (existingOrder) {
        throw new Error("Order already processed")
      }
      await prisma.ordenPago.update({
        where: { id_pago_mp: paymentId },
        data: {
          estado: 'aprobado',
          boletos: {
            create: Object.entries(tickets).map(([name, quantity]) => ({
              tipo: name,
              cantidad: quantity,
              precio: 0,
              fecha_compra: new Date(),
              id_usuario: 1
            }))
          }
        }
      })
    }
  }
}

export default api

