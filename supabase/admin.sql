-- 3mararaby v3: AI course, visit tracking and the private owner dashboard.
insert into public.courses (id, lesson_count) values ('ai-basics', 4)
on conflict (id) do update set lesson_count = excluded.lesson_count;

create table if not exists public.admins (email text primary key);
alter table public.admins enable row level security;
insert into public.admins (email) values ('oaraby854@gmail.com'), ('omararaby525@gmail.com') on conflict do nothing;

create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  visitor text not null check (char_length(visitor) between 8 and 64),
  path text not null check (char_length(path) <= 200)
);
alter table public.page_views enable row level security;

create or replace function public.track_view(p_visitor text, p_path text)
returns void language sql security definer set search_path = public as $$
  insert into public.page_views (visitor, path) values (left(p_visitor, 64), left(p_path, 200));
$$;
grant execute on function public.track_view(text, text) to anon, authenticated;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admins where lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.admin_stats()
returns json language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then raise exception 'not allowed'; end if;
  return json_build_object(
    'views_total', (select count(*) from page_views),
    'visitors_total', (select count(distinct visitor) from page_views),
    'visitors_7d', (select count(distinct visitor) from page_views where at > now() - interval '7 days'),
    'visitors_today', (select count(distinct visitor) from page_views where at > date_trunc('day', now())),
    'signups', (select count(*) from auth.users),
    'lessons_done', (select count(*) from progress),
    'certificates', (select count(*) from certificates),
    'daily', coalesce((select json_agg(d order by d.day) from (select to_char(date_trunc('day', at), 'YYYY-MM-DD') as day, count(distinct visitor) as visitors, count(*) as views from page_views where at > now() - interval '14 days' group by 1) d), '[]'::json),
    'top_pages', coalesce((select json_agg(t) from (select path, count(*) as views from page_views group by 1 order by 2 desc limit 8) t), '[]'::json),
    'users', coalesce((select json_agg(u order by u.created desc) from (select au.email, to_char(au.created_at, 'YYYY-MM-DD HH24:MI') as created, (select count(*) from progress p where p.user_id = au.id) as lessons, (select count(*) from certificates c where c.user_id = au.id) as certs from auth.users au order by au.created_at desc limit 200) u), '[]'::json)
  );
end $$;
revoke all on function public.admin_stats() from public, anon;
grant execute on function public.admin_stats() to authenticated;
