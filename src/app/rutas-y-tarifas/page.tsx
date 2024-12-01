/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, DollarSign } from 'lucide-react'

const contenedores = [1, 2, 3, 4, 5];

// Datos de los horarios para la ruta Futrono
const horariosFutrono: { [key: string]: string[] } = {
  lunes: ["10:30 am", "18:00 pm"],
  martes: ["10:30 am", "18:00 pm"],
  miercoles: ["10:30 am", "18:00 pm"],
  viernes: ["10:30 am", "18:00 pm"],
  sabado: ["09:30 am", "12:30 pm", "18:00 pm", "20:30 pm"],
  domingo: ["09:30 am", "12:30 pm", "18:00 pm", "20:30 pm"],
};

const titulos = [
  "Ruta Niebla - Corral",
  "Ruta Niebla - Isla del Rey",
  "Ruta Trumao – Puerto La Barra",
  "Ruta Futrono – Isla Huapi",
  "Rutas de Barcaza 5",
];

export default function RutasYTarifas() {
  const [proximaSalida, setProximaSalida] = useState<string | null>(null);
  const [salidaFutrono, setSalidaFutrono] = useState<string | null>(null);

  const calcularProximaSalida = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'];
    
    let nextDeparture = null;
    for (const salida of horarios) {
      const [hour, minute] = salida.split(':').map(Number);
      if (hour > currentHour || (hour === currentHour && minute > currentMinutes)) {
        nextDeparture = `${hour}:${minute < 10 ? '0' : ''}${minute}`;
        break;
      }
    }

    if (!nextDeparture) {
      nextDeparture = horarios[0];
    }

    setProximaSalida(nextDeparture);
  };

  // Función para calcular la próxima salida de Futrono
  const calcularSalidaFutrono = () => {
    const now = new Date();
    const currentDay = now.toLocaleString('default', { weekday: 'long' }).toLowerCase() as keyof typeof horariosFutrono;
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const horariosDelDia = horariosFutrono[currentDay] || [];

    let nextDeparture = null;
    for (const salida of horariosDelDia) {
      const [time, period] = salida.split(' '); // separa la hora y el "am"/"pm"
      const [hour, minute] = time.split(':').map(Number);

      // Convierte de 12 horas a 24 horas para comparar con la hora actual
      let hourIn24 = hour;
      if (period === 'pm' && hour !== 12) {
        hourIn24 += 12;
      } else if (period === 'am' && hour === 12) {
        hourIn24 = 0; // Medianoche es 00:00
      }

      if (hourIn24 > currentHour || (hourIn24 === currentHour && minute > currentMinutes)) {
        nextDeparture = `${hour}:${minute < 10 ? '0' : ''}${minute} ${period}`;
        break;
      }
    }

    if (!nextDeparture) {
      nextDeparture = horariosDelDia[0];
    }

    setSalidaFutrono(nextDeparture);
  };

  useEffect(() => {
    calcularProximaSalida();
    calcularSalidaFutrono();
    const interval = setInterval(() => {
      calcularProximaSalida();
      calcularSalidaFutrono();
    }, 60000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4">
      {/* Encabezado principal */}
      <h1 className="text-4xl font-bold text-center my-8 text-blue-700">
        Rutas y Tarifas de Barcazas
      </h1>

      {/* Contenedores para otras rutas */}
      <div className="space-y-8 w-full max-w-5xl">
        {contenedores.slice(0, 3).map((contenedor, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mb-8" // Se añadió 'mb-8' para separación
          >
            {/* Contenido a la derecha */}
            <div className="w-full md:w-1/2 p-6">
              {/* Título dinámico */}
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {titulos[index]}
              </h2>

              {/* Próxima Barcaza */}
              <Card className="shadow-sm mb-4">
                <CardHeader className="bg-indigo-500 text-white py-2">
                  <CardTitle className="flex items-center text-sm font-semibold">
                    <Ship className="mr-2" />
                    Próxima Barcaza
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 text-center">
                  <p className="text-gray-500 text-sm mb-1">La próxima salida es:</p>
                  <p className="text-lg font-bold text-indigo-600">
                    {proximaSalida ? `${proximaSalida} hrs` : 'Cargando...'}
                  </p>
                </CardContent>
              </Card>

              {/* Precios */}
              <Card className="shadow-sm">
                <CardHeader className="bg-green-500 text-white py-2">
                  <CardTitle className="flex items-center text-sm font-semibold">
                    <DollarSign className="mr-2" />
                    Precios
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Adulto</span>
                      <span className="font-semibold text-gray-700">$500</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Adulto Mayor</span>
                      <span className="font-semibold text-gray-700">$250</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Discapacitado</span>
                      <span className="font-semibold text-gray-700">$250</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Estudiantes</span>
                      <span className="font-semibold text-gray-700">Gratis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Imagen a la izquierda */}
            <div className="w-full md:w-1/2">
              <img
                src={`https://via.placeholder.com/400x300?text=Imagen+${contenedor}`}
                alt={`Imagen ${contenedor}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Sección para la ruta Futrono */}
      <div className="space-y-8 w-full max-w-5xl mb-8"> {/* Agregamos 'mb-8' aquí también para más separación */}
      <div className='espacio'>
              <p></p>
            </div>
        <div
          className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
        >
          
          {/* Contenido a la derecha */}
          <div className="w-full md:w-1/2 p-6">
            {/* Título específico de Futrono */}
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Ruta Futrono – Isla Huapi
            </h2>

            
            

            {/* Próxima salida Futrono */}
            <Card className="shadow-sm mb-8  ">
              <CardHeader className="bg-indigo-500 text-white py-2">
                <CardTitle className="flex items-center text-sm font-semibold">
                  <Ship className="mr-2" />
                  Próxima Salida Futrono – Isla Huapi
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 text-center">
                <p className="text-gray-500 text-sm mb-1">La próxima salida es:</p>
                <p className="text-lg font-bold text-indigo-600">
                  {salidaFutrono ? `${salidaFutrono} hrs` : 'Cargando...'}
                </p>
              </CardContent>
            </Card>

            {/* Precios */}
            <Card className="shadow-sm">
              <CardHeader className="bg-green-500 text-white py-2">
                <CardTitle className="flex items-center text-sm font-semibold">
                  <DollarSign className="mr-2" />
                  Precios
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <ul className="space-y-1 text-sm">
                  <li className="flex justify-between">
                    <span>Adulto</span>
                    <span className="font-semibold text-gray-700">$500</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Adulto Mayor</span>
                    <span className="font-semibold text-gray-700">$250</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Discapacitado</span>
                    <span className="font-semibold text-gray-700">$250</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Estudiantes</span>
                    <span className="font-semibold text-gray-700">Gratis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Imagen a la izquierda */}
          <div className="w-full md:w-1/2">
            <img
              src={`https://via.placeholder.com/400x300?text=Imagen+Futrono`}
              alt="Ruta Futrono"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
