'use server'
import { SugerenciaCard } from "@/components/ui-page/sugerencia-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db"



export  default async function CajaSugerencias() {

    const sugerencia = await db.sugerencias.findMany()

    return (
        <div>
             <Card>
        <CardHeader>
          <CardTitle>Caja De Opiniones y Sugerencia</CardTitle>

        </CardHeader>
        <CardContent>
          {sugerencia.map((sugerencias) => (
            <SugerenciaCard sugerencias={sugerencias} key={sugerencias.id_sugerencia} />
          ))}
        </CardContent>
        
          
      </Card>
        </div>
    )
}