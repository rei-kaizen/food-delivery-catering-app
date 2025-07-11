-- Create tables for order and booking system

-- Food delivery orders table
CREATE TABLE food_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  delivery_address TEXT NOT NULL,
  order_items JSONB NOT NULL, -- Array of {item_id, item_name, quantity, price}
  preferred_delivery_time TIMESTAMP,
  payment_method VARCHAR(50) NOT NULL,
  receipt_url TEXT, -- URL to uploaded receipt file
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Catering bookings table
CREATE TABLE catering_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  number_of_guests INTEGER NOT NULL,
  package_id VARCHAR(50) NOT NULL,
  package_name VARCHAR(255) NOT NULL,
  package_price DECIMAL(10,2) NOT NULL,
  venue TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  payment_slip_url TEXT, -- URL to uploaded payment slip
  deposit_amount DECIMAL(10,2), -- 30% deposit for reservations
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  customizations TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_food_orders_created_at ON food_orders(created_at);
CREATE INDEX idx_food_orders_status ON food_orders(status);
CREATE INDEX idx_catering_bookings_created_at ON catering_bookings(created_at);
CREATE INDEX idx_catering_bookings_status ON catering_bookings(status);
CREATE INDEX idx_catering_bookings_event_date ON catering_bookings(event_date);

-- Enable Row Level Security
ALTER TABLE food_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE catering_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since we don't have authentication)
CREATE POLICY "Allow public insert on food_orders" ON food_orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert on catering_bookings" ON catering_bookings
  FOR INSERT WITH CHECK (true);
