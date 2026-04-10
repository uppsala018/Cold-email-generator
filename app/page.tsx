import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Benefits } from "@/components/landing/benefits";
import { FAQ } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { PricingSection } from "@/components/landing/pricing-section";
import { UseCases } from "@/components/landing/use-cases";

export const metadata: Metadata = {
  title: "Write Better Cold Emails in Minutes",
  description:
    "Generate personalized cold emails for outreach, partnerships, agencies, SaaS, affiliate offers, and B2B sales."
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <Benefits />
        <UseCases />
        <PricingSection />
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  );
}
