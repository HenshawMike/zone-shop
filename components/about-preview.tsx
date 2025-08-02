import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutPreview() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src="/images/zone-team.jpeg"
            alt="Zone fashion team"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-600">About Zone</h2>
          <p className="text-lg mb-6 text-zinc-300">
            Zone is an Abuja-based streetwear fashion brand inspired by Nigerian youth culture. We deliver bold, modern
            styles for those who lead, not follow.
          </p>
          <p className="text-lg mb-8 text-zinc-300">
            Born from the streets of Abuja, our collective represents the raw energy and creative rebellion of Nigeria's
            urban youth. Each design tells a story of our journey.
          </p>
          <Link href="/about">
            <Button className="bg-red-600 hover:bg-red-700 text-white">Learn More About Us</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
