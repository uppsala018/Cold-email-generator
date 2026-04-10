import { Bolt, LineChart, PenSquare, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const benefits = [
  {
    title: "Personalization without the manual grind",
    description: "Turn prospect context and offer details into targeted emails your team can send faster.",
    icon: PenSquare
  },
  {
    title: "Consistent outbound quality",
    description: "Use one repeatable framework for subject lines, positioning, and strong low-friction CTAs.",
    icon: ShieldCheck
  },
  {
    title: "Faster experimentation",
    description: "Test different angles, offers, and tones in minutes instead of rewriting from scratch.",
    icon: Bolt
  },
  {
    title: "Built for pipeline teams",
    description: "Support founders, SDRs, agencies, and growth teams trying to increase replies and meetings.",
    icon: LineChart
  }
];

export function Benefits() {
  return (
    <section id="benefits" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Benefits"
        title="Outbound copy that sounds sharper and ships faster"
        description="Cold Email Generator helps you move from rough idea to polished outreach in a workflow your team can scale."
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
