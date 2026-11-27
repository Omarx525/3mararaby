-- 3mararaby v4: manual Vodafone Cash payments, approved by the owner.
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  plan text not null check (plan in ('plus', 'pro')),
  amount_egp int not null check (amount_egp > 0),
  reference text not null check (char_length(reference) between 4 and 80),
  sender_phone text not null check (char_length(sender_phone) between 6 and 20),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  decided_at timestamptz
);
alter table public.payments enable row level security;
create unique index if not exists one_pending_per_user on public.payments (user_id) where status = 'pending';

drop policy if exists "own payments read" on public.payments;
create policy "own payments read" on public.payments for select using (auth.uid() = user_id);
drop policy if exists "own payments insert" on public.payments;
create policy "own payments insert" on public.payments for insert with check (auth.uid() = user_id and status = 'pending');

create or replace function public.my_plan()
returns text language sql stable security definer set search_path = public as $$
  select plan from payments where user_id = auth.uid() and status = 'approved'
  order by case plan when 'pro' then 1 else 2 end limit 1;
$$;
grant execute on function public.my_plan() to authenticated;

create or replace function public.admin_payments()
returns json language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then raise exception 'not allowed'; end if;
  return coalesce((select json_agg(x order by x.created desc) from (
    select p.id, au.email, p.plan, p.amount_egp, p.reference, p.sender_phone, p.status,
           to_char(p.created_at, 'YYYY-MM-DD HH24:MI') as created
    from payments p join auth.users au on au.id = p.user_id limit 200) x), '[]'::json);
end $$;
revoke all on function public.admin_payments() from public, anon;
grant execute on function public.admin_payments() to authenticated;

create or replace function public.admin_set_payment(p_id uuid, p_status text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'not allowed'; end if;
  if p_status not in ('approved', 'rejected') then raise exception 'bad status'; end if;
  update payments set status = p_status, decided_at = now() where id = p_id;
end $$;
revoke all on function public.admin_set_payment(uuid, text) from public, anon;
grant execute on function public.admin_set_payment(uuid, text) to authenticated;
