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

export function AnuncioForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>crear anuncio</CardTitle>
        <CardDescription>desplega un anuncio hacia la pagina principal.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="titulo">titulo del anuncio</Label>
              <Input id="titulo" placeholder="titulo del anuncio" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="descripcion">descripcion</Label>
              <Input id="descripcion" placeholder="descripcion" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="importancia">importancia</Label>
              <Select>
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
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>enviar anuncio</Button>
      </CardFooter>
    </Card>
  )
}
