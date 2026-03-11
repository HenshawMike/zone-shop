"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { signOut } from "@/lib/actions/auth"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getAvatarColor } from "@/lib/utils"

interface MobileNavProps {
    user: SupabaseUser | null
    isAdmin: boolean
}

export function MobileNav({ user, isAdmin }: MobileNavProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-black border-zinc-900 text-white p-8">
                <div className="flex flex-col h-full">
                    <div className="flex-1 py-8">
                        <nav className="flex flex-col gap-6">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/shop", label: "Shop" },
                                { href: "/contact", label: "Contact" },
                            ].map(({ href, label }) => (
                                <SheetClose asChild key={href}>
                                    <Link href={href} className="text-xs uppercase tracking-[0.3em] font-light text-zinc-400 hover:text-white transition-colors">
                                        {label}
                                    </Link>
                                </SheetClose>
                            ))}
                            {isAdmin && (
                                <SheetClose asChild>
                                    <Link href="/admin" className="text-xs uppercase tracking-[0.3em] font-light text-zinc-400 hover:text-white transition-colors">
                                        Admin
                                    </Link>
                                </SheetClose>
                            )}
                        </nav>
                    </div>
                    <div className="border-t border-zinc-900 pt-8">
                        {user ? (
                            <div className="flex flex-col gap-6">
                                <SheetClose asChild>
                                    <Link href="/profile" className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 rounded-none">
                                            <AvatarFallback className={`${getAvatarColor(user.email ?? '')} rounded-none text-xs`}>
                                                {user.email?.[0].toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-[10px] uppercase tracking-widest text-zinc-400">{user.email}</span>
                                    </Link>
                                </SheetClose>
                                <form action={signOut}>
                                    <Button variant="outline" type="submit" className="w-full rounded-none text-[10px] uppercase tracking-widest border-zinc-800 hover:bg-white hover:text-black transition-all h-12">
                                        Logout
                                    </Button>
                                </form>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <SheetClose asChild>
                                    <Link href="/login">
                                        <Button variant="ghost" className="w-full rounded-none text-[10px] uppercase tracking-widest hover:bg-zinc-900 h-12">Login</Button>
                                    </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="/signup">
                                        <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-none text-[10px] uppercase tracking-widest h-12">Sign Up</Button>
                                    </Link>
                                </SheetClose>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
