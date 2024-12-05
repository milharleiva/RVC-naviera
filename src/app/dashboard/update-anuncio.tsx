'use server'
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


export async function UpdateAnuncio(formData: FormData){

    const id_anuncio = formData.get("id_anuncio")?.toString()
    const titulo = formData.get("titulo")?.toString()
    const descripcion = formData.get("descripcion")?.toString()
    const importancia = formData.get("importancia")?.toString()
  
    if (!id_anuncio || !titulo || !descripcion || !importancia) {
      return
    }
  
    await db.anuncio.update({
      where: {
        id_anuncio: parseInt(id_anuncio),
      },
      data : {
        titulo: titulo,
        descripcion: descripcion,
        importancia: importancia
      }
      });
      revalidatePath('/dashboard/anuncios')
      redirect('/dashboard/anuncios')
  }