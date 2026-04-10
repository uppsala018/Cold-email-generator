"use client";

import { useRef, useState } from "react";
import type {
  AngleOption,
  GeneratedSequenceResponse,
  GeneratorFormValues,
  PersonaPreset,
  SavedTemplate,
  SequenceVariantKey
} from "@/types";

const toneOptions = ["Professional", "Friendly", "Consultative", "Direct", "Premium"] as const;
const lengthOptions = ["Short", "Medium", "Long"] as const;
const personaPresets: PersonaPreset[] = [
  "SaaS founder",
  "Agency owner",
  "Ecommerce brand",
  "Affiliate manager",
  "Consultant",
  "B2B service company"
];
const angleOptions: AngleOption[] = [
  "Problem / pain point",
  "ROI / revenue gain",
  "Time saving",
  "Curiosity",
  "Direct offer",
  "Partnership",
  "Social proof"
];
const sequenceLabels = [
  ["firstOutreach", "First Outreach"],
  ["followUp1", "Follow-Up 1"],
  ["followUp2", "Follow-Up 2"],
  ["breakupEmail", "Breakup Email"]
] as const;
const variantLabels: Record<SequenceVariantKey, string> = {
  professional: "Professional",
  punchy: "Punchy",
  consultative: "Consultative"
};

type GeneratorFormProps = {
  usage: {
    used: number;
    limit: number;
  };
  initialTemplates: SavedTemplate[];
};

export function GeneratorForm({ usage, initialTemplates }: GeneratorFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<GeneratedSequenceResponse | null>(null);
  const [copiedVariant, setCopiedVariant] = useState<SequenceVariantKey | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [templateError, setTemplateError] = useState("");
  const [templateLoading, setTemplateLoading] = useState(false);
  const [templates, setTemplates] = useState(initialTemplates);

  async function onSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setCopiedVariant(null);
    setCopiedEmail(null);

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
        throw new Error(data.error || "Failed to generate outbound variants.");
      }

      setResult(data);
    } catch (submissionError) {
      setResult(null);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while generating the variants."
      );
    } finally {
      setLoading(false);
    }
  }

  function readCurrentTemplateValues() {
    if (!formRef.current) {
      return null;
    }

    const formData = new FormData(formRef.current);
    return Object.fromEntries(formData.entries()) as unknown as GeneratorFormValues;
  }

  async function saveTemplate() {
    const values = readCurrentTemplateValues();

    if (!values) {
      return;
    }

    if (!templateName.trim()) {
      setTemplateError("Add a template name before saving.");
      return;
    }

    setTemplateLoading(true);
    setTemplateError("");

    try {
      const response = await fetch("/api/templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...values,
          name: templateName.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to save template.");
      }

      setTemplates(data.templates);
      setTemplateName("");
    } catch (saveError) {
      setTemplateError(
        saveError instanceof Error ? saveError.message : "Unable to save template."
      );
    } finally {
      setTemplateLoading(false);
    }
  }

  function loadTemplate(template: SavedTemplate) {
    if (!formRef.current) {
      return;
    }

    const fields: Record<keyof GeneratorFormValues, string> = {
      personaPreset: template.personaPreset,
      targetAudience: template.targetAudience,
      productOrService: template.productOrService,
      angle: template.angle,
      tone: template.tone,
      offer: template.offer,
      cta: template.cta,
      personalizationNotes: template.personalizationNotes,
      emailLength: template.emailLength
    };

    for (const [key, value] of Object.entries(fields)) {
      const element = formRef.current.elements.namedItem(key) as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
        | null;

      if (element) {
        element.value = value;
      }
    }

    setTemplateError("");
  }

  async function deleteTemplate(templateId: string) {
    setTemplateLoading(true);
    setTemplateError("");

    try {
      const response = await fetch(`/api/templates/${templateId}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete template.");
      }

      setTemplates(data.templates);
    } catch (deleteError) {
      setTemplateError(
        deleteError instanceof Error ? deleteError.message : "Unable to delete template."
      );
    } finally {
      setTemplateLoading(false);
    }
  }

  function formatVariantOutput(
    variantLabel: string,
    variant: GeneratedSequenceResponse["variants"][SequenceVariantKey]
  ) {
    return `${variantLabel}\n\nSubject Lines:\n${variant.subjectLines
      .map((subject) => `- ${subject.category}: ${subject.line}`)
      .join("\n")}\n\nFirst Outreach:\n${variant.sequence.firstOutreach}\n\nFollow-Up 1:\n${variant.sequence.followUp1}\n\nFollow-Up 2:\n${variant.sequence.followUp2}\n\nBreakup Email:\n${variant.sequence.breakupEmail}`;
  }

  async function copyVariant(key: SequenceVariantKey) {
    if (!result) {
      return;
    }

    await navigator.clipboard.writeText(formatVariantOutput(variantLabels[key], result.variants[key]));
    setCopiedVariant(key);
    setCopiedEmail(null);
  }

  async function copySingleEmail(
    variantKey: SequenceVariantKey,
    key: keyof GeneratedSequenceResponse["variants"][SequenceVariantKey]["sequence"]
  ) {
    if (!result) {
      return;
    }

    await navigator.clipboard.writeText(result.variants[variantKey].sequence[key]);
    setCopiedEmail(`${variantKey}:${key}`);
    setCopiedVariant(null);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="rounded-[28px] border border-white/10 bg-surface p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Generate outbound variants</h2>
            <p className="mt-2 text-sm text-slate-300">
              Start with a persona preset, then generate three 4-email variants you can compare
              quickly: Professional, Punchy, and Consultative.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-background/50 px-4 py-3 text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Usage</p>
            <p className="mt-1 text-sm text-slate-200">
              {usage.used} / {usage.limit} generations
            </p>
          </div>
        </div>
        <form ref={formRef} action={onSubmit} className="mt-8 space-y-5">
          <div className="rounded-2xl border border-white/10 bg-background/40 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <label htmlFor="templateName" className="mb-2 block text-sm font-medium text-slate-200">
                  Save template
                </label>
                <input
                  id="templateName"
                  value={templateName}
                  onChange={(event) => setTemplateName(event.target.value)}
                  placeholder="Example: SaaS founder demo offer"
                  className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand"
                />
              </div>
              <button
                type="button"
                onClick={saveTemplate}
                disabled={templateLoading}
                className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {templateLoading ? "Saving..." : "Save Template"}
              </button>
            </div>
            {templateError ? (
              <p className="mt-3 text-sm text-rose-300">{templateError}</p>
            ) : (
              <p className="mt-3 text-xs leading-6 text-slate-400">
                Save your favorite settings so you can reload proven outbound setups in one click.
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-background/40 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-200">Saved templates</p>
                <p className="mt-1 text-xs leading-6 text-slate-400">
                  Load a saved setup or remove one you no longer use.
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {templates.length} saved
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {templates.length ? (
                templates.map((template) => (
                  <div
                    key={template.id}
                    className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">{template.name}</p>
                        <p className="mt-1 text-xs leading-6 text-slate-400">
                          {template.personaPreset} · {template.angle} · {template.tone}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-300">
                          {template.targetAudience}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => loadTemplate(template)}
                          className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white hover:border-white/30"
                        >
                          Load
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTemplate(template.id)}
                          disabled={templateLoading}
                          className="rounded-full border border-rose-400/20 px-4 py-2 text-xs font-medium text-rose-200 hover:border-rose-300/40 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-slate-400">
                  No saved templates yet.
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="personaPreset" className="mb-2 block text-sm font-medium text-slate-200">
              Persona preset
            </label>
            <select
              id="personaPreset"
              name="personaPreset"
              defaultValue="SaaS founder"
              className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none focus:border-brand"
            >
              {personaPresets.map((preset) => (
                <option key={preset} value={preset}>
                  {preset}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              Use a preset for speed, then customize the audience details below if you want tighter targeting.
            </p>
          </div>
          <Field label="Target audience" name="targetAudience" placeholder="Growth leaders at SaaS companies with 10-50 reps" />
          <Field label="Product or service" name="productOrService" placeholder="AI outbound copy assistant for SDR teams" />
          <div>
            <label htmlFor="angle" className="mb-2 block text-sm font-medium text-slate-200">
              Angle
            </label>
            <select
              id="angle"
              name="angle"
              defaultValue="Problem / pain point"
              className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none focus:border-brand"
            >
              {angleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
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
            {loading ? "Generating..." : "Generate Variants"}
          </button>
        </form>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">Output</h2>
          <p className="mt-2 text-sm text-slate-300">
            Compare three variants side by side in one easy-to-scan workspace.
          </p>
        </div>
        <div className="mt-8 min-h-[420px] rounded-[24px] border border-white/10 bg-background/70 p-5">
          {result ? (
            <div className="grid gap-5 xl:grid-cols-3">
              {(Object.keys(variantLabels) as SequenceVariantKey[]).map((variantKey) => {
                const variant = result.variants[variantKey];
                return (
                  <div
                    key={variantKey}
                    className="rounded-[22px] border border-white/10 bg-slate-950/40 p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Variant
                        </p>
                        <h3 className="mt-2 text-lg font-semibold text-white">
                          {variantLabels[variantKey]}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyVariant(variantKey)}
                        className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white hover:border-white/30"
                      >
                        {copiedVariant === variantKey ? "Copied" : "Copy Version"}
                      </button>
                    </div>

                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Subject lines
                      </p>
                      <div className="mt-3 space-y-2">
                        {variant.subjectLines.map((subject) => (
                          <div
                            key={`${variantKey}-${subject.category}`}
                            className="rounded-2xl border border-white/10 bg-background/40 px-3 py-3"
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-soft">
                              {subject.category}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-white">{subject.line}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 space-y-4">
                      {sequenceLabels.map(([key, label]) => (
                        <div
                          key={`${variantKey}-${key}`}
                          className="rounded-2xl border border-white/10 bg-background/40 p-4"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                              {label}
                            </p>
                            <button
                              type="button"
                              onClick={() => copySingleEmail(variantKey, key)}
                              className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white hover:border-white/30"
                            >
                              {copiedEmail === `${variantKey}:${key}` ? "Copied" : "Copy"}
                            </button>
                          </div>
                          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-7 text-slate-200">
                            {variant.sequence[key]}
                          </pre>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full min-h-[360px] items-center justify-center text-center text-sm leading-7 text-slate-400">
              Generate your first set of variants to compare the output.
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
