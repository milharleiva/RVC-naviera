
import { Badge } from "@/components/ui/badge"
import { Card, CardContent,CardHeader, CardTitle } from "@/components/ui/card"
import { Anuncio } from "@prisma/client"
import { CalendarIcon} from 'lucide-react'
import clsx from "clsx"



export function AnuncioCard2({ anuncio }: { anuncio: Anuncio }) {

  





  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between">
        <CardTitle className="text-lg sm:text-xl">{anuncio.titulo}</CardTitle>
        <Badge
          className={clsx("text-xs sm:text-sm", {
            "bg-red-500 hover:bg-red-600": anuncio.importancia === "urgente",
            "bg-yellow-500 hover:bg-yellow-600": anuncio.importancia === "alta",
            "bg-blue-500 hover:bg-blue-600": anuncio.importancia === "media",
            "bg-green-500 hover:bg-green-600": anuncio.importancia === "baja",
          })}
        >
          {anuncio.importancia}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm sm:text-base mb-4">{anuncio.descripcion}</p>
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="w-4 h-4 mr-1" />
          <span>{new Date(anuncio.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
   

  </Card>
  )
}

