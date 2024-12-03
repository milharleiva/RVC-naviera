import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import db from "@/lib/db"
import { getAuthOptions } from "@/app/api/auth/[...nextauth]/route"

export async function PUT(request: Request) {
  const authOptions = getAuthOptions()
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const { nombre, apellido, email, telefono, tipo_usuario } = body

    if (!session.user.email) {
      throw new Error("Email del usuario no encontrado en la sesión")
    }

    const updatedUser = await db.usuario.update({
      where: { email: session.user.email },
      data: { 
        nombre, 
        apellido,
        email,
        telefono,
        tipo_usuario,
      },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error("Error al actualizar el usuario:", error)
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: "Error desconocido al actualizar el perfil" },
      { status: 500 }
    )
  }
}