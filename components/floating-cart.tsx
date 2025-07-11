"use client"

import { useState } from "react"
import { ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "./cart-provider"
import OrderBookingModal from "./order-booking-modal"

export default function FloatingCart() {
  const { cart, getTotalItems, getTotalPrice, getCartItems, clearCart } = useCart()
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  if (getTotalItems() === 0) return null

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <div
          className={`bg-clay-amber text-white rounded-lg shadow-lg transition-all duration-300 ${
            isExpanded ? "w-80" : "w-auto"
          }`}
        >
          {!isExpanded ? (
            <Button
              onClick={() => setIsExpanded(true)}
              className="bg-clay-amber hover:bg-clay-amber/90 text-white rounded-lg p-4 shadow-lg relative"
            >
              <ShoppingCart className="w-6 h-6 mr-2" />
              <span className="font-semibold">{getTotalItems()} items</span>
              <Badge className="absolute -top-2 -right-2 bg-white text-clay-amber text-xs">₱{getTotalPrice()}</Badge>
            </Button>
          ) : (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-lg">Your Order</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
                {getCartItems().map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="flex-1">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-semibold">₱{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/20 pt-3 mb-4">
                <div className="flex justify-between items-center font-bold">
                  <span>Total:</span>
                  <span>₱{getTotalPrice()}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => {
                    setIsOrderModalOpen(true)
                    setIsExpanded(false)
                  }}
                  className="w-full bg-white text-clay-amber hover:bg-white/90 font-semibold"
                >
                  Proceed to Order
                </Button>
                <Button
                  onClick={() => {
                    clearCart()
                    setIsExpanded(false)
                  }}
                  variant="ghost"
                  className="w-full text-white hover:bg-white/20 text-sm"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <OrderBookingModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} defaultTab="delivery" />
    </>
  )
}
