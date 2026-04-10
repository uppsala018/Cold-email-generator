import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Cold Email Generator",
    template: "%s | Cold Email Generator"
  },
  description:
    "Generate personalized cold emails for SaaS, agencies, partnerships, affiliate outreach, and B2B sales with a subscription-ready SaaS app.",
  keywords: [
    "cold email generator",
    "AI cold email writer",
    "outbound sales email",
    "B2B email generator",
    "SaaS lead generation"
  ],
  openGraph: {
    title: "Cold Email Generator",
    description:
      "Write better cold emails in minutes with a subscription-ready AI SaaS built on Next.js, Supabase, Stripe, and OpenAI.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Email Generator",
    description:
      "Generate professional cold emails and subject lines for modern outbound teams."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
