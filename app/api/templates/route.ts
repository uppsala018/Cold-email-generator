import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getUserTemplates } from "@/lib/templates";

const templateSchema = z.object({
  name: z.string().min(1).max(80),
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

export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const templates = await getUserTemplates(user.id);
    return NextResponse.json({ templates });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to load saved templates right now."
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const input = templateSchema.parse(body);

    const { error } = await supabase.from("saved_templates").insert({
      user_id: user.id,
      name: input.name.trim(),
      persona_preset: input.personaPreset,
      target_audience: input.targetAudience,
      product_or_service: input.productOrService,
      angle: input.angle,
      tone: input.tone,
      offer: input.offer,
      cta: input.cta,
      personalization_notes: input.personalizationNotes,
      email_length: input.emailLength
    });

    if (error) {
      throw error;
    }

    const templates = await getUserTemplates(user.id);
    return NextResponse.json({ templates }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please complete all template fields." }, { status: 400 });
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to save the template right now."
      },
      { status: 500 }
    );
  }
}
