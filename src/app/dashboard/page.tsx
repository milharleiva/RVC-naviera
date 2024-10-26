'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthenticator } from '@aws-amplify/ui-react'
import { User, Package, Calendar, Download, Database, Home, Settings, HelpCircle, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Logo from '@/components/ui/Logo'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { format, isToday } from 'date-fns'

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

interface Reminder {
  id: string;
  text: string;
  date: Date;
}

export default function Dashboard() {
  const { user } = useAuthenticator((context) => [context.user])
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [newReminder, setNewReminder] = useState('')
  const [newReminderDate, setNewReminderDate] = useState(new Date())
  const router = useRouter()

  useEffect(() => {
    const checkReminders = () => {
      reminders.forEach(reminder => {
        if (isToday(reminder.date)) {
          alert(`Reminder: ${reminder.text}`)
        }
      })
    }

    const interval = setInterval(checkReminders, 60000) 
    return () => clearInterval(interval)
  }, [reminders])

  const addReminder = () => {
    if (newReminder.trim() !== '') {
      const newReminderObj: Reminder = {
        id: Date.now().toString(),
        text: newReminder.trim(),
        date: newReminderDate
      }
      setReminders([...reminders, newReminderObj])
      setNewReminder('')
      setNewReminderDate(new Date())
    }
  }

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <div className="flex items-center mb-6">
            <Logo className="h-12 w-12 mr-2" />
            <span className="text-2xl font-bold text-gray-800">RVC Dashboard</span>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Home className="mr-2 h-5 w-5" /> Inicio
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Package className="mr-2 h-5 w-5" /> Envíos
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Calendar className="mr-2 h-5 w-5" /> Programación
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
          <p className="font-semibold">{user?.username}</p>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="mr-2" />
                  Espacio AWS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-gray-900">50%</p>
                <p className="text-sm text-gray-600">128GB usado</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2" />
                  Descargas Totales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-gray-900">2</p>
                <p className="text-sm text-gray-600">4.3% Menos que Ayer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2" />
                  Total User
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-gray-900">5</p>
                <p className="text-sm text-gray-600">2.5% Más que Ayer</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Reminders */}
            <Card>
              <CardHeader>
                <CardTitle>Recordatorios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between bg-gray-200 p-2 rounded">
                      <span>{reminder.text} - {format(reminder.date, 'dd/MM/yyyy')}</span>
                      <Button variant="ghost" size="sm" onClick={() => deleteReminder(reminder.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Nuevo recordatorio"
                    value={newReminder}
                    onChange={(e) => setNewReminder(e.target.value)}
                    className="flex-grow"
                  />
                  <DatePicker
                    selected={newReminderDate}
                    onChange={(date: Date | null) => {
                      if (date) {
                        setNewReminderDate(date);
                      }
                    }}
                    
                    className="px-3 py-2 border rounded"
                  />
                  <Button onClick={addReminder}>Agregar</Button>
                </div>
              </CardContent>
            </Card>

            {/* Digital Clock */}
            <Card className="col-span-2">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-6xl font-bold text-gray-800">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </CardContent>
            </Card>
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