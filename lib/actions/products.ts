"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

import { z } from "zod"

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  category: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
})

export async function addProduct(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Authentication required")

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") throw new Error("Unauthorized access")

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    description: formData.get("description"),
  })

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors.map(e => e.message).join(", "))
  }

  const imageFile = formData.get("image") as File
  let imageUrl: string | null = null
  let uploadPath: string | null = null

  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, "_")}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile)

    if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`)

    uploadPath = uploadData.path
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(uploadData.path)
    imageUrl = urlData.publicUrl
  }

  const { error } = await supabase.from("products").insert([{
    ...validatedFields.data,
    image: imageUrl,
  }])

  if (error) {
    if (uploadPath) await supabase.storage.from("product-images").remove([uploadPath])
    throw new Error(`Database error: ${error.message}`)
  }

  revalidatePath("/admin")
  revalidatePath("/shop")
  revalidatePath("/")
}

export async function updateProduct(productId: number, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Authentication required")

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") throw new Error("Unauthorized access")

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    category: formData.get("category"),
    description: formData.get("description"),
  })

  if (!validatedFields.success) {
    throw new Error(validatedFields.error.errors.map(e => e.message).join(", "))
  }

  const imageFile = formData.get("image") as File
  const productUpdateData: any = { ...validatedFields.data }

  if (imageFile && imageFile.size > 0) {
    // Delete old image if exists
    const { data: oldProduct } = await supabase.from("products").select("image").eq("id", productId).single()
    if (oldProduct?.image) {
      const oldFileName = oldProduct.image.split("/").pop()
      if (oldFileName) await supabase.storage.from("product-images").remove([oldFileName])
    }

    const fileName = `${Date.now()}-${imageFile.name.replace(/\s+/g, "_")}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile)

    if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`)

    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(uploadData.path)
    productUpdateData.image = urlData.publicUrl
  }

  const { error } = await supabase.from("products").update(productUpdateData).eq("id", productId)

  if (error) throw new Error(`Update failed: ${error.message}`)

  revalidatePath("/admin")
  revalidatePath("/shop")
  revalidatePath("/")
}

export async function deleteProduct(productId: number) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Authentication required")

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (profile?.role !== "admin") throw new Error("Unauthorized access")

  // Delete image from storage first
  const { data: product } = await supabase.from("products").select("image").eq("id", productId).single()
  if (product?.image) {
    const fileName = product.image.split("/").pop()
    if (fileName) await supabase.storage.from("product-images").remove([fileName])
  }

  const { error } = await supabase.from("products").delete().eq("id", productId)

  if (error) throw new Error(`Deletion failed: ${error.message}`)

  revalidatePath("/admin")
  revalidatePath("/shop")
  revalidatePath("/")
}


export async function updateProductAvailability(productId: number, isAvailable: boolean) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to update products.")
  }

  // RLS will handle the admin check, but we can double-check here
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    throw new Error("You do not have permission to perform this action.")
  }

  const { error } = await supabase.from("products").update({ is_available: isAvailable }).eq("id", productId)

  if (error) {
    throw new Error(`Failed to update product: ${error.message}`)
  }

  revalidatePath("/admin")
  revalidatePath("/shop")
  revalidatePath("/")
}
