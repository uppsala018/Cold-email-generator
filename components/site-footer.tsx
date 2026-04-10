import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>(c) {new Date().getFullYear()} Cold Email Generator. Built for modern outbound teams.</p>
        <div className="flex gap-4">
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/login" className="hover:text-white">
            Login
          </Link>
          <Link href="/signup" className="hover:text-white">
            Sign Up
          </Link>
        </div>
      </div>
    </footer>
  );
}
