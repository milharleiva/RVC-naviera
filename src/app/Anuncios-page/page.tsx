import { AnuncioCard2 } from "@/components/ui-page/anuncio-card2"
import db from "@/lib/db"

export default async function Anuncios() {
  const anuncios = await db.anuncio.findMany()

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-800 tracking-tight">
          Anuncios
          <span className="block mt-1 text-lg font-normal text-indigo-600">
            Mantente informado con las últimas novedades
          </span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {anuncios.map(anuncio => (
            <div key={anuncio.id_anuncio} className="transform transition duration-300 hover:scale-105">
              <AnuncioCard2 anuncio={anuncio} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

