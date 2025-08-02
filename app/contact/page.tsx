"use client"

import { MapPin, Phone, Mail, Instagram, TwitterIcon as TikTok } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useFormState, useFormStatus } from "react-dom"
import { sendEmail, ContactFormState } from "@/lib/actions/email"
import { useEffect, useRef } from "react"

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={pending}>
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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-red-600">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-lg mb-8">
            Have questions about our products or want to place an order? Get in touch with us through any of these
            channels:
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <MapPin className="h-6 w-6 text-red-600" />
              <span className="text-lg">Based in Abuja, Nigeria</span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-red-600" />
              <span className="text-lg">08167226602</span>
            </div>

            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-red-600" />
              <span className="text-lg">zonexix31@gmail.com</span>
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full border-red-600 hover:bg-red-600/20">
                    <Instagram className="h-5 w-5 text-red-600" />
                    <span className="sr-only">Instagram</span>
                  </Button>
                </Link>
                <Link href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon" className="rounded-full border-red-600 hover:bg-red-600/20">
                    <TikTok className="h-5 w-5 text-red-600" />
                    <span className="sr-only">TikTok</span>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-xl font-bold mb-4">Order via WhatsApp</h3>
              <Link
                href={`https://wa.me/2348167226602?text=${encodeURIComponent(
                  "Hi, I'm interested in ordering from Zone. Can you help me?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-600 hover:bg-green-700 text-white">Message Us on WhatsApp</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form ref={formRef} action={formAction} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="w-full p-3 bg-zinc-800 rounded-md border border-zinc-700 focus:border-red-600 focus:outline-none"
              />
              {state.errors?.name && <p className="text-red-500 text-sm">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full p-3 bg-zinc-800 rounded-md border border-zinc-700 focus:border-red-600 focus:outline-none"
              />
              {state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email[0]}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full p-3 bg-zinc-800 rounded-md border border-zinc-700 focus:border-red-600 focus:outline-none"
              ></textarea>
              {state.errors?.message && <p className="text-red-500 text-sm">{state.errors.message[0]}</p>}
            </div>
            <SubmitButton />
            {state.message && (
              <p className={`${state.errors ? "text-red-500" : "text-green-500"} text-sm mt-2`}>{state.message}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
