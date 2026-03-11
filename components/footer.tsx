import Link from "next/link"
import { Instagram, MessageCircle, MapPin, Mail, Phone } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-10 w-20">
                <Image src="/images/zone-logo.jpeg" alt="ZONE" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-zinc-400 mb-4 max-w-md">
              Zone is an Abuja-based streetwear fashion brand inspired by Nigerian youth culture. We deliver bold,
              modern styles for those who lead, not follow.
            </p>
            <div className="flex items-center text-zinc-500 mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-xs uppercase tracking-wider">Based in Abuja, Nigeria</span>
            </div>
            <div className="flex items-center text-zinc-500 mb-2">
              <Mail className="h-4 w-4 mr-2" />
              <span className="text-xs uppercase tracking-wider">zonexix31@gmail.com</span>
            </div>
            <div className="flex items-center text-zinc-500">
              <Phone className="h-4 w-4 mr-2" />
              <span className="text-xs uppercase tracking-wider">08167226602</span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Connect</h3>
            <div className="flex space-x-6 mb-6">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </Link>
            </div>
            <Link
              href={`https://wa.me/2348167226602?text=${encodeURIComponent("Hi, I'm interested in ordering from Zone. Can you help me?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors border-b border-zinc-800 pb-1"
            >
              Order via WhatsApp
            </Link>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Zone Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
