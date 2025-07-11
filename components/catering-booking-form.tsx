"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Loader2, Users, Gift, Star } from "lucide-react"
import { insertCateringBooking, uploadFile, type CateringBooking } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

const cateringBookingSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phone: z.string().min(10, "Please enter a valid phone number"),
  number_of_guests: z.number().min(1, "Number of guests must be at least 1"),
  package_id: z.string().min(1, "Please select a catering package"),
  venue: z.string().min(5, "Please enter the venue details"),
  event_date: z.string().min(1, "Please select an event date"),
  event_time: z.string().min(1, "Please select an event time"),
  payment_method: z.enum(["gcash", "bpi", "dp"]),
  notes: z.string().optional(),
  customizations: z.string().optional(),
})

type CateringBookingFormData = z.infer<typeof cateringBookingSchema>

interface CateringBookingFormProps {
  onSuccess: () => void
}

const cateringPackages = [
  {
    id: "intimate",
    name: "Intimate Gathering",
    price: 2500,
    pax: "10-15 people",
    icon: Users,
    features: [
      "3 Main Dishes",
      "2 Side Dishes",
      "Rice for all",
      "Disposable plates & utensils",
      "Free delivery within 5km",
    ],
  },
  {
    id: "celebration",
    name: "Celebration Package",
    price: 5800,
    pax: "25-30 people",
    icon: Gift,
    features: [
      "5 Main Dishes",
      "3 Side Dishes",
      "Rice for all",
      "Dessert included",
      "Proper serving utensils",
      "Free delivery within 10km",
    ],
    popular: true,
  },
  {
    id: "grand",
    name: "Grand Feast",
    price: 12000,
    pax: "50-60 people",
    icon: Star,
    features: [
      "8 Main Dishes",
      "5 Side Dishes",
      "Rice for all",
      "2 Dessert options",
      "Complete serving setup",
      "Free delivery anywhere in Metro Manila",
      "Dedicated service staff",
    ],
  },
]

export default function CateringBookingForm({ onSuccess }: CateringBookingFormProps) {
  const [paymentSlipFile, setPaymentSlipFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<string>("")
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CateringBookingFormData>({
    resolver: zodResolver(cateringBookingSchema),
  })

  const paymentMethod = watch("payment_method")
  const numberOfGuests = watch("number_of_guests")

  const getSelectedPackageDetails = () => {
    return cateringPackages.find((pkg) => pkg.id === selectedPackage)
  }

  const calculateTotal = () => {
    const packageDetails = getSelectedPackageDetails()
    if (!packageDetails) return 0
    return packageDetails.price
  }

  const calculateDeposit = () => {
    return Math.round(calculateTotal() * 0.3)
  }

  const onSubmit = async (data: CateringBookingFormData) => {
    if (!selectedPackage) {
      toast({
        title: "Package not selected",
        description: "Please select a catering package.",
        variant: "destructive",
      })
      return
    }

    if (!paymentSlipFile) {
      toast({
        title: "Payment slip required",
        description: "Please upload your payment slip or deposit receipt.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Upload payment slip
      const fileName = `payment-slips/catering/${Date.now()}-${paymentSlipFile.name}`
      const paymentSlipUrl = await uploadFile(paymentSlipFile, "payment-proofs", fileName)

      const packageDetails = getSelectedPackageDetails()!
      const totalAmount = calculateTotal()
      const depositAmount = paymentMethod === "dp" ? calculateDeposit() : totalAmount

      // Prepare booking data
      const bookingData: CateringBooking = {
        customer_name: data.customer_name,
        email: data.email || undefined,
        phone: data.phone,
        number_of_guests: data.number_of_guests,
        package_id: data.package_id,
        package_name: packageDetails.name,
        package_price: packageDetails.price,
        venue: data.venue,
        event_date: data.event_date,
        event_time: data.event_time,
        payment_method: data.payment_method,
        payment_slip_url: paymentSlipUrl,
        deposit_amount: paymentMethod === "dp" ? depositAmount : undefined,
        total_amount: totalAmount,
        notes: data.notes || undefined,
        customizations: data.customizations || undefined,
      }

      // Insert booking into database
      await insertCateringBooking(bookingData)

      toast({
        title: "Booking submitted successfully!",
        description: "We'll contact you within 24 hours to confirm your catering booking.",
      })

      onSuccess()
    } catch (error) {
      console.error("Error submitting booking:", error)
      toast({
        title: "Error submitting booking",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-slate-black">Contact Information</CardTitle>
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
            <Label htmlFor="email">Email Address (Optional)</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your.email@example.com"
              className="border-clay-amber/30 focus:border-clay-amber"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="number_of_guests">Number of Guests *</Label>
            <Input
              id="number_of_guests"
              type="number"
              min="1"
              {...register("number_of_guests", { valueAsNumber: true })}
              placeholder="Enter expected number of guests"
              className="border-clay-amber/30 focus:border-clay-amber"
            />
            {errors.number_of_guests && <p className="text-red-500 text-sm mt-1">{errors.number_of_guests.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Package Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-slate-black">Select Catering Package</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {cateringPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedPackage === pkg.id
                    ? "border-clay-amber bg-clay-amber/5"
                    : "border-clay-amber/20 hover:border-clay-amber/40"
                }`}
                onClick={() => {
                  setSelectedPackage(pkg.id)
                  setValue("package_id", pkg.id)
                }}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-clay-amber text-white text-xs">
                    Popular
                  </Badge>
                )}

                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-clay-amber/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <pkg.icon className="w-6 h-6 text-clay-amber" />
                  </div>
                  <h3 className="font-semibold text-slate-black">{pkg.name}</h3>
                  <p className="text-2xl font-bold text-clay-amber">₱{pkg.price.toLocaleString()}</p>
                  <p className="text-sm text-slate-black/70">{pkg.pax}</p>
                </div>

                <ul className="space-y-1 text-sm">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-black/80">
                      <div className="w-1.5 h-1.5 bg-clay-amber rounded-full mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {errors.package_id && <p className="text-red-500 text-sm mt-2">{errors.package_id.message}</p>}
        </CardContent>
      </Card>

      {/* Event Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-slate-black">Event Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="venue">Venue *</Label>
            <Textarea
              id="venue"
              {...register("venue")}
              placeholder="Complete venue address including landmarks"
              className="border-clay-amber/30 focus:border-clay-amber"
              rows={3}
            />
            {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="event_date">Event Date *</Label>
              <Input
                id="event_date"
                type="date"
                {...register("event_date")}
                className="border-clay-amber/30 focus:border-clay-amber"
                min={new Date().toISOString().split("T")[0]}
              />
              {errors.event_date && <p className="text-red-500 text-sm mt-1">{errors.event_date.message}</p>}
            </div>

            <div>
              <Label htmlFor="event_time">Event Time *</Label>
              <Input
                id="event_time"
                type="time"
                {...register("event_time")}
                className="border-clay-amber/30 focus:border-clay-amber"
              />
              {errors.event_time && <p className="text-red-500 text-sm mt-1">{errors.event_time.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="customizations">Special Requests & Customizations</Label>
            <Textarea
              id="customizations"
              {...register("customizations")}
              placeholder="Any dietary restrictions, special dishes, or customizations"
              className="border-clay-amber/30 focus:border-clay-amber"
              rows={3}
            />
          </div>
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
            <Select onValueChange={(value) => setValue("payment_method", value as any)}>
              <SelectTrigger className="border-clay-amber/30 focus:border-clay-amber">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gcash">GCash (Full Payment)</SelectItem>
                <SelectItem value="bpi">BPI Online Banking (Full Payment)</SelectItem>
                <SelectItem value="dp">Reservation Deposit (30% of total)</SelectItem>
              </SelectContent>
            </Select>
            {errors.payment_method && <p className="text-red-500 text-sm mt-1">{errors.payment_method.message}</p>}
          </div>

          {paymentMethod && (
            <>
              <div className="p-4 bg-clay-amber/5 rounded-lg border border-clay-amber/20">
                <h4 className="font-semibold text-slate-black mb-2">Payment Summary</h4>
                {selectedPackage && (
                  <>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Package: {getSelectedPackageDetails()?.name}</span>
                      <span>₱{calculateTotal().toLocaleString()}</span>
                    </div>
                    {paymentMethod === "dp" && (
                      <>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Deposit (30%):</span>
                          <span className="font-semibold text-clay-amber">₱{calculateDeposit().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm text-slate-black/70">
                          <span>Remaining Balance:</span>
                          <span>₱{(calculateTotal() - calculateDeposit()).toLocaleString()}</span>
                        </div>
                      </>
                    )}
                    {paymentMethod !== "dp" && (
                      <div className="flex justify-between font-semibold border-t border-clay-amber/20 pt-2">
                        <span>Total Amount:</span>
                        <span className="text-clay-amber">₱{calculateTotal().toLocaleString()}</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div>
                <Label htmlFor="payment_slip">Upload Payment Slip *</Label>
                <div className="mt-2">
                  <input
                    id="payment_slip"
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setPaymentSlipFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("payment_slip")?.click()}
                    className="w-full border-clay-amber/30 text-clay-amber hover:bg-clay-amber hover:text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {paymentSlipFile ? paymentSlipFile.name : "Choose file"}
                  </Button>
                </div>

                {paymentMethod === "gcash" && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="font-medium">GCash Payment Details:</p>
                    <p>Number: +63 991 264 4729</p>
                    <p>Name: Clayden's Food Hub</p>
                    <p className="text-blue-600 mt-1">
                      Amount to pay: ₱
                      {paymentMethod === "dp" ? calculateDeposit().toLocaleString() : calculateTotal().toLocaleString()}
                    </p>
                  </div>
                )}

                {paymentMethod === "bpi" && (
                  <div className="mt-2 p-3 bg-red-50 rounded-lg text-sm">
                    <p className="font-medium">BPI Account Details:</p>
                    <p>Account: 1234-5678-90</p>
                    <p>Name: Clayden's Food Hub</p>
                    <p className="text-red-600 mt-1">
                      Amount to pay: ₱
                      {paymentMethod === "dp" ? calculateDeposit().toLocaleString() : calculateTotal().toLocaleString()}
                    </p>
                  </div>
                )}

                {paymentMethod === "dp" && (
                  <div className="mt-2 p-3 bg-yellow-50 rounded-lg text-sm">
                    <p className="font-medium">Reservation Deposit (30%):</p>
                    <p>Pay ₱{calculateDeposit().toLocaleString()} to secure your booking</p>
                    <p>
                      Remaining balance of ₱{(calculateTotal() - calculateDeposit()).toLocaleString()} due on event day
                    </p>
                  </div>
                )}
              </div>
            </>
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
        disabled={isSubmitting || !selectedPackage}
        className="w-full bg-clay-amber hover:bg-clay-amber/90 text-white py-6 text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting Booking...
          </>
        ) : (
          `Submit Booking ${selectedPackage ? `(₱${paymentMethod === "dp" ? calculateDeposit().toLocaleString() : calculateTotal().toLocaleString()})` : ""}`
        )}
      </Button>
    </form>
  )
}
