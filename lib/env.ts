const requiredEnvKeys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_PRICE_ID",
  "OPENAI_API_KEY"
] as const;

export function getMissingEnvKeys() {
  return requiredEnvKeys.filter((key) => !process.env[key]);
}
