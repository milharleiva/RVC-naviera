'use client'
import {
  Phone, Mail, MapPin, Facebook, Twitter, Linkedin,Share2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SugerenciaForm } from '../dashboard/sugerencias/sugerencia-form'




export default function Contacto() {
  





  return (
    <div className="min-h-screen bg-gray-50">
      {/* Espacio para el banner */}
      <div className="h-20 bg-gray-200 flex items-center justify-center mb-6">
        <h2 className="text-lg font-bold text-gray-700">[Espacio para el banner]</h2>
      </div>

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center my-8 text-blue-800">Contáctanos</h1>
        <div>
        <SugerenciaForm  />
        </div>
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
