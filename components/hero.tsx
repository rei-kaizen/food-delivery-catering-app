"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Calendar } from "lucide-react"
import OrderBookingModal from "./order-booking-modal"

export default function Hero() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isCateringModalOpen, setIsCateringModalOpen] = useState(false)

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-saffron-cream/30 to-mocha-beige/50"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <div className="mb-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-black mb-4">Clayden's Food Hub</h1>
              </div>
              <p className="text-xl md:text-2xl text-toasty-umber font-medium mb-4">
                Delicious Filipino Cuisine, Delivered Fresh
              </p>
              <p className="text-lg text-slate-black/80 max-w-lg mx-auto lg:mx-0">
                From hearty rice meals to elegant catering packages, we bring authentic Filipino flavors right to your
                doorstep.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-clay-amber hover:bg-clay-amber/90 text-white text-lg px-8 py-6"
                onClick={() => setIsOrderModalOpen(true)}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Order Online
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-clay-amber text-clay-amber hover:bg-clay-amber hover:text-white text-lg px-8 py-6 bg-transparent"
                onClick={() => setIsCateringModalOpen(true)}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Catering
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-clay-amber/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-clay-amber">500+</div>
                <div className="text-sm text-slate-black/70">Events Served</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-clay-amber">5★</div>
                <div className="text-sm text-slate-black/70">Customer Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-clay-amber">3+</div>
                <div className="text-sm text-slate-black/70">Years Serving</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero-food-image.jpg"
                alt="Authentic Filipino food being served at Clayden's Food Hub"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-clay-amber/20">
              <div className="text-sm text-slate-black/70">Fresh Daily</div>
              <div className="font-semibold text-clay-amber">100% Quality</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg border border-clay-amber/20">
              <div className="text-sm text-slate-black/70">Fast Delivery</div>
              <div className="font-semibold text-clay-amber">30-45 mins</div>
            </div>
          </div>
        </div>
      </div>
      <OrderBookingModal isOpen={isOrderModalOpen} onClose={() => setIsOrderModalOpen(false)} defaultTab="delivery" />
      <OrderBookingModal
        isOpen={isCateringModalOpen}
        onClose={() => setIsCateringModalOpen(false)}
        defaultTab="catering"
      />
    </section>
  )
}
