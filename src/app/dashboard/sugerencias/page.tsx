import { SugerenciaCard } from "@/components/ui-page/sugerencia-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/lib/db"

export default async function CajaSugerencias() {
  const sugerencias = await db.sugerencias.findMany()

  return (
    <div className="container mx-auto py-8">
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
          <CardTitle className="text-2xl font-bold">Caja De Opiniones y Sugerencias</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sugerencias.map((sugerencia) => (
              <SugerenciaCard 
                sugerencias={sugerencia} 
                key={sugerencia.id_sugerencia} 
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

