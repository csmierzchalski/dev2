-- Run in Supabase SQL Editor (Dashboard → SQL) once per project.
-- Enables per-user subscriptions with Row Level Security.

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  category text not null check (
    category in (
      'streaming',
      'productivity',
      'education',
      'design',
      'other'
    )
  ),
  monthly_cost numeric(12, 2) not null check (monthly_cost >= 0),
  usage_hours numeric(12, 2) not null default 0 check (usage_hours >= 0),
  renewal_date date not null,
  logo text not null default '📦',
  color text not null default '#6366f1',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);

alter table public.subscriptions enable row level security;

drop policy if exists "subscriptions_select_own" on public.subscriptions;
create policy "subscriptions_select_own" on public.subscriptions for select using (auth.uid() = user_id);

drop policy if exists "subscriptions_insert_own" on public.subscriptions;
create policy "subscriptions_insert_own" on public.subscriptions for insert
with check (auth.uid() = user_id);

drop policy if exists "subscriptions_update_own" on public.subscriptions;
create policy "subscriptions_update_own" on public.subscriptions for update using (auth.uid() = user_id);

drop policy if exists "subscriptions_delete_own" on public.subscriptions;
create policy "subscriptions_delete_own" on public.subscriptions for delete using (auth.uid() = user_id);
