create extension if not exists "pgcrypto";

create table if not exists public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 120),
  message text not null check (char_length(message) between 1 and 2000),
  created_by_email text not null,
  created_at timestamptz not null default timezone('utc', now()),
  read_at timestamptz
);

create index if not exists admin_notifications_user_id_idx
  on public.admin_notifications (user_id, created_at desc);

alter table public.admin_notifications enable row level security;

drop policy if exists "Users can read their own admin notifications"
  on public.admin_notifications;

create policy "Users can read their own admin notifications"
  on public.admin_notifications
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can update their own admin notifications"
  on public.admin_notifications;

create policy "Users can update their own admin notifications"
  on public.admin_notifications
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create table if not exists public.site_visits (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  path text not null,
  visit_date date not null default (timezone('utc', now())::date),
  created_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists site_visits_unique_daily_idx
  on public.site_visits (visitor_id, path, visit_date);

create index if not exists site_visits_visit_date_idx
  on public.site_visits (visit_date desc);

create index if not exists site_visits_path_idx
  on public.site_visits (path);

alter table public.site_visits enable row level security;
