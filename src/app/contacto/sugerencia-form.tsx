import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sugerencias } from "@prisma/client";
import { Mail } from "lucide-react";
import { CrearSugerencia } from "./create-sugerencia";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function SugerenciaForm({ sugerencias }: { sugerencias?: Sugerencias }) {

    const functioAction = CrearSugerencia


  return (
    <form action={functioAction} className="space-y-4">
    <input type="hidden" name="id_sugerencia" value={sugerencias?.id_sugerencia} />
    <Card className="bg-white shadow-lg mb-6">
      <CardHeader className="bg-blue-500 text-white">
        <CardTitle className="flex items-center">
          <Mail className="mr-2" />
          Envíanos un mensaje
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
       
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <Input
              type="text"
              id="nombre"
              name="nombre" // Cambié el name para que coincida con el estado
              placeholder="Tu nombre"
              required
              className="w-full bg-gray-100"
              defaultValue={sugerencias?.nombre || ""}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="tu@email.com"
              required

              className="w-full bg-gray-100"
              defaultValue={sugerencias?.email || ""}
            />
          </div>
          <div>
            <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
              Mensaje
            </label>
            <Textarea
              id="mensaje"
              name="mensaje" // Cambié el name para que coincida con el estado
              rows={4}
              placeholder="¿En qué podemos ayudarte?"
              required

              className="w-full bg-gray-100"
              defaultValue={sugerencias?.mensaje || ""}
            />
          </div>
          <div className="flex justify-between">
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            
            >
             enviar
            </Button>
            <Button
              type="button"
              
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Limpiar
            </Button>
          </div>
        
       
      </CardContent>
    </Card>
    </form>
  );
}
