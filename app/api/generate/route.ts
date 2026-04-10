import { NextResponse } from "next/server";
import { z } from "zod";
import { isUserSubscribed } from "@/lib/billing";
import { getOpenAIClient } from "@/lib/openai";
import { coldEmailSystemPrompt } from "@/lib/prompts";
import { createClient } from "@/lib/supabase/server";
import { getUserUsageSnapshot, incrementUserGenerationCount } from "@/lib/usage";

const requestSchema = z.object({
  personaPreset: z.string().min(3),
  targetAudience: z.string().min(3),
  productOrService: z.string().min(3),
  angle: z.string().min(3),
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
Generate a connected 4-email outbound sequence for these inputs:
- persona preset: ${input.personaPreset}
- target audience: ${input.targetAudience}
- product or service: ${input.productOrService}
- angle: ${input.angle}
- tone: ${input.tone}
- offer: ${input.offer}
- CTA: ${input.cta}
- personalization notes: ${input.personalizationNotes}
- email length: ${input.emailLength}

Sequence requirements:
- Return 3 variants named professional, punchy, and consultative.
- For each variant, return one first outreach email, one follow-up 1, one follow-up 2, and one breakup email.
- Keep the sequence coherent so each follow-up feels like it belongs to the same campaign.
- Use the selected persona preset to shape the business context, likely priorities, and language choices.
- Treat the custom target audience field as the more specific override when it adds extra detail.
- Use the selected angle as the strategic lens throughout the sequence.
- Use the same offer and audience context throughout, but vary the phrasing naturally.
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
              variants: {
                type: "object",
                additionalProperties: false,
                properties: {
                  professional: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      subjectLines: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: false,
                          properties: {
                            category: {
                              type: "string",
                              enum: ["Direct", "Curiosity", "Benefit-driven", "Question-based", "Low-friction"]
                            },
                            line: {
                              type: "string"
                            }
                          },
                          required: ["category", "line"]
                        },
                        minItems: 5,
                        maxItems: 5
                      },
                      sequence: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          firstOutreach: { type: "string" },
                          followUp1: { type: "string" },
                          followUp2: { type: "string" },
                          breakupEmail: { type: "string" }
                        },
                        required: ["firstOutreach", "followUp1", "followUp2", "breakupEmail"]
                      }
                    },
                    required: ["subjectLines", "sequence"]
                  },
                  punchy: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      subjectLines: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: false,
                          properties: {
                            category: {
                              type: "string",
                              enum: ["Direct", "Curiosity", "Benefit-driven", "Question-based", "Low-friction"]
                            },
                            line: {
                              type: "string"
                            }
                          },
                          required: ["category", "line"]
                        },
                        minItems: 5,
                        maxItems: 5
                      },
                      sequence: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          firstOutreach: { type: "string" },
                          followUp1: { type: "string" },
                          followUp2: { type: "string" },
                          breakupEmail: { type: "string" }
                        },
                        required: ["firstOutreach", "followUp1", "followUp2", "breakupEmail"]
                      }
                    },
                    required: ["subjectLines", "sequence"]
                  },
                  consultative: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                      subjectLines: {
                        type: "array",
                        items: {
                          type: "object",
                          additionalProperties: false,
                          properties: {
                            category: {
                              type: "string",
                              enum: ["Direct", "Curiosity", "Benefit-driven", "Question-based", "Low-friction"]
                            },
                            line: {
                              type: "string"
                            }
                          },
                          required: ["category", "line"]
                        },
                        minItems: 5,
                        maxItems: 5
                      },
                      sequence: {
                        type: "object",
                        additionalProperties: false,
                        properties: {
                          firstOutreach: { type: "string" },
                          followUp1: { type: "string" },
                          followUp2: { type: "string" },
                          breakupEmail: { type: "string" }
                        },
                        required: ["firstOutreach", "followUp1", "followUp2", "breakupEmail"]
                      }
                    },
                    required: ["subjectLines", "sequence"]
                  }
                },
                required: ["professional", "punchy", "consultative"]
              }
            },
            required: ["variants"]
          }
        }
      }
    });

    if (!response.output_text) {
      throw new Error("OpenAI returned an empty response.");
    }

    const parsed = JSON.parse(response.output_text) as {
      variants: {
        professional: {
          subjectLines: { category: string; line: string }[];
          sequence: {
            firstOutreach: string;
            followUp1: string;
            followUp2: string;
            breakupEmail: string;
          };
        };
        punchy: {
          subjectLines: { category: string; line: string }[];
          sequence: {
            firstOutreach: string;
            followUp1: string;
            followUp2: string;
            breakupEmail: string;
          };
        };
        consultative: {
          subjectLines: { category: string; line: string }[];
          sequence: {
            firstOutreach: string;
            followUp1: string;
            followUp2: string;
            breakupEmail: string;
          };
        };
      };
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
          error instanceof Error ? error.message : "Unable to generate the outbound sequence right now."
      },
      { status: 500 }
    );
  }
}
