import db from "@/lib/db"

export  default async function Anuncios() {

    const anuncios = await db.anuncio.findMany()

    console.log(anuncios)


  return (
    <div>
      <h1>anuncios</h1>
    </div>
  )
}