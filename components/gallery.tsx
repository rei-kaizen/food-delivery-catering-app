"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar } from "lucide-react"

export default function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const events = [
    {
      image: "/team-building-event.jpg",
      venue: "Grand Ballroom, Makati",
      eventName: "Team Building",
      guestCount: 150,
      category: "Corporate",
      date: "March 2024",
      description: "Corporate team building event with full catering service",
    },
    {
      image: "/civil-wedding.jpg",
      venue: "Private Residence, Quezon City",
      eventName: "Civil Wedding",
      guestCount: 80,
      category: "Wedding",
      date: "February 2024",
      description: "Intimate civil wedding celebration with elegant Filipino cuisine",
    },
    {
      image: "/kids-birthday-party.jpg",
      venue: "Community Center, Pasig",
      eventName: "Kid's Birthday Party",
      guestCount: 120,
      category: "Birthday",
      date: "January 2024",
      description: "Fun-filled children's birthday party with kid-friendly menu",
    },
    {
      image: "/company-function.jpg",
      venue: "Garden Venue, Antipolo",
      eventName: "Birthday Celebration",
      guestCount: 60,
      category: "Birthday",
      date: "December 2023",
      description: "Garden birthday celebration with traditional Filipino dishes",
    },
    {
      image: "/birthday-celebration.jpg",
      venue: "Office Building, BGC",
      eventName: "Company Function",
      guestCount: 45,
      category: "Corporate",
      date: "November 2023",
      description: "Corporate function with premium catering packages",
    },
    {
      image: "/baptismal-reception.jpg",
      venue: "Church Hall, Manila",
      eventName: "Baptismal Reception",
      guestCount: 90,
      category: "Religious",
      date: "October 2023",
      description: "Traditional baptismal reception with family-style Filipino meals",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Corporate":
        return "bg-blue-500"
      case "Wedding":
        return "bg-pink-500"
      case "Birthday":
        return "bg-yellow-500"
      case "Religious":
        return "bg-purple-500"
      default:
        return "bg-clay-amber"
    }
  }

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-mocha-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-black mb-4">Event Gallery</h2>
          <p className="text-lg text-slate-black/80 max-w-2xl mx-auto">
            Take a look at some of the memorable events we've catered. From intimate gatherings to grand celebrations,
            we bring exceptional Filipino cuisine to every occasion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border-clay-amber/20 overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={`${event.eventName} at ${event.venue}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                {/* Category Badge */}
                <Badge className={`absolute top-4 left-4 ${getCategoryColor(event.category)} text-white`}>
                  {event.category}
                </Badge>

                {/* Guest Count Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Users className="w-4 h-4 text-clay-amber" />
                  <span className="text-sm font-semibold text-slate-black">{event.guestCount}</span>
                </div>

                {/* Event Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{event.eventName}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-slate-black/70 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{event.date}</span>
                  </div>
                  <div className="text-clay-amber font-semibold text-sm">{event.guestCount} guests</div>
                </div>

                <p className="text-slate-black/70 text-sm leading-relaxed">{event.description}</p>

                {/* Hover Effect Details */}
                <div
                  className={`mt-4 transition-all duration-300 ${
                    hoveredIndex === index ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-black/60">
                    <span>Professional catering service</span>
                    <span>⭐ Excellent feedback</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-clay-amber/10 to-saffron-cream/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-black mb-4">Ready to Make Your Event Memorable?</h3>
            <p className="text-lg text-slate-black/80 mb-6 max-w-2xl mx-auto">
              Let us cater your next special occasion with the same care and quality showcased in these events.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.facebook.com/ClaydenFH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-clay-amber hover:bg-clay-amber/90 text-white font-semibold rounded-lg transition-colors"
              >
                View More Photos
              </a>
              <a
                href="#catering"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-clay-amber text-clay-amber hover:bg-clay-amber hover:text-white font-semibold rounded-lg transition-colors"
              >
                Book Your Event
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
