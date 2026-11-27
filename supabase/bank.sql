-- 3mararaby v5: international bank transfer as a second payment method.
alter table public.payments rename column amount_egp to amount;
alter table public.payments add column if not exists method text not null default 'vodafone' check (method in ('vodafone', 'bank'));
alter table public.payments add column if not exists currency text not null default 'EGP' check (currency in ('EGP', 'USD'));
alter table public.payments alter column sender_phone drop not null;
alter table public.payments drop constraint if exists payments_sender_phone_check;

create or replace function public.admin_payments()
returns json language plpgsql security definer set search_path = public, auth as $$
begin
  if not public.is_admin() then raise exception 'not allowed'; end if;
  return coalesce((select json_agg(x order by x.created desc) from (
    select p.id, au.email, p.plan, p.amount, p.currency, p.method, p.reference, coalesce(p.sender_phone, '') as sender_phone, p.status,
           to_char(p.created_at, 'YYYY-MM-DD HH24:MI') as created
    from payments p join auth.users au on au.id = p.user_id limit 200) x), '[]'::json);
end $$;
