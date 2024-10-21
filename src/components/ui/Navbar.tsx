'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ShipIcon, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: 'Sobre nosotros', href: '/sobre-nosotros' },
    { name: 'Rutas y tarifas', href: '/rutas-y-tarifas' },
    { name: 'Contacto', href: '/contacto' },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
          <ShipIcon className="w-16 h-16 text-blue-600 mb-4" />
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.href ? 'bg-gray-100' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Login Button (Desktop) */}
          <div className="hidden md:block">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link className='text-gray-700' href="/login">
                Log in
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Abrir menú principal"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-center mt-2"
              asChild
            >
              <Link href="/login">
                Log in
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}