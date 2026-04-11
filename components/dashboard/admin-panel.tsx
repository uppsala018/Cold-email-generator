"use client";

import { useMemo, useState } from "react";
import type { AdminAnalyticsSummary, AdminDashboardUser } from "@/types";

type AdminPanelProps = {
  analytics: AdminAnalyticsSummary;
  users: AdminDashboardUser[];
};

function formatRelativeDate(dateString: string | null) {
  if (!dateString) {
    return "No activity yet";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(dateString));
}

export function AdminPanel({ analytics, users }: AdminPanelProps) {
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id || "");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [sending, setSending] = useState(false);
  const [localUsers, setLocalUsers] = useState(users);

  const selectedUser = useMemo(
    () => localUsers.find((user) => user.id === selectedUserId) || localUsers[0] || null,
    [localUsers, selectedUserId]
  );

  async function sendNotification() {
    if (!selectedUser) {
      setError("Select a user before sending a notification.");
      return;
    }

    if (!title.trim() || !message.trim()) {
      setError("Add both a title and message before sending.");
      return;
    }

    setSending(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          title: title.trim(),
          message: message.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to send the notification.");
      }

      setLocalUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                notificationCount: user.notificationCount + 1,
                unreadNotificationCount: user.unreadNotificationCount + 1
              }
            : user
        )
      );
      setTitle("");
      setMessage("");
      setSuccess(`Private notification sent to ${selectedUser.email}.`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to send the notification."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="rounded-[28px] border border-white/10 bg-surface p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">
            Admin panel
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Users, messages, and visits</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
            Manage private account notes and keep a quick pulse on user growth without leaving the dashboard.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <MetricCard label="Visitors today" value={analytics.visitorsToday} />
        <MetricCard label="Visitors last 7 days" value={analytics.visitorsLast7Days} />
        <MetricCard label="Tracked visitors" value={analytics.totalVisitors} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[24px] border border-white/10 bg-background/40 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Users</h3>
              <p className="mt-1 text-sm text-slate-400">Click an email to compose a private note.</p>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{localUsers.length} users</p>
          </div>

          <div className="mt-4 space-y-3">
            {localUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => setSelectedUserId(user.id)}
                className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                  selectedUser?.id === user.id
                    ? "border-brand/40 bg-brand/10"
                    : "border-white/10 bg-slate-950/40 hover:border-white/25"
                }`}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{user.email}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {user.subscriptionStatus}
                      {user.isAdmin ? " · admin" : ""}
                    </p>
                    <p className="mt-2 text-xs leading-6 text-slate-400">
                      Joined {formatRelativeDate(user.createdAt)} · Last sign-in {formatRelativeDate(user.lastSignInAt)}
                    </p>
                  </div>
                  <div className="text-right text-xs text-slate-400">
                    <p>{user.notificationCount} total notes</p>
                    <p className="mt-1">{user.unreadNotificationCount} unread</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[24px] border border-white/10 bg-background/40 p-4">
            <h3 className="text-lg font-semibold text-white">Send private notification</h3>
            <p className="mt-1 text-sm text-slate-400">
              Messages appear only inside the selected user&apos;s dashboard.
            </p>

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Recipient</p>
              <p className="mt-2 text-sm font-semibold text-white">
                {selectedUser ? selectedUser.email : "No user selected"}
              </p>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="adminNotificationTitle" className="mb-2 block text-sm font-medium text-slate-200">
                  Title
                </label>
                <input
                  id="adminNotificationTitle"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Example: Billing update"
                  className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand"
                />
              </div>
              <div>
                <label htmlFor="adminNotificationMessage" className="mb-2 block text-sm font-medium text-slate-200">
                  Message
                </label>
                <textarea
                  id="adminNotificationMessage"
                  rows={5}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write a short private note for this account."
                  className="w-full rounded-2xl border border-white/10 bg-background/60 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-brand"
                />
              </div>
            </div>

            {error ? <p className="mt-3 text-sm text-rose-300">{error}</p> : null}
            {success ? <p className="mt-3 text-sm text-emerald-300">{success}</p> : null}

            <button
              type="button"
              onClick={sendNotification}
              disabled={sending || !selectedUser}
              className="mt-4 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send private notification"}
            </button>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-background/40 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Top pages</h3>
                <p className="mt-1 text-sm text-slate-400">Most visited routes from tracked traffic.</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {analytics.topPages.length ? (
                analytics.topPages.map((page) => (
                  <div
                    key={page.path}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3"
                  >
                    <p className="text-sm text-white">{page.path}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      {page.visits} visits
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm text-slate-400">
                  No visit data tracked yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-background/40 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
