import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, TwitterIcon as TikTok, MapPin, Mail, Phone } from "lucide-react"

export default function ContactCta() {
  return (
    <section className="bg-zinc-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-600">Connect With Zone</h2>
          <p className="text-lg mb-8 text-zinc-300">
            Follow us on social media for the latest drops, styling tips, and behind-the-scenes content.
          </p>

          <div className="flex justify-center gap-6 mb-8">
            <Link href="https://www.instagram.com/6ixsoldiers_?igsh=ZWVpbXU1emMxa3h6&utm_source=qr" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full border-red-600 hover:bg-red-600/20">
                <Instagram className="h-5 w-5 mr-2 text-red-600" />
                Instagram
              </Button>
            </Link>
            <Link href="https://www.tiktok.com/@zone.xix?_t=ZS-8xjE9kJlA2h&_r=1" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="rounded-full border-red-600 hover:bg-red-600/20">
                <TikTok className="h-5 w-5 mr-2 text-red-600" />
                TikTok
              </Button>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-2 text-zinc-400 mb-8">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-red-600" />
              <span>Based in Abuja, Nigeria</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-red-600" />
              <span>zonexix31@gmail.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-red-600" />
              <span>08167226602</span>
            </div>
          </div>

          <Link
            href={`https://wa.me/2348167226602?text=${encodeURIComponent("Hi, I'm interested in ordering from Zone. Can you help me?")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white">Message Us on WhatsApp</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
