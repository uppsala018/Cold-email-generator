import { Bolt, LineChart, PenSquare, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const benefits = [
  {
    title: "Faster than generic AI chat",
    description: "Skip prompt rewriting and move straight into a focused workflow.",
    icon: PenSquare
  },
  {
    title: "Better cold email structure",
    description: "Get clearer hooks, tighter flow, and CTAs that feel natural.",
    icon: ShieldCheck
  },
  {
    title: "Easier angle testing",
    description: "Test offers and positioning without rebuilding from scratch.",
    icon: Bolt
  },
  {
    title: "More consistent outreach",
    description: "Keep messaging strong across campaigns, reps, and lists.",
    icon: LineChart
  }
];

export function Benefits() {
  return (
    <section id="benefits" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <SectionHeading
        eyebrow="Benefits"
        title="Built to write cold emails faster and better"
        description="A focused cold email generator for teams that want faster output, cleaner structure, and more repeatable outreach."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <benefit.icon className="h-10 w-10 rounded-2xl border border-brand/20 bg-brand/10 p-2 text-brand-soft" />
            <h3 className="mt-5 text-lg font-semibold text-white">{benefit.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
