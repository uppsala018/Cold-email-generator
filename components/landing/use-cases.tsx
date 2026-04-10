import { SectionHeading } from "@/components/section-heading";

const useCases = [
  "Founder outreach for partnerships and intro calls",
  "SaaS outbound campaigns to operators, marketers, and revenue leaders",
  "Agency prospecting with service-specific offers and stronger hooks",
  "Affiliate and JV offers tailored to audience fit and angle",
  "B2B sales emails aimed at meetings, demos, or pilot conversations",
  "Lead generation messages with more relevant personalization notes"
];

export function UseCases() {
  return (
    <section id="use-cases" className="border-y border-white/10 bg-white/[0.03]">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="Use Cases"
          title="Made for the kinds of outbound work that actually drive revenue"
          description="From partnership pitches to SDR outreach, the app gives teams a structured way to generate stronger first-touch emails."
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
