import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Maria Santos",
      event: "Wedding Reception",
      rating: 5,
      text: "Clayden's Food Hub made our wedding day absolutely perfect! The food was incredible, and our guests couldn't stop raving about the lechon and pancit. Professional service from start to finish.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Carlos Reyes",
      event: "Corporate Event",
      rating: 5,
      text: "We've used Clayden's for multiple company events, and they never disappoint. The quality is consistent, delivery is always on time, and the team is so accommodating to our requests.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ana Dela Cruz",
      event: "Birthday Celebration",
      rating: 5,
      text: "Amazing food and service! They catered my mom's 70th birthday and everything was perfect. The adobo rice bowls were a huge hit. Definitely booking them again!",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Roberto Garcia",
      event: "Family Reunion",
      rating: 5,
      text: "Authentic Filipino flavors that reminded us of home. The family tray portions were generous and the lumpia was crispy and delicious. Highly recommended!",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-mocha-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-black mb-4">Customer Love</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-clay-amber text-clay-amber" />
              ))}
            </div>
            <span className="text-lg font-semibold text-slate-black">5.0</span>
            <span className="text-slate-black/70">(150+ reviews)</span>
          </div>
          <p className="text-lg text-slate-black/80 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers have to say about their experience with
            Clayden's Food Hub.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-clay-amber/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-4">
                  <Quote className="w-8 h-8 text-clay-amber/50 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-clay-amber text-clay-amber" />
                      ))}
                    </div>
                    <p className="text-slate-black/80 mb-4 italic">"{testimonial.text}"</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-clay-amber/10 rounded-full flex items-center justify-center">
                    <span className="text-clay-amber font-semibold text-sm">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-black">{testimonial.name}</div>
                    <div className="text-sm text-slate-black/70">{testimonial.event}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-slate-black/70 mb-6">Want to see more reviews from our happy customers?</p>
          <Button
            asChild
            variant="outline"
            className="border-clay-amber text-clay-amber hover:bg-clay-amber hover:text-white bg-transparent"
          >
            <Link href="https://www.facebook.com/ClaydenFH" target="_blank">
              View Facebook Reviews
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
