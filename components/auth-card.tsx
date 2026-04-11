import type { ReactNode } from "react";

type OauthAction = {
  label: string;
  action: () => Promise<void>;
};

type AuthCardProps = {
  title: string;
  description: string;
  actionLabel: string;
  action: (formData: FormData) => Promise<void>;
  oauthActions?: OauthAction[];
  footer: ReactNode;
  error?: string;
};

export function AuthCard({
  title,
  description,
  actionLabel,
  action,
  oauthActions = [],
  footer,
  error
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-[32px] border border-white/10 bg-surface p-8 shadow-glow">
      <h1 className="text-3xl font-semibold text-white">{title}</h1>
      <p className="mt-3 text-sm leading-7 text-slate-300">{description}</p>
      {oauthActions.length ? (
        <div className="mt-8 space-y-3">
          {oauthActions.map((oauthAction) => (
            <form key={oauthAction.label} action={oauthAction.action}>
              <button
                type="submit"
                className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
              >
                {oauthAction.label}
              </button>
            </form>
          ))}
          <div className="flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
            <div className="h-px flex-1 bg-white/10" />
            <span>Email</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </div>
      ) : null}
      <form action={action} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            minLength={8}
            required
            className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand"
            placeholder="Minimum 8 characters"
          />
        </div>
        {error ? (
          <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          className="w-full rounded-full bg-brand px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-brand-soft"
        >
          {actionLabel}
        </button>
      </form>
      <div className="mt-6 text-sm text-slate-300">{footer}</div>
    </div>
  );
}
