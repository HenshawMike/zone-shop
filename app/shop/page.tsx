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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-red-600">Shop</h1>
      <ProductGrid serverProducts={products ?? []} profile={profile} />
    </div>
  )
}
