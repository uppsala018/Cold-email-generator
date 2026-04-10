create table if not exists public.saved_templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  persona_preset text not null,
  target_audience text not null,
  product_or_service text not null,
  angle text not null,
  tone text not null,
  offer text not null,
  cta text not null,
  personalization_notes text not null,
  email_length text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists saved_templates_user_id_created_at_idx
  on public.saved_templates (user_id, created_at desc);

alter table public.saved_templates enable row level security;

create policy "saved_templates_select_own"
  on public.saved_templates
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "saved_templates_insert_own"
  on public.saved_templates
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "saved_templates_delete_own"
  on public.saved_templates
  for delete
  to authenticated
  using (auth.uid() = user_id);
