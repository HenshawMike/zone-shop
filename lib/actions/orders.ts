"use server"

import { createClient } from "@/lib/supabase/server"

export async function createOrder(productId: number, userId: string, total: number) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("orders")
    .insert([{ product_id: productId, user_id: userId, total: total, status: "Pending" }])
    .select()

  if (error) {
    console.error("Error creating order:", error)
    return { error }
  }

  return { data }
}
