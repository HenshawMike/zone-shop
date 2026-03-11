"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function AddToCartButton({ product }: { product: Product }) {
  const [isAdded, setIsAdded] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.name} has been added to your cart.`)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdded}
      variant="outline"
      className={cn(
        "w-full h-14 rounded-none text-xs uppercase tracking-widest transition-all duration-500",
        isAdded
          ? "bg-zinc-900 border-zinc-900 text-white"
          : "border-white bg-white text-black hover:bg-black hover:text-white"
      )}
    >
      <motion.div
        key={String(isAdded)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        {isAdded ? (
          <>
            <Check className="mr-2 h-3 w-3" />
            Confirmed
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-3 w-3" />
            Add to Bag
          </>
        )}
      </motion.div>
    </Button>
  )
}
