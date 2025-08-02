"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addProduct(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to add products.")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    throw new Error("You do not have permission to perform this action.")
  }

  const imageFile = formData.get("image") as File
  let imageUrl: string | null = null
  let uploadPath: string | null = null

  if (imageFile && imageFile.size > 0) {
    const fileName = `${Date.now()}-${imageFile.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile)

    if (uploadError) {
      throw new Error(`Failed to upload image: ${uploadError.message}`)
    }
    uploadPath = uploadData.path
    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(uploadData.path)
    imageUrl = urlData.publicUrl
  }

  const productData = {
    name: formData.get("name") as string,
    price: parseFloat(formData.get("price") as string),
    category: (formData.get("category") as string) || null,
    description: (formData.get("description") as string) || null,
    image: imageUrl,
  }

  const { error } = await supabase.from("products").insert([productData])

  if (error) {
    if (uploadPath) {
      await supabase.storage.from("product-images").remove([uploadPath])
    }
    throw new Error(`Failed to add product: ${error.message}`)
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

  if (!user) {
    throw new Error("You must be logged in to update products.")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    throw new Error("You do not have permission to perform this action.")
  }

  const imageFile = formData.get("image") as File

  const productUpdateData: {
    name: string
    price: number
    category: string | null
    description: string | null
    image?: string
  } = {
    name: formData.get("name") as string,
    price: parseFloat(formData.get("price") as string),
    category: (formData.get("category") as string) || null,
    description: (formData.get("description") as string) || null,
  }

  if (imageFile && imageFile.size > 0) {
    const { data: oldProduct } = await supabase.from("products").select("image").eq("id", productId).single()
    if (oldProduct?.image) {
      const oldFileName = oldProduct.image.split("/").pop()
      if (oldFileName) {
        await supabase.storage.from("product-images").remove([oldFileName])
      }
    }

    const fileName = `${Date.now()}-${imageFile.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile)

    if (uploadError) {
      throw new Error(`Failed to upload image: ${uploadError.message}`)
    }

    const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(uploadData.path)
    productUpdateData.image = urlData.publicUrl
  }

  const { error } = await supabase.from("products").update(productUpdateData).eq("id", productId)

  if (error) {
    throw new Error(`Failed to update product: ${error.message}`)
  }

  revalidatePath("/admin")
  revalidatePath("/shop")
  revalidatePath("/")
}

export async function deleteProduct(productId: number) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error("You must be logged in to delete products.")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    throw new Error("You do not have permission to perform this action.")
  }

  const { data: product } = await supabase.from("products").select("image").eq("id", productId).single()
  if (product?.image) {
    const fileName = product.image.split("/").pop()
    if (fileName) {
      await supabase.storage.from("product-images").remove([fileName])
    }
  }

  const { error } = await supabase.from("products").delete().eq("id", productId)

  if (error) {
    throw new Error(`Failed to delete product: ${error.message}`)
  }

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
