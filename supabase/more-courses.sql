-- Run once in Supabase > SQL Editor so progress and certificates work for the three data courses.
-- Insert-only upsert: adds/updates course rows, deletes nothing.
insert into public.courses (id, lesson_count) values
  ('excel', 6), ('statistics', 5), ('data-viz', 5)
on conflict (id) do update set lesson_count = excluded.lesson_count;
