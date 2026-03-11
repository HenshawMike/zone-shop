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
                        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-4 w-4 text-[10px] font-bold text-black bg-white rounded-none">
                            {cartCount}
                        </span>
                    )}
                    <span className="sr-only">Open Cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-black border-zinc-900 text-white flex flex-col p-12">
                <SheetHeader className="mb-8">
                    <SheetTitle className="text-2xl font-light uppercase tracking-[0.3em] text-white">Your Cart</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto pr-4">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-zinc-600 uppercase tracking-widest text-[10px] py-24">Your cart is empty.</p>
                    ) : (
                        <div className="divide-y divide-zinc-900">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center py-8">
                                    <div className="relative h-20 w-20 border border-zinc-900 rounded-none overflow-hidden mr-6 flex-shrink-0">
                                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs uppercase tracking-widest text-white mb-1">{item.name}</p>
                                        <p className="text-xs text-zinc-500 font-light">₦{item.price.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-zinc-900 rounded-none h-8">
                                            <button className="px-2 hover:bg-white hover:text-black transition-all" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></button>
                                            <span className="px-2 text-xs font-light">{item.quantity}</span>
                                            <button className="px-2 hover:bg-white hover:text-black transition-all" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></button>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-white" onClick={() => removeFromCart(item.id)}><Trash2 className="h-3 w-3" /></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <SheetFooter className="border-t border-zinc-900 pt-8 mt-auto">
                        <div className="w-full">
                            <div className="flex justify-between items-center mb-8">
                                <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Subtotal</p>
                                <p className="text-lg font-light tracking-tighter">₦{cartTotal.toLocaleString()}</p>
                            </div>
                            <SheetClose asChild>
                                <Button onClick={handleWhatsAppOrder} className="w-full bg-white text-black hover:bg-zinc-200 rounded-none text-xs uppercase tracking-[0.3em] h-14 transition-all">
                                    Initialize Order
                                </Button>
                            </SheetClose>
                        </div>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}
