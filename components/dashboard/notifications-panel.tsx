import type { UserNotification } from "@/types";

type NotificationsPanelProps = {
  notifications: UserNotification[];
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(dateString));
}

export function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">
            Notifications
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Private account notes</h2>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Important account updates from the team will appear here.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-background/50 px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Inbox</p>
          <p className="mt-1 text-sm text-slate-200">{notifications.length} messages</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {notifications.length ? (
          notifications.map((notification) => (
            <article
              key={notification.id}
              className="rounded-2xl border border-white/10 bg-background/40 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">{notification.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                    {formatDate(notification.createdAt)} by {notification.createdByEmail}
                  </p>
                </div>
                {notification.readAt ? (
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Read
                  </span>
                ) : (
                  <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-brand-soft">
                    New
                  </span>
                )}
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-200">{notification.message}</p>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-sm leading-7 text-slate-400">
            No private notifications yet.
          </div>
        )}
      </div>
    </section>
  );
}
