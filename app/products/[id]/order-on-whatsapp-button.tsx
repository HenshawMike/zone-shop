"use client"

import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { WhatsAppIcon } from "../../../components/icons"

export function OrderOnWhatsAppButton({ product }: { product: Product }) {
  const handleOrder = () => {
    const phoneNumber = "+2348167226602" // Replace with your WhatsApp number
    const message = `Hi, I'd like to order the following product:\n\n*${product.name}*\nPrice: ₦${product.price}`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleOrder}
      className="w-full bg-green-600 hover:bg-green-700 text-white"
    >
      <WhatsAppIcon className="mr-2 h-5 w-5" />
      Order on WhatsApp
    </Button>
  )
}
