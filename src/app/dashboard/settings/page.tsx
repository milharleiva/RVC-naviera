import { UserProfile } from "./user-profile"

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Configuración de usuario</h1>
      <UserProfile />
    </div>
  )
}