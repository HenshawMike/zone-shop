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
                <Link href="/" className="text-lg font-medium transition-colors hover:text-red-600">Home</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/shop" className="text-lg font-medium transition-colors hover:text-red-600">Shop</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about" className="text-lg font-medium transition-colors hover:text-red-600">About</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/contact" className="text-lg font-medium transition-colors hover:text-red-600">Contact</Link>
              </SheetClose>
              {isAdmin && (
                <SheetClose asChild>
                  <Link href="/admin" className="text-lg font-medium transition-colors hover:text-red-600">Admin</Link>
                </SheetClose>
              )}
            </nav>
          </div>
          <div className="border-t border-zinc-800 pt-6">
            {user ? (
              <div className="flex flex-col gap-4">
                 <SheetClose asChild>
                  <Link href="/profile" className="flex items-center gap-3">
                     <Avatar className="h-9 w-9">
                      <AvatarFallback className={getAvatarColor(user.email ?? '')}>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.email}</span>
                  </Link>
                </SheetClose>
                <form action={signOut}>
                  <Button variant="destructive" type="submit" className="w-full">Logout</Button>
                </form>
              </div>
            ) : (
              <div className="grid gap-4">
                <SheetClose asChild>
                  <Link href="/login">
                    <Button variant="outline" className="w-full bg-transparent">Login</Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/signup">
                    <Button className="w-full bg-red-600 hover:bg-red-700">Sign Up</Button>
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
