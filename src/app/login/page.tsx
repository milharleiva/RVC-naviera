'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { ShipIcon } from 'lucide-react'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'

Amplify.configure(outputs)

export default function Login() {
  const router = useRouter()
  const { authStatus } = useAuthenticator(context => [context.authStatus])

  useEffect(() => {
    if (authStatus === 'authenticated') {
      router.push('/dashboard')
    }
  }, [authStatus, router])

  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="mb-8">
          <ShipIcon className="w-16 h-16 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome to RVC</h1>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
          <Authenticator>
            {({ signOut, user }) => (
              <div className="px-8 pt-6 pb-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome, {user?.username}</h2>
                <p className="mb-4 text-gray-600">You are now logged in to your RVC Shipping account.</p>
                <button
                  onClick={signOut}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                >
                  Sign out
                </button>
              </div>
            )}
          </Authenticator>
        </div>
      </div>
    </main>
  )
}