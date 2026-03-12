"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { ProductCard } from "@/components/product-card"
import type { Product, Profile } from "@/lib/types"

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
            .on("postgres_changes", { event: "*", schema: "public", table: "products" }, (payload) => {
                if (payload.eventType === "INSERT") {
                    setProducts((current) => [...current, payload.new as Product])
                } else if (payload.eventType === "UPDATE") {
                    setProducts((current) =>
                        current.map((product) => (product.id === payload.new.id ? (payload.new as Product) : product)),
                    )
                } else if (payload.eventType === "DELETE") {
                    setProducts((current) => current.filter((product) => product.id !== payload.old.id))
                }
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
            <div className="flex justify-center mb-16">
                <div className="flex flex-wrap justify-center gap-6">
                    {allCategories.map((category) => (
                        <button
                            key={category}
                            className={`text-xs uppercase tracking-[0.2em] transition-all pb-1 border-b-2 ${selectedCategory === category
                                ? "text-white border-white"
                                : "text-zinc-500 border-transparent hover:text-zinc-300"
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <motion.div
                key={selectedCategory}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center gap-8"
            >
                {filteredProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        variants={cardVariants}
                        className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.334rem)] xl:w-[calc(25%-1.5rem)]"
                    >
                        <ProductCard product={product} profile={profile} isAdmin={profile?.role === "admin"} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
