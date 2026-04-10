import { NextResponse } from "next/server";
import { z } from "zod";
import { isUserSubscribed } from "@/lib/billing";
import { getOpenAIClient } from "@/lib/openai";
import { coldEmailSystemPrompt } from "@/lib/prompts";
import { createClient } from "@/lib/supabase/server";
import { getUserUsageSnapshot, incrementUserGenerationCount } from "@/lib/usage";

const requestSchema = z.object({
  targetAudience: z.string().min(3),
  productOrService: z.string().min(3),
  tone: z.string().min(3),
  offer: z.string().min(3),
  cta: z.string().min(3),
  personalizationNotes: z.string().min(3),
  emailLength: z.string().min(3)
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!isUserSubscribed(user)) {
      return NextResponse.json({ error: "An active subscription is required." }, { status: 403 });
    }

    const body = await request.json();
    const input = requestSchema.parse(body);
    const usage = await getUserUsageSnapshot(user.id);

    if (usage.used >= usage.limit) {
      return NextResponse.json(
        { error: "Monthly generation limit reached." },
        { status: 429 }
      );
    }

    const client = getOpenAIClient();
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: coldEmailSystemPrompt
        },
        {
          role: "user",
          content: `
Generate a cold email for these inputs:
- target audience: ${input.targetAudience}
- product or service: ${input.productOrService}
- tone: ${input.tone}
- offer: ${input.offer}
- CTA: ${input.cta}
- personalization notes: ${input.personalizationNotes}
- email length: ${input.emailLength}
          `.trim()
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "cold_email_output",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              subjectLines: {
                type: "array",
                items: { type: "string" },
                minItems: 2,
                maxItems: 2
              },
              email: {
                type: "string"
              }
            },
            required: ["subjectLines", "email"]
          }
        }
      }
    });

    if (!response.output_text) {
      throw new Error("OpenAI returned an empty response.");
    }

    const parsed = JSON.parse(response.output_text) as {
      subjectLines: string[];
      email: string;
    };

    await incrementUserGenerationCount(user.id);

    return NextResponse.json(parsed);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please complete all form fields." }, { status: 400 });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to generate cold email right now."
      },
      { status: 500 }
    );
  }
}
