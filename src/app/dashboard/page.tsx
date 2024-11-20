'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Package, Calendar,Home, Settings, HelpCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Logo from '@/components/ui/Logo'
import "react-datepicker/dist/react-datepicker.css"
import { AnuncioForm } from './anuncio-form'

const data = [
  { name: '5k', Sales: 20, Profit: 30 },
  { name: '10k', Sales: 40, Profit: 35 },
  { name: '15k', Sales: 30, Profit: 45 },
  { name: '20k', Sales: 50, Profit: 40 },
  { name: '25k', Sales: 35, Profit: 55 },
  { name: '30k', Sales: 70, Profit: 60 },
  { name: '35k', Sales: 40, Profit: 80 },
  { name: '40k', Sales: 60, Profit: 70 },
  { name: '45k', Sales: 50, Profit: 65 },
  { name: '50k', Sales: 90, Profit: 75 },
  { name: '55k', Sales: 70, Profit: 85 },
  { name: '60k', Sales: 100, Profit: 90 },
]

export default function Dashboard() {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <div className="flex items-center mb-6">
            <Logo className="h-12 w-12 mr-2" />
            <span className="text-2xl font-bold text-gray-800">RVC Dashboard</span>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" size="lg" onClick={() => router.push('/')}>
              <Home className="mr-2 h-5 w-5" /> Inicio
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Package className="mr-2 h-5 w-5" /> Historial
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Calendar className="mr-2 h-5 w-5" /> Anuncios
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="lg" onClick={() => router.push('/dashboard/settings')}>
              <Settings className="mr-2 h-5 w-5" /> Configuración
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <HelpCircle className="mr-2 h-5 w-5" /> Ayuda
            </Button>
          </div>
        </div>
        <div className="p-4 border-t">
          <p className="text-sm text-gray-600">Conectado como:</p>
          <p className="font-semibold">{session?.user?.name}</p>
         
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

          {/* Area Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Uso de la App y Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="Sales" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="Profit" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <AnuncioForm/>
          </div>

          {/* Feedback section */}
          <Card>
            <CardHeader>
              <CardTitle>Caja De Opiniones y Sugerencia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="bg-gray-200 p-2 rounded">
                  <span className="font-bold">Juilo Jalat:</span> Lorem Ipsum Dolorem
                </div>
                <div className="bg-gray-200 p-2 rounded">
                  <span className="font-bold">Minerva Barnett:</span> Buen Servicio
                </div>
                <div className="bg-gray-200 p-2 rounded">
                  <span className="font-bold">Peter Lewis:</span> Siento que Podrian Mejorar T...
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
