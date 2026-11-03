-- ============================================================================
-- ROMAS Chocolates — Supabase schema (Careers + Admin)
-- Run this in the Supabase dashboard:  SQL Editor → New query → paste → Run.
-- Safe to run more than once (uses IF NOT EXISTS / DROP POLICY IF EXISTS).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. career_applications  — submissions from the public Careers form
-- ----------------------------------------------------------------------------
create table if not exists public.career_applications (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text not null,
  position    text not null,
  state       text not null,
  experience  text,
  resume      text,
  message     text
);

alter table public.career_applications enable row level security;

-- Anonymous visitors may SUBMIT (insert) but NOT read applications.
drop policy if exists "Public can submit career applications" on public.career_applications;
create policy "Public can submit career applications"
  on public.career_applications for insert to anon with check (true);

-- Logged-in admins may READ all applications (shown in the admin dashboard).
drop policy if exists "Admins can read applications" on public.career_applications;
create policy "Admins can read applications"
  on public.career_applications for select to authenticated using (true);

create index if not exists career_applications_created_at_idx
  on public.career_applications (created_at desc);


-- ----------------------------------------------------------------------------
-- 2. job_openings  — roles the admin posts; the Careers page lists the active ones
-- ----------------------------------------------------------------------------
create table if not exists public.job_openings (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  title       text not null,
  department  text not null,
  location    text not null,
  type        text not null default 'Full-time',
  description text,
  is_active   boolean not null default true,
  sort_order  int not null default 0
);

alter table public.job_openings enable row level security;

-- Public (anon) can READ only ACTIVE openings.
drop policy if exists "Public can read active job openings" on public.job_openings;
create policy "Public can read active job openings"
  on public.job_openings for select to anon using (is_active = true);

-- Logged-in admins can READ all, and INSERT / UPDATE / DELETE openings.
drop policy if exists "Admins can read all job openings" on public.job_openings;
create policy "Admins can read all job openings"
  on public.job_openings for select to authenticated using (true);

drop policy if exists "Admins can insert job openings" on public.job_openings;
create policy "Admins can insert job openings"
  on public.job_openings for insert to authenticated with check (true);

drop policy if exists "Admins can update job openings" on public.job_openings;
create policy "Admins can update job openings"
  on public.job_openings for update to authenticated using (true) with check (true);

drop policy if exists "Admins can delete job openings" on public.job_openings;
create policy "Admins can delete job openings"
  on public.job_openings for delete to authenticated using (true);

create index if not exists job_openings_active_sort_idx
  on public.job_openings (is_active, sort_order);

-- Seed the initial roles ONLY if the table is still empty.
insert into public.job_openings (title, department, location, type, sort_order)
select v.title, v.department, v.location, v.type, v.sort_order
from (values
  ('Master Chocolatier (R&D)',              'Product Development', 'Kurod Works, Dhamtari', 'Full-time', 1),
  ('Production Supervisor',                 'Manufacturing',       'Kurod Works, Dhamtari', 'Full-time', 2),
  ('Food Technologist — QA / QC',           'Quality & Safety',    'Kurod Works, Dhamtari', 'Full-time', 3),
  ('Area Sales Manager (B2B)',              'Commercial',          'Pan-India',             'Full-time', 4),
  ('Brand Marketing Executive',             'Marketing',           'Raipur / Hybrid',       'Full-time', 5),
  ('Logistics & Dispatch Coordinator',      'Supply Chain',        'Kurod Works, Dhamtari', 'Full-time', 6)
) as v(title, department, location, type, sort_order)
where not exists (select 1 from public.job_openings);


-- ============================================================================
-- 3. CREATE THE ADMIN LOGIN  (one-time, in the dashboard — not via SQL)
-- ----------------------------------------------------------------------------
-- a) Authentication → Users → "Add user" → enter the admin email + password
--    (tick "Auto Confirm User").  Any logged-in user is treated as an admin.
-- b) Authentication → Providers → Email → turn OFF "Enable Sign Ups"
--    so the public cannot create accounts — only users you add can log in.
-- The admin signs in at  /admin  on the website.
-- ============================================================================
