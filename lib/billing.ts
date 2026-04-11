import type { User } from "@supabase/supabase-js";

function getAdminBypassEmails() {
  return (process.env.ADMIN_BYPASS_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminUser(user: Pick<User, "email"> | null) {
  if (!user?.email) {
    return false;
  }

  return getAdminBypassEmails().includes(user.email.toLowerCase());
}

export function isUserSubscribed(user: User | null) {
  if (!user) {
    return false;
  }

  if (isAdminUser(user)) {
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
