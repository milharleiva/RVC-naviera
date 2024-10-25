'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from '@/components/ui/Navbar'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import outputs from '@/amplify_outputs.json'

Amplify.configure(outputs)

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased`}>
        <Authenticator.Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                {children}
              </main>
              <footer className="bg-primary text-primary-foreground py-4 text-center">
                <p>&copy; {new Date().getFullYear()} Naviera RVC. Todos los derechos reservados.</p>
              </footer>
            </div>
          </ThemeProvider>
        </Authenticator.Provider>
      </body>
    </html>
  )
}