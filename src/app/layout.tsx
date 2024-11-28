'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/ui/Navbar'
import { SessionProvider } from 'next-auth/react'
import { Authenticator } from '@aws-amplify/ui-react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <head />
      <body className={`${inter.className} antialiased`}>
        <Authenticator.Provider>
          <SessionProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-primary text-primary-foreground py-4 text-center">
              <p>&copy; {new Date().getFullYear()} Naviera RVC. Todos los derechos reservados.</p>
            </footer>
          </div>
          </SessionProvider>
        </Authenticator.Provider>
      </body>
    </html>
  )
}
