'use client'

import { Usuario } from '@prisma/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'

type UserViewProps = {
    user: Usuario
}

export function UserView({ user }: UserViewProps) {
    const router = useRouter()

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>
                    Visualiza tu información personal y de contacto
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <p className="font-semibold">Nombre</p>
                            <p>{user.nombre}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Apellido</p>
                            <p>{user.apellido}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold">Correo electrónico</p>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Teléfono</p>
                        <p>{user.telefono || "No proporcionado"}</p>
                        <p className="text-sm text-muted-foreground">
                            Opcional: Agregar un número de teléfono facilita el contacto
                        </p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Creado el: {new Date(user.createdAt).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground">Última actualización: {new Date(user.updatedAt).toLocaleDateString()}</p>
                        </div>
                        <button className="btn btn-secondary" onClick={() => router.push('/dashboard')}>volver</button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
