'use client'

import React, { useState } from 'react'
import {
  Phone, Mail, MapPin, Facebook, Twitter, Linkedin,Share2,
} from 'lucide-react'
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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'loading'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('loading')

    // Simulación de envío de formulario
    setTimeout(() => {
      if (formState.name && formState.email && formState.message) {
        setSubmitStatus('success')
        setFormState({ name: '', email: '', message: '' }) // Limpia el formulario
      } else {
        setSubmitStatus('error')
      }
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }

  const clearForm = () => {
    setFormState({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Espacio para el banner */}
      <div className="h-20 bg-gray-200 flex items-center justify-center mb-6">
        <h2 className="text-lg font-bold text-gray-700">[Espacio para el banner]</h2>
      </div>

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center my-8 text-blue-800">Contáctanos</h1>
        
        {/* Formulario */}
        <Card className="bg-white shadow-lg mb-6">
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
              <div className="flex justify-between">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  disabled={submitStatus === 'loading'}
                >
                  {submitStatus === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
                </Button>
                <Button
                  type="button"
                  onClick={clearForm}
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Limpiar
                </Button>
              </div>
            </form>
            {submitStatus === 'success' && (
              <div className="mt-4 bg-green-500 text-white px-4 py-3 rounded" role="alert">
                <strong className="font-bold">¡Gracias por tu mensaje!</strong>
                <span className="block sm:inline"> Te contactaremos pronto.</span>
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="mt-4 bg-red-500 text-white px-4 py-3 rounded" role="alert">
                <strong className="font-bold">Hubo un error.</strong>
                <span className="block sm:inline"> Revisa los campos e inténtalo de nuevo.</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Información de contacto */}
        <Card className="bg-white shadow-lg mb-6">
          <CardHeader className="bg-green-500 text-white">
            <CardTitle className="flex items-center">
              <Phone className="mr-2" />
              Información de contacto
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4 space-y-4">
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
              <span>Ecuador 2339, Valdivia, Los Ríos, Chile</span>
            </div>
          </CardContent>
        </Card>

        {/* Redes sociales */}
        <Card className="bg-white shadow-lg mb-6">
          <CardHeader className="bg-indigo-500 text-white">
            <CardTitle className="flex items-center">
              <Share2 className="mr-2" />
              Síguenos en redes sociales
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <p>NavieraRVC</p>
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

        {/* Mapa */}
        <Card className="bg-white shadow-lg">
          <CardHeader className="bg-red-500 text-white">
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" />
              Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-4">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3147.6092085266867!2d-73.24328278426996!3d-39.81822107943819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9615eda6c48a0fdb%3A0xf13f0a3f0139b83a!2sEcuador%202339%2C%20Valdivia%2C%20Los%20R%C3%ADos%2C%20Chile!5e0!3m2!1ses-419!2sus!4v1700000000000!5m2!1ses-419!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full rounded"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
