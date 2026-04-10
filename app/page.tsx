import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Benefits } from "@/components/landing/benefits";
import { FAQ } from "@/components/landing/faq";
import { DemoSection } from "@/components/landing/demo-section";
import { Hero } from "@/components/landing/hero";
import { PricingSection } from "@/components/landing/pricing-section";
import { UseCases } from "@/components/landing/use-cases";
import { WhyDifferent } from "@/components/landing/why-different";

export const metadata: Metadata = {
  title: "Purpose-Built Cold Email Software for Outbound Teams",
  description:
    "Create stronger cold emails faster with a purpose-built outbound tool designed for better hooks, clearer CTAs, and more consistent outreach."
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <DemoSection />
        <Benefits />
        <WhyDifferent />
        <UseCases />
        <PricingSection />
        <FAQ />
      </main>
      <SiteFooter />
    </div>
  );
}
