import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from '@/components/ui/Navbar';
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Naviera RVC',
  description: 'Empresa naviera numero 1 en chile',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} antialiased`}>
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
              <p>&copy; {new Date().getFullYear()} Nombre de tu Empresa Naviera. Todos los derechos reservados.</p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}