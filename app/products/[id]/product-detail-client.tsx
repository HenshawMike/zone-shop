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
    <div className="container mx-auto px-4 py-24">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link href="/shop" className="inline-flex items-center text-xs uppercase tracking-widest text-zinc-500 hover:text-white mb-12 transition-colors">
          <ArrowLeft className="h-3 w-3 mr-2" />
          Back to Collection
        </Link>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative aspect-square overflow-hidden border border-zinc-900"
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
          className="flex flex-col"
        >
          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-widest mb-6">{product.name}</h1>
          <p className="text-2xl font-light text-zinc-400 mb-12 tracking-tighter">₦{product.price.toLocaleString()}</p>

          <div className="mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Description</h3>
            <p className="text-sm font-light leading-relaxed text-zinc-300 tracking-wide">
              {product.description ||
                "This premium quality item from Zone represents the bold Nigerian streetwear style. Perfect for those who want to make a statement."}
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">Category</h3>
            <p className="text-sm font-light text-zinc-400 uppercase tracking-widest">{product.category}</p>
          </div>

          <div className="pt-8 border-t border-zinc-900">
            <AddToCartButton product={product} />
          </div>
        </motion.div>
      </div>
    </div>
  )
} 