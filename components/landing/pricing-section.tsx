import { Check } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";

const features = [
  "Purpose-built cold email workflow for faster first drafts",
  "Stronger hooks, cleaner structure, and clearer CTAs",
  "Faster testing of offers, angles, and segments",
  "More consistent outreach across campaigns",
  "Unlimited access for subscribed users"
];

export function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Pricing"
        title="Simple pricing for teams that want better outbound"
        description="Cold Email Generator Pro is regularly $19.99/month. During the launch offer, you can join for $9.99/month and save 50%."
      />
      <div className="mx-auto mt-16 max-w-3xl rounded-[32px] border border-brand/30 bg-surface p-8 shadow-glow">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-soft">
              Cold Email Generator Pro
            </p>
            <div className="mt-4 flex flex-wrap items-end gap-3">
              <h3 className="text-3xl font-semibold text-white">$9.99/month</h3>
              <p className="pb-1 text-sm text-slate-400 line-through">$19.99/month</p>
              <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-soft">
                Save 50%
              </span>
            </div>
            <p className="mt-3 max-w-xl text-slate-300">
              Join during the launch window to lock in the discounted $9.99/month price instead
              of the regular $19.99/month.
            </p>
            <p className="mt-3 max-w-xl text-sm text-slate-400">
              Premium outbound software, low-risk commitment. Cancel anytime. No long-term lock-in.
            </p>
          </div>
          <ButtonLink href="/signup">Start at $9.99/month</ButtonLink>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-background/50 p-4">
              <Check className="mt-0.5 h-5 w-5 text-brand-soft" />
              <span className="text-sm text-slate-200">{feature}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-sm text-slate-300">
          Launch pricing is available for a limited number of early customers. You get the full
          product experience from day one, without a long-term commitment.
        </div>
      </div>
    </section>
  );
}
