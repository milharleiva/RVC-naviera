'use server'
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function CrearAnuncio(formData: FormData){
    
    const titulo = formData.get("titulo")?.toString()
    const descripcion = formData.get("descripcion")?.toString()
    const importancia = formData.get("importancia")?.toString() 

    if (!titulo || !descripcion || !importancia) {
      return
    }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const nuevoAnuncio = await db.anuncio.create({
      data: {
        titulo: titulo,
        descripcion: descripcion,
        importancia: importancia,
      }
    })
    
    
    revalidatePath('/dashboard/anuncios','layout')
    redirect('/dashboard/anuncios')
    
}


