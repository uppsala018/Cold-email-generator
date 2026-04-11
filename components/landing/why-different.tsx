import { Check, X } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const valuePoints = [
  {
    title: "Guided workflow",
    description: "Structured inputs keep cold email creation focused and fast."
  },
  {
    title: "Less prompt work",
    description: "You do not need to rebuild prompts every time you test a new angle."
  },
  {
    title: "Better sequence structure",
    description: "Drafts are built around stronger hooks, offer clarity, and low-friction CTAs."
  }
];

const comparisonRows = [
  {
    label: "How you start",
    generic: "A blank AI chat and a new prompt every time",
    product: "A cold email generator with a structured outreach workflow"
  },
  {
    label: "Speed",
    generic: "Slower because setup and prompt rewriting add friction",
    product: "Faster because the workflow already knows what matters"
  },
  {
    label: "Output quality",
    generic: "Inconsistent cold emails that often need more cleanup",
    product: "Clearer structure, stronger subject lines, and cleaner CTA flow"
  },
  {
    label: "Follow-up sequences",
    generic: "Usually built manually or pieced together prompt by prompt",
    product: "Connected follow-up sequences built inside one system"
  },
  {
    label: "Repeatability",
    generic: "Results depend heavily on who writes the prompt",
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
          description="A clearer system for writing cold emails, subject lines, and follow-ups without starting from scratch."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {valuePoints.map((point) => (
            <div
              key={point.title}
              className="rounded-3xl border border-white/10 bg-slate-950/60 p-5"
            >
              <h3 className="text-lg font-semibold text-white">{point.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-[32px] border border-brand/25 bg-surface p-8 shadow-glow">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-soft">
                Comparison
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-white">
                Cold Email Generator vs generic AI chat
              </h3>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-300">
              The difference is not just better wording. It is a faster outreach workflow with less setup and cleaner output.
            </p>
          </div>

          <div className="mt-7 overflow-hidden rounded-3xl border border-white/10">
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-background/70 text-sm">
              <div className="border-b border-white/10 px-5 py-4 text-slate-400">What matters</div>
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
                    <div className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                      <X className="mt-1 h-4 w-4 shrink-0 text-slate-500" />
                      <span>{row.generic}</span>
                    </div>
                  </div>
                  <div className="border-b border-l border-white/10 bg-brand/5 px-5 py-5">
                    <div className="flex items-start gap-3 text-sm leading-6 text-slate-100">
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
