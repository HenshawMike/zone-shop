"use client"

import { motion } from "framer-motion"
import NewArrivals from "@/components/new-arrivals"
import FeaturedCollection from "@/components/featured-collection"
import AboutPreview from "@/components/about-preview"
import ContactCta from "@/components/contact-cta"
import type { Product, Profile } from "@/lib/types"
import { Slideshow } from "@/components/slideshow"

import { Orbitron } from "next/font/google"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
}

export default function HomePageClient({ products, profile }: { products: Product[]; profile: Profile | null }) {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {profile && (
        <motion.div {...FADE_IN_ANIMATION_SETTINGS} className="px-4 md:px-8 text-center">
          <h1
            className={`text-5xl font-bold tracking-tight text-white ${orbitron.className}`}
          >
            Welcome to <span className="text-red-500">ZONE</span>
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