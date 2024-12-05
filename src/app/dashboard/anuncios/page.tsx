
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/lib/db"


export  default async function Anuncios() {

    const anuncios = await db.anuncio.findMany()

    console.log(anuncios)


  return (
    <div className=" grid  grid-cols-3 gap-4 pt-5 ">

        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 ">
            Anuncios
        </h1>

      {anuncios.map(anuncio => (
        <Card key={anuncio.id_anuncio}>

            <CardTitle>
            <CardHeader>
                {anuncio.titulo}
            </CardHeader>
            </CardTitle>
            <CardContent>
                <p>
                    {anuncio.descripcion}
                </p>
                <span>
                    {new Date(anuncio.createdAt).toLocaleDateString()}
                </span>
            </CardContent>
            <CardFooter className="flex  gap-x-2 justify-end">
                <Button variant="destructive">Borrar</Button>
                <Button>Eliminar</Button>
            </CardFooter>
        </Card>


      ))}
    
    </div>
  )
}