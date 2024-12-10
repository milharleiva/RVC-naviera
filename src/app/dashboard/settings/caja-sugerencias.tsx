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
          {sugerencia.map((sug) => (
            <SugerenciaCard sugerencias={sug} key={sug.id_sugerencia} />
          ))}
        </CardContent>
        <CardContent>
          <div className="space-y-2">
            <div className="bg-gray-200 p-2 rounded">
              <span className="font-bold">Juilo Jalat:</span> Lorem Ipsum Dolorem
            </div>
            <div className="bg-gray-200 p-2 rounded">
              <span className="font-bold">Minerva Barnett:</span> Buen Servicio
            </div>
            <div className="bg-gray-200 p-2 rounded">
              <span className="font-bold">Peter Lewis:</span> Siento que Podrian Mejorar T...
            </div>
          </div>
        </CardContent>
      </Card>
        </div>
    )
}