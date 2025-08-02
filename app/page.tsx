import { createClient } from "@/lib/supabase/server"
import HomePageClient from "./home-page-client"
import type { Profile } from "@/lib/types"

export default async function Home() {
  const supabase = await createClient()
  const { data: products } = await supabase.from("products").select("*").order("id")
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile: Profile | null = null
  if (user) {
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()
    profile = data
  }

  return <HomePageClient products={products ?? []} profile={profile} />
}
