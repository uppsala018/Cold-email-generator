import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const valuePoints = [
  {
    title: "Guided workflow",
    description:
      "Structured inputs keep cold email creation focused and fast."
  },
  {
    title: "Less prompt-writing effort",
    description:
      "You do not need to rebuild prompts every time you test a new angle."
  },
  {
    title: "Better outbound structure",
    description:
      "Drafts are built around hooks, offer clarity, and low-friction CTAs."
  },
  {
    title: "Reusable frameworks",
    description:
      "Use the same system across offers, segments, and follow-up campaigns."
  }
];

const comparisonRows = [
  {
    label: "Starting point",
    generic: "Blank chat and a fresh prompt every time",
    product: "Structured inputs built for outbound"
  },
  {
    label: "Speed to first draft",
    generic: "Usually slower because setup and prompt rewriting add friction",
    product: "Faster because the workflow already knows what matters"
  },
  {
    label: "Output quality",
    generic: "Can be uneven and often needs more cleanup",
    product: "More consistent structure, hooks, and CTA flow"
  },
  {
    label: "Testing new angles",
    generic: "Often means rewriting prompts and reframing the ask",
    product: "Easier to test positioning, offers, and segments repeatedly"
  },
  {
    label: "Team repeatability",
    generic: "Depends heavily on who writes the prompt",
    product: "Reusable system that keeps outreach more consistent"
  }
];

export function WhyDifferent() {
  return (
    <section id="why-different" className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="Why It Wins"
          title="Why this beats generic AI for cold outreach"
          description="Cold Email Generator gives outbound teams a clearer system for writing cold emails, follow-ups, and subject lines."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {valuePoints.map((point) => (
            <div
              key={point.title}
              className="rounded-3xl border border-white/10 bg-slate-950/60 p-6"
            >
              <h3 className="text-xl font-semibold text-white">{point.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[32px] border border-brand/25 bg-surface p-8 shadow-glow">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-soft">
                Comparison
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-white">
                A better cold email workflow beats a better prompt
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              The value is not just the AI output. It is the faster, more reusable system around it.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-background/70 text-sm">
              <div className="border-b border-white/10 px-5 py-4 text-slate-400">Category</div>
              <div className="border-b border-l border-white/10 px-5 py-4 text-slate-400">
                Generic AI
              </div>
              <div className="border-b border-l border-white/10 px-5 py-4 text-slate-400">
                Cold Email Generator
              </div>

              {comparisonRows.map((row) => (
                <div key={row.label} className="contents">
                  <div className="border-b border-white/10 px-5 py-5 text-sm font-medium text-white">
                    {row.label}
                  </div>
                  <div className="border-b border-l border-white/10 px-5 py-5">
                    <div className="flex items-start gap-3 text-sm leading-7 text-slate-300">
                      <X className="mt-1 h-4 w-4 shrink-0 text-slate-500" />
                      <span>{row.generic}</span>
                    </div>
                  </div>
                  <div className="border-b border-l border-white/10 bg-brand/5 px-5 py-5">
                    <div className="flex items-start gap-3 text-sm leading-7 text-slate-100">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand-soft" />
                      <span>{row.product}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
