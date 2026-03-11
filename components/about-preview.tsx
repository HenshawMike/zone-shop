import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutPreview() {
  return (
    <section className="container mx-auto px-4 py-24 border-t border-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div className="relative h-[500px] overflow-hidden">
          <Image
            src="/images/zone-team.jpeg"
            alt="Zone fashion team"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.2em] mb-12 text-white">Our Story</h2>
          <p className="text-sm font-light leading-relaxed mb-6 text-zinc-400 tracking-wide">
            Zone is an Abuja-based streetwear fashion brand inspired by Nigerian youth culture. We deliver bold, modern
            styles for those who lead, not follow.
          </p>
          <p className="text-sm font-light leading-relaxed mb-12 text-zinc-400 tracking-wide">
            Born from the streets of Abuja, our collective represents the raw energy and creative rebellion of Nigeria's
            urban youth. Each design tells a story of our journey.
          </p>
          <Link href="/about">
            <Button variant="outline" className="rounded-none text-xs uppercase tracking-widest border-white text-white hover:bg-white hover:text-black px-12 h-12">The Narrative</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
