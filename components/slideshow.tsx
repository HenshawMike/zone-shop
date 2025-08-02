"use client"

import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Profile } from "@/lib/types"

const images = ["/images/IMG_5558.PNG", "/images/zone-logo.jpeg", "/images/zone-team.jpeg"]

export function Slideshow({ profile }: { profile: Profile | null }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden" ref={emblaRef}>
      <div className="flex h-full">
        {images.map((src, index) => (
          <div className="flex-[0_0_100%] relative" key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 100vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/30 flex items-end justify-center pb-16">
        {!profile && (
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
