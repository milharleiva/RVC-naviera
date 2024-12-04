'use client'

import { getServerSession } from "next-auth/next"
import db from "@/lib/db"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Package, Calendar, Home, Settings, HelpCircle, Menu, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Logo from '@/components/ui/Logo'
import { Skeleton } from '@/components/ui/skeleton'
import { useForm } from "react-hook-form"
export default function DashboardPage() {
  const [user, setUser] = useState<{
    id_usuario: number;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    tipo_usuario: string;
    telefono: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const session = await getServerSession()
      
      if (!session) {
        router.push("/auth/login")
        return
      }

      const user = await db.usuario.findUnique({
        where: { email: session.user?.email ?? undefined },
        select: {
          id_usuario: true,
          nombre: true,
          apellido: true,
          email: true,
          password: true,
          tipo_usuario: true,
          telefono: true,
          createdAt: true,
          updatedAt: true
        }
      })

      if (!user) {
        throw new Error("Usuario no encontrado")
      }

      setUser(user)
    }

    fetchData()
  }, [router])

  if (!user) {
    return <DashboardSkeleton />
  }

  return <DashboardClient user={user} />
}


function DashboardClient({ user }: { user: {
  id_usuario: number;
  nombre: string;
  apellido: string;
  email: string;
  tipo_usuario: string;
  telefono: string | null;
  createdAt: Date;
  updatedAt: Date;
} }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { watch } = useForm({
    defaultValues: {
      nombre: user?.nombre || '',
      apellido: user?.apellido || '',
      email: user?.email || '',
      telefono: user?.telefono || '',
      tipo_usuario: user?.tipo_usuario || 'turista',
    }
  })

  const isAdmin = user.tipo_usuario === 'admin'
  console.log('Tipo de usuario:', user.tipo_usuario) // Para depuración
  console.log('Es admin:', isAdmin) // Para depuración

  useEffect(() => {
    if (user) {
      setLoading(false)
    }
  }, [user])

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 mb-6">
        <Logo className="h-12 w-12 mr-2" />
        <span className="text-2xl font-bold text-gray-800">RVC Dashboard</span>
      </div>
      <div className="space-y-2 flex-grow">
        <Button variant="ghost" className="w-full justify-start" size="lg" onClick={() => router.push('/')}>
          <Home className="mr-2 h-5 w-5" /> Inicio
        </Button>
        {isAdmin && (
          <Button variant="ghost" className="w-full justify-start" size="lg">
            <Package className="mr-2 h-5 w-5" /> Historial
          </Button>
        )}
        {isAdmin && (
          <Button variant="ghost" className="w-full justify-start" size="lg">
            <Calendar className="mr-2 h-5 w-5" /> Anuncios
          </Button>
        )}
        <Button variant="ghost" className="w-full justify-start" size="lg" onClick={() => router.push('/dashboard/settings')}>
          <Settings className="mr-2 h-5 w-5" /> Configuración
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="lg">
          <HelpCircle className="mr-2 h-5 w-5" /> Ayuda
        </Button>
      </div>
      <div className="p-4 border-t mt-auto">
        <p className="text-sm text-gray-600">Conectado como:</p>
        <p className="font-semibold">{user.nombre} {user.apellido}</p>
      </div>
    </div>
  )

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-64 bg-white shadow-md">
        <NavContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile */}
        <header className="md:hidden bg-white shadow-md p-4 flex items-center justify-between">
          <Logo className="h-8 w-8" />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <NavContent />
            </SheetContent>
          </Sheet>
        </header>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {isAdmin ? "Dashboard de Administrador" : "Perfil de Usuario"}
          </h1>
          
          {/* User Profile Card - Visible for all users */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <User className="h-12 w-12 text-gray-400" />
                  <div>
                    <p className="text-xl font-semibold">{user.nombre} {user.apellido}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tipo de Usuario</p>
                    <p>{user.tipo_usuario}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Teléfono</p>
                    <p>{user.telefono || 'No especificado'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Admin-only content */}
          {isAdmin && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Crear Anuncio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Formulario para crear anuncios aquí</p>
                </CardContent>
              </Card>
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
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

const DashboardSkeleton = () => (
  <div className="flex h-screen bg-gray-100">
    <div className="hidden md:block w-64 bg-white shadow-md">
      <Skeleton className="h-full w-full" />
    </div>
    <div className="flex-1 p-4 md:p-6">
      <Skeleton className="h-8 w-1/4 mb-6" />
      <Skeleton className="h-64 w-full mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </div>
  </div>
)

