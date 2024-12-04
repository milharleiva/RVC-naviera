import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import db from "@/lib/db"


export async function PUT(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { nombre, apellido, email, telefono, tipo_usuario} = body

    const updatedUser = await db.usuario.update({
      where: { email: session.user.email ?? undefined },
      data: { 
        nombre, 
        apellido,
        email,
        telefono,
        tipo_usuario
      },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Error al actualizar el usuario:", error)
    return NextResponse.json(
      { error: "Error al actualizar el perfil" },
      { status: 500 }
    )
  }
}