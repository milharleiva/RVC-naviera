'use client'

import { getServerSession } from "next-auth/next"
import db from "@/lib/db"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Package, Calendar, Home, Settings, HelpCircle, Menu, User, CreditCard, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Logo from '@/components/ui/Logo'
import { Skeleton } from '@/components/ui/skeleton'
import { useForm } from "react-hook-form"

type UserType = {
  id_usuario: number
  nombre: string
  apellido: string
  email: string
  password: string
  tipo_usuario: string
  telefono: string | null
  createdAt: Date
  updatedAt: Date
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const session = await getServerSession()

      if (!session) {
        router.push("/auth/login")
        return
      }

      const user = await db.usuario.findUnique({
        where: { email: session.user?.email || '' },
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

function DashboardClient({ user }: { user: UserType }) {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const { watch } = useForm({
    defaultValues: {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      telefono: user.telefono || '',
      tipo_usuario: user.tipo_usuario || 'turista',
    },
  })

  const watchedFields = watch()
  const isAdmin = watchedFields.tipo_usuario === 'admin'

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
        {isAdmin ? (
          <>
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Package className="mr-2 h-5 w-5" /> Historial
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Calendar className="mr-2 h-5 w-5" /> Anuncios
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Package className="mr-2 h-5 w-5" /> Mis Boletos
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Calendar className="mr-2 h-5 w-5" /> Próximos Viajes
            </Button>
          </>
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
        <p className="font-semibold">
          {watchedFields.nombre} {watchedFields.apellido}
        </p>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="hidden md:block w-64 bg-white shadow-md">
        <NavContent />
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-md p-4 flex items-center justify-between md:justify-end">
          <div className="flex items-center md:hidden">
            <Logo className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold text-gray-800">RVC Dashboard</span>
          </div>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            {isAdmin ? 'Dashboard de Administrador' : 'Dashboard de Usuario'}
          </h1>
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-bold">Información Personal</CardTitle>
              <User className="h-8 w-8 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xl font-semibold">
                    {watchedFields.nombre} {watchedFields.apellido}
                  </p>
                  <p className="text-gray-500">{watchedFields.email}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tipo de Usuario</p>
                    <p>{watchedFields.tipo_usuario}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Teléfono</p>
                    <p>{watchedFields.telefono || 'No especificado'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {isAdmin ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold">Crear Anuncio</CardTitle>
                  <Calendar className="h-8 w-8 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <CardDescription>Crea y gestiona anuncios para los usuarios</CardDescription>
                  <p className="mt-2">Formulario para crear anuncios aquí</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold">Opiniones y Sugerencias</CardTitle>
                  <MessageSquare className="h-8 w-8 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <CardDescription>Comentarios recientes de los usuarios</CardDescription>
                  <div className="space-y-2 mt-2">
                    <div className="bg-gray-200 p-2 rounded">
                      <span className="font-bold">Juilo Jalat:</span> Lorem Ipsum Dolorem
                    </div>
                    <div className="bg-gray-200 p-2 rounded">
                      <span className="font-bold">Minerva Barnett:</span> Buen Servicio
                    </div>
                    <div className="bg-gray-200 p-2 rounded">
                      <span className="font-bold">Peter Lewis:</span> Siento que Podrían Mejorar T...
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold">Mis Boletos</CardTitle>
                  <CreditCard className="h-8 w-8 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <CardDescription>Resumen de tus boletos comprados</CardDescription>
                  <p className="mt-2">Lista de boletos comprados aquí</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-bold">Próximos Viajes</CardTitle>
                  <Calendar className="h-8 w-8 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <CardDescription>Tus próximos viajes programados</CardDescription>
                  <p className="mt-2">Información sobre próximos viajes aquí</p>
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
