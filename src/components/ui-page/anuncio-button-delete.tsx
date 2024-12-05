import { revalidatePath } from "next/cache";
import { Button } from "../ui/button";
import db from "@/lib/db";


export function AnuncioButtonDelete({anuncioId}: {anuncioId: number}) {

    async function RemoveAnuncio(formData: FormData){
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


    return (

    <form action={RemoveAnuncio}>
        <input type="hidden" name="id_anuncio" value={anuncioId} />
    <Button variant="destructive">
        borrar
    </Button>


    </form>

    )
}