import { Check } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";

const features = [
  "Unlimited dashboard access for subscribed users",
  "AI-generated cold email plus 2 subject lines",
  "Structured inputs for audience, offer, CTA, tone, and length",
  "Stripe-hosted checkout flow",
  "Supabase authentication and protected routes"
];

export function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Pricing"
        title="One simple plan for outbound teams"
        description="Launch quickly with a single subscription that unlocks the protected generator experience."
      />
      <div className="mx-auto mt-16 max-w-3xl rounded-[32px] border border-brand/30 bg-surface p-8 shadow-glow">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-soft">
              Cold Email Generator Pro
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-white">$29/month</h3>
            <p className="mt-3 max-w-xl text-slate-300">
              A single monthly subscription that gives your users access to the email generator
              dashboard and future usage-based controls.
            </p>
          </div>
          <ButtonLink href="/signup">Get Started</ButtonLink>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-background/50 p-4">
              <Check className="mt-0.5 h-5 w-5 text-brand-soft" />
              <span className="text-sm text-slate-200">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
