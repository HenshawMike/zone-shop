"use server"

import { z } from 'zod'
import { Resend } from 'resend'
import * as React from 'react'
import ContactFormEmail from '@/components/emails/contact-form-email'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
})

export type ContactFormState = {
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}

export async function sendEmail(prevState: ContactFormState, formData: FormData): Promise<ContactFormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return {
      message: 'Please fix the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, message } = validatedFields.data

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'zonexix31@gmail.com',
      subject: 'New Message from ZONE Contact Form',
      reply_to: email,
      react: React.createElement(ContactFormEmail, { name, email, message }),
    })
    return { message: 'Your message has been sent successfully!' }
  } catch (error) {
    console.error('Email sending error:', error)
    return { message: 'Something went wrong. Please try again.' }
  }
}
