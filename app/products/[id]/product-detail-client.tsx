"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import AddToCartButton from "./add-to-cart-button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/shop" className="inline-flex items-center text-zinc-400 hover:text-red-600 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Shop
        </Link>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square overflow-hidden rounded-lg border border-zinc-800"
        >
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">{product.name}</h1>
          <p className="text-3xl font-bold text-red-600 mb-6">₦{product.price.toLocaleString()}</p>
          <div className="mb-8 prose prose-invert">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p>
              {product.description ||
                "This premium quality item from Zone represents the bold Nigerian streetwear style. Perfect for those who want to make a statement."}
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Category</h3>
            <p className="text-zinc-300 capitalize">{product.category}</p>
          </div>
          <AddToCartButton product={product} />
        </motion.div>
      </div>
    </div>
  )
} 