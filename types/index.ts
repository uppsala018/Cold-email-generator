export type ToneOption =
  | "Professional"
  | "Friendly"
  | "Consultative"
  | "Direct"
  | "Premium";

export type EmailLength = "Short" | "Medium" | "Long";

export type GeneratorFormValues = {
  targetAudience: string;
  productOrService: string;
  tone: ToneOption;
  offer: string;
  cta: string;
  personalizationNotes: string;
  emailLength: EmailLength;
};

export type GeneratedEmailResponse = {
  subjectLines: string[];
  email: string;
};
