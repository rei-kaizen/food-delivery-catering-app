import { Clock, MapPin, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Fresh Ingredients",
      description:
        "We source the finest local ingredients to ensure every dish is packed with authentic Filipino flavors.",
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "Your food arrives hot and fresh within 30-45 minutes, guaranteed to satisfy your cravings.",
    },
    {
      icon: MapPin,
      title: "Wide Coverage",
      description: "Serving Metro Manila and nearby areas with reliable delivery and catering services.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-black mb-4">About Clayden's Food Hub</h2>
          <p className="text-lg text-slate-black/80 max-w-3xl mx-auto">
            Born from a passion for authentic Filipino cuisine, Clayden's Food Hub has been serving delicious,
            home-style meals and creating memorable dining experiences for families and businesses across the
            Philippines.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-clay-amber/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-clay-amber/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-clay-amber" />
                </div>
                <h3 className="text-xl font-semibold text-slate-black mb-4">{value.title}</h3>
                <p className="text-slate-black/70">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-clay-amber/10 to-saffron-cream/20 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-black mb-4">Our Mission</h3>
              <p className="text-lg text-slate-black/80 mb-6">
                To bring families and communities together through exceptional Filipino cuisine, delivered with love and
                served with pride. Every meal we prepare carries the warmth of Filipino hospitality.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white rounded-lg px-4 py-2 border border-clay-amber/20">
                  <span className="text-clay-amber font-semibold">Family Recipes</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 border border-clay-amber/20">
                  <span className="text-clay-amber font-semibold">Local Sourcing</span>
                </div>
                <div className="bg-white rounded-lg px-4 py-2 border border-clay-amber/20">
                  <span className="text-clay-amber font-semibold">Community First</span>
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <img
                src="/family-dining.jpg"
                alt="Families enjoying meals together at Clayden's Food Hub"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
