import Link from "next/link";
import { ButtonLink } from "@/components/button-link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.3em] text-white">
          Cold Email Generator
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link href="/#benefits" className="hover:text-white">
            Benefits
          </Link>
          <Link href="/#use-cases" className="hover:text-white">
            Use Cases
          </Link>
          <Link href="/pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-white">
            FAQ
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/login" variant="secondary" className="hidden sm:inline-flex">
            Login
          </ButtonLink>
          <ButtonLink href="/signup">Get Started</ButtonLink>
        </div>
      </div>
    </header>
  );
}
