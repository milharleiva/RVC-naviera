'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, MapPin } from 'lucide-react'

const regiones = ['Norte', 'Sur', 'Este', 'Oeste'] as const;
const lugares = {
  Norte: ['Puerto A', 'Puerto B', 'Puerto C'],
  Sur: ['Puerto D', 'Puerto E', 'Puerto F'],
  Este: ['Puerto G', 'Puerto H', 'Puerto I'],
  Oeste: ['Puerto J', 'Puerto K', 'Puerto L']
};

const horarios = [
  { dia: 'Lunes', salidas: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'] },
  { dia: 'Martes', salidas: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'] },
  { dia: 'Miércoles', salidas: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'] },
  { dia: 'Jueves', salidas: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'] },
  { dia: 'Viernes', salidas: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'] },
  { dia: 'Sábado', salidas: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'] },
  { dia: 'Domingo', salidas: ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'] },
];

export default function RutasYTarifas() {
  const [regionSeleccionada, setRegionSeleccionada] = useState<typeof regiones[number]>(regiones[0])
  const [lugarSeleccionado, setLugarSeleccionado] = useState(lugares[regiones[0]][0])
  const [proximaSalida, setProximaSalida] = useState<string | null>(null)

  // Función para calcular la siguiente salida de la barcaza
  const calcularProximaSalida = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    let nextDeparture = null;

    // Buscar la próxima salida de la barcaza
    for (const dia of horarios) {
      for (const salida of dia.salidas) {
        const [hour, minute] = salida.split(':').map(Number);
        if (hour > currentHour || (hour === currentHour && minute > currentMinutes)) {
          nextDeparture = `${hour}:${minute < 10 ? '0' : ''}${minute}`;
          break;
        }
      }
      if (nextDeparture) break;
    }

    // Si no hay más salidas hoy, obtener la primera salida de la próxima semana
    if (!nextDeparture) {
      const nextDay = horarios[0].salidas[0];
      nextDeparture = nextDay;
    }

    setProximaSalida(nextDeparture);
  };

  useEffect(() => {
    calcularProximaSalida();
    const interval = setInterval(() => {
      calcularProximaSalida();
    }, 60000); // Actualizar cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center my-6 text-blue-800">Rutas y Tarifas</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
        {/* Selector de Región y Lugar */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-blue-500 text-white">
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" />
              Selecciona tu Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4 mt-4">
            <Select onValueChange={(value: typeof regiones[number]) => setRegionSeleccionada(value)} defaultValue={regionSeleccionada}>
              <SelectTrigger className="w-full bg-gray-100">
                <SelectValue placeholder="Selecciona una región" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {regiones.map((region) => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setLugarSeleccionado} defaultValue={lugarSeleccionado}>
              <SelectTrigger className="w-full bg-gray-100">
                <SelectValue placeholder="Selecciona un lugar" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {lugares[regionSeleccionada].map((lugar) => (
                  <SelectItem key={lugar} value={lugar}>{lugar}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Horarios */}
        <Card className="md:col-span-2 bg-white shadow-lg">
          <CardHeader className="bg-indigo-500 text-white">
            <CardTitle className="flex items-center">
              <Ship className="mr-2" />
              Siguiente Salida
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="text-center mb-6">
              <p className="text-gray-500">La próxima salida de la barcaza es:</p>
              <p className="text-xl font-bold mt-4">
                <span className="text-3xl">A las {proximaSalida} hrs</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Precios */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-green-500 text-white">
            <CardTitle className="text-center">Precios</CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <ul className="space-y-4">
              <li className="text-lg font-medium flex justify-between">
                <span>Adulto</span>
                <span className="text-gray-600">$500</span>
              </li>
              <li className="text-lg font-medium flex justify-between">
                <span>Adulto Mayor</span>
                <span className="text-gray-600">$250</span>
              </li>
              <li className="text-lg font-medium flex justify-between">
                <span>Discapacitado</span>
                <span className="text-gray-600">$250</span>
              </li>
              <li className="text-lg font-medium flex justify-between">
                <span>Estudiantes</span>
                <span className="text-gray-600">Gratis</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
