'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Usuario } from '@prisma/client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Notification from "@/components/ui/Notification"

const formSchema = z.object({
  nombre: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  apellido: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingresa un correo electrónico válido.",
  }),
  telefono: z.string().optional(),
})

type SettingsFormProps = {
  user: Usuario
}

export function SettingsForm({ user }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      telefono: user.telefono || ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Error al actualizar el perfil')
      }

      setNotification({ message: "Tu información ha sido actualizada exitosamente.", type: 'success' })
      router.refresh()
    } catch {
      setNotification({ message: "Hubo un problema al actualizar tu perfil.", type: 'error' })
    } finally {
      setIsLoading(false)
      router.refresh()
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
    <Card className="col-span-4 ">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>
          Actualiza tu información personal y de contacto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Tu apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@ejemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu número de teléfono" {...field} />
                  </FormControl>
                  <FormDescription>
                    Opcional: Agregar un número de teléfono facilita el contacto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Creado el: {new Date(user.createdAt).toLocaleDateString()}</p>
                <p className="text-sm text-muted-foreground">Última actualización: {new Date(user.updatedAt).toLocaleDateString()}</p>
              </div>
              <Button variant="secondary" onClick={() => router.push('/dashboard')}>volver</Button>
              <Button type="submit" disabled={isLoading} >
                {isLoading ? "Guardando cambios..." : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
    </div>
  )
}
