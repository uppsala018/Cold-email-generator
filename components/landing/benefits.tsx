import { Bolt, LineChart, PenSquare, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const benefits = [
  {
    title: "Faster than starting with generic AI",
    description: "Skip the back-and-forth prompting and move straight into a workflow built for cold outreach.",
    icon: PenSquare
  },
  {
    title: "Better cold email structure",
    description: "Generate emails with clearer flow, stronger hooks, and CTAs that feel natural instead of forced.",
    icon: ShieldCheck
  },
  {
    title: "Faster testing of angles",
    description: "Try different positioning, offers, and audience angles in minutes without rewriting everything.",
    icon: Bolt
  },
  {
    title: "More consistent outreach",
    description: "Keep quality high across campaigns, reps, and lists so your outbound feels more deliberate.",
    icon: LineChart
  }
];

export function Benefits() {
  return (
    <section id="benefits" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Benefits"
        title="Why teams pay for this instead of doing it manually"
        description="This is not a generic AI writer. It is a focused outbound tool built to help teams write faster, test more angles, and send better cold email consistently."
      />
      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <benefit.icon className="h-10 w-10 rounded-2xl border border-brand/20 bg-brand/10 p-2 text-brand-soft" />
            <h3 className="mt-6 text-xl font-semibold text-white">{benefit.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
