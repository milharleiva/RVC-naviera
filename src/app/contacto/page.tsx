'use client'

import React, { useState } from 'react'
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Clock, Share2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

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
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center my-4 mb-8 text-blue-800">Contáctanos</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-lg">
            <CardHeader className="bg-blue-500 text-white">
              <CardTitle className="flex items-center">
                <Mail className="mr-2" />
                Envíanos un mensaje
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    required
                    onChange={handleChange}
                    value={formState.name}
                    className="w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tu@email.com"
                    required
                    onChange={handleChange}
                    value={formState.email}
                    className="w-full bg-gray-100"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="¿En qué podemos ayudarte?"
                    required
                    onChange={handleChange}
                    value={formState.message}
                    className="w-full bg-gray-100"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                  Enviar mensaje
                </Button>
              </form>
              {submitStatus === 'success' && (
                <div className="mt-4 bg-green-500 text-white px-4 py-3 rounded" role="alert">
                  <strong className="font-bold">¡Gracias por tu mensaje!</strong>
                  <span className="block sm:inline"> Te contactaremos pronto.</span>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 bg-red-500 text-white px-4 py-3 rounded" role="alert">
                  <strong className="font-bold">Hubo un error al enviar tu mensaje.</strong>
                  <span className="block sm:inline"> Por favor, intenta de nuevo.</span>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-green-500 text-white">
                <CardTitle className="flex items-center">
                  <Phone className="mr-2" />
                  Información de contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span>+34 123 456 789</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Mail className="w-5 h-5 text-green-600" />
                    <span>info@rvc-maritimo.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span>123 Puerto Principal, Ciudad Costera, País</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-yellow-500 text-white">
                <CardTitle className="flex items-center">
                  <Clock className="mr-2" />
                  Horario de atención
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-4">
                <div className="space-y-2 text-gray-700">
                  <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p>Sábados: 10:00 AM - 2:00 PM</p>
                  <p>Domingos: Cerrado</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader className="bg-indigo-500 text-white">
                <CardTitle className="flex items-center">
                  <Share2 className="mr-2" />
                  Síguenos en redes sociales
                </CardTitle>
              </CardHeader>
              <CardContent className="mt-4">
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
              </CardContent>
            </Card>
          </div>

          <Card className="md:col-span-2 bg-white shadow-lg">
            <CardHeader className="bg-red-500 text-white">
              <CardTitle className="flex items-center">
                <MapPin className="mr-2" />
                Ubicación
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-4">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}