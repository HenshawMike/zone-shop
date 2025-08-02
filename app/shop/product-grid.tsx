"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { ProductCard } from "@/components/product-card"
import type { Product, Profile } from "@/lib/types"
import { Button } from "@/components/ui/button"

interface ProductGridProps {
  serverProducts: Product[]
  profile: Profile | null
}

export default function ProductGrid({ serverProducts, profile }: ProductGridProps) {
  const [products, setProducts] = useState(serverProducts)
  const supabase = createClient()

  const allCategories = [
    "all",
    ...Array.from(new Set(serverProducts.map((p) => p.category).filter(Boolean) as string[])),
  ]
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    setProducts(serverProducts)
  }, [serverProducts])

  useEffect(() => {
    const channel = supabase
      .channel("realtime products")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "products" }, (payload) => {
        setProducts((currentProducts) =>
          currentProducts.map((product) => (product.id === payload.new.id ? (payload.new as Product) : product)),
        )
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, setProducts])

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 bg-zinc-900 p-1 rounded-full">
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "ghost"}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                selectedCategory === category ? "bg-red-600 hover:bg-red-700 text-white" : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>
      <motion.div
        key={selectedCategory}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredProducts.map((product) => (
          <motion.div key={product.id} variants={cardVariants}>
            <ProductCard product={product} profile={profile} isAdmin={profile?.role === "admin"} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
