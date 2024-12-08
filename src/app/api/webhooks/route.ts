import { Payment } from 'mercadopago'
import { mercadopago } from '@/lib/mercadopagolib'
import api from '@/lib/api'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    const body: { data: { id: string } } = await request.json()

    // Obtener el pago
    const payment = await new Payment(mercadopago).get({ id: body.data.id })

    // Si el pago está aprobado
    if (payment.status === "approved") {
      // Agregar el mensaje (en nuestro caso, procesar la orden)
      await api.message.add(payment.id!.toString(), JSON.parse(payment.metadata.tickets as string))

      // Revalidar la página
      revalidatePath("/")
    }

    return new Response(null, { status: 200 })
  } catch (error) {
    console.error('Error en webhook:', error)
    return new Response(null, { status: 500 })
  }
}

