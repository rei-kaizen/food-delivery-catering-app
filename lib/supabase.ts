import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface FoodOrder {
  id?: string
  customer_name: string
  phone: string
  delivery_address: string
  order_items: OrderItem[]
  preferred_delivery_time?: string
  payment_method: string
  receipt_url?: string
  total_amount: number
  status?: string
  notes?: string
  created_at?: string
  updated_at?: string
}

export interface OrderItem {
  item_id: string
  item_name: string
  quantity: number
  price: number
}

export interface CateringBooking {
  id?: string
  customer_name: string
  email?: string
  phone: string
  number_of_guests: number
  package_id: string
  package_name: string
  package_price: number
  venue: string
  event_date: string
  event_time: string
  payment_method: string
  payment_slip_url?: string
  deposit_amount?: number
  total_amount: number
  status?: string
  notes?: string
  customizations?: string
  created_at?: string
  updated_at?: string
}

// File upload helper
export const uploadFile = async (file: File, bucket: string, path: string) => {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  })

  if (error) {
    throw error
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path)

  return publicUrl
}

// Database operations
export const insertFoodOrder = async (order: FoodOrder) => {
  const { data, error } = await supabase.from("food_orders").insert([order]).select().single()

  if (error) {
    throw error
  }

  return data
}

export const insertCateringBooking = async (booking: CateringBooking) => {
  const { data, error } = await supabase.from("catering_bookings").insert([booking]).select().single()

  if (error) {
    throw error
  }

  return data
}
