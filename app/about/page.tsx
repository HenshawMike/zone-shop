import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-red-600">About Zone</h1>

      <div className="relative w-full h-[50vh] mb-12 rounded-lg overflow-hidden">
        <Image
          src="/images/zone-team.jpeg"
          alt="Zone fashion team"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-lg mb-6">
            Zone is an Abuja-based streetwear fashion brand inspired by Nigerian youth culture. We deliver bold, modern
            styles for those who lead, not follow.
          </p>
          <p className="text-lg mb-6">
            Founded in 2023, our mission is to create authentic streetwear that represents the energy and creativity of
            Nigeria's urban youth. Each piece in our collection is designed with attention to detail, quality materials,
            and a distinctive style that sets you apart.
          </p>
          <p className="text-lg mb-6">
            Born from the streets of Abuja, our collective represents the raw energy and creative rebellion of Nigeria's
            urban youth. Each design tells a story of our journey.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg mb-6">
            We're more than just a clothing brand – we're a movement that celebrates authenticity, self-expression, and
            the vibrant spirit of Nigerian street culture.
          </p>
          <p className="text-lg mb-6">
            Zone stands at the intersection of fashion, music, and art, creating a platform for young creatives to
            express themselves through bold designs and unapologetic style.
          </p>
          <p className="text-lg mb-6">
            Whether you're looking for statement pieces or everyday essentials with an edge, Zone offers clothing that
            empowers you to express your unique identity.
          </p>
          <Link href="/shop">
            <Button className="bg-red-600 hover:bg-red-700 text-white mt-4">Shop Our Collection</Button>
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Join the Movement</h2>
        <p className="text-lg mb-8 max-w-3xl">
          Zone isn't just about what you wear – it's about being part of a community that pushes boundaries and
          challenges the status quo. Follow us on social media to stay updated on our latest drops, events, and
          collaborations.
        </p>
        <Link href="/contact">
          <Button className="bg-red-600 hover:bg-red-700 text-white">Connect With Us</Button>
        </Link>
      </div>
    </div>
  )
}
