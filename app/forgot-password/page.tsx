import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import { requestPasswordReset } from "@/lib/actions/auth";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-black">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">Forgot Password</CardTitle>
          <CardDescription className="text-zinc-300">
            Enter your email and we&apos;ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="forgot-password-form" className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
                autoComplete="email"
              />
            </div>
            <SubmitButton
              formAction={requestPasswordReset}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-all"
            >
              Send Reset Link
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-red-100 text-red-700 text-center rounded-lg border border-red-200">
                {searchParams.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
