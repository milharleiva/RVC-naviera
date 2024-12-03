import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

import db from "@/lib/db"
import { SettingsForm } from "./user-profile"

export default async function SettingsPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect("/auth/login")
  }

  const user = await db.usuario.findUnique({
    where: { email: session.user?.email ?? undefined }
  })

  if (!user) {
    throw new Error("Usuario no encontrado")
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Configuración</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SettingsForm user={user} />
      </div>
    </div>
  )
}