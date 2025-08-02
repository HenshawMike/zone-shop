import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "../login/submit-button"
import { signUp } from "@/lib/actions/auth"

export default function Signup({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-black">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">Sign Up</CardTitle>
          <CardDescription className="text-zinc-300">Create your Zone account to join the movement.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="signup-form" className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" placeholder="Your full name" required autoComplete="name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required autoComplete="new-password" />
            </div>
            <SubmitButton formAction={signUp} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-all">
              Sign Up
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-red-100 text-red-700 text-center rounded-lg border border-red-200 animate-pulse">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <div className="mt-4 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link href="/login" className="underline text-red-600 hover:text-red-700">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
