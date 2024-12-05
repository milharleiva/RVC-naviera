import { AnuncioButtonDelete } from "@/components/ui-page/anuncio-button-delete"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Anuncio } from "@prisma/client"


import Clsx from "clsx" 


export function AnuncioCard({anuncio}: {anuncio: Anuncio}){

    return(


    <Card>

            
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
                <Button variant="default" >editar</Button>
                <AnuncioButtonDelete anuncioId={anuncio.id_anuncio}/>
            </CardFooter>
        </Card>
    )

}