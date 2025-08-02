"use client"

import { useCart } from "@/contexts/cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"

export function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart()

  const handleWhatsAppOrder = () => {
    const phoneNumber = "+2348167226602"
    let message = "Hi, I'd like to order the following items:\n\n"
    cartItems.forEach(item => {
      message += `*${item.name}* (x${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}\n`
    })
    message += `\n*Total: ₦${cartTotal.toLocaleString()}*`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {cartCount}
            </span>
          )}
          <span className="sr-only">Open Cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-black border-zinc-800 text-white flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-white">Your Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto pr-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-zinc-400 py-8">Your cart is empty.</p>
          ) : (
            <div className="divide-y divide-zinc-800">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center py-4">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} width={64} height={64} className="rounded-md mr-4" />
                  <div className="flex-1">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-zinc-400">₦{item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                    <span>{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeFromCart(item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <SheetFooter className="border-t border-zinc-800 pt-4">
            <div className="w-full">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">Subtotal</p>
                <p className="text-lg font-semibold">₦{cartTotal.toLocaleString()}</p>
              </div>
              <SheetClose asChild>
                <Button onClick={handleWhatsAppOrder} className="w-full bg-green-600 hover:bg-green-700">
                  Order on WhatsApp
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
