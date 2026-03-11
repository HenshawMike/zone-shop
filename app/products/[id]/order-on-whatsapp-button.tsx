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
      variant="ghost"
      className="w-full h-14 rounded-none text-xs uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all duration-500 mt-4"
    >
      <WhatsAppIcon className="mr-2 h-3 w-3" />
      Enquire via WhatsApp
    </Button>
  )
}
