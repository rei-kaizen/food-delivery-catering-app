"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Minus } from "lucide-react"
import { insertFoodOrder, uploadFile, type FoodOrder, type OrderItem } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { menuItems } from "./menu-data"

const foodDeliverySchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  delivery_address: z.string().min(10, "Please enter a complete delivery address"),
  preferred_delivery_time: z.string().optional(),
  payment_method: z.enum(["gcash", "bpi", "cod"]),
  notes: z.string().optional(),
})

type FoodDeliveryFormData = z.infer<typeof foodDeliverySchema>

interface FoodDeliveryFormProps {
  onSuccess: () => void
  prefilledCart?: { [key: string]: number }
  onCartUpdate?: (cart: { [key: string]: number }) => void
}

export default function FoodDeliveryForm({ onSuccess, prefilledCart, onCartUpdate }: FoodDeliveryFormProps) {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>(() => {
    if (prefilledCart) {
      // Convert external cart IDs to menu item IDs
      const convertedCart: { [key: string]: number } = {}
      Object.entries(prefilledCart).forEach(([externalId, quantity]) => {
        // Try to find matching menu item
        const menuItem = menuItems.find((item) => item.id === externalId)
        if (menuItem) {
          convertedCart[menuItem.id] = quantity
        }
      })
      return convertedCart
    }
    return {}
  })
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FoodDeliveryFormData>({
    resolver: zodResolver(foodDeliverySchema),
  })

  const paymentMethod = watch("payment_method")

  const addItem = (itemId: string) => {
    const newItems = {
      ...selectedItems,
      [itemId]: (selectedItems[itemId] || 0) + 1,
    }
    setSelectedItems(newItems)
    onCartUpdate?.(newItems)
  }

  const removeItem = (itemId: string) => {
    const newItems = { ...selectedItems }
    if (newItems[itemId] > 1) {
      newItems[itemId] -= 1
    } else {
      delete newItems[itemId]
    }
    setSelectedItems(newItems)
    onCartUpdate?.(newItems)
  }

  const getTotalAmount = () => {
    return Object.entries(selectedItems).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find((item) => item.id === itemId)
      return total + (item ? item.price * quantity : 0)
    }, 0)
  }

  const getOrderItems = (): OrderItem[] => {
    return Object.entries(selectedItems).map(([itemId, quantity]) => {
      const item = menuItems.find((item) => item.id === itemId)!
      return {
        item_id: itemId,
        item_name: item.name,
        quantity,
        price: item.price,
      }
    })
  }

  const onSubmit = async (data: FoodDeliveryFormData) => {
    if (Object.keys(selectedItems).length === 0) {
      toast({
        title: "No items selected",
        description: "Please select at least one item to order.",
        variant: "destructive",
      })
      return
    }

    if (paymentMethod !== "cod" && !receiptFile) {
      toast({
        title: "Receipt required",
        description: "Please upload your payment receipt.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      let receiptUrl = ""

      // Upload receipt if provided
      if (receiptFile) {
        const fileName = `receipts/food-delivery/${Date.now()}-${receiptFile.name}`
        receiptUrl = await uploadFile(receiptFile, "payment-proofs", fileName)
      }

      // Prepare order data
      const orderData: FoodOrder = {
        customer_name: data.customer_name,
        phone: data.phone,
        delivery_address: data.delivery_address,
        order_items: getOrderItems(),
        preferred_delivery_time: data.preferred_delivery_time || undefined,
        payment_method: data.payment_method,
        receipt_url: receiptUrl || undefined,
        total_amount: getTotalAmount(),
        notes: data.notes || undefined,
      }

      // Insert order into database
      await insertFoodOrder(orderData)

      toast({
        title: "Order submitted successfully!",
        description: "We'll contact you shortly to confirm your order.",
      })

      onSuccess()
    } catch (error) {
      console.error("Error submitting order:", error)
      toast({
        title: "Error submitting order",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [...new Set(menuItems.map((item) => item.category))]

  return (
    <div className="space-y-6 pb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-slate-black">Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer_name">Full Name *</Label>
                <Input
                  id="customer_name"
                  {...register("customer_name")}
                  placeholder="Enter your full name"
                  className="border-clay-amber/30 focus:border-clay-amber"
                />
                {errors.customer_name && <p className="text-red-500 text-sm mt-1">{errors.customer_name.message}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="09XX XXX XXXX"
                  className="border-clay-amber/30 focus:border-clay-amber"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="delivery_address">Delivery Address *</Label>
              <Textarea
                id="delivery_address"
                {...register("delivery_address")}
                placeholder="Complete address including landmarks"
                className="border-clay-amber/30 focus:border-clay-amber"
                rows={3}
              />
              {errors.delivery_address && (
                <p className="text-red-500 text-sm mt-1">{errors.delivery_address.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="preferred_delivery_time">Preferred Delivery Time</Label>
              <Input
                id="preferred_delivery_time"
                type="datetime-local"
                {...register("preferred_delivery_time")}
                className="border-clay-amber/30 focus:border-clay-amber"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Menu Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-slate-black">Select Items</CardTitle>
          </CardHeader>
          <CardContent>
            {categories.map((category) => (
              <div key={category} className="mb-6">
                <h4 className="font-semibold text-slate-black mb-3">{category}</h4>
                <div className="grid sm:grid-cols-1 gap-3">
                  {menuItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 border border-clay-amber/20 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-slate-black">{item.name}</div>
                          <div className="text-clay-amber font-semibold">₱{item.price.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedItems[item.id] ? (
                            <>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => removeItem(item.id)}
                                className="w-8 h-8 p-0 border-clay-amber text-clay-amber hover:bg-clay-amber hover:text-white"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="font-semibold text-slate-black min-w-[2rem] text-center">
                                {selectedItems[item.id]}
                              </span>
                              <Button
                                type="button"
                                size="sm"
                                onClick={() => addItem(item.id)}
                                className="w-8 h-8 p-0 bg-clay-amber hover:bg-clay-amber/90 text-white"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => addItem(item.id)}
                              className="bg-clay-amber hover:bg-clay-amber/90 text-white"
                            >
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}

            {Object.keys(selectedItems).length > 0 && (
              <div className="mt-6 p-4 bg-clay-amber/5 rounded-lg border border-clay-amber/20">
                <h4 className="font-semibold text-slate-black mb-2">Order Summary</h4>
                {Object.entries(selectedItems).map(([itemId, quantity]) => {
                  const item = menuItems.find((item) => item.id === itemId)!
                  return (
                    <div key={itemId} className="flex justify-between text-sm">
                      <span>
                        {quantity}x {item.name}
                      </span>
                      <span>₱{(item.price * quantity).toLocaleString()}</span>
                    </div>
                  )
                })}
                <div className="border-t border-clay-amber/20 mt-2 pt-2 flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-clay-amber">₱{getTotalAmount().toLocaleString()}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-slate-black">Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Payment Method *</Label>
              <select
                {...register("payment_method")}
                className="w-full mt-1 p-2 border border-clay-amber/30 rounded-md focus:border-clay-amber focus:outline-none"
              >
                <option value="">Select payment method</option>
                <option value="gcash">GCash</option>
                <option value="bpi">BPI Online Banking</option>
                <option value="cod">Cash on Delivery</option>
              </select>
              {errors.payment_method && <p className="text-red-500 text-sm mt-1">{errors.payment_method.message}</p>}
            </div>

            {paymentMethod && paymentMethod !== "cod" && (
              <div>
                <Label htmlFor="receipt">Upload Payment Receipt *</Label>
                <input
                  id="receipt"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                  className="w-full mt-1 p-2 border border-clay-amber/30 rounded-md focus:border-clay-amber focus:outline-none"
                />
                {paymentMethod === "gcash" && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="font-medium">GCash Payment Details:</p>
                    <p>Number: +63 991 264 4729</p>
                    <p>Name: Clayden's Food Hub</p>
                  </div>
                )}
                {paymentMethod === "bpi" && (
                  <div className="mt-2 p-3 bg-red-50 rounded-lg text-sm">
                    <p className="font-medium">BPI Account Details:</p>
                    <p>Account: 1234-5678-90</p>
                    <p>Name: Clayden's Food Hub</p>
                  </div>
                )}
              </div>
            )}

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Any additional information or special instructions"
                className="border-clay-amber/30 focus:border-clay-amber"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          disabled={isSubmitting || Object.keys(selectedItems).length === 0}
          className="w-full bg-clay-amber hover:bg-clay-amber/90 text-white py-6 text-lg"
        >
          {isSubmitting ? "Submitting Order..." : `Submit Order (₱${getTotalAmount().toLocaleString()})`}
        </Button>
      </form>
    </div>
  )
}
