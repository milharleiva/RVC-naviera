import db from "@/lib/db"
import { AnuncioForm } from "../anuncio-form"

export  default async function Anuncios() {

    const anuncios = await db.anuncio.findMany()

    console.log(anuncios)


  return (
    <div>
      
    <AnuncioForm/>
    </div>
  )
}