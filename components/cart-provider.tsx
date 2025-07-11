"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartContextType {
  cart: { [key: string]: number }
  addToCart: (itemId: string, itemName: string, price: number) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  getCartItems: () => CartItem[]
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<{ [key: string]: number }>({})
  const [itemDetails, setItemDetails] = useState<{ [key: string]: { name: string; price: number } }>({})

  const addToCart = (itemId: string, itemName: string, price: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
    setItemDetails((prev) => ({
      ...prev,
      [itemId]: { name: itemName, price },
    }))
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const clearCart = () => {
    setCart({})
    setItemDetails({})
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = itemDetails[itemId]
      return total + (item ? item.price * quantity : 0)
    }, 0)
  }

  const getCartItems = (): CartItem[] => {
    return Object.entries(cart).map(([itemId, quantity]) => ({
      id: itemId,
      name: itemDetails[itemId]?.name || "Unknown Item",
      price: itemDetails[itemId]?.price || 0,
      quantity,
    }))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextType {
  const context = useContext(CartContext)

  // If the component using the hook is not wrapped in <CartProvider>,
  // return no-op implementations to prevent runtime errors during previews.
  if (context === undefined) {
    // Provide safe defaults that keep the UI from breaking
    return {
      cart: {},
      addToCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      getTotalItems: () => 0,
      getTotalPrice: () => 0,
      getCartItems: () => [],
    }
  }

  return context
}
