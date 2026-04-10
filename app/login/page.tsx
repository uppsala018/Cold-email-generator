import Link from "next/link";
import { loginAction } from "@/app/actions";
import { AuthCard } from "@/components/auth-card";

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <AuthCard
        title="Welcome back"
        description="Log in to access your protected dashboard and subscription-backed generator."
        actionLabel="Login"
        action={loginAction}
        error={params.error}
        footer={
          <>
            Need an account?{" "}
            <Link href="/signup" className="font-medium text-brand-soft hover:text-brand">
              Sign up
            </Link>
          </>
        }
      />
    </main>
  );
}
