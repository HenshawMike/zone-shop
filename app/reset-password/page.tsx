import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex-1 flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 to-black">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl text-red-600">Reset Password</CardTitle>
          <CardDescription className="text-zinc-300">
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="reset-password-form" className="grid gap-6">
            <input type="hidden" name="code" value={searchParams.code} />
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
            </div>
            <SubmitButton
              formAction={resetPassword}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition-all"
            >
              Reset Password
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
