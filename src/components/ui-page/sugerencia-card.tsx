
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Sugerencias } from "@prisma/client"
import { CalendarIcon } from 'lucide-react'




export function SugerenciaCard({ sugerencias }: { sugerencias: Sugerencias }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-start sm:justify-between">
        <CardTitle className="text-lg sm:text-xl">{sugerencias.nombre}</CardTitle>
        
      </CardHeader>
      <CardContent>
        <p>{sugerencias.email}</p>
    </CardContent> 
      <CardContent className="flex-grow">
        <p className="text-sm sm:text-base mb-4">{sugerencias.mensaje}</p>
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="w-4 h-4 mr-1" />
          <span>{new Date(sugerencias.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-end">
      </CardFooter>
    </Card>
  )
}

