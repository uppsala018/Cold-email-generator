import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAIClient } from "@/lib/openai";
import { coldEmailDemoSystemPrompt } from "@/lib/prompts";

const requestSchema = z.object({
  targetAudience: z.string().min(3).max(120),
  productOrService: z.string().min(3).max(120),
  offer: z.string().min(3).max(160)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = requestSchema.parse(body);

    const client = getOpenAIClient();
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: coldEmailDemoSystemPrompt
        },
        {
          role: "user",
          content: `
Generate one limited public demo output for these inputs:
- target audience: ${input.targetAudience}
- product or service: ${input.productOrService}
- offer: ${input.offer}
          `.trim()
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "cold_email_demo_output",
          schema: {
            type: "object",
            additionalProperties: false,
            properties: {
              subjectLine: {
                type: "string"
              },
              sampleEmail: {
                type: "string"
              }
            },
            required: ["subjectLine", "sampleEmail"]
          }
        }
      }
    });

    if (!response.output_text) {
      throw new Error("OpenAI returned an empty response.");
    }

    const parsed = JSON.parse(response.output_text) as {
      subjectLine: string;
      sampleEmail: string;
    };

    return NextResponse.json(parsed);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please complete all demo fields." }, { status: 400 });
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to generate the demo right now."
      },
      { status: 500 }
    );
  }
}
