import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { products } from "@/lib/products"

export async function POST() {
  try {
    const supabase = await createClient()

    // Get the current user session
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 }
      )
    }

    // Verify user has admin role
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profileError || profile?.role !== "admin") {
      return NextResponse.json(
        { error: "Permission denied: User is not an admin" },
        { status: 403 }
      )
    }

    // Insert products
    const results = []
    
    for (const product of products) {
      const { data, error } = await supabase
        .from("products")
        .upsert(
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            description: product.description,
            is_available: product.is_available,
          },
          { onConflict: 'id' }
        )
        .select()

      if (error) {
        console.error(`Error upserting product ${product.name}:`, error)
        results.push({ id: product.id, name: product.name, status: 'error', error: error.message })
      } else {
        console.log(`Successfully processed product: ${product.name}`)
        results.push({ id: product.id, name: product.name, status: 'success' })
      }
    }

    return NextResponse.json({
      message: "Products seeded successfully",
      results
    })

  } catch (error) {
    console.error("Error in seed products API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
