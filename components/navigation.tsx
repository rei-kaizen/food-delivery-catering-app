"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#menu", label: "Menu" },
    { href: "#catering", label: "Catering" },
    { href: "#gallery", label: "Gallery" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-clay-amber/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#home" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image src="/claydens-logo.png" alt="Clayden's Food Hub Logo" fill className="object-contain" />
            </div>
            <span className="font-bold text-slate-black text-lg">Clayden's Food Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-black hover:text-clay-amber transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-clay-amber hover:bg-clay-amber/90 text-white">
              <Link href="https://www.facebook.com/ClaydenFH" target="_blank">
                <Facebook className="w-4 h-4 mr-2" />
                Order Now
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-clay-amber/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-slate-black hover:text-clay-amber transition-colors px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4">
                <Button asChild className="w-full bg-clay-amber hover:bg-clay-amber/90 text-white">
                  <Link href="https://www.facebook.com/ClaydenFH" target="_blank">
                    <Facebook className="w-4 h-4 mr-2" />
                    Order Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
