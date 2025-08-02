import { ProductCard } from "@/components/product-card"
import { products } from "@/lib/products"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function FeaturedProducts() {
  // Get featured products or first 4 if none are marked as featured
  const featuredProducts = products.filter((product) => product.featured) || products.slice(0, 4)

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600">Trending Now</h2>
        <Link
          href="/shop"
          className="group flex items-center text-zinc-400 hover:text-red-600 transition-colors mt-2 md:mt-0"
        >
          View all products
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/shop">
          <Button className="bg-red-600 hover:bg-red-700 text-white">Shop All Products</Button>
        </Link>
      </div>
    </section>
  )
}
