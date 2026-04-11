import type { User } from "@supabase/supabase-js";

export function isUserSubscribed(user: User | null) {
  if (!user) {
    return false;
  }

  const adminBypassEmails = (process.env.ADMIN_BYPASS_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (user.email && adminBypassEmails.includes(user.email.toLowerCase())) {
    return true;
  }

  if (process.env.NEXT_PUBLIC_ENABLE_TEST_SUBSCRIPTION === "true") {
    return true;
  }

  const status =
    (user.app_metadata?.subscription_status as string | undefined) ||
    (user.user_metadata?.subscription_status as string | undefined);

  return status === "active" || status === "trialing";
}
