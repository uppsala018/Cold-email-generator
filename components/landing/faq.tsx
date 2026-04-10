import { SectionHeading } from "@/components/section-heading";

const faqs = [
  {
    question: "Who is Cold Email Generator for?",
    answer:
      "It is designed for founders, SDRs, agencies, consultants, affiliate teams, and B2B sales operators who need better outbound copy quickly."
  },
  {
    question: "What does the generator return?",
    answer:
      "Each generation returns one polished cold email and two subject lines, optimized around the audience, offer, tone, CTA, and personalization notes you provide."
  },
  {
    question: "How does access work after signup?",
    answer:
      "Users sign up with email and password through Supabase Auth. After that they can upgrade through Stripe Checkout to unlock the protected generator inside the dashboard."
  },
  {
    question: "Can this support future limits or team features?",
    answer:
      "Yes. The codebase includes placeholder usage tracking and a clean server-side structure so monthly limits and subscription syncing can be added cleanly."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions teams ask before they ship"
          description="The app is structured for production deployment on Vercel with Supabase, Stripe, and OpenAI wired behind server-side boundaries."
        />
        <div className="mx-auto mt-16 max-w-4xl space-y-4">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">{item.question}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
