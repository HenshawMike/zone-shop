"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Product, Profile } from "@/lib/types"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { updateProductAvailability } from "@/lib/actions/products"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import { ShoppingCart, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  isAdmin: boolean
  profile: Profile | null
}

export function ProductCard({ product, isAdmin, profile }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.name} has been added to your cart.`)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleAvailabilityChange = async (isAvailable: boolean) => {
    await updateProductAvailability(product.id, isAvailable)
  }

  return (
    <div
      className={cn(
        "group bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 transition-all hover:border-red-600/50",
        !product.is_available && "opacity-50",
      )}
    >
      <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden">
        <Image
          src={product.image 
            ? (product.image.startsWith('http') || product.image.startsWith('/') 
                ? product.image 
                : `/${product.image}`)
            : '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          onError={(e) => {
            // Fallback to a placeholder if the image fails to load
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/placeholder.svg';
          }}
        />
        {!product.is_available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-lg bg-red-600 px-4 py-2 rounded">OUT OF STOCK</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1 group-hover:text-red-600 transition-colors">{product.name}</h3>
        <p className="text-xl font-bold text-red-600 mb-4">₦{product.price.toLocaleString()}</p>

        {product.is_available ? (
          <Button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={cn(
              "w-full transition-colors",
              isAdded
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white",
            )}
          >
            {isAdded ? (
              <span className="flex items-center justify-center">
                <Check className="mr-2 h-4 w-4" />
                Added
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </span>
            )}
          </Button>
        ) : (
          <Button className="w-full" disabled>
            Out of Stock
          </Button>
        )}

        {isAdmin && (
          <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-zinc-800">
            <Switch
              id={`availability-${product.id}`}
              checked={product.is_available}
              onCheckedChange={handleAvailabilityChange}
            />
            <Label htmlFor={`availability-${product.id}`}>Available</Label>
          </div>
        )}
      </div>
    </div>
  )
}
