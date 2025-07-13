import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import { CartProvider } from "@/components/cart-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Clayden's Food Hub - Authentic Filipino Cuisine & Catering",
  description:
    "Delicious Filipino food delivery and catering services in Metro Manila. Fresh ingredients, timely delivery, and authentic flavors for your special occasions.",
  keywords: "Filipino food, food delivery, catering, Manila, Philippines, rice meals, pancit, adobo",
    icons: {
    icon: "/claydens-logo.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <CartProvider>
          <Navigation />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
