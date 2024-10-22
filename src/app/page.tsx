import Link from 'next/link'
import { Ship, Phone, Clock, Star } from 'lucide-react'



export default function Home() {
  return (

    <div className="container-main mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Bienvenido a RVC Servicios Marítimos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 row-span-2 bg-blue-100 rounded-lg overflow-hidden">
         <Ship/>
        </div>

        {/* Sobre Nosotros */}
        <div className="bg-green-100 p-6 rounded-lg flex flex-col justify-center">
          <h2 className="text-gray-700 text-2xl font-semibold mb-2">Sobre Nosotros</h2>
          <p className="text-gray-700">RVC ofrece servicios marítimos de calidad con años de experiencia en el sector.</p>
          <Link href="/sobre-nosotros" className="mt-4 text-blue-600 hover:underline">Leer más</Link>
        </div>

        {/* Rutas Populares */}
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-semibold mb-2">Rutas Populares</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Puerto A - Puerto B</li>
            <li>Isla X - Continente Y</li>
            <li>Ruta Costera Z</li>
          </ul>
          <Link href="/rutas-y-tarifas" className="mt-4 inline-block text-blue-600 hover:underline">Ver todas las rutas</Link>
        </div>

        {/* Contacto Rápido */}
        <div className="bg-red-100 p-6 rounded-lg flex items-center">
          <Phone className="w-12 h-12 text-red-500 mr-4" />
          <div>
            <h2 className="text-gray-700 text-2xl font-semibold mb-2">Contacto Rápido</h2>
            <p className="text-gray-700">+34 123 456 789</p>
            <p className="text-gray-700">info@rvc-maritimo.com</p>
          </div>
        </div>

        {/* Horario de Atención */}
        <div className="bg-purple-100 p-6 rounded-lg flex items-center">
          <Clock className="w-12 h-12 text-purple-500 mr-4" />
          <div>
            <h2 className="text-gray-700 text-2xl font-semibold mb-2">Horario de Atención</h2>
            <p className="text-gray-700">Lun - Vie: 9:00 - 18:00</p>
            <p className="text-gray-700">Sáb: 10:00 - 14:00</p>
          </div>
        </div>

        {/* Reseñas de Clientes */}
        <div className="md:col-span-2 bg-indigo-100 p-6 rounded-lg">
          <h2 className="text-gray-700 text-2xl font-semibold mb-4">Lo que dicen nuestros clientes</h2>
          <div className="flex items-center mb-2">
            <Star className="w-5 h-5 text-yellow-500 mr-1" />
            <Star className="w-5 h-5 text-yellow-500 mr-1" />
            <Star className="w-5 h-5 text-yellow-500 mr-1" />
            <Star className="w-5 h-5 text-yellow-500 mr-1" />
            <Star className="w-5 h-5 text-yellow-500 mr-1" />
          </div>
          <p className='text-gray-700 italic'>Excelente servicio y puntualidad en todas nuestras entregas. ¡Altamente recomendado!</p>
          <p className="mt-2 text-gray-600">- María G., Cliente Corporativo</p>
        </div>
      </div>
    </div>
  )
}