import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { Profile } from "@/lib/types"

export default function FeaturedProducts({ profile }: { profile: Profile | null }) {
  // Get featured products or first 4 if none are marked as featured
  const featuredProducts = products.filter((product) => product.featured) || products.slice(0, 4)

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
        <h2 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] text-white">Trending Now</h2>
        <Link
          href="/shop"
          className="group flex items-center text-xs uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all mt-4 md:mt-0"
        >
          View All Records
          <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} isAdmin={false} profile={profile} />
        ))}
      </div>

      <div className="mt-24 text-center">
        <Link href="/shop">
          <Button variant="outline" className="rounded-none text-xs uppercase tracking-[0.3em] border-zinc-800 hover:bg-white hover:text-black transition-all px-12 h-14">
            Shop All Collections
          </Button>
        </Link>
      </div>
    </section>
  )
}
