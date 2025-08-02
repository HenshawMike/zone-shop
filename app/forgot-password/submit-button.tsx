'use client'

import { useFormStatus } from 'react-dom'
import { type ComponentProps } from 'react'
import { Button } from '@/components/ui/button'

type Props = ComponentProps<'button'> & {
  children: React.ReactNode
}

export function SubmitButton({ children, ...props }: Props) {
  const { pending } = useFormStatus()

  return (
    <Button {...props} type="submit" aria-disabled={pending} disabled={pending}>
      {children}
    </Button>
  )
}
