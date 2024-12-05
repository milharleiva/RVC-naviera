'use server'
import db from '@/lib/db';
import {redirect} from 'next/navigation'

export async function CrearAnuncio(formData: FormData){
    
    const titulo = formData.get("titulo")?.toString()
    const descripcion = formData.get("descripcion")?.toString()
    const importancia = formData.get("importancia")?.toString() 

    if (!titulo || !descripcion || !importancia) {
      return
    }

   const nuevoAnuncio = await db.anuncio.create({
      data: {
        titulo: titulo,
        descripcion: descripcion,
        importancia: importancia,

      }
    })
    console.log(nuevoAnuncio)
    redirect('/dashboard/anuncios')
  }