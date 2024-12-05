import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import db from '@/lib/db';
import {redirect} from 'next/navigation'



export function AnuncioForm() {

  async function CrearAnuncio(formData: FormData){
    "use server"
    const titulo = formData.get("titulo")?.toString()
    const descripcion = formData.get("descripcion")?.toString()
    const importancia = formData.get("importancia")?.toString() 

    if (!titulo || !descripcion || !importancia) {
      return
    }

   const nuevoAnuncio = await db.anuncio.create({
      data: {
        titulo: titulo,
        descripcion: descripcion,
        importancia: importancia,

      }
    })
    console.log(nuevoAnuncio)
    redirect('/dashboard/anuncios')
  }

  return (
  <form action={CrearAnuncio}>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>crear anuncio</CardTitle>
        <CardDescription>desplega un anuncio hacia la pagina principal.</CardDescription>
      </CardHeader>
      <CardContent>
       
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="titulo">titulo del anuncio</Label>
              <Input name="titulo" id="titulo" placeholder="titulo del anuncio" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="descripcion">descripcion</Label>
              <Textarea name="descripcion" id="descripcion" placeholder="descripcion" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="importancia">importancia</Label>
              <Select name="importancia">
                <SelectTrigger id="importancia">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="baja">baja</SelectItem>
                  <SelectItem value="media">media</SelectItem>
                  <SelectItem value="alta">alta</SelectItem>
                  <SelectItem value="urgente">urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="submit">enviar anuncio</Button>
      </CardFooter>
    </Card>
  </form>
  )
}
