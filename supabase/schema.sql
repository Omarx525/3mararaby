-- 3mararaby: run this whole file once in Supabase > SQL Editor.

create table if not exists public.courses (
  id text primary key,
  lesson_count int not null check (lesson_count > 0)
);
insert into public.courses (id, lesson_count) values
  ('python', 6), ('javascript', 5), ('c', 5), ('rust', 5), ('lua', 4), ('elixir', 4)
on conflict (id) do update set lesson_count = excluded.lesson_count;

create table if not exists public.progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null references public.courses (id),
  lesson_index int not null check (lesson_index >= 0),
  completed_at timestamptz not null default now(),
  primary key (user_id, course_id, lesson_index)
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id text not null references public.courses (id),
  student_name text not null check (char_length(student_name) between 2 and 80),
  completed_at timestamptz not null,
  issued_at timestamptz not null default now(),
  unique (user_id, course_id)
);

alter table public.courses enable row level security;
alter table public.progress enable row level security;
alter table public.certificates enable row level security;

drop policy if exists "courses readable" on public.courses;
create policy "courses readable" on public.courses for select using (true);

drop policy if exists "own progress read" on public.progress;
create policy "own progress read" on public.progress for select using (auth.uid() = user_id);
drop policy if exists "own progress insert" on public.progress;
create policy "own progress insert" on public.progress for insert with check (auth.uid() = user_id);
drop policy if exists "own progress delete" on public.progress;
create policy "own progress delete" on public.progress for delete using (auth.uid() = user_id);

drop policy if exists "own certificates read" on public.certificates;
create policy "own certificates read" on public.certificates for select using (auth.uid() = user_id);
-- No insert/update/delete policy on certificates: only issue_certificate() can create one.

create or replace function public.issue_certificate(p_course text, p_name text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user uuid := auth.uid();
  v_count int;
  v_done int;
  v_when timestamptz;
  v_code text;
begin
  if v_user is null then raise exception 'not signed in'; end if;
  if p_name is null or char_length(trim(p_name)) < 2 or char_length(p_name) > 80 then
    raise exception 'invalid name';
  end if;
  select lesson_count into v_count from courses where id = p_course;
  if v_count is null then raise exception 'unknown course'; end if;

  select code into v_code from certificates where user_id = v_user and course_id = p_course;
  if v_code is not null then return v_code; end if;

  select count(*), max(completed_at) into v_done, v_when
  from progress
  where user_id = v_user and course_id = p_course and lesson_index < v_count;
  if v_done < v_count then raise exception 'course not completed'; end if;

  v_code := 'MR-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10));
  insert into certificates (code, user_id, course_id, student_name, completed_at)
  values (v_code, v_user, p_course, trim(p_name), v_when);
  return v_code;
end;
$$;
revoke all on function public.issue_certificate(text, text) from public, anon;
grant execute on function public.issue_certificate(text, text) to authenticated;

-- Public check: anyone with a code can see the name, course and dates, nothing else.
create or replace function public.verify_certificate(p_code text)
returns table (student_name text, course_id text, completed_at timestamptz, issued_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select student_name, course_id, completed_at, issued_at
  from certificates where code = upper(trim(p_code));
$$;
grant execute on function public.verify_certificate(text) to anon, authenticated;
