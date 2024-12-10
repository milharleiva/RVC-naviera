'use server'
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function CrearSugerencia(formData: FormData){
    
    const nombre = formData.get("nombre")?.toString()
    const email = formData.get("email")?.toString()
    const mensaje = formData.get("mensaje")?.toString() 

    if (!nombre || !email || !mensaje) {
        return
    }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const nuevaSugerencia= await db.sugerencias.create({
      data: {
        nombre: nombre,
        email: email,
        mensaje: mensaje,
      }
    })
    

    revalidatePath('/contacto')
    redirect('/contacto')
    
}


