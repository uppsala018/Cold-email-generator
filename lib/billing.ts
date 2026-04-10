import type { User } from "@supabase/supabase-js";

export function isUserSubscribed(user: User | null) {
  if (!user) {
    return false;
  }

  if (process.env.NEXT_PUBLIC_ENABLE_TEST_SUBSCRIPTION === "true") {
    return true;
  }

  const status =
    (user.app_metadata?.subscription_status as string | undefined) ||
    (user.user_metadata?.subscription_status as string | undefined);

  return status === "active" || status === "trialing";
}
