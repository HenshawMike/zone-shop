export const dynamic = 'force-dynamic';

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "./submit-button"
import { signIn } from "@/lib/actions/auth"

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="relative flex-1 flex items-center justify-center min-h-screen overflow-hidden p-4">
      {/* Background video */}
      <video
        src="/images/products/auth-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Login card — sits above the video */}
      <Card className="relative z-10 w-full max-w-md bg-black/80 backdrop-blur-sm border border-zinc-800 rounded-none overflow-hidden">
        <CardHeader className="pt-12 px-12 pb-6">
          <CardTitle className="text-3xl font-light uppercase tracking-[0.3em] text-white">Login</CardTitle>
          <CardDescription className="text-zinc-500 uppercase tracking-widest text-[10px] mt-2">Access your account.</CardDescription>
        </CardHeader>
        <CardContent className="px-12">
          <form id="login-form" className="grid gap-8">
            <div className="grid gap-3">
              <Label htmlFor="email" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="EMAIL@DOMAIN.COM"
                required
                autoComplete="email"
                className="bg-transparent border-zinc-700 rounded-none focus:border-white transition-all text-xs h-12"
              />
            </div>
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="bg-transparent border-zinc-700 rounded-none focus:border-white transition-all text-xs h-12"
              />
            </div>
            <SubmitButton formAction={signIn} className="w-full bg-white text-black hover:bg-zinc-200 rounded-none text-xs uppercase tracking-[0.3em] h-14 transition-all">
              Initialize Session
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-zinc-900/80 text-zinc-400 text-[10px] uppercase tracking-widest text-center border border-zinc-800">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
        <CardFooter className="pb-12 px-12 pt-6">
          <div className="text-center text-[10px] uppercase tracking-widest text-zinc-600 w-full">
            No account?{" "}
            <Link href="/signup" className="text-white hover:underline transition-all">
              Join the movement
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
