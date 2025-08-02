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
            <div className="relative h-8 w-16">
              <Image src="/images/zone-logo.jpeg" alt="ZONE" fill className="object-contain" />
            </div>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-red-600 text-zinc-400">
              Home
            </Link>
            <Link href="/shop" className="text-sm font-medium transition-colors hover:text-red-600 text-zinc-400">
              Shop
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-red-600 text-zinc-400">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-red-600 text-zinc-400">
              Contact
            </Link>
            {profile?.role === "admin" && (
              <Link href="/admin" className="text-sm font-medium transition-colors hover:text-red-600">
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
                  <Button variant="destructive" className="text-sm">
                    Logout
                  </Button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="outline" className="text-sm bg-transparent">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-red-600 hover:bg-red-700 text-sm">Sign Up</Button>
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

