'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Ship, Anchor, MapPin, DollarSign } from 'lucide-react'

const regiones = ['Norte', 'Sur', 'Este', 'Oeste']
const lugares = {
  'Norte': ['Puerto A', 'Puerto B', 'Puerto C'],
  'Sur': ['Puerto D', 'Puerto E', 'Puerto F'],
  'Este': ['Puerto G', 'Puerto H', 'Puerto I'],
  'Oeste': ['Puerto J', 'Puerto K', 'Puerto L']
}

export default function RutasYTarifas() {
  const [regionSeleccionada, setRegionSeleccionada] = useState(regiones[0])
  const [lugarSeleccionado, setLugarSeleccionado] = useState(lugares[regiones[0]][0])

  const horarios = [
    { dia: 'Lunes', salidas: ['08:00', '12:00', '16:00'] },
    { dia: 'Martes', salidas: ['08:00', '12:00', '16:00'] },
    { dia: 'Miércoles', salidas: ['08:00', '12:00', '16:00'] },
    { dia: 'Jueves', salidas: ['08:00', '12:00', '16:00'] },
    { dia: 'Viernes', salidas: ['08:00', '12:00', '16:00'] },
    { dia: 'Sábado', salidas: ['10:00', '14:00'] },
    { dia: 'Domingo', salidas: ['10:00', '14:00'] },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Rutas y Tarifas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Selector de Región y Lugar */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" />
              Selecciona tu Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Select onValueChange={setRegionSeleccionada} defaultValue={regionSeleccionada}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una región" />
              </SelectTrigger>
              <SelectContent>
                {regiones.map((region) => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setLugarSeleccionado} defaultValue={lugarSeleccionado}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un lugar" />
              </SelectTrigger>
              <SelectContent>
                {lugares[regionSeleccionada].map((lugar) => (
                  <SelectItem key={lugar} value={lugar}>{lugar}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Tarifas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2" />
              Tarifas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Adulto: $50</li>
              <li>Niño (3-12): $25</li>
              <li>Adulto Mayor: $40</li>
              <li>Estudiante: $35</li>
            </ul>
          </CardContent>
        </Card>

        {/* Horarios */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ship className="mr-2" />
              Horarios para {lugarSeleccionado}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Día</TableHead>
                  <TableHead>Horarios de Salida</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {horarios.map((horario) => (
                  <TableRow key={horario.dia}>
                    <TableCell className="font-medium">{horario.dia}</TableCell>
                    <TableCell>{horario.salidas.join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Información Adicional */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Anchor className="mr-2" />
              Información Adicional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Todos los barcos cuentan con servicios a bordo, incluyendo cafetería y área de descanso. Se recomienda llegar al puerto 30 minutos antes de la hora de salida programada.</p>
          </CardContent>
        </Card>

        {/* Contacto */}
        <Card>
          <CardHeader>
            <CardTitle>Contacto</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Para más información o reservas, contáctenos:</p>
            <p className="mt-2">Teléfono: +34 123 456 789</p>
            <p>Email: info@rvc-maritimo.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}