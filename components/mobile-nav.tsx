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
      <SheetContent side="left" className="w-full max-w-xs bg-black border-zinc-800 text-white">
        <div className="flex flex-col h-full">
          <div className="flex-1 py-6">
            <nav className="grid gap-4">
              <SheetClose asChild>
                <Link href="/" className="text-lg uppercase tracking-[0.2em] transition-colors hover:text-zinc-400">Home</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/shop" className="text-lg uppercase tracking-[0.2em] transition-colors hover:text-zinc-400">Shop</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about" className="text-lg uppercase tracking-[0.2em] transition-colors hover:text-zinc-400">About</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/contact" className="text-lg uppercase tracking-[0.2em] transition-colors hover:text-zinc-400">Contact</Link>
              </SheetClose>
              {isAdmin && (
                <SheetClose asChild>
                  <Link href="/admin" className="text-lg uppercase tracking-[0.2em] transition-colors hover:text-zinc-400">Admin</Link>
                </SheetClose>
              )}
            </nav>
          </div>
          <div className="border-t border-zinc-900 pt-6">
            {user ? (
              <div className="flex flex-col gap-6">
                <SheetClose asChild>
                  <Link href="/profile" className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-zinc-800 text-white rounded-none">
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm uppercase tracking-widest text-zinc-400">{user.email}</span>
                  </Link>
                </SheetClose>
                <form action={signOut}>
                  <Button variant="outline" type="submit" className="w-full rounded-none uppercase tracking-[0.3em] text-[10px] h-12 border-zinc-800 hover:bg-white hover:text-black">Logout</Button>
                </form>
              </div>
            ) : (
              <div className="grid gap-4">
                <SheetClose asChild>
                  <Link href="/login">
                    <Button variant="outline" className="w-full rounded-none uppercase tracking-[0.2em] text-xs h-12 border-zinc-800 hover:bg-white hover:text-black">Login</Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/signup">
                    <Button className="w-full rounded-none uppercase tracking-[0.2em] text-xs h-12 bg-white text-black hover:bg-zinc-200">Sign Up</Button>
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
