"use client";

import { useState } from "react";

export function UpgradeCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error ? checkoutError.message : "Unable to start checkout."
      );
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[32px] border border-brand/30 bg-surface p-8 shadow-glow">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-soft">
        Upgrade Required
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Unlock Cold Email Generator Pro</h2>
      <p className="mt-4 max-w-2xl text-slate-300">
        This dashboard is protected by an active Stripe subscription. Upgrade to access the
        generator, future monthly limits, and billing-backed account access.
      </p>
      <div className="mt-8 rounded-3xl border border-white/10 bg-background/50 p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">Cold Email Generator Pro</p>
            <p className="mt-2 text-sm text-slate-300">$29/month billed monthly through Stripe Checkout.</p>
          </div>
          <button
            type="button"
            onClick={startCheckout}
            disabled={loading}
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Redirecting..." : "Upgrade Now"}
          </button>
        </div>
      </div>
      {error ? (
        <p className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}
    </div>
  );
}
