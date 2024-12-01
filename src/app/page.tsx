/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import React from 'react';
import './globals.css';

export default function Home() {
  return (
    <div>
      {/* Sección de portada */}
      <div className="relative w-full h-screen">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <img
            src="/portada.jfif"
            alt="Portada"
            className="w-full h-full object-cover"
          />
          {/* Overlay oscuro */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Contenido de portada */}
        <div className="relative z-10 flex flex-col items-center justify-center text-white h-full text-center">
          <h1 className="text-5xl font-bold mb-4">
            Bienvenido a RVC Servicios Marítimos
          </h1>
          <p className="text-xl mb-6">
            Servicios marítimos de calidad con años de experiencia en el sector.
          </p>
          <Link
            href="/sobre-nosotros"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold"
          >
            Conoce Más
          </Link>
        </div>
      </div>

      <div className="container-main mx-auto px-4 py-8">

        {/* Sección de Instagram */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mt-8">

          {/* Lado izquierdo: Logo y Texto */}
          <div className="flex flex-col items-start w-full md:w-1/2">
            {/* Logo de Instagram */}
            <div className="w-64 sm:w-48 md:w-72 mx-auto">
              <img
                src="/extras/instagram.svg"
                alt="Instagram"
                className="w-full"
              />
            </div>

            {/* Texto debajo del logo */}
            <div className="  rounded-lg w-full mt-[-60px]"> {/* Ajuste con margen negativo */}
              <h2 className="text-3xl sm:text-l mb-3 text-justify">
                ¡Descubre más aventuras con nosotros! Síguenos en Instagram para ver
                los paisajes más impresionantes y las mejores rutas marítimas. 🌊🚢 #RVC
              </h2>

              <button
                className="bg-blue-600 hover:bg-blue-650 text-white py-2 px-4 rounded-lg text-lg font-semibold mx-auto mt-[50px] block"
                onClick={() => window.open('https://www.instagram.com', '_blank')}
              >
                Ir al perfil
              </button>
            </div>
          </div>

          {/* Lado derecho: Imagen del teléfono */}
          <div className="flex justify-center items-center w-full md:w-1/2">
            <img
              src="/extras/instagram/celular.png"
              alt="Celular"
              className="w-full md:w-80"
            />
          </div>
        </div>

        


        



{/* Sección de información */}

{/* Sección informativa adicional */}
<div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
  {/* Imagen del barco */}
  <div className="w-full md:w-1/2">
    <img
      src="/extras/cullamo.jpg"
      alt="Barco en el mar"
      className="w-full rounded-lg shadow-lg"
    />
  </div>

  {/* Texto descriptivo */}
  <div className="w-full md:w-1/2 flex flex-col justify-center">
    <h3 className="text-lg uppercase text-gray-600 font-semibold mb-2">
      Nuestra Empresa
    </h3>
    <h2 className="text-4xl font-bold text-gray-800 mb-4">
      Somos Naviera RVC
    </h2>
    <p className="text-lg text-gray-700 leading-relaxed mb-6">
    Estamos aquí para apoyarte en los recorridos que realizas habitualmente, 
    ofreciendo transporte confiable para tus cargas y vehículos,
    con un servicio de calidad que abarca desde Valdivia, 
    en la región de Los Ríos, hasta Chile Chico, en la región de Aysén.
    </p>
    <Link
      href="/sobre-nosotros"
      className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-lg font-semibold"
    >
      Sobre nosotros &rarr;
    </Link>
  </div>
</div>




<div className="flex flex-col md:flex-row items-center gap-8 mt-16">
  {/* Texto a la izquierda */}
  <div className="flex-1 text-left">
    <h3 className="text-gray-700 font-semibold text-sm tracking-wider uppercase">
      En tu próximo destino
    </h3>
    <h2 className="text-4xl font-bold text-gray-900 my-4">
      Navega con nosotros
    </h2>
    
    <p className="text-gray-600 text-lg leading-relaxed">
      Reserva tu lugar en nuestro próximo viaje y déjate sorprender por la
      belleza natural del sur de Chile. Ya sea que regreses a casa, viajes por
      trabajo o estés de vacaciones, ¡te esperamos a bordo!

      
    </p>



    
  </div>

  

  {/* Imagen a la derecha */}
  <div className="flex-1">
    <img
      src="/extras/tehuelche.jpeg" 
      alt="Barco navegando al atardecer"
      className="w-full h-auto rounded-lg shadow-lg"
    />
  </div>
</div>
<Link
      href="/rutas-y-tarifas"
      className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg text-lg font-semibold"
    >
      Rutas y tarifas &rarr;
    </Link>




<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16 text-center">
  {/* Compra */}
  <div className="flex flex-col items-center">
    <div className="bg-red-100 rounded-full p-4">
      <img
        src="/path-to-icon/compra.svg" // Reemplaza con la ruta del ícono de "Compra"
        alt="Compra"
        className="w-12 h-12"
      />
    </div>
    <h3 className="text-lg font-semibold mt-4">Compra</h3>
    <p className="text-gray-600 mt-2">
      Compra en línea tus tickets con comodidad y en unos pocos clicks.
    </p>
  </div>

  {/* Horarios */}
  <div className="flex flex-col items-center">
    <div className="bg-red-100 rounded-full p-4">
      <img
        src="/path-to-icon/horarios.svg" // Reemplaza con la ruta del ícono de "Horarios"
        alt="Horarios"
        className="w-12 h-12"
      />
    </div>
    <h3 className="text-lg font-semibold mt-4">Horarios</h3>
    <p className="text-gray-600 mt-2">
      Consulta nuestros horarios de atención e itinerarios de viaje con información detallada.
    </p>
  </div>

  {/* Servicios */}
  <div className="flex flex-col items-center">
    <div className="bg-red-100 rounded-full p-4">
      <img
        src="/path-to-icon/servicios.svg" // Reemplaza con la ruta del ícono de "Servicios"
        alt="Servicios"
        className="w-12 h-12"
      />
    </div>
    <h3 className="text-lg font-semibold mt-4">Servicios</h3>
    <p className="text-gray-600 mt-2">
      Mantente informado del estado de nuestros distintos servicios de manera sencilla y útil.
    </p>
  </div>

  {/* Agendamiento */}
  <div className="flex flex-col items-center">
    <div className="bg-red-100 rounded-full p-4">
      <img
        src="/path-to-icon/agendamiento.svg" // Reemplaza con la ruta del ícono de "Agendamiento"
        alt="Agendamiento"
        className="w-12 h-12"
      />
    </div>
    <h3 className="text-lg font-semibold mt-4">Agendamiento</h3>
    <p className="text-gray-600 mt-2">
      Reserva tus viajes con anticipación y evita esperas innecesarias y falta de disponibilidad.
    </p>
  </div>
</div>


      </div>
    </div>
  );
}
