"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?message=Could not authenticate user: ${error.message}`)
  }

  return redirect("/")
}

export const signUp = async (formData: FormData) => {
  "use server"

  const origin = (await headers()).get("origin")
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const name = formData.get("name") as string
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        brand: "zone",
      },
    },
  })

  if (error) {
    return redirect(`/signup?message=Could not authenticate user: ${error.message}`)
  }

  // If user is created, insert name into profiles table
  if (data?.user) {
    await supabase.from("profiles").upsert({
      id: data.user.id,
      email,
      name,
    })
  }

  return redirect("/signup?message=Check email to continue sign up process")
}

export const requestPasswordReset = async (formData: FormData) => {
  "use server"

  const origin = (await headers()).get("origin")
  const email = formData.get("email") as string
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  })

  if (error) {
    return redirect(
      `/forgot-password?message=Could not send password reset link: ${error.message}`
    )
  }

  return redirect(
    "/forgot-password?message=Password reset link has been sent to your email"
  )
}

export const resetPassword = async (formData: FormData) => {
  "use server"

  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const code = formData.get("code") as string

  if (password !== confirmPassword) {
    return redirect(
      `/reset-password?code=${code}&message=Passwords do not match`
    )
  }

  const supabase = await createClient()

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

  if (exchangeError) {
    return redirect(
      `/reset-password?code=${code}&message=Invalid or expired password reset link: ${exchangeError.message}`
    )
  }

  const { error: updateError } = await supabase.auth.updateUser({ password })

  if (updateError) {
    return redirect(
      `/reset-password?code=${code}&message=Could not update password: ${updateError.message}`
    )
  }

  return redirect("/login?message=Your password has been reset successfully.")
}

export const signOut = async () => {
  "use server"

  const supabase = await createClient()
  await supabase.auth.signOut()
  return redirect("/login")
} 