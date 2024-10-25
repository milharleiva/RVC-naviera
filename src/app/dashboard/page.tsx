'use client'

import { useAuthenticator } from '@aws-amplify/ui-react'
import { useRouter } from 'next/navigation'
import { ShipIcon, User, Package, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Dashboard() {
  const { user, signOut } = useAuthenticator((context) => [context.user])
  const router = useRouter()

  const handleSignOut = () => {
    signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <ShipIcon className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-2xl font-bold text-gray-800">RVC Dashboard</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">Welcome, {user?.username}</span>
              <button
                onClick={handleSignOut}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="bg-blue-500 text-white">
                <CardTitle className="flex items-center">
                  <User className="mr-2" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-gray-900">1,234</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="bg-green-500 text-white">
                <CardTitle className="flex items-center">
                  <Package className="mr-2" />
                  Active Shipments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-gray-900">567</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="bg-yellow-500 text-white">
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" />
                  Upcoming Deliveries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold text-gray-900">89</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}