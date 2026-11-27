'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useLang } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { vodafoneNumber, planPrices, paymentsReady } from '@/lib/plans';

type Pay = { id: string; plan: string; amount_egp: number; status: string; created_at: string };

export default function Checkout() {
  const { user, ready } = useAuth();
  const { lang } = useLang();
  const ar = lang === 'ar';
  const [plan, setPlan] = useState<'plus' | 'pro'>('plus');
  const [ref, setRef] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [list, setList] = useState<Pay[]>([]);
  const load = () => supabase().from('payments').select('id, plan, amount_egp, status, created_at').order('created_at', { ascending: false }).then(({ data }) => setList((data as Pay[]) || []));
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('plan');
    if (p === 'plus' || p === 'pro') setPlan(p);
  }, []);
  useEffect(() => { if (user) load(); }, [user]);
  if (!ready) return <p>...</p>;
  if (!user) return <div className="callout warn">{ar ? 'سجّل دخول الأول.' : 'Sign in first.'} <Link href="/login">{ar ? 'دخول' : 'Sign in'}</Link></div>;
  const ok = paymentsReady(plan);
  const hasPending = list.some((x) => x.status === 'pending');
  const submit = async () => {
    setMsg('');
    const { error } = await supabase().from('payments').insert({ user_id: user.id, plan, amount_egp: planPrices[plan], reference: ref.trim(), sender_phone: phone.trim() });
    if (error) setMsg(ar ? 'ماتبعتش. اتأكد من البيانات، ولو عندك طلب قيد المراجعة استنى الرد عليه.' : 'Not sent. Check the fields; if you already have a pending request, wait for it.');
    else { setRef(''); setPhone(''); setMsg(ar ? 'اتبعت. هتتراجع وتتفعل الخطة بعد التأكيد.' : 'Sent. The plan is activated after review.'); load(); }
  };
  const st: Record<string, [string, string]> = { pending: ['قيد المراجعة', 'Pending'], approved: ['اتفعلت', 'Approved'], rejected: ['مرفوضة', 'Rejected'] };
  return (
    <>
      <h1>{ar ? 'اشتراك بفودافون كاش' : 'Subscribe with Vodafone Cash'}</h1>
      <div className="choices" style={{ direction: 'ltr' }}>
        {(['plus', 'pro'] as const).map((p) => <button key={p} type="button" className={plan === p ? 'btn on' : 'btn'} onClick={() => setPlan(p)}>{p === 'plus' ? (ar ? 'بلس' : 'Plus') : (ar ? 'برو' : 'Pro')}</button>)}
      </div>
      {!ok ? (
        <div className="callout warn">{ar ? 'الدفع لسه مش متفعل: رقم فودافون كاش والسعر هيتحطوا قريب. ما تحولش فلوس دلوقتي.' : 'Payment is not enabled yet: the Vodafone Cash number and price will be added soon. Do not transfer money now.'}</div>
      ) : (
        <ol>
          <li>{ar ? `حوّل ${planPrices[plan]} جنيه على فودافون كاش للرقم:` : `Send ${planPrices[plan]} EGP by Vodafone Cash to:`} <strong dir="ltr">{vodafoneNumber}</strong></li>
          <li>{ar ? 'اكتب رقم العملية (من رسالة التأكيد) ورقم موبايلك اللي حولت منه.' : 'Enter the transaction reference (from the confirmation SMS) and the phone you sent from.'}</li>
          <li>{ar ? 'هنراجع التحويل ونفعل الخطة.' : 'We review the transfer and activate the plan.'}</li>
        </ol>
      )}
      <label htmlFor="ref">{ar ? 'رقم العملية' : 'Transaction reference'}</label>
      <input id="ref" type="text" dir="ltr" value={ref} onChange={(e) => setRef(e.target.value)} />
      <label htmlFor="ph">{ar ? 'رقم الموبايل اللي حولت منه' : 'Phone you sent from'}</label>
      <input id="ph" type="text" dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <p><button type="button" className="btn primary" disabled={!ok || hasPending || ref.trim().length < 4 || phone.trim().length < 6} onClick={submit}>{ar ? 'ابعت للمراجعة' : 'Send for review'}</button></p>
      <p className="muted small">{ar ? 'ما تكتبش بيانات كارت أو بنك أو الرقم السري. رقم العملية بس.' : 'Never enter card, bank or PIN data. The transaction reference only.'}</p>
      {msg && <div className="callout">{msg}</div>}
      {list.length > 0 && (<><h2>{ar ? 'طلباتك' : 'Your requests'}</h2><table className="tbl"><tbody>{list.map((x) => <tr key={x.id}><td>{x.plan}</td><td>{x.amount_egp}</td><td>{st[x.status]?.[ar ? 0 : 1]}</td></tr>)}</tbody></table></>)}
    </>
  );
}
