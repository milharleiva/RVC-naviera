
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import db from "@/lib/db"
import Clsx from "clsx"

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

            
            <CardHeader className=" flex flex-row justify-between">
                <CardTitle>
                {anuncio.titulo}
                </CardTitle>
                <Badge className={
                Clsx ({
                    'bg-red-500': anuncio.importancia === 'urgente',
                    'bg-yellow-500': anuncio.importancia === 'alta',
                    'bg-blue-500': anuncio.importancia === 'media',
                    'bg-green-500': anuncio.importancia === 'baja',
                
                })
                }
                >{anuncio.importancia}</Badge>
            </CardHeader>
            
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