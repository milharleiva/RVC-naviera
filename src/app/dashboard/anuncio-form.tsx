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


import functionAction from "./functionAction"
import { Anuncio } from "@prisma/client"




export function AnuncioForm({ anuncio }: { anuncio: Anuncio }) {

 


  return (
  <form onSubmit={(event) => functionAction(event, anuncio)}>
    <input type="hidden" name="id_anuncio" value={anuncio?.id_anuncio} />
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>crear anuncio</CardTitle>
        <CardDescription>desplega un anuncio hacia la pagina principal.</CardDescription>
      </CardHeader>
      <CardContent>
       
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="titulo">titulo del anuncio</Label>
              <Input name="titulo" id="titulo" placeholder="titulo del anuncio" defaultValue={anuncio?.titulo || ""}  />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="descripcion">descripcion</Label>
              <Textarea name="descripcion" id="descripcion" placeholder="descripcion" defaultValue={anuncio?.descripcion || ""} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="importancia">importancia</Label>
              <Select   name="importancia" defaultValue={anuncio?.importancia || ""}>
                <SelectTrigger id="importancia">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white" position="popper">
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
        <Button variant="default" type="submit">
          guardar o enviar
           </Button>
      </CardFooter>
    </Card>
  </form>
  )
}
