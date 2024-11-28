import { Anchor, Ship, Users, BarChart3 } from "lucide-react";

export default function SobreNosotros() {
  const barcazas = [
    {
      nombre: "Barcaza Cullamó",
      sector: "Corral",
      pasajeros: 194,
      carga: "110m (metros lineales)",
      imagen: "/extras/cullamo.jpg",
    },
    {
      nombre: "Andalué",
      sector: "Corral",
      pasajeros: 219,
      carga: "110m (metros lineales)",
      imagen: "/extras/cullamo.jpg",
    },
    {
      nombre: "Epu Huapi",
      sector: "Futrono",
      pasajeros: 45,
      carga: "24m (metros lineales)",
      imagen: "/extras/cullamo.jpg",
    },
    {
      nombre: "Valentina III",
      sector: "Trumao",
      pasajeros: 60,
      carga: "Sin información",
      imagen: "/extras/cullamo.jpg",
    },
    {
      nombre: "La Tehuelche",
      sector: "Chile Chico",
      pasajeros: 250,
      carga: "164m (metros lineales)",
      imagen: "/extras/cullamo.jpg",
    },
    {
      nombre: "Pitipilla",
      sector: "Chumeldén",
      pasajeros: 30,
      carga: "Sin información",
      imagen: "/extras/cullamo.jpg",
    },
  ];

  const servicios = [
    {
      titulo: "Taller de Balzas",
      descripcion:
        "Nuestro taller de balzas te proporcionará las habilidades y conocimientos necesarios para desenvolverte de manera segura y eficiente en el uso de estas embarcaciones. Contamos con un equipo de instructores altamente capacitados y con amplia experiencia en el campo, quienes te guiarán a lo largo del proceso de aprendizaje.",
      imagen: "/images/taller-balzas.jpg",
    },
    {
      titulo: "Cursos y capacitaciones",
      descripcion:
        "Entendemos la importancia de la capacitación constante en el entorno laboral actual, donde los conocimientos y habilidades actualizados marcan la diferencia. Es por ello que nos comprometemos a ofrecer programas de capacitación diseñados cuidadosamente, que abarcan una amplia gama de áreas y sectores.",
      imagen: "/images/cursos-capacitaciones.jpg",
    },
    {
      titulo: "Servicios de Buceo",
      descripcion:
        "Nuestro equipo de experimentados buceadores se dedica exclusivamente a realizar tareas de mantenimiento y reparación en los centros de cultivo. Utilizamos las técnicas más avanzadas y equipos especializados para llevar a cabo estas labores de manera eficiente y segura.",
      imagen: "/images/servicios-buceo.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
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
          <img
            src="/path-to-historia-image.jpg"
            alt="Historia de la empresa"
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Sección: Misión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
        <div className="rounded-xl shadow-lg overflow-hidden order-2 md:order-1">
          <img
            src="/path-to-mision-image.jpg"
            alt="Nuestra misión"
            className="w-full h-64 object-cover"
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
            <img
              src={barcaza.imagen}
              alt={barcaza.nombre}
              className="w-full h-64 object-cover"
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

      

      {/* Nueva sección: Servicios */}
      <h2 className="text-3xl font-semibold text-center text-white mb-12">
        Servicios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {servicios.map((servicio, index) => (
          <div
            key={index}
            className="bg-blue-900 text-white rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={servicio.imagen}
              alt={servicio.titulo}
              className="w-full h-48 object-cover"
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
