import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import { DashboardClient } from './dashboard-client'
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions) as { user?: { email?: string } }
  
  if (!session) {
    redirect("/auth/login")
  }

  const user = await prisma.usuario.findUnique({
    where: { email: session.user?.email ?? undefined },
    select: {
      id_usuario: true,
      nombre: true,
      apellido: true,
      email: true,
      tipo_usuario: true,
      telefono: true,
      createdAt: true,
      updatedAt: true
    }
  })

  if (!user) {
    redirect("/auth/login")
  }

  return <DashboardClient user={user} />
}

