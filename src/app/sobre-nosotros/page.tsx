
import { Anchor, Ship, Users, BarChart3 } from 'lucide-react'

export default function sobrenosotros() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center  mb-12">Sobre Nosotros</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sección principal */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Historia</h2>
          <p className="text-gray-600">
            Fundada en 1980, nuestra empresa naviera ha sido líder en el transporte marítimo durante más de cuatro décadas. 
            Hemos crecido desde una pequeña flota local hasta convertirnos en un actor global en la industria naviera, 
            siempre manteniendo nuestro compromiso con la calidad y la innovación.
          </p>
        </div>

        {/* Estadísticas */}
        <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6 flex flex-col justify-center items-center transition-all hover:bg-blue-600">
          <Ship className="w-12 h-12 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nuestra Flota</h3>
          <p className="text-4xl font-bold">50+</p>
          <p>Barcos en operación</p>
        </div>

        {/* Imagen */}
        <div className="md:col-span-2 rounded-xl shadow-lg overflow-hidden">
          <Ship/>
        </div>

        {/* Misión */}
        <div className="bg-green-500 text-white rounded-xl shadow-lg p-6 transition-all hover:bg-green-600">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p>
            Proporcionar soluciones de transporte marítimo eficientes y sostenibles, 
            conectando negocios y personas en todo el mundo.
          </p>
        </div>

        {/* Equipo */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center transition-all hover:shadow-xl">
          <Users className="w-12 h-12 mr-4 text-blue-500" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Nuestro Equipo</h3>
            <p className="text-gray-600">Más de 1000 profesionales dedicados en tierra y mar.</p>
          </div>
        </div>

        {/* Destinos */}
        <div className="bg-yellow-500 text-white rounded-xl shadow-lg p-6 transition-all hover:bg-yellow-600">
          <h2 className="text-2xl font-semibold mb-4">Destinos Globales</h2>
          <ul className="list-disc list-inside">
            <li>América del Norte</li>
            <li>Europa</li>
            <li>Asia</li>
            <li>África</li>
            <li>Oceanía</li>
          </ul>
        </div>

        {/* Gráfico */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Nuestro Crecimiento</h2>
          <BarChart3 className="w-full h-48 text-blue-500" />
          <p className="text-center text-gray-600 mt-4">Crecimiento anual de nuestra flota y operaciones</p>
        </div>

        {/* Valores */}
        <div className="bg-purple-500 text-white rounded-xl shadow-lg p-6 transition-all hover:bg-purple-600">
          <h2 className="text-2xl font-semibold mb-4">Nuestros Valores</h2>
          <ul className="list-disc list-inside">
            <li>Seguridad</li>
            <li>Confiabilidad</li>
            <li>Innovación</li>
            <li>Sostenibilidad</li>
          </ul>
        </div>

        {/* Certificaciones */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex items-center transition-all hover:shadow-xl">
          <Anchor className="w-12 h-12 mr-4 text-blue-500" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Certificaciones</h3>
            <p className="text-gray-600">ISO 9001, ISO 14001, OHSAS 18001</p>
          </div>
        </div>
      </div>
    </div>
  )
}