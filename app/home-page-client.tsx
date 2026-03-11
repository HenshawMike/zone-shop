"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import NewArrivals from "@/components/new-arrivals"
import FeaturedCollection from "@/components/featured-collection"

import ContactCta from "@/components/contact-cta"
import type { Product, Profile } from "@/lib/types"

const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8 },
}

export default function HomePageClient({ products, profile }: { products: Product[]; profile: Profile | null }) {
  return (
    <div className="relative">
      {/* Fixed background video */}
      <video
        src="/images/products/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/65 -z-10" />

      {/* Page content */}
      <div className="flex flex-col gap-0 pb-24">
        {/* Hero: Welcome to ZONE */}
        <motion.section
          {...FADE_IN_ANIMATION_SETTINGS}
          className="flex flex-col items-center justify-center min-h-[60vh] px-4"
        >
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.2em] text-white uppercase flex flex-col md:flex-row items-center justify-center gap-6">
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
          {profile && (
            <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 mt-8">
              Welcome back to the zone
            </p>
          )}
        </motion.section>

        <div className="flex flex-col gap-24 mt-0">
          <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
            <NewArrivals allProducts={products ?? []} profile={profile} />
          </motion.div>
          <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
            <FeaturedCollection />
          </motion.div>

          <motion.div {...FADE_IN_ANIMATION_SETTINGS}>
            <ContactCta />
          </motion.div>
        </div>
      </div>
    </div>
  )
}