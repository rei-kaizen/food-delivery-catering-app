"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { X, Search, Filter, Plus, Minus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { fullMenu, categories, type MenuItem } from "./menu-data"

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
  externalCart?: { [key: string]: number }
  onExternalCartUpdate?: (cart: { [key: string]: number }) => void
}

export default function MenuModal({ isOpen, onClose, externalCart, onExternalCartUpdate }: MenuModalProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [cart, setCart] = useState<{ [key: string]: number }>(externalCart || {})
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({})

  const filteredMenu = useMemo(() => {
    return fullMenu.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      return matchesSearch && matchesCategory && item.available
    })
  }, [searchTerm, selectedCategory])

  const getItemPrice = (item: MenuItem) => {
    if (item.sizes && item.sizes.length > 0) {
      const selectedSize = selectedSizes[item.id]
      const sizeOption = item.sizes.find((size) => size.size === selectedSize)
      return sizeOption ? sizeOption.price : item.sizes[0].price
    }
    return item.price
  }

  const getItemDisplayName = (item: MenuItem) => {
    if (item.sizes && item.sizes.length > 0) {
      const selectedSize = selectedSizes[item.id]
      const sizeOption = item.sizes.find((size) => size.size === selectedSize)
      const size = sizeOption ? sizeOption.size : item.sizes[0].size
      return `${item.name} (${size})`
    }
    return item.name
  }

  const addToCart = (itemId: string) => {
    const newCart = {
      ...cart,
      [itemId]: (cart[itemId] || 0) + 1,
    }
    setCart(newCart)
    onExternalCartUpdate?.(newCart)
  }

  const removeFromCart = (itemId: string) => {
    const newCart = { ...cart }
    if (newCart[itemId] > 1) {
      newCart[itemId] -= 1
    } else {
      delete newCart[itemId]
    }
    setCart(newCart)
    onExternalCartUpdate?.(newCart)
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = fullMenu.find((item) => item.id === itemId)
      return total + (item ? getItemPrice(item) * quantity : 0)
    }, 0)
  }

  const generateOrderMessage = () => {
    if (getTotalItems() === 0) return ""

    let message = "Hi! I'd like to order:\n\n"

    Object.entries(cart).forEach(([itemId, quantity]) => {
      const item = fullMenu.find((item) => item.id === itemId)
      if (item) {
        const price = getItemPrice(item)
        const displayName = getItemDisplayName(item)
        message += `• ${quantity}x ${displayName} - ₱${price * quantity}\n`
      }
    })

    message += `\nTotal: ₱${getTotalPrice()}\n\n`
    message += "Delivery Address: [Your Address]\n"
    message += "Contact Number: [Your Number]\n"
    message += "Payment Method: [GCash/BPI/COD]\n\n"
    message += "What time can you deliver?"

    return encodeURIComponent(message)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] overflow-hidden p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 border-b border-clay-amber/20">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-slate-black">Clayden's Food Hub Menu</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-black/50 w-4 h-4" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-clay-amber/30 focus:border-clay-amber"
            />
          </div>
        </DialogHeader>

        <div className="flex flex-1 min-h-0">
          {/* Categories Sidebar */}
          <div className="w-64 border-r border-clay-amber/20 p-4 overflow-y-auto flex-shrink-0">
            <h3 className="font-semibold text-slate-black mb-4 flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-clay-amber text-white"
                      : "hover:bg-clay-amber/10 text-slate-black"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenu.map((item) => (
                  <Card
                    key={item.id}
                    className="group hover:shadow-lg transition-all duration-300 border-clay-amber/20"
                  >
                    <div className="relative">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.popular && <Badge className="bg-clay-amber text-white text-xs">Popular</Badge>}
                        {item.spicy && (
                          <Badge variant="destructive" className="text-xs">
                            🌶️ Spicy
                          </Badge>
                        )}
                        {item.vegetarian && <Badge className="bg-green-600 text-white text-xs">🌱 Vegetarian</Badge>}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="mb-2">
                        <h4 className="text-lg font-semibold text-slate-black group-hover:text-clay-amber transition-colors mb-1">
                          {item.name}
                        </h4>
                        <p className="text-slate-black/70 text-sm mb-3 line-clamp-2">{item.description}</p>
                      </div>

                      {/* Size Selection */}
                      {item.sizes && item.sizes.length > 1 && (
                        <div className="mb-3">
                          <Select
                            value={selectedSizes[item.id] || item.sizes[0].size}
                            onValueChange={(value) =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [item.id]: value,
                              }))
                            }
                          >
                            <SelectTrigger className="w-full text-xs border-clay-amber/30">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {item.sizes.map((size) => (
                                <SelectItem key={size.size} value={size.size}>
                                  <div className="flex justify-between items-center w-full">
                                    <span>
                                      {size.size} {size.pax && `(${size.pax})`}
                                    </span>
                                    <span className="ml-2 font-semibold">₱{size.price}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xl font-bold text-clay-amber">₱{getItemPrice(item)}</span>
                      </div>

                      {/* Add to Cart Controls */}
                      <div className="flex items-center justify-between">
                        {cart[item.id] ? (
                          <div className="flex items-center gap-2 w-full">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeFromCart(item.id)}
                              className="w-8 h-8 p-0 border-clay-amber text-clay-amber hover:bg-clay-amber hover:text-white"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-semibold text-slate-black min-w-[2rem] text-center">
                              {cart[item.id]}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => addToCart(item.id)}
                              className="w-8 h-8 p-0 bg-clay-amber hover:bg-clay-amber/90 text-white"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => addToCart(item.id)}
                            className="w-full bg-clay-amber hover:bg-clay-amber/90 text-white"
                          >
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredMenu.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-slate-black/70 text-lg">No items found matching your search.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                    }}
                    className="mt-4 border-clay-amber text-clay-amber hover:bg-clay-amber hover:text-white"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart Summary Footer */}
        {getTotalItems() > 0 && (
          <div className="border-t border-clay-amber/20 p-6 bg-gradient-to-r from-clay-amber/5 to-saffron-cream/10 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-semibold text-slate-black">
                  Cart: {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
                </p>
                <p className="text-2xl font-bold text-clay-amber">Total: ₱{getTotalPrice()}</p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCart({})
                    onExternalCartUpdate?.({})
                  }}
                  className="border-clay-amber text-clay-amber hover:bg-clay-amber hover:text-white"
                >
                  Clear Cart
                </Button>
                <Button asChild className="bg-clay-amber hover:bg-clay-amber/90 text-white">
                  <Link href={`https://www.facebook.com/ClaydenFH`} target="_blank">
                    Order via Messenger
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
