"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";

type DemoResult = {
  subjectLine: string;
  sampleEmail: string;
};

export function DemoSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<DemoResult | null>(null);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate demo.");
      }

      setResult(data);
    } catch (demoError) {
      setResult(null);
      setError(demoError instanceof Error ? demoError.message : "Unable to generate demo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="demo" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Try The Demo"
        title="See the product in action before you sign up"
        description="Generate a real first-touch sample in under a minute. Upgrade to unlock full sequences, multiple variants, saved templates, and the complete outbound workflow."
      />

      <div className="mt-16 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[28px] border border-white/10 bg-surface p-6">
          <h3 className="text-xl font-semibold text-white">Public demo</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Start with one real sample email here. The paid product unlocks the full 4-email sequence workflow.
          </p>

          <form action={onSubmit} className="mt-8 space-y-5">
            <Field
              label="Target audience"
              name="targetAudience"
              placeholder="SaaS founders hiring their first outbound reps"
            />
            <Field
              label="Product or service"
              name="productOrService"
              placeholder="AI outbound assistant for lean sales teams"
            />
            <Field
              label="Offer"
              name="offer"
              placeholder="A short walkthrough or free outbound teardown"
            />

            {error ? (
              <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate My Sample Email"}
            </button>
          </form>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
          <div className="rounded-[24px] border border-white/10 bg-background/60 p-5">
            {result ? (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Sample subject line</p>
                <p className="mt-3 text-base font-medium text-white">{result.subjectLine}</p>
                <div className="mt-6 h-px bg-white/10" />
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-500">Sample email</p>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-200">
                  {result.sampleEmail}
                </pre>
              </div>
            ) : (
              <div className="flex min-h-[340px] items-center justify-center text-center text-sm leading-7 text-slate-400">
                Enter a few details to generate one limited sample email.
              </div>
            )}
          </div>

          <div className="mt-6 rounded-[24px] border border-brand/25 bg-brand/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">
              Want the full workflow?
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-200">
              Sign up to unlock full 4-email sequences, multiple writing variants, saved templates,
              faster angle testing, and subscriber-only generation.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/signup" className="gap-2">
                Create Free Account
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/pricing" variant="secondary">
                View Pricing
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
};

function Field({ label, name, placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>
      <input
        id={name}
        name={name}
        required
        className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand"
        placeholder={placeholder}
      />
    </div>
  );
}
