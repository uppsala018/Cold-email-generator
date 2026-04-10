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
    "A purpose-built outbound tool for creating stronger cold emails with better hooks, clearer CTAs, and faster testing.",
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
      "Write better cold emails faster with a purpose-built outbound tool for sharper structure, hooks, and CTAs.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Cold Email Generator",
    description:
      "A purpose-built outbound tool for faster cold email drafts and more consistent outreach."
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
