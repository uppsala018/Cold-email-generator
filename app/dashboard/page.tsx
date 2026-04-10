import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { GeneratorForm } from "@/components/dashboard/generator-form";
import { UpgradeCard } from "@/components/dashboard/upgrade-card";
import { isUserSubscribed } from "@/lib/billing";
import { createClient } from "@/lib/supabase/server";
import { getUserUsageSnapshot } from "@/lib/usage";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const subscribed = isUserSubscribed(user);
  const usage = await getUserUsageSnapshot(user.id);

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-6 py-10 lg:px-8">
      <DashboardHeader email={user.email || "Unknown user"} subscribed={subscribed} />
      <div className="mt-8">
        {subscribed ? <GeneratorForm usage={usage} /> : <UpgradeCard />}
      </div>
    </main>
  );
}
