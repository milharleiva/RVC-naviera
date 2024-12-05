import { AnuncioCard } from "@/components/ui-page/anuncio-card"
import db from "@/lib/db"


export  default async function Anuncios() {

    const anuncios = await db.anuncio.findMany()



  return (
    <div className=" grid  grid-cols-3 gap-4 pt-5 ">


      {anuncios.map(anuncio => (
        <AnuncioCard   anuncio={anuncio} key={anuncio.id_anuncio} />

      ))}
    
    </div>
  )
}