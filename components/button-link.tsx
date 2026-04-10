import type { ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: Route;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition",
        variant === "primary"
          ? "bg-brand text-slate-950 hover:bg-brand-soft"
          : "border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10",
        className
      )}
    >
      {children}
    </Link>
  );
}
