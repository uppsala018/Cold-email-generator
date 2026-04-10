import { SectionHeading } from "@/components/section-heading";

const faqs = [
  {
    question: "Who is Cold Email Generator for?",
    answer:
      "It is designed for founders, SDRs, agencies, consultants, and B2B sales teams that want to send stronger cold email faster."
  },
  {
    question: "What does the generator return?",
    answer:
      "Each generation returns a connected outbound sequence with subject lines, a first outreach email, two follow-ups, and a breakup email built around your audience, offer, tone, CTA, and personalization notes."
  },
  {
    question: "Why not just use ChatGPT?",
    answer:
      "You can, but generic AI usually means more prompting, more rewriting, and less consistency. Cold Email Generator is focused on outbound, so it helps you get to stronger structure, hooks, and CTAs faster while making it easier to test multiple angles."
  },
  {
    question: "What is the pricing?",
    answer:
      "The regular price is $19.99/month. Right now the launch offer brings it down to $9.99/month, so you save 50%."
  },
  {
    question: "How does access work after signup?",
    answer:
      "Create an account, choose the paid plan, and you can start generating outbound drafts right inside your dashboard."
  },
  {
    question: "Is there any long-term commitment?",
    answer:
      "No. You can cancel anytime, and there is no long-term lock-in. The launch offer is meant to make it easy to start with low risk."
  },
  {
    question: "What makes the output better for cold email?",
    answer:
      "The workflow is tuned for first-touch outreach and follow-ups, which means better structure, clearer hooks, stronger CTAs, and a sequence that is easier to refine, test, and send."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions teams ask before they ship"
          description="Everything here is built to answer the core buying question: why pay for a purpose-built outbound tool instead of using generic AI manually?"
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
