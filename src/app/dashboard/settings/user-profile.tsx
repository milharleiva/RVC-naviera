'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Notification from "@/components/ui/Notification"
import { useRouter } from 'next/navigation'

interface UserData {
  nombre: string
  apellido: string
  email: string
  telefono: string
}

export function UserProfile() {
  const { data: session, update } = useSession()
  interface SessionUser {
    nombre: string
    apellido: string
    email: string
    telefono: string
  }

  const router = useRouter()

  const [userData, setUserData] = useState<UserData>({
    nombre: (session?.user as SessionUser)?.nombre || "",
    apellido: (session?.user as SessionUser)?.apellido || "",
    email: session?.user?.email || "",
    telefono: (session?.user as SessionUser)?.telefono || "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil')
      }

      const updatedUser = await response.json()
      await update({ 
        ...session, 
        user: { 
          ...session?.user, 
          ...updatedUser
        } 
      })
      setNotification({ message: "Tu información ha sido actualizada exitosamente.", type: 'success' })
    } catch (error) {
      console.error('Error:', error)
      setNotification({ message: "Hubo un problema al actualizar tu perfil.", type: 'error' })
    } finally {
      setIsLoading(false)
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Tu perfil</CardTitle>
          <CardDescription>Actualiza tu información personal aquí.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {(Object.keys(userData) as Array<keyof UserData>).map((field) => (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  <Input
                    id={field}
                    name={field}
                    value={userData[field]}
                    onChange={handleChange}
                    type={field === 'email' ? 'email' : 'text'}
                  />
                </div>
              ))}
            </div>
            <CardFooter className="justify-between">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar cambios"}
              </Button>
              <Button type="button" onClick={() => router.push('/dashboard')}>
                Volver
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
