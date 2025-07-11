import { Users, Calendar, Star, Gift } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function Catering() {
  const packages = [
    {
      name: "Budget Friendly Package",
      price: "₱22,000-₱40,000",
      pax: "50-100 people",
      icon: Gift,
      features: [
        "Pick one from 7 food categories",
        "Pork, Chicken, Fish & Vegetable dishes",
        "Coffee Jelly & Buko Pandan desserts",
        "Steamed rice & choice of noodles",
        "Lemonade & Iced tea",
        "Complete buffet setup with food warmers",
        "Ceramic plates, utensils & glassware",
        "8-seater round tables with floor-length covers",
        "Artificial flower centerpieces",
        "Professional food attendant/scooper",
      ],
      events: ["Family Reunion", "Small Office Party", "Birthday Celebration"],
      popular: true,
      pricing: [
        { pax: "50 pax", price: "₱22,000" },
        { pax: "70 pax", price: "₱30,000" },
        { pax: "100 pax", price: "₱40,000" },
      ],
      addOns: [
        { name: "Sounds & Lights", price: "₱6,000" },
        { name: "Photobooth", price: "₱3,500" },
        { name: "Host MC", price: "₱3,500" },
        { name: "Clown and Magician", price: "₱3,000" },
      ],
    },
    {
      name: "Bella Package",
      price: "₱27,000-₱54,000",
      pax: "50-100 people",
      icon: Users,
      features: [
        "Pick one from 7 food categories",
        "Premium Pork & Beef selections",
        "Chicken Cordon Bleu & Fish specialties",
        "Mixed vegetables & Chopsuey",
        "Coffee Jelly & Buko Pandan desserts",
        "Complete catering setup with linens",
        "Mono block chairs with floor-length covers",
        "Decorated tables with centerpieces",
        "Professional waiters & food attendant",
        "Cake and gift table setup",
      ],
      events: ["Wedding Reception", "Corporate Event", "Anniversary"],
      popular: false,
      pricing: [
        { pax: "50 pax", price: "₱27,000" },
        { pax: "100 pax", price: "₱54,000" },
      ],
      addOns: [
        { name: "Sounds & Lights", price: "₱6,000" },
        { name: "Photobooth", price: "₱3,500" },
        { name: "Host MC", price: "₱3,500" },
        { name: "Clown and Magician", price: "₱3,000" },
      ],
    },
    {
      name: "Kids Party Package",
      price: "₱70,000-₱97,000",
      pax: "100-150 people",
      icon: Star,
      features: [
        "Complete adult & kids meal options",
        "4-layer chocolate fountain with dippers",
        "Balloon decorations & ceiling balloons",
        "2 Clowns/Magician entertainment",
        "Thematic styro backdrop (8x12ft)",
        "Photo booth (2-3 hours) with photographer",
        "Complete catering setup & waiters",
        "Party freebies: hats, balloons, prizes, candy bags",
        "Full party hosting & games handling",
        "Magic show entertainment",
      ],
      events: ["Kids Birthday", "Children's Party", "School Events"],
      popular: false,
      pricing: [
        { pax: "100 pax", price: "₱70,000" },
        { pax: "70 pax (50 adults/20 kids)", price: "₱77,000" },
        { pax: "100 pax (70 adults/30 kids)", price: "₱87,000" },
        { pax: "150 pax (100 adults/50 kids)", price: "₱97,000" },
      ],
      note: "Additional ₱400 per head for excess persons",
    },
  ]

  return (
    <section id="catering" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-black mb-4">Catering Packages</h2>
          <p className="text-lg text-slate-black/80 max-w-2xl mx-auto">
            Make your special occasions memorable with our carefully curated catering packages. From intimate gatherings
            to grand celebrations, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`relative hover:shadow-xl transition-all duration-300 ${pkg.popular ? "border-clay-amber ring-2 ring-clay-amber/20" : "border-clay-amber/20"}`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-clay-amber text-white">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-clay-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <pkg.icon className="w-8 h-8 text-clay-amber" />
                </div>
                <CardTitle className="text-xl text-slate-black">{pkg.name}</CardTitle>
                <div className="text-3xl font-bold text-clay-amber">{pkg.price}</div>
                <div className="text-sm text-slate-black/70">{pkg.pax}</div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-black mb-3">Package Includes:</h4>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm text-slate-black/80">
                        <div className="w-2 h-2 bg-clay-amber rounded-full mr-3 flex-shrink-0 mt-1.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.pricing && (
                  <div>
                    <h4 className="font-semibold text-slate-black mb-3">Pricing Options:</h4>
                    <div className="space-y-1">
                      {pkg.pricing.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex justify-between text-sm">
                          <span className="text-slate-black/70">{option.pax}</span>
                          <span className="font-semibold text-clay-amber">{option.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pkg.addOns && (
                  <div>
                    <h4 className="font-semibold text-slate-black mb-3">Available Add-ons:</h4>
                    <div className="space-y-1">
                      {pkg.addOns.map((addon, addonIndex) => (
                        <div key={addonIndex} className="flex justify-between text-sm">
                          <span className="text-slate-black/70">{addon.name}</span>
                          <span className="font-semibold text-clay-amber">{addon.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pkg.note && (
                  <div className="text-xs text-slate-black/60 italic border-t border-clay-amber/20 pt-3">
                    {pkg.note}
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-slate-black mb-3">Perfect For:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.events.map((event, eventIndex) => (
                      <Badge key={eventIndex} variant="secondary" className="text-xs">
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  asChild
                  className={`w-full ${pkg.popular ? "bg-clay-amber hover:bg-clay-amber/90" : "bg-clay-amber/90 hover:bg-clay-amber"} text-white`}
                >
                  <Link href="https://www.facebook.com/ClaydenFH" target="_blank">
                    Book This Package
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-clay-amber/10 to-saffron-cream/20 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-black mb-4">Need a Custom Package?</h3>
          <p className="text-lg text-slate-black/80 mb-6 max-w-2xl mx-auto">
            Have specific requirements or a larger event? We can create a personalized catering package that fits your
            needs and budget perfectly.
          </p>
          <Button asChild size="lg" className="bg-clay-amber hover:bg-clay-amber/90 text-white">
            <Link href="https://www.facebook.com/ClaydenFH" target="_blank">
              <Calendar className="w-5 h-5 mr-2" />
              Request Custom Quote
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
