"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import FoodDeliveryForm from "./food-delivery-form"
import CateringBookingForm from "./catering-booking-form"

interface OrderBookingModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "delivery" | "catering"
  prefilledCart?: { [key: string]: number }
  onCartUpdate?: (cart: { [key: string]: number }) => void
}

export default function OrderBookingModal({
  isOpen,
  onClose,
  defaultTab = "delivery",
  prefilledCart,
  onCartUpdate,
}: OrderBookingModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] overflow-hidden p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-clay-amber/20 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-slate-black">Place Your Order</DialogTitle>
              <p className="text-slate-black/70 mt-1">Choose between food delivery or catering booking</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <div className="px-6 pt-4 flex-shrink-0">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="delivery" className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Food Delivery
              </TabsTrigger>
              <TabsTrigger value="catering" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Catering Booking
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            <TabsContent value="delivery" className="p-6 pt-4 m-0 h-full">
              <div className="max-h-full overflow-y-auto">
                <FoodDeliveryForm onSuccess={onClose} prefilledCart={prefilledCart} onCartUpdate={onCartUpdate} />
              </div>
            </TabsContent>

            <TabsContent value="catering" className="p-6 pt-4 m-0 h-full">
              <div className="max-h-full overflow-y-auto">
                <CateringBookingForm onSuccess={onClose} />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
