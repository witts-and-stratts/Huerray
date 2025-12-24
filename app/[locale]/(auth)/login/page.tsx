import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage( {
  searchParams,
}: {
  searchParams: Promise<{ reset?: string; }>;
} ) {
  const params = await searchParams;
  const showResetSuccess = params.reset === "success";

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-background via-background to-muted/20 p-4">
      <LoginForm showResetSuccess={ showResetSuccess } />
    </div>
  );
}
