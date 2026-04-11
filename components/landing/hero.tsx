import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "@/components/button-link";

const proofPoints = [
  "AI cold email generator built for real outreach",
  "Faster cold email sequences and follow-ups",
  "Sharper subject lines, hooks, and CTAs"
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-28">
        <div>
          <div className="inline-flex rounded-full border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-medium text-brand-soft">
            AI Cold Email Generator for outbound teams
          </div>
          <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            AI Cold Email Generator for Personalized Cold Emails That Actually Get Sent
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Build personalized cold emails faster with sharper subject lines, cleaner follow-up
            sequences, and an outreach workflow built for outbound teams, agencies, founders, and
            consultants.
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
              <p className="text-sm font-medium text-brand-soft">Example Cold Email Output</p>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                Subject Lines + Email
              </span>
            </div>
            <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-background/70 p-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Subject lines</p>
                <p className="mt-2 text-sm text-white">1. A faster way for [Company] to test new outbound angles</p>
                <p className="mt-1 text-sm text-white">2. One idea to help [Company] improve reply quality</p>
              </div>
              <div className="h-px bg-white/10" />
              <div className="space-y-3 text-sm leading-7 text-slate-300">
                <p>Hi Sarah,</p>
                <p>
                  I noticed your team is scaling outbound, which usually means reps have to move
                  faster without letting message quality slip.
                </p>
                <p>
                  This AI cold email generator gives teams a faster way to build first-touch emails
                  with stronger hooks, tighter structure, and clearer CTAs than starting from a
                  blank prompt in generic AI.
                </p>
                <p>
                  It also makes it easier to test multiple angles for the same offer while keeping
                  messaging consistent across segments.
                </p>
                <p>Worth a quick look this week?</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
