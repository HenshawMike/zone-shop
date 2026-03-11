"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import NewArrivals from "@/components/new-arrivals"
import FeaturedCollection from "@/components/featured-collection"
import AboutPreview from "@/components/about-preview"
import ContactCta from "@/components/contact-cta"
import type { Product, Profile } from "@/lib/types"
import { Slideshow } from "@/components/slideshow"

const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
}

export default function HomePageClient({ products, profile }: { products: Product[]; profile: Profile | null }) {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {profile && (
        <motion.div {...FADE_IN_ANIMATION_SETTINGS} className="px-4 md:px-8 text-center pt-12 flex flex-col items-center justify-center">
          <h1
            className="text-4xl md:text-6xl font-light tracking-[0.2em] text-white uppercase flex flex-col md:flex-row items-center justify-center gap-6"
          >
            Welcome to
            <div className="relative h-16 w-48 md:h-24 md:w-72">
              <Image
                src="/images/zone-logo-removebg-preview.png"
                alt="ZONE"
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </div>
          </h1>
        </motion.div>
      )}
      <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
        <Slideshow profile={profile} />
      </motion.div>
      <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
        <NewArrivals allProducts={products ?? []} profile={profile} />
      </motion.div>
      <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
        <FeaturedCollection />
      </motion.div>
      <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
        <AboutPreview />
      </motion.div>
      <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
        <ContactCta />
      </motion.div>
    </div>
  )
} 