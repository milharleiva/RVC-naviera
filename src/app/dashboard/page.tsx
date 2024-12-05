'use client'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Package, Calendar, Home, Settings, HelpCircle, Menu, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Logo from '@/components/ui/Logo'
import { Skeleton } from '@/components/ui/skeleton'
import "react-datepicker/dist/react-datepicker.css"
import { AnuncioForm } from './anuncio-form'






export default function Dashboard() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading && !session) {
      router.push('/auth/login')
    }
  }, [loading, session, router])

  if (loading) {
    return <DashboardSkeleton />
  }

  if (!session) {
    return null
  }
  


  const isAdmin = (session?.user as { role?: string })?.role == 'administrador'
  console.log(isAdmin)
  console.log(session)
  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 mb-6">
        {loading ? (
          <Skeleton className="h-12 w-12 mr-2" />
        ) : (
          <Logo className="h-12 w-12 mr-2" />
        )}
        <span className="text-2xl font-bold text-gray-800">RVC Dashboard</span>
      </div>
      <div className="space-y-2 flex-grow">
        <Button variant="ghost" className="w-full justify-start" size="lg" onClick={() => router.push('/')}>
          <Home className="mr-2 h-5 w-5" /> Inicio
        </Button>
        <Button variant="ghost" className="w-full justify-start" size="lg">
              <Package className="mr-2 h-5 w-5" /> Historial
            </Button>
        {isAdmin && (
          <Button variant="ghost" className="w-full justify-start" size="lg" onClick={() => router.push('/dashboard/anuncios')}>
            <Calendar className="mr-2 h-5 w-5" /> Anuncios
          </Button>
        )}
        <Button variant="ghost" className="w-full justify-start" size="lg" onClick={() => router.push('/dashboard/settings')}>
          <Settings className="mr-2 h-5 w-5" /> Configuración
        </Button>
        <Button  variant="ghost" className="w-full justify-start" size="lg">
          <HelpCircle  className="mr-2 h-5 w-5" /> Ayuda
        </Button>
      </div>
      <div className="p-4 border-t mt-auto md:hidden">
        <p className="text-sm text-gray-600">Conectado como:</p>
        {loading ? (
          <Skeleton className="h-6 w-3/4" />
        ) : (
          <p className="font-semibold">{session?.user?.nombre}</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-100">

      <aside className="hidden md:block w-64 bg-white shadow-md">
        <NavContent />
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md p-4 flex items-center justify-between md:justify-end">
          <div className="flex items-center gap-4 md:hidden">
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
            <Logo className="h-8 w-8" />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">{session?.user?.nombre}</span>
            <User className="h-8 w-8 text-gray-500" />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {isAdmin ? <AdminDashboardContent /> : <UserProfileContent user={session.user as unknown as User} />}
        </main>
      </div>
    </div>
  )
}

const DashboardSkeleton = () => (
  <div>
    <Skeleton className="h-8 w-1/4 mb-6" />
    <Skeleton className="h-64 w-full mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  </div>
)

const AdminDashboardContent = () => (
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard de Administrador</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <Card className="col-span-1 md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Crear Anuncio</CardTitle>
        </CardHeader>
        <CardContent>
        <AnuncioForm anuncio={{ id_anuncio: 0, titulo: '', descripcion: '', importancia: '', createdAt: new Date(), updatedAt: new Date() }} />
          </CardContent >
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
  </div>
)

interface User {
  name?: string
  apellido?: string
  email?: string
  role? : string
  telefono?: string
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
}

const UserProfileContent = ({ user }: { user: User & { [key: string]: unknown } }) => (
  <div>
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Perfil de Usuario</h1>
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <User className="h-12 w-12 text-gray-400" />
            <div>
              <p className="text-xl justify-between font-semibold">{user?.name} {user?.apellido}</p>

              <p className="text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Teléfono</p>
              <p>{user?.telefono || 'No especificado'}</p>
            </div>
           
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

