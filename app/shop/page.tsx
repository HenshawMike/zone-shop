import { createClient } from "@/lib/supabase/server"
import ProductGrid from "./product-grid"

export default async function ShopPage() {
  const supabase = await createClient()
  const { data: products } = await supabase.from("products").select("*").order("id")
  const {
    data: { user },
  } = await supabase.auth.getUser()
  let profile = null
  if (user) {
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()
    profile = data
  }

  return (
    <div className="relative min-h-screen">
      {/* Background video */}
      <video
        src="/images/products/shop-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
      />
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-black/70 -z-10" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.3em] mb-16 text-center text-white">The Collection</h1>
        <ProductGrid serverProducts={products ?? []} profile={profile} />
      </div>
    </div>
  )
}
