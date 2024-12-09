

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus, Minus } from 'lucide-react'
import api from '@/lib/api'



interface TicketType {
  name: string
  price: number
}

const ticketTypes: TicketType[] = [
  { name: 'Adulto', price: 500 },
  { name: 'Adulto Mayor', price: 250 },
  { name: 'Discapacitado', price: 250 },
  { name: 'Estudiantes', price: 0 },
]

interface BuyTicketsDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function BuyTicketsDialog({ isOpen, onOpenChange }: BuyTicketsDialogProps) {
  const [tickets, setTickets] = useState<{ [key: string]: number }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTicketChange = (ticketName: string, change: number) => {
    setTickets(prev => {
      const newValue = Math.max((prev[ticketName] || 0) + change, 0)
      return { ...prev, [ticketName]: newValue }
    })
  }

  const calculateTotal = () => {
    return ticketTypes.reduce((total, ticket) => {
      return total + (tickets[ticket.name] || 0) * ticket.price
    }, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const urlmp = await api.message.submit(tickets, calculateTotal())
      console.log('Payment URL received:', urlmp);
      if (urlmp) {
        window.location.href = urlmp;
      } else {
        throw new Error('No se recibió una URL de pago válida');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error)
      setError(error instanceof Error ? error.message : 'Error desconocido al procesar la compra')
    } finally {
      setIsLoading(false) 
    }
    
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comprar Boletos</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {ticketTypes.map((ticket) => (
              <div key={ticket.name} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={ticket.name} className="text-right">
                  {ticket.name}
                </Label>
                <div className="col-span-2 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleTicketChange(ticket.name, -1)}
                    disabled={!tickets[ticket.name]}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-center w-8">{tickets[ticket.name] || 0}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleTicketChange(ticket.name, 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span>${ticket.price}</span>
              </div>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <DialogFooter>
            <div className="flex justify-between items-center w-full">
              <span className="font-bold">Total: ${calculateTotal()}</span>
              <Button type="submit" disabled={isLoading || calculateTotal() === 0}>
                {isLoading ? 'Procesando...' : 'Comprar'}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

