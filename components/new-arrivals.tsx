"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Product, Profile } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function NewArrivals({ allProducts, profile }: { allProducts: Product[]; profile: Profile | null }) {
  const newArrivals = allProducts.sort((a, b) => b.id - a.id).slice(0, 4) // show 4 newest

  return (
    <section className="container mx-auto px-4 py-24 border-t border-zinc-900">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16">
        <h2 className="text-2xl md:text-3xl font-light uppercase tracking-[0.2em] text-white">New Arrivals</h2>
        <Link
          href="/shop"
          className="group flex items-center text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors mt-4 md:mt-0"
        >
          Explore Collection
          <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {newArrivals.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <ProductCard product={product} isAdmin={false} profile={profile} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}
