import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/button-link";

const proofPoints = [
  "Personalized intros for B2B outreach",
  "Professional subject lines included",
  "Built for founders, agencies, SDRs, and SaaS teams"
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div>
          <div className="inline-flex rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-medium text-brand-soft">
            AI-powered outbound copy for revenue teams
          </div>
          <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Write Better Cold Emails in Minutes
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Generate personalized cold emails for outreach, partnerships, SaaS, affiliate
            offers, agencies, and B2B sales without staring at a blank page.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/signup" className="gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/pricing" variant="secondary">
              See Pricing
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            {proofPoints.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <CheckCircle2 className="h-4 w-4 text-brand-soft" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-6 shadow-glow">
          <div className="rounded-[24px] border border-brand/20 bg-surface p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-brand-soft">Live preview</p>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                Pro email output
              </span>
            </div>
            <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-background/70 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Subject lines</p>
                <p className="mt-2 text-sm text-white">1. Quick idea to help [Company] book more demos</p>
                <p className="mt-1 text-sm text-white">2. A practical outbound angle for [Company]</p>
              </div>
              <div className="h-px bg-white/10" />
              <div className="space-y-3 text-sm leading-7 text-slate-300">
                <p>Hi Sarah,</p>
                <p>
                  I noticed your team is expanding outbound and likely balancing reply quality
                  with rep speed. That usually gets harder as personalization expectations rise.
                </p>
                <p>
                  We help SaaS teams generate tailored first-touch emails that stay concise,
                  relevant, and easier to test across segments.
                </p>
                <p>
                  If useful, I can share a few sample angles for your current ICP and show how
                  teams use it to cut drafting time dramatically.
                </p>
                <p>Open to a quick look this week?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
