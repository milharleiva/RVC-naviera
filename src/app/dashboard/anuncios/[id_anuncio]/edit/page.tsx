import { AnuncioForm } from "@/app/dashboard/anuncio-form";
import  db  from "@/lib/db";
import { redirect } from "next/navigation";

export default async function AnuncioPageEdit ({params}: {
    params: {
        id_anuncio: string
    }



}) {


   const anuncio = await db.anuncio.findFirst({
        where: {
            id_anuncio: parseInt(params.id_anuncio)
        }
    }) 

    if (!anuncio) {
        redirect("/dashboard/anuncios")
    }

    return (

        <div className="flex justify-center items-center h-screen">
            <AnuncioForm anuncio={anuncio} />
        </div>

    )

}