import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Benefits } from "@/components/landing/benefits";
import { DemoSection } from "@/components/landing/demo-section";
import { faqs, FAQ } from "@/components/landing/faq";
import { Hero } from "@/components/landing/hero";
import { PricingSection } from "@/components/landing/pricing-section";
import { UseCases } from "@/components/landing/use-cases";
import { WhyDifferent } from "@/components/landing/why-different";

export const metadata: Metadata = {
  title: "AI Cold Email Generator for Sequences, Follow-Ups, and Subject Lines",
  description:
    "AI cold email generator for cold email sequences, follow-ups, and subject lines. Create stronger outreach faster with better hooks, structure, and CTAs."
};

export default function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const softwareApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Cold Email Generator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: baseUrl,
    description:
      "AI cold email generator for sequences, follow-ups, and subject lines built for outbound teams.",
    offers: {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      description: "50% off launch pricing. Regular price is 19.99 per month."
    }
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
