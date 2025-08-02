"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Product, Profile } from "@/lib/types"
import { ProductCard } from "@/components/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function NewArrivals({ allProducts, profile }: { allProducts: Product[]; profile: Profile | null }) {
  const newArrivals = allProducts.sort((a, b) => b.id - a.id).slice(0, 4) // show 4 newest

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600">New Arrivals</h2>
        <Link
          href="/shop"
          className="group flex items-center text-zinc-400 hover:text-red-600 transition-colors mt-2 md:mt-0"
        >
          View all products
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
