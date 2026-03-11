"use client"

import { MapPin, Mail, Instagram, TwitterIcon as TikTok } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { sendEmail, ContactFormState } from "@/lib/actions/email"
import { useEffect, useRef } from "react"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" variant="outline" className="w-full h-12 rounded-none text-xs uppercase tracking-widest border-white text-white hover:bg-white hover:text-black transition-all" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  )
}

export default function ContactPage() {
  const initialState: ContactFormState = { message: "", errors: {} }
  const [state, formAction] = useFormState(sendEmail, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.message.includes("successfully")) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <div className="relative min-h-screen">
      {/* Background video — reusing the home hero */}
      <video
        src="/images/products/hero.mp4"
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
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.3em] mb-16 text-center text-white">Get in Touch</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-lg mb-8">
              Have questions about our products or want to place an order? Get in touch with us through any of these
              channels:
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4 text-xs font-light uppercase tracking-[0.2em] text-zinc-500">
                <MapPin className="h-4 w-4" />
                <span>Abuja, Nigeria</span>
              </div>

              <div className="flex items-center gap-4 text-xs font-light uppercase tracking-[0.2em] text-zinc-500">
                <Mail className="h-4 w-4" />
                <span>zonexix31@gmail.com</span>
              </div>

              <div className="pt-12">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-8 underline underline-offset-8">Follow</h3>
                <div className="flex gap-12">
                  <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                    <Instagram className="h-5 w-5 text-zinc-500 group-hover:text-white transition-colors" />
                  </Link>
                  <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                    <TikTok className="h-5 w-5 text-zinc-500 group-hover:text-white transition-colors" />
                  </Link>
                </div>
              </div>

              <div className="pt-12">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-600 mb-8 underline underline-offset-8">Direct</h3>
                <Link
                  href={`https://wa.me/2348167226602?text=${encodeURIComponent(
                    "Hi, I'm interested in ordering from Zone. Can you help me?"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" className="rounded-none text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors p-0 h-auto">Enquire via WhatsApp</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-black/60 backdrop-blur-sm p-12 border border-zinc-800">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-12 text-zinc-500">Send Message</h2>
            <form ref={formRef} action={formAction} className="space-y-12">
              <div className="space-y-4">
                <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-zinc-600">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="w-full bg-transparent border-b border-zinc-700 p-2 text-sm focus:border-white focus:outline-none transition-colors"
                  placeholder="Required"
                />
                {state.errors?.name && <p className="text-red-500 text-[10px] uppercase tracking-widest">{state.errors.name[0]}</p>}
              </div>
              <div className="space-y-4">
                <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-zinc-600">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full bg-transparent border-b border-zinc-700 p-2 text-sm focus:border-white focus:outline-none transition-colors"
                  placeholder="Required"
                />
                {state.errors?.email && <p className="text-red-500 text-[10px] uppercase tracking-widest">{state.errors.email[0]}</p>}
              </div>
              <div className="space-y-4">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-zinc-600">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-zinc-700 p-2 text-sm focus:border-white focus:outline-none transition-colors resize-none"
                  placeholder="Your Enquiry"
                ></textarea>
                {state.errors?.message && <p className="text-red-500 text-[10px] uppercase tracking-widest">{state.errors.message[0]}</p>}
              </div>
              <SubmitButton />
              {state.message && (
                <p className={`${state.errors ? "text-red-500" : "text-green-500"} text-sm mt-2`}>{state.message}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
