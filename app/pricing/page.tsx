import type { Metadata } from "next";
import { PricingSection } from "@/components/landing/pricing-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Pricing for Cold Email Generator. Get the AI cold email generator for sequences, follow-ups, and subject lines at 50% off launch pricing.",
  alternates: {
    canonical: "/pricing"
  }
};

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="pt-8">
        <PricingSection />
      </main>
      <SiteFooter />
    </div>
  );
}
