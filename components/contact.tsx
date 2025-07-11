import { Phone, Clock, MapPin, Facebook, MessageCircle } from "lucide-react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+63 991 264 4729", "Click to call directly"],
      action: "tel:+639912644729",
    },
    {
      icon: Clock,
      title: "Operating Hours",
      details: ["Monday - Sunday", "9:00 AM - 9:00 PM"],
      action: null,
    },
    {
      icon: MapPin,
      title: "Service Areas",
      details: ["Metro Manila", "Nearby Provinces"],
      action: null,
    },
    {
      icon: Facebook,
      title: "Facebook Page",
      details: ["@claydensfoodhub", "Follow for updates"],
      action: "https://www.facebook.com/ClaydenFH",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-mocha-beige/30 to-clay-amber/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-black mb-4">Get in Touch</h2>
          <p className="text-lg text-slate-black/80 max-w-2xl mx-auto">
            Have questions about our menu or catering services? We're here to help! Reach out to us through any of the
            channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="text-center border-clay-amber/20 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-clay-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-clay-amber" />
                </div>
                <CardTitle className="text-lg text-slate-black">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {info.details.map((detail, detailIndex) => (
                    <p
                      key={detailIndex}
                      className={`${detailIndex === 0 ? "font-semibold text-slate-black" : "text-slate-black/70"} text-sm`}
                    >
                      {detail}
                    </p>
                  ))}
                </div>
                {info.action && (
                  <Button asChild size="sm" className="mt-4 bg-clay-amber hover:bg-clay-amber/90 text-white">
                    <Link href={info.action} target={info.action.startsWith("http") ? "_blank" : undefined}>
                      {info.title === "Phone Number" ? "Call Now" : "Visit Page"}
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-clay-amber/20">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative w-12 h-12">
                <Image src="/claydens-logo.png" alt="Clayden's Food Hub Logo" fill className="object-contain" />
              </div>
              <span className="font-bold text-slate-black text-xl">Clayden's Food Hub</span>
            </div>
            <p className="text-slate-black/70 mb-4">Bringing authentic Filipino flavors to your table since 2021</p>
            <div className="flex justify-center space-x-6">
              <Link
                href="https://www.facebook.com/ClaydenFH"
                target="_blank"
                className="text-clay-amber hover:text-clay-amber/80 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </Link>
              <Link
                href="https://www.facebook.com/ClaydenFH"
                target="_blank"
                className="text-clay-amber hover:text-clay-amber/80 transition-colors"
              >
                <MessageCircle className="w-6 h-6" />
              </Link>
            </div>
            <p className="text-sm text-slate-black/60 mt-6">© 2024 Clayden's Food Hub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>
  )
}
