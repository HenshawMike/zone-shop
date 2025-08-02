export const dynamic = 'force-dynamic';

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "./submit-button"
import { signIn } from "@/lib/actions/auth"

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-black">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">Login</CardTitle>
          <CardDescription className="text-zinc-300">Enter your email below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required autoComplete="email" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm text-red-600 hover:text-red-700 underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required autoComplete="current-password" />
            </div>
            <SubmitButton formAction={signIn} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-all">
              Login
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
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline text-red-600 hover:text-red-700">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
