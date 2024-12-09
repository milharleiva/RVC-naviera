import { Payment } from "mercadopago";
import { mercadopago } from "@/lib/mercadopagolib";
import api from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  try {
    const body: { data: { id: string } } = await request.json();

    // Obtener el pago desde Mercado Pago
    const payment = await new Payment(mercadopago).get({ id: parseInt(body.data.id) }); // Asegúrate de convertir a `number`

    // Validar que el pago fue aprobado
    if (payment.status === "approved") {
      // Agregar el mensaje (procesar la orden en tu base de datos)
      await api.message.submit(
        JSON.parse(payment.metadata.tickets as string), // Si `tickets` es un JSON, asegúrate de que esté en el formato correcto
        payment.transaction_amount ?? 0, // Assuming `total` is the transaction amount
        payment.payer && payment.payer.id ? parseInt(payment.payer.id.toString()) : 0 // Convertir `payer.id` a número si `submit` espera un número
      );

      // Revalidar la página
      revalidatePath("/");
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error en webhook:", error);
    return new Response(null, { status: 500 });
  }
}
