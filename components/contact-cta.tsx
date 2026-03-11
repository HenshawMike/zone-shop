import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, TwitterIcon as TikTok, MapPin, Mail, Phone } from "lucide-react"

export default function ContactCta() {
  return (
    <section className="bg-black py-24 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.2em] mb-8 text-white">Join the Zone</h2>
          <p className="text-sm font-light leading-relaxed mb-12 text-zinc-400 tracking-wide">
            Follow our journey for the latest drops, styling narratives, and the raw energy of Abuja streetwear.
          </p>

          <div className="flex justify-center gap-12 mb-16">
            <Link href="https://www.instagram.com/6ixsoldiers_?igsh=ZWVpbXU1emMxa3h6&utm_source=qr" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
              <Instagram className="h-6 w-6 text-zinc-500 group-hover:text-white transition-colors" />
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">Instagram</span>
            </Link>
            <Link href="https://www.tiktok.com/@zone.xix?_t=ZS-8xjE9kJlA2h&_r=1" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
              <TikTok className="h-6 w-6 text-zinc-500 group-hover:text-white transition-colors" />
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">TikTok</span>
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-4 text-xs uppercase tracking-widest text-zinc-600 mb-16">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-3" />
              <span>Abuja, Nigeria</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-3" />
              <span>zonexix31@gmail.com</span>
            </div>
          </div>

          <Link
            href={`https://wa.me/2348167226602?text=${encodeURIComponent("Hi, I'm interested in ordering from Zone. Can you help me?")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="rounded-none text-xs uppercase tracking-widest border-zinc-800 text-white hover:bg-white hover:text-black h-12 px-12">Enquire via WhatsApp</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
