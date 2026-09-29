-- Hustle Grove schema, rebuilt from src/lib/supabase/types.ts and the app's data access code.
-- Safe to re-run.

-- ── Profiles ────────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  first_name text not null default '',
  last_name text not null default '',
  display_name text not null default '',
  phone text not null default '',
  job_title text not null default '',
  avatar_url text,
  role text not null default 'Member',
  is_active boolean not null default true,
  timezone text not null default 'Australia/Sydney',
  date_format text not null default '24h' check (date_format in ('12h', '24h')),
  created_at timestamptz not null default now()
);

-- Staff check; keep in sync with ADMIN_ROLES in src/lib/auth/roles.ts.
-- security definer so it can read profiles without tripping profiles' own RLS.
create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and is_active
      and role in ('Super Admin', 'Admin', 'Community Manager', 'Reception Staff', 'Finance Staff')
  );
$$;

-- New auth user → profile row. Role is never taken from signup metadata.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Users who already existed before this migration.
insert into public.profiles (id, email)
select id, coalesce(email, '') from auth.users
on conflict (id) do nothing;

-- Non-admins can't change their own role / active flag. SQL editor & service role
-- (auth.uid() is null) are unaffected.
create or replace function public.freeze_profile_privileges()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if auth.uid() is not null and not public.is_admin() then
    new.role := old.role;
    new.is_active := old.is_active;
  end if;
  return new;
end;
$$;

drop trigger if exists freeze_profile_privileges on public.profiles;
create trigger freeze_profile_privileges
  before update on public.profiles
  for each row execute function public.freeze_profile_privileges();

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin" on public.profiles
  for select to authenticated using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_update_own_or_admin" on public.profiles;
create policy "profiles_update_own_or_admin" on public.profiles
  for update to authenticated
  using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- ── Articles ────────────────────────────────────────────────────────────────
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null default '',
  excerpt text not null default '',
  content text[] not null default '{}',
  author_name text not null default '',
  author_role text not null default '',
  author_avatar text not null default '',
  date text not null default '',
  read_time text not null default '',
  image text not null default '',
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.articles enable row level security;

drop policy if exists "articles_select_published" on public.articles;
create policy "articles_select_published" on public.articles
  for select to anon, authenticated using (published or public.is_admin());

drop policy if exists "articles_admin_all" on public.articles;
create policy "articles_admin_all" on public.articles
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ── Site settings (single row, id = true) ───────────────────────────────────
create table if not exists public.site_settings (
  id boolean primary key default true check (id),
  name text not null,
  address text not null default '',
  email text not null default '',
  phone text not null default '',
  hours text not null default '',
  logo_url text,
  logo_size integer not null default 36,
  popup_enabled boolean not null default false,
  popup_title text not null default '',
  popup_message text not null default '',
  resources_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, name, address, email, phone, hours)
values (
  true,
  'The Hustle Grove Workspace',
  e'Level 4, 1 University Avenue\nCanberra ACT 2601, Australia',
  'hello@hustlegrove.com.au',
  '+61 2 6100 0142',
  'Mon–Fri, 8am–6pm · Member access 24/7'
)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_select_all" on public.site_settings;
create policy "site_settings_select_all" on public.site_settings
  for select to anon, authenticated using (true);

drop policy if exists "site_settings_admin_update" on public.site_settings;
create policy "site_settings_admin_update" on public.site_settings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- ── Inquiries ───────────────────────────────────────────────────────────────
do $$ begin
  create type public.inquiry_status as enum ('New', 'Contacted', 'Qualified', 'Converted', 'Closed');
exception when duplicate_object then null;
end $$;

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  room_id text,
  room_name text,
  location text,
  requested_date text,
  requested_time text,
  message text,
  status public.inquiry_status not null default 'New',
  created_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

-- Anyone (incl. anonymous visitors) may submit; only staff may read/manage.
drop policy if exists "inquiries_insert_public" on public.inquiries;
create policy "inquiries_insert_public" on public.inquiries
  for insert to anon, authenticated with check (status = 'New');

drop policy if exists "inquiries_admin_all" on public.inquiries;
create policy "inquiries_admin_all" on public.inquiries
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ── Storage ─────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true), ('branding', 'branding', true)
on conflict (id) do nothing;

-- avatars: each user writes only inside their own <uid>/ folder.
-- (for all: remove() also needs select on the object.)
drop policy if exists "avatars_own_folder" on storage.objects;
create policy "avatars_own_folder" on storage.objects
  for all to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

-- branding: staff only. uploadLogo uses upsert, which needs select + update too.
drop policy if exists "branding_admin_all" on storage.objects;
create policy "branding_admin_all" on storage.objects
  for all to authenticated
  using (bucket_id = 'branding' and public.is_admin())
  with check (bucket_id = 'branding' and public.is_admin());

notify pgrst, 'reload schema';
