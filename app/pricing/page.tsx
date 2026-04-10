import type { Metadata } from "next";
import { PricingSection } from "@/components/landing/pricing-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Pricing"
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
