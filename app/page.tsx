import Hero from "@/components/hero"
import About from "@/components/about"
import Menu from "@/components/menu"
import Catering from "@/components/catering"
import Gallery from "@/components/gallery"
import Testimonials from "@/components/testimonials"
import OrderInstructions from "@/components/order-instructions"
import Contact from "@/components/contact"
import FloatingCart from "@/components/floating-cart"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Menu />
      <Catering />
      <Gallery />
      <Testimonials />
      <OrderInstructions />
      <Contact />
      <FloatingCart />
    </main>
  )
}
