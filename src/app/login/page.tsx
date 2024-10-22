'use client'

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { ShipIcon } from 'lucide-react'
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';

Amplify.configure(outputs);




export default function Login() {
  return (
    <main>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-8">
        <ShipIcon className="w-16 h-16 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to RVC</h1>
      <div className="w-full max-w-md">
        <Authenticator>
          {({ signOut, user }) => (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold mb-4">Welcome, {user?.username}</h2>
              <p className="mb-4">You are now logged in to your RVC Shipping account.</p>
              <button
                onClick={signOut}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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