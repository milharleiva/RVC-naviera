import { Button } from "@/components/ui/button"
import { ShipIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <header className="text-center mb-8">
        <ShipIcon className="w-16 h-16 text-blue-600 mb-4" />
        <h1 className="text-4xl font-bold text-blue-800">RVC Naviera</h1>
        <p className="text-xl text-blue-600 mt-2">Navegando hacia el futuro</p>
      </header>
      <main className="text-center">
        <p className="text-lg mb-6">
          Bienvenido a RVC Naviera, su socio confiable en servicios marítimos.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Conoce nuestros servicios
        </Button>
      </main>
    </div>
  );
}