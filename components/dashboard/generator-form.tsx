"use client";

import { useState } from "react";
import type { GeneratedEmailResponse } from "@/types";

const toneOptions = ["Professional", "Friendly", "Consultative", "Direct", "Premium"] as const;
const lengthOptions = ["Short", "Medium", "Long"] as const;

type GeneratorFormProps = {
  usage: {
    used: number;
    limit: number;
  };
};

export function GeneratorForm({ usage }: GeneratorFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedEmailResponse | null>(null);
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setCopyState("idle");

    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate cold email.");
      }

      setResult(data);
    } catch (submissionError) {
      setResult(null);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while generating the email."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyOutput() {
    if (!result) {
      return;
    }

    const text = `Subject Lines:\n- ${result.subjectLines.join("\n- ")}\n\nEmail:\n${result.email}`;
    await navigator.clipboard.writeText(text);
    setCopyState("copied");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[28px] border border-white/10 bg-surface p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Generate a cold email</h2>
            <p className="mt-2 text-sm text-slate-300">
              Shape the message using offer, audience, tone, personalization, and CTA inputs.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-background/50 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Usage</p>
            <p className="mt-1 text-sm text-slate-200">
              {usage.used} / {usage.limit} generations
            </p>
          </div>
        </div>
        <form action={onSubmit} className="mt-8 space-y-5">
          <Field label="Target audience" name="targetAudience" placeholder="Growth leaders at SaaS companies with 10-50 reps" />
          <Field label="Product or service" name="productOrService" placeholder="AI outbound copy assistant for SDR teams" />
          <Field label="Offer" name="offer" placeholder="Free audit of their outbound messaging or a short demo" />
          <Field label="CTA" name="cta" placeholder="Ask for a 15-minute intro call next week" />
          <Field
            label="Personalization notes"
            name="personalizationNotes"
            placeholder="Mention recent hiring, product launch, industry angle, or prospect pain points"
            textarea
          />
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="tone" className="mb-2 block text-sm font-medium text-slate-200">
                Tone
              </label>
              <select
                id="tone"
                name="tone"
                defaultValue="Professional"
                className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none focus:border-brand"
              >
                {toneOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="emailLength" className="mb-2 block text-sm font-medium text-slate-200">
                Email length
              </label>
              <select
                id="emailLength"
                name="emailLength"
                defaultValue="Medium"
                className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none focus:border-brand"
              >
                {lengthOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
            {loading ? "Generating..." : "Generate Cold Email"}
          </button>
        </form>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Output</h2>
            <p className="mt-2 text-sm text-slate-300">
              Generated subject lines and email copy appear here.
            </p>
          </div>
          <button
            type="button"
            onClick={copyOutput}
            disabled={!result}
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copyState === "copied" ? "Copied" : "Copy Output"}
          </button>
        </div>
        <div className="mt-8 min-h-[420px] rounded-[24px] border border-white/10 bg-background/70 p-5">
          {result ? (
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Subject lines</p>
                <ul className="mt-3 space-y-2 text-sm text-white">
                  {result.subjectLines.map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
              </div>
              <div className="h-px bg-white/10" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
                <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-200">
                  {result.email}
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[360px] items-center justify-center text-center text-sm leading-7 text-slate-400">
              Generate your first cold email to see the output.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  textarea?: boolean;
};

function Field({ label, name, placeholder, textarea = false }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-slate-200">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          required
          className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand"
          placeholder={placeholder}
        />
      ) : (
        <input
          id={name}
          name={name}
          required
          className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
