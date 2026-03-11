import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import { resetPassword } from "@/lib/actions/auth";

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { message: string, code: string };
}) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-black p-4">
      <Card className="w-full max-w-md bg-black border border-zinc-900 rounded-none overflow-hidden">
        <CardHeader className="pt-12 px-12 pb-6">
          <CardTitle className="text-3xl font-light uppercase tracking-[0.2em] text-white">Reset Password</CardTitle>
          <CardDescription className="text-zinc-500 uppercase tracking-widest text-[10px] mt-2">
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-12">
          <form id="reset-password-form" className="grid gap-8">
            <input type="hidden" name="code" value={searchParams.code} />
            <div className="grid gap-3">
              <Label htmlFor="password" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">New Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="bg-transparent border-zinc-800 rounded-none focus:border-white transition-all text-xs h-12"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="confirmPassword" className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="bg-transparent border-zinc-800 rounded-none focus:border-white transition-all text-xs h-12"
              />
            </div>
            <SubmitButton
              formAction={resetPassword}
              className="w-full bg-white text-black hover:bg-zinc-200 rounded-none text-xs uppercase tracking-[0.3em] h-14 transition-all"
            >
              Update Password
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-zinc-900 text-zinc-400 text-[10px] uppercase tracking-widest text-center border border-zinc-800">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
        <CardFooter className="pb-12 px-12 pt-6">
          <div className="text-center text-[10px] uppercase tracking-widest text-zinc-600 w-full">
            <Link href="/login" className="text-white hover:underline transition-all">
              Return to session initialization
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
