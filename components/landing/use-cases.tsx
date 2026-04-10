import { SectionHeading } from "@/components/section-heading";

const useCases = [
  "Founder outreach for partnerships and intro calls",
  "SaaS outbound to operators, marketers, and revenue leaders",
  "Agency prospecting with sharper hooks and clearer offers",
  "B2B sales emails built to earn meetings, demos, and replies",
  "Outbound testing across multiple segments and positioning angles",
  "Consistent first-touch messaging across reps and campaigns"
];

export function UseCases() {
  return (
    <section id="use-cases" className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Use Cases"
        title="Built for real outbound work, not one-off prompting"
        description="From partnership outreach to SDR campaigns, the workflow is designed to help teams move faster without sacrificing message quality."
      />
        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {useCases.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-white/10 bg-slate-950/60 px-5 py-4 text-sm text-slate-200"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
