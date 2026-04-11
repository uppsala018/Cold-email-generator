import type { Metadata } from "next";
import type { ReactNode } from "react";
import { VisitTracker } from "@/components/visit-tracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Cold Email Generator",
    template: "%s | Cold Email Generator"
  },
  description:
    "AI cold email generator for cold email sequences, follow-ups, and subject lines. Create stronger outreach faster with better structure, angles, and CTAs.",
  keywords: [
    "cold email generator",
    "AI cold email generator",
    "cold email sequence generator",
    "cold email follow-up generator",
    "cold email subject line generator",
    "outbound sales email",
    "B2B email generator",
    "SaaS lead generation"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "AI Cold Email Generator for Sequences, Follow-Ups, and Subject Lines",
    description:
      "Create cold emails, follow-up sequences, and subject lines faster with a purpose-built AI cold email generator for outbound teams.",
    type: "website",
    url: "/",
    siteName: "Cold Email Generator"
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Cold Email Generator for Outbound Teams",
    description:
      "Generate cold email sequences, follow-ups, and subject lines faster with a purpose-built outbound workflow."
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <VisitTracker />
        {children}
      </body>
    </html>
  );
}
