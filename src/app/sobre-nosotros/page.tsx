import Image from 'next/image';

const barcazas = [
  {
    nombre: "Barcaza 1",
    sector: "Sector 1",
    pasajeros: 100,
    carga: "50 toneladas",
    imagen: "/extras/tehuelche.jpeg",
  },
  {
    nombre: "Barcaza 2",
    sector: "Sector 2",
    pasajeros: 150,
    carga: "70 toneladas",
    imagen: "/extras/cullamo.jpg",
  },
  // Agrega más barcazas si es necesario
];

const servicios = [
  {
    titulo: "Transporte de Carga",
    descripcion: "Ofrecemos servicios de transporte de carga a nivel nacional e internacional.",
    imagen: "/extras/cullamo.jpg",
  },
  {
    titulo: "Transporte de Pasajeros",
    descripcion: "Servicios de transporte de pasajeros con las mejores comodidades y seguridad.",
    imagen: "/extras/cullamo.jpg",
  },
  {
    titulo: "Alquiler de Barcazas",
    descripcion: "Alquiler de barcazas para diferentes necesidades y eventos.",
    imagen: "/extras/cullamo.jpg",
  },
  // Agrega más servicios si es necesario
];

export default function SobreNosotros() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Espacio reservado para el banner */}
      <div className="mb-12 h-64 bg-blue-900 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
        Banner Promocional (Reemplazar con contenido real)
      </div>

      {/* Título principal */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Sobre Nosotros
      </h1>

      {/* Sección: Historia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Nuestra Historia
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Fundada en 1980, nuestra empresa naviera ha sido líder en el
            transporte marítimo durante más de cuatro décadas. Hemos crecido
            desde una pequeña flota local hasta convertirnos en un actor global
            en la industria naviera, siempre manteniendo nuestro compromiso con
            la calidad y la innovación.
          </p>
        </div>
        <div className="rounded-xl shadow-lg overflow-hidden">
          <Image
            src={barcazas[0].imagen}
            alt={barcazas[0].nombre}
            width={500}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Sección: Misión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div className="rounded-xl shadow-lg overflow-hidden order-2 md:order-1">
          <Image
            src="/extras/cullamo.jpg"
            alt="Nuestra misión"
            width={500}
            height={300}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Nuestra Misión
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Proporcionar soluciones de transporte marítimo eficientes y
            sostenibles, conectando negocios y personas en todo el mundo.
          </p>
        </div>
      </div>

      {/* Sección: Barcazas */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
        Nuestras Barcazas
      </h2>
      {barcazas.map((barcaza, index) => (
        <div
          key={index}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 ${
            index % 2 === 0 ? "" : "md:flex-row-reverse"
          }`}
        >
          <div className="rounded-xl shadow-lg overflow-hidden">
            <Image
              src={barcaza.imagen}
              alt={barcaza.nombre}
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              {barcaza.nombre}
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Sector:</strong> {barcaza.sector}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Capacidad de pasajeros:</strong> {barcaza.pasajeros}
            </p>
            <p className="text-gray-600">
              <strong>Capacidad de carga:</strong> {barcaza.carga}
            </p>
          </div>
        </div>
      ))}

      {/* Sección: Servicios */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
        Servicios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {servicios.map((servicio, index) => (
          <div
            key={index}
            className="bg-blue-900 text-white rounded-xl shadow-lg overflow-hidden"
          >
            <Image
              src={servicio.imagen}
              alt={servicio.titulo}
              width={500}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">{servicio.titulo}</h3>
              <p className="text-sm leading-relaxed">{servicio.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
