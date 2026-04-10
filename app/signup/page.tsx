import type { Metadata } from "next";
import Link from "next/link";
import { signupAction } from "@/app/actions";
import { AuthCard } from "@/components/auth-card";

export const metadata: Metadata = {
  title: "Sign Up",
  robots: {
    index: false,
    follow: false
  }
};

export default async function SignupPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <AuthCard
        title="Create your account"
        description="Create your account to access a purpose-built cold email workflow for faster drafts, sharper hooks, and clearer CTAs."
        actionLabel="Sign Up"
        action={signupAction}
        error={params.error}
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-brand-soft hover:text-brand">
              Login
            </Link>
          </>
        }
      />
    </main>
  );
}
