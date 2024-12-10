import { AnuncioCard2 } from "@/components/ui-page/anuncio-card2"
import db from "@/lib/db"

export default async function Anuncios() {
  const anuncios = await db.anuncio.findMany()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Anuncios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {anuncios.map(anuncio => (
          <AnuncioCard2 anuncio={anuncio} key={anuncio.id_anuncio} />
        ))}
      </div>
    </div>
  )
}

