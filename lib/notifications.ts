import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminUser } from "@/lib/billing";
import type { AdminDashboardUser, UserNotification } from "@/types";

type NotificationRow = {
  id: string;
  user_id: string;
  title: string;
  message: string;
  created_at: string;
  read_at: string | null;
  created_by_email: string;
};

function mapNotification(row: NotificationRow): UserNotification {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    message: row.message,
    createdAt: row.created_at,
    readAt: row.read_at,
    createdByEmail: row.created_by_email
  };
}

export async function getUserNotifications(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admin_notifications")
    .select("id,user_id,title,message,created_at,read_at,created_by_email")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(12);

  if (error) {
    console.error("Unable to load notifications.", error);
    return [];
  }

  return ((data || []) as NotificationRow[]).map(mapNotification);
}

export async function createAdminNotification(input: {
  userId: string;
  title: string;
  message: string;
  createdByEmail: string;
}) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("admin_notifications")
    .insert({
      user_id: input.userId,
      title: input.title,
      message: input.message,
      created_by_email: input.createdByEmail
    } as never)
    .select("id,user_id,title,message,created_at,read_at,created_by_email")
    .single();

  if (error) {
    throw error;
  }

  return mapNotification(data as NotificationRow);
}

export async function getAdminUsers(): Promise<AdminDashboardUser[]> {
  const supabase = createAdminClient();
  const [{ data: userData, error: userError }, { data: notificationData, error: notificationError }] =
    await Promise.all([
      supabase.auth.admin.listUsers({
        page: 1,
        perPage: 200
      }),
      supabase.from("admin_notifications").select("user_id,read_at")
    ]);

  if (userError) {
    throw userError;
  }

  if (notificationError) {
    console.error("Unable to load admin notification counts.", notificationError);
  }

  const notificationCounts = new Map<string, { total: number; unread: number }>();

  (((notificationData as Array<{ user_id: string; read_at: string | null }>) || [])).forEach(
    (notification) => {
      const current = notificationCounts.get(notification.user_id) || { total: 0, unread: 0 };
      current.total += 1;
      if (!notification.read_at) {
        current.unread += 1;
      }
      notificationCounts.set(notification.user_id, current);
    }
  );

  return (userData.users || [])
    .map((user) => {
      const subscriptionStatus =
        (user.app_metadata?.subscription_status as string | undefined) ||
        (user.user_metadata?.subscription_status as string | undefined) ||
        (isAdminUser(user) ? "admin" : "inactive");
      const counts = notificationCounts.get(user.id) || { total: 0, unread: 0 };

      return {
        id: user.id,
        email: user.email || "Unknown user",
        createdAt: user.created_at || null,
        lastSignInAt: user.last_sign_in_at || null,
        subscriptionStatus,
        isAdmin: isAdminUser(user),
        notificationCount: counts.total,
        unreadNotificationCount: counts.unread
      };
    })
    .sort((left, right) => (right.createdAt || "").localeCompare(left.createdAt || ""));
}
