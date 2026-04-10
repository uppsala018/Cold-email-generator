export type ToneOption =
  | "Professional"
  | "Friendly"
  | "Consultative"
  | "Direct"
  | "Premium";

export type EmailLength = "Short" | "Medium" | "Long";

export type AngleOption =
  | "Problem / pain point"
  | "ROI / revenue gain"
  | "Time saving"
  | "Curiosity"
  | "Direct offer"
  | "Partnership"
  | "Social proof";

export type PersonaPreset =
  | "SaaS founder"
  | "Agency owner"
  | "Ecommerce brand"
  | "Affiliate manager"
  | "Consultant"
  | "B2B service company";

export type GeneratorFormValues = {
  personaPreset: PersonaPreset;
  targetAudience: string;
  productOrService: string;
  angle: AngleOption;
  tone: ToneOption;
  offer: string;
  cta: string;
  personalizationNotes: string;
  emailLength: EmailLength;
};

export type GeneratedSequenceEmails = {
  firstOutreach: string;
  followUp1: string;
  followUp2: string;
  breakupEmail: string;
};

export type SequenceVariantKey = "professional" | "punchy" | "consultative";

export type SubjectLineCategory =
  | "Direct"
  | "Curiosity"
  | "Benefit-driven"
  | "Question-based"
  | "Low-friction";

export type GeneratedSubjectLine = {
  category: SubjectLineCategory;
  line: string;
};

export type GeneratedSequenceVariant = {
  subjectLines: GeneratedSubjectLine[];
  sequence: GeneratedSequenceEmails;
};

export type GeneratedSequenceResponse = {
  variants: Record<SequenceVariantKey, GeneratedSequenceVariant>;
};

export type SavedTemplate = {
  id: string;
  name: string;
  personaPreset: PersonaPreset;
  targetAudience: string;
  productOrService: string;
  angle: AngleOption;
  tone: ToneOption;
  offer: string;
  cta: string;
  personalizationNotes: string;
  emailLength: EmailLength;
  createdAt: string;
};
