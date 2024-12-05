'use server'

import { revalidatePath } from "next/cache";
import db from "@/lib/db";

export async function RemoveAnuncio(formData: FormData){
    'use server'
   const anuncioId = formData.get("id_anuncio")?.toString()

   if (!anuncioId) {
    return;
    }
   
   await db.anuncio.delete({
    where: {
        id_anuncio: parseInt(anuncioId)
    }
   })

   revalidatePath('/dashboard/anuncios')
}