"use client"

import { useState } from "react"
import { MessageCircle, Clock, CreditCard, CheckCircle, Calendar, Globe, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import OrderBookingModal from "./order-booking-modal"

export default function OrderInstructions() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const [isCateringModalOpen, setIsCateringModalOpen] = useState(false)

  const paymentMethods = [
    { name: "GCash", icon: "💳" },
    { name: "BPI Online", icon: "🏦" },
    { name: "Cash on Delivery", icon: "💵" },
  ]

  const orderSteps = [
    {
      icon: CheckCircle,
      title: "Choose Your Method",
      description: "Order online through our web app or message us directly",
    },
    {
      icon: CreditCard,
      title: "Select Payment",
      description: "Choose from GCash, BPI, or Cash on Delivery",
    },
    {
      icon: Clock,
      title: "Track Your Order",
      description: "We'll confirm and update you on delivery time",
    },
    {
      icon: CheckCircle,
      title: "Enjoy Your Food",
      description: "Sit back and wait for your delicious meal to arrive!",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-black mb-4">How to Order & Book</h2>
          <p className="text-lg text-slate-black/80 max-w-2xl mx-auto">
            Ordering from Clayden's Food Hub is quick and easy! Choose your preferred method to get your favorite
            Filipino dishes delivered fresh to your door.
          </p>
        </div>

        {/* Order Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {orderSteps.map((step, index) => (
            <Card key={index} className="text-center border-clay-amber/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-clay-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-clay-amber" />
                </div>
                <CardTitle className="text-lg text-slate-black">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-black/70 text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main CTA Section - Consolidated */}
        <div className="bg-gradient-to-r from-clay-amber to-clay-amber/90 rounded-2xl p-8 md:p-12 text-center text-white mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Order?</h3>
          <p className="text-lg mb-8 opacity-90 max-w-3xl mx-auto">
            Choose your preferred way to order: Use our convenient online forms for a seamless experience, or reach out
            to us directly via Messenger or phone for personalized service.
          </p>

          {/* Online Ordering Options */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4 opacity-95">📱 Order Online</h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-clay-amber text-lg px-8 py-6 bg-transparent"
                onClick={() => setIsOrderModalOpen(true)}
              >
                <Globe className="w-5 h-5 mr-2" />
                Order Food Online
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-clay-amber text-lg px-8 py-6 bg-transparent"
                onClick={() => setIsCateringModalOpen(true)}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Catering Online
              </Button>
            </div>
            <p className="text-sm opacity-80">Upload payment proof • Track your order • Get instant confirmation</p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-6">
            <div className="border-t border-white/30 flex-1"></div>
            <span className="px-4 text-sm opacity-75">OR</span>
            <div className="border-t border-white/30 flex-1"></div>
          </div>

          {/* Traditional Ordering Options */}
          <div>
            <h4 className="text-xl font-semibold mb-4 opacity-95">💬 Contact Us Directly</h4>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-clay-amber text-lg px-8 py-6 bg-transparent"
              >
                <a href="https://www.facebook.com/ClaydenFH" target="_blank" rel="noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Order via Messenger
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-clay-amber text-lg px-8 py-6 bg-transparent"
              >
                <a href="tel:+639912644729">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us Direct
                </a>
              </Button>
            </div>
            <p className="text-sm opacity-80">Personal assistance • Custom requests • Immediate response</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment & Delivery Info */}
          <Card className="border-clay-amber/20">
            <CardHeader>
              <CardTitle className="text-xl text-slate-black flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-clay-amber" />
                Payment & Delivery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-slate-black mb-3">Payment Methods:</h4>
                <div className="flex flex-wrap gap-2">
                  {paymentMethods.map((method, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {method.icon} {method.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-black mb-2">Delivery Time:</h4>
                <p className="text-slate-black/70">30-45 minutes for regular orders</p>
                <p className="text-slate-black/70">2-4 hours advance notice for catering</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-black mb-2">Delivery Fee:</h4>
                <p className="text-slate-black/70">₱50 within 5km radius</p>
                <p className="text-slate-black/70">₱80 for farther locations</p>
              </div>
            </CardContent>
          </Card>

          {/* Sample Message Format */}
          <Card className="border-clay-amber/20">
            <CardHeader>
              <CardTitle className="text-xl text-slate-black flex items-center">
                <MessageCircle className="w-6 h-6 mr-2 text-clay-amber" />
                Sample Message Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-mocha-beige/30 rounded-lg p-4 mb-4">
                <p className="text-sm text-slate-black/80 font-mono">
                  Hi! I'd like to order:
                  <br />• 2x Chicken Wings in Bilao (18 pcs)
                  <br />• 1x Lechon Belly (2 kg)
                  <br />• 1x Baked Macaroni (Medium Tray)
                  <br />
                  <br />
                  Delivery Address: [Your Address]
                  <br />
                  Contact Number: [Your Number]
                  <br />
                  Payment Method: GCash
                  <br />
                  <br />
                  What time can you deliver?
                </p>
              </div>
              <p className="text-sm text-slate-black/70">Copy this format to make ordering faster and easier!</p>
            </CardContent>
          </Card>
        </div>

        {/* Cut-off Times */}
        <div className="mt-12 text-center">
          <div className="bg-saffron-cream/20 rounded-lg p-6 max-w-2xl mx-auto">
            <h4 className="font-semibold text-slate-black mb-2">⏰ Order Cut-off Times</h4>
            <p className="text-slate-black/70 text-sm">
              <strong>Regular Orders:</strong> Until 8:00 PM daily
              <br />
              <strong>Catering Orders:</strong> At least 24 hours in advance
              <br />
              <strong>Large Events (50+ pax):</strong> 48-72 hours advance notice
            </p>
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
