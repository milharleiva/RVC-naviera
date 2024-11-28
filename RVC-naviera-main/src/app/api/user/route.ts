import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import db from "@/lib/db"

export async function PUT(req: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const body = await req.json()
  const { nombre, apellido, email, telefono } = body

  try {
    const updatedUser = await db.usuario.update({
      where: { email: session.user.email! },
      data: { 
        nombre, 
        apellido, 
        email, 
        telefono 
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    return NextResponse.json({ error: 'Error al actualizar el perfil' }, { status: 500 })
  }
}