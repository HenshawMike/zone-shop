import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.3em] mb-16 text-center text-white">The Narrative</h1>

      <div className="relative w-full h-[60vh] mb-24 overflow-hidden border border-zinc-900">
        <Image
          src="/images/zone-team.jpeg"
          alt="Zone fashion team"
          fill
          className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
          sizes="100vw"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start max-w-6xl mx-auto">
        <div className="space-y-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Our Story</h2>
            <div className="space-y-6 text-sm font-light leading-relaxed text-zinc-400 tracking-wide">
              <p>
                Zone is an Abuja-based streetwear fashion brand inspired by Nigerian youth culture. We deliver bold, modern
                styles for those who lead, not follow.
              </p>
              <p>
                Founded in 2023, our mission is to create authentic streetwear that represents the energy and creativity of
                Nigeria's urban youth. Each piece in our collection is designed with attention to detail, quality materials,
                and a distinctive style that sets you apart.
              </p>
              <p>
                Born from the streets of Abuja, our collective represents the raw energy and creative rebellion of Nigeria's
                urban youth. Each design tells a story of our journey.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-6">Our Vision</h2>
            <div className="space-y-6 text-sm font-light leading-relaxed text-zinc-400 tracking-wide">
              <p>
                We're more than just a clothing brand – we're a movement that celebrates authenticity, self-expression, and
                the vibrant spirit of Nigerian street culture.
              </p>
              <p>
                Zone stands at the intersection of fashion, music, and art, creating a platform for young creatives to
                express themselves through bold designs and unapologetic style.
              </p>
              <p>
                Whether you're looking for statement pieces or everyday essentials with an edge, Zone offers clothing that
                empowers you to express your unique identity.
              </p>
            </div>
            <Link href="/shop" className="inline-block mt-12">
              <Button variant="outline" className="rounded-none text-xs uppercase tracking-widest border-white text-white hover:bg-white hover:text-black px-12 h-12">Explore Collection</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-32 pt-24 border-t border-zinc-900 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-light uppercase tracking-widest mb-8 text-white">Join the Movement</h2>
        <p className="text-sm font-light leading-relaxed mb-12 text-zinc-400 tracking-wide">
          Zone isn't just about what you wear – it's about being part of a community that pushes boundaries and
          challenges the status quo.
        </p>
        <Link href="/contact">
          <Button variant="outline" className="rounded-none text-xs uppercase tracking-widest border-zinc-800 text-white hover:bg-white hover:text-black px-12 h-12">Connect With Us</Button>
        </Link>
      </div>
    </div>
  )
}
