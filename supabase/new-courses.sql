-- Run once in Supabase > SQL Editor so progress and certificates work for the new courses.
insert into public.courses (id, lesson_count) values
  ('data-analyst', 6), ('sql', 4), ('git', 4), ('html-css', 4)
on conflict (id) do update set lesson_count = excluded.lesson_count;
