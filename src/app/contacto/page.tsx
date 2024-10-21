'use client'

import React, { useState } from 'react'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'

export default function Contacto() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    // Por ahora, simularemos un envío exitoso
    setSubmitStatus('success')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-gray-700 text-4xl font-bold text-center mb-12">Contáctanos</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Tu nombre"
                required
                onChange={handleChange}
                value={formState.name}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="tu@email.com"
                required
                onChange={handleChange}
                value={formState.email}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="¿En qué podemos ayudarte?"
                required
                onChange={handleChange}
                value={formState.message}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              Enviar mensaje
            </button>
          </form>
          {submitStatus === 'success' && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">¡Gracias por tu mensaje!</strong>
              <span className="block sm:inline"> Te contactaremos pronto.</span>
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Hubo un error al enviar tu mensaje.</strong>
              <span className="block sm:inline"> Por favor, intenta de nuevo.</span>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className=" text-gray-700 text-2xl font-semibold mb-6">Información de contacto</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail className="w-5 h-5 text-blue-600" />
                <span>info@tuempresanaviera.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>123 Puerto Principal, Ciudad Costera, País</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className=" text-gray-700 text-2xl font-semibold mb-6">Horario de atención</h2>
            <div className="space-y-2 text-gray-700">
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p>Sábados: 10:00 AM - 2:00 PM</p>
              <p>Domingos: Cerrado</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-gray-700 text-2xl font-semibold mb-6">Síguenos en redes sociales</h2>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                <Facebook className="w-8 h-8" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                <Twitter className="w-8 h-8" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                <Linkedin className="w-8 h-8" />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-gray-700 text-2xl font-semibold mb-6">Ubicación</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.67890!2d-123.45678!3d12.34567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDIwJzQ0LjQiTiAxMjPCsDI3JzI0LjQiVw!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}