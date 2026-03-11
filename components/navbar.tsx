import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { signOut } from "@/lib/actions/auth"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MobileNav } from "./mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { CartDrawer } from "./cart-drawer"
import { getAvatarColor } from "@/lib/utils"

export default async function Navbar() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single()
    profile = data
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-32">
              <Image src="/images/zone-logo-removebg-preview.png" alt="ZONE" fill className="object-contain brightness-0 invert" />
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-xs tracking-widest uppercase font-medium transition-colors hover:text-white text-zinc-500">
              Home
            </Link>
            <Link href="/shop" className="text-xs tracking-widest uppercase font-medium transition-colors hover:text-white text-zinc-500">
              Shop
            </Link>
            <Link href="/about" className="text-xs tracking-widest uppercase font-medium transition-colors hover:text-white text-zinc-500">
              About
            </Link>
            <Link href="/contact" className="text-xs tracking-widest uppercase font-medium transition-colors hover:text-white text-zinc-500">
              Contact
            </Link>
            {profile?.role === "admin" && (
              <Link href="/admin" className="text-xs tracking-widest uppercase font-medium transition-colors hover:text-white">
                Admin
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <CartDrawer />
            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className={getAvatarColor(user.email ?? '')}>
                      {user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <form action={signOut}>
                  <Button variant="outline" className="rounded-none text-[10px] uppercase tracking-widest border-zinc-800 hover:bg-white hover:text-black transition-all h-9">
                    Logout
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-xs tracking-widest uppercase">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="text-xs tracking-widest uppercase border-zinc-700 hover:bg-white hover:text-black">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <CartDrawer />
            <MobileNav user={user} isAdmin={profile?.role === "admin"} />
          </div>
        </div>
      </div>
    </header>
  )
}

