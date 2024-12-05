
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import db from "@/lib/db"


export  default async function Anuncios() {

    const anuncios = await db.anuncio.findMany()

    console.log(anuncios)


  return (
    <div>
      {anuncios.map(anuncio => (
        <Card key={anuncio.id_anuncio}>
            <CardHeader>
                {anuncio.titulo}
            </CardHeader>
            <CardContent>
                <p>
                    {anuncio.descripcion}
                </p>
                <span>
                    {new Date(anuncio.createdAt).toLocaleDateString()}
                </span>
            </CardContent>
            <CardFooter>
                <Button variant="destructive">Borrar</Button>
                <Button>Eliminar</Button>
            </CardFooter>
        </Card>


      ))}
    
    </div>
  )
}