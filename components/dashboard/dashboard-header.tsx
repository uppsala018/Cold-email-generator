import { logoutAction } from "@/app/actions";

type DashboardHeaderProps = {
  email: string;
  subscribed: boolean;
  admin?: boolean;
};

export function DashboardHeader({ email, subscribed, admin = false }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm text-brand-soft">Signed in as {email}</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Cold Email Generator Dashboard</h1>
        <p className="mt-2 text-sm text-slate-300">
          Subscription status: {subscribed ? "Active" : "Inactive"}
        </p>
        <p className="mt-1 text-sm text-slate-400">
          Build connected first-touch and follow-up sequences from one structured workflow.
        </p>
        {admin ? (
          <p className="mt-2 text-sm text-emerald-300">Admin tools enabled for this account.</p>
        ) : null}
      </div>
      <form action={logoutAction}>
        <button
          type="submit"
          className="rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white hover:border-white/30"
        >
          Logout
        </button>
      </form>
    </div>
  );
}
