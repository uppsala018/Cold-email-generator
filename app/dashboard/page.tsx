import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/dashboard/admin-panel";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { GeneratorForm } from "@/components/dashboard/generator-form";
import { NotificationsPanel } from "@/components/dashboard/notifications-panel";
import { UpgradeCard } from "@/components/dashboard/upgrade-card";
import { getAdminAnalyticsSummary } from "@/lib/analytics";
import { isAdminUser, isUserSubscribed } from "@/lib/billing";
import { getAdminUsers, getUserNotifications } from "@/lib/notifications";
import { createClient } from "@/lib/supabase/server";
import { getUserTemplates } from "@/lib/templates";
import { getUserUsageSnapshot } from "@/lib/usage";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const subscribed = isUserSubscribed(user);
  const admin = isAdminUser(user);
  const usage = await getUserUsageSnapshot(user.id);
  const templates = subscribed ? await getUserTemplates(user.id) : [];
  const notifications = await getUserNotifications(user.id);
  const [adminUsers, analytics] = admin
    ? await Promise.all([getAdminUsers(), getAdminAnalyticsSummary()])
    : [[], null];

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
      <DashboardHeader email={user.email || "Unknown user"} subscribed={subscribed} admin={admin} />
      <div className="mt-8 space-y-6">
        {subscribed ? <GeneratorForm usage={usage} initialTemplates={templates} /> : <UpgradeCard />}
        {admin && analytics ? <AdminPanel users={adminUsers} analytics={analytics} /> : null}
        <NotificationsPanel notifications={notifications} />
      </div>
    </main>
  );
}
