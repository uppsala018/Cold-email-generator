import { createClient } from "@/lib/supabase/server";
import type { GeneratorFormValues, SavedTemplate } from "@/types";

type StoredTemplateRow = {
  id: string;
  name: string;
  persona_preset: GeneratorFormValues["personaPreset"];
  target_audience: string;
  product_or_service: string;
  angle: GeneratorFormValues["angle"];
  tone: GeneratorFormValues["tone"];
  offer: string;
  cta: string;
  personalization_notes: string;
  email_length: GeneratorFormValues["emailLength"];
  created_at: string;
};

function mapTemplate(row: StoredTemplateRow): SavedTemplate {
  return {
    id: row.id,
    name: row.name,
    personaPreset: row.persona_preset,
    targetAudience: row.target_audience,
    productOrService: row.product_or_service,
    angle: row.angle,
    tone: row.tone,
    offer: row.offer,
    cta: row.cta,
    personalizationNotes: row.personalization_notes,
    emailLength: row.email_length,
    createdAt: row.created_at
  };
}

export async function getUserTemplates(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("saved_templates")
    .select(
      "id,name,persona_preset,target_audience,product_or_service,angle,tone,offer,cta,personalization_notes,email_length,created_at"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return ((data || []) as StoredTemplateRow[]).map(mapTemplate);
}
