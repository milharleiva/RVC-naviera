import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sugerencias } from "@prisma/client";
import { Mail } from "lucide-react";
import { CrearSugerencia } from "./create-sugerencia";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function SugerenciaForm({ sugerencias }: { sugerencias?: Sugerencias }) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus] =
    useState<"idle" | "success" | "error" | "loading">("idle");

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormState({ name: "", email: "", message: "" });
  };



  console.log(sugerencias);
 
  return (
    <Card className="bg-white shadow-lg mb-6">
      <CardHeader className="bg-blue-500 text-white">
        <CardTitle className="flex items-center">
          <Mail className="mr-2" />
          Envíanos un mensaje
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <form action={CrearSugerencia}  className="space-y-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <Input
              type="text"
              id="nombre"
              name="name" // Cambié el name para que coincida con el estado
              placeholder="Tu nombre"
              required
              onChange={handleChange}
              value={formState.name}
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
              onChange={handleChange}
              value={formState.email}
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
              name="message" // Cambié el name para que coincida con el estado
              rows={4}
              placeholder="¿En qué podemos ayudarte?"
              required
              onChange={handleChange}
              value={formState.message}
              className="w-full bg-gray-100"
              defaultValue={sugerencias?.mensaje || ""}
            />
          </div>
          <div className="flex justify-between">
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
              disabled={submitStatus === "loading"}
            >
              {submitStatus === "loading" ? "Enviando..." : "Enviar mensaje"}
            </Button>
            <Button
              type="button"
              onClick={clearForm}
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            >
              Limpiar
            </Button>
          </div>
        </form>
        {submitStatus === "success" && (
          <div className="mt-4 bg-green-500 text-white px-4 py-3 rounded" role="alert">
            <strong className="font-bold">¡Gracias por tu mensaje!</strong>
            <span className="block sm:inline"> Te contactaremos pronto.</span>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="mt-4 bg-red-500 text-white px-4 py-3 rounded" role="alert">
            <strong className="font-bold">Hubo un error.</strong>
            <span className="block sm:inline"> Revisa los campos e inténtalo de nuevo.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
