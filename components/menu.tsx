"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MenuModal from "./menu-modal"
import { useState } from "react"
import OrderBookingModal from "./order-booking-modal"

export default function Menu() {
  const menuCategories = [
    {
      name: "Chicken Dishes",
      items: [
        {
          id: "ch001",
          name: "Chicken Wings in Bilao",
          price: "₱435",
          image: "/chicken-wings.jpg",
          popular: true,
        },
        {
          id: "ch002",
          name: "Roasted Chicken",
          price: "₱390",
          image: "/roasted-chicken.jpg",
          popular: true,
        },
        {
          id: "ch003",
          name: "Chicken Cordon Bleu",
          price: "₱899",
          image: "cordon-bleu.jpg",
          popular: false,
        },
      ],
    },
    {
      name: "Pasta & Noodles",
      items: [
        {
          id: "pn001",
          name: "Baked Macaroni",
          price: "₱650",
          image: "/baked-macaroni.jpg",
          popular: true,
        },
        {
          id: "pn003",
          name: "Cheesy Spaghetti",
          price: "₱650",
          image: "/spaghetti.png",
          popular: true,
        },
        {
          id: "pn004",
          name: "Pancit Canton Guisado",
          price: "₱650",
          image: "pancit-canton.jpg",
          popular: true,
        },
      ],
    },
    {
      name: "Pork Dishes",
      items: [
        {
          id: "pk001",
          name: "Lechon Belly",
          price: "₱1,600",
          image: "/lechon-belly.jpg",
          popular: true,
        },
        {
          id: "pk003",
          name: "Crispy Pata",
          price: "₱850",
          image: "/crispy-pata.jpg",
          popular: true,
        },
        {
          id: "pk002",
          name: "Pork Platter",
          price: "₱599",
          image: "/pork-platter.jpg",
          popular: false,
        },
      ],
    },
  ]

  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const addToCart = (itemId: string, itemName: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-mocha-beige/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-black mb-4">Our Bestsellers</h2>
          <p className="text-lg text-slate-black/80 max-w-2xl mx-auto">
            Discover our most loved dishes, crafted with authentic Filipino flavors and made fresh daily with premium
            ingredients.
          </p>
        </div>

        {menuCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h3 className="text-2xl font-bold text-slate-black mb-8 text-center md:text-left">{category.name}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <Card
                  key={itemIndex}
                  className="group hover:shadow-xl transition-all duration-300 border-clay-amber/20 overflow-hidden"
                >
                  <div className="relative">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    {item.popular && <Badge className="absolute top-3 left-3 bg-clay-amber text-white">Popular</Badge>}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-semibold text-slate-black group-hover:text-clay-amber transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-xl font-bold text-clay-amber">{item.price}</span>
                    </div>
                    <p className="text-slate-black/70 text-sm mb-4">
                      Authentic Filipino flavors made with fresh, quality ingredients.
                    </p>
                    <Button
                      size="sm"
                      className="w-full bg-clay-amber hover:bg-clay-amber/90 text-white"
                      onClick={() => addToCart(item.id, item.name)}
                    >
                      Add to Order
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center space-y-4">
          {getTotalItems() > 0 && (
            <div className="bg-clay-amber/10 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-slate-black font-semibold">
                {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in cart
              </p>
              <Button
                size="lg"
                className="w-full mt-2 bg-clay-amber hover:bg-clay-amber/90 text-white"
                onClick={() => setIsOrderModalOpen(true)}
              >
                Proceed to Order
              </Button>
            </div>
          )}
          <Button
            size="lg"
            variant="outline"
            className="border-clay-amber text-clay-amber hover:bg-clay-amber hover:text-white bg-transparent"
            onClick={() => setIsMenuModalOpen(true)}
          >
            View Full Menu
          </Button>
        </div>
      </div>
      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        externalCart={cart}
        onExternalCartUpdate={setCart}
      />
      <OrderBookingModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        defaultTab="delivery"
        prefilledCart={cart}
        onCartUpdate={setCart}
      />
    </section>
  )
}
