'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useLang } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';
import { vodafoneNumber, planPrices, paymentsReady, bank, usdPrices, bankReady } from '@/lib/plans';

type Pay = { id: string; plan: string; amount: number; currency: string; method: string; status: string; created_at: string };

export default function Checkout() {
  const { user, ready } = useAuth();
  const { lang } = useLang();
  const ar = lang === 'ar';
  const [plan, setPlan] = useState<'plus' | 'pro'>('plus');
  const [method, setMethod] = useState<'vodafone' | 'bank'>('vodafone');
  const [ref, setRef] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [list, setList] = useState<Pay[]>([]);
  const load = () => supabase().from('payments').select('id, plan, amount, currency, method, status, created_at').order('created_at', { ascending: false }).then(({ data }) => setList((data as Pay[]) || []));
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('plan');
    if (p === 'plus' || p === 'pro') setPlan(p);
  }, []);
  useEffect(() => { if (user) load(); }, [user]);
  if (!ready) return <p>...</p>;
  if (!user) return <div className="callout warn">{ar ? 'سجّل دخول الأول.' : 'Sign in first.'} <Link href="/login">{ar ? 'دخول' : 'Sign in'}</Link></div>;
  const bk = method === 'bank';
  const ok = bk ? bankReady(plan) : paymentsReady(plan);
  const hasPending = list.some((x) => x.status === 'pending');
  const submit = async () => {
    setMsg('');
    const { error } = await supabase().from('payments').insert({ user_id: user.id, plan, method, currency: bk ? 'USD' : 'EGP', amount: bk ? usdPrices[plan] : planPrices[plan], reference: ref.trim(), sender_phone: bk ? null : phone.trim() });
    if (error) setMsg(ar ? 'ماتبعتش. اتأكد من البيانات، ولو عندك طلب قيد المراجعة استنى الرد عليه.' : 'Not sent. Check the fields; if you already have a pending request, wait for it.');
    else { setRef(''); setPhone(''); setMsg(ar ? 'اتبعت. هتتراجع وتتفعل الخطة بعد التأكيد.' : 'Sent. The plan is activated after review.'); load(); }
  };
  const st: Record<string, [string, string]> = { pending: ['قيد المراجعة', 'Pending'], approved: ['اتفعلت', 'Approved'], rejected: ['مرفوضة', 'Rejected'] };
  return (
    <>
      <h1>{ar ? 'اشتراك' : 'Subscribe'}</h1>
      <div className="choices" style={{ direction: 'ltr' }}>
        <button type="button" className={!bk ? 'btn on' : 'btn'} onClick={() => setMethod('vodafone')}>{ar ? 'فودافون كاش (مصر)' : 'Vodafone Cash (Egypt)'}</button>
        <button type="button" className={bk ? 'btn on' : 'btn'} onClick={() => setMethod('bank')}>{ar ? 'تحويل بنكي دولي' : 'International bank transfer'}</button>
      </div>
      <div className="choices" style={{ direction: 'ltr' }}>
        {(['plus', 'pro'] as const).map((p) => <button key={p} type="button" className={plan === p ? 'btn on' : 'btn'} onClick={() => setPlan(p)}>{p === 'plus' ? (ar ? 'بلس' : 'Plus') : (ar ? 'برو' : 'Pro')}</button>)}
      </div>
      {!ok ? (
        <div className="callout warn">{bk ? (ar ? 'التحويل البنكي لسه مش متفعل: بيانات الحساب والسعر هيتحطوا قريب. ما تحولش فلوس دلوقتي.' : 'Bank transfer is not enabled yet: account details and price will be added soon. Do not transfer money now.') : (ar ? 'الدفع لسه مش متفعل. ما تحولش فلوس دلوقتي.' : 'Payment is not enabled yet. Do not transfer money now.')}</div>
      ) : bk ? (
        <ol>
          <li>{ar ? `حوّل ${usdPrices[plan]} دولار أمريكي للحساب التالي:` : `Send ${usdPrices[plan]} USD to:`}
            <ul dir="ltr" style={{ textAlign: 'left' }}><li>Bank: {bank.name}</li><li>SWIFT/BIC: {bank.swift}</li><li>Account holder: {bank.holder}</li><li>IBAN: <strong>{bank.iban}</strong></li></ul></li>
          <li>{ar ? 'اكتب رقم المرجع اللي طلع في إيصال التحويل.' : 'Enter the reference number from your transfer receipt.'}</li>
          <li>{ar ? 'هنراجع التحويل ونفعل الخطة (ممكن ياخد أيام عمل).' : 'We review the transfer and activate the plan (it can take a few business days).'}</li>
        </ol>
      ) : (
        <ol>
          <li>{ar ? `حوّل ${planPrices[plan]} جنيه على فودافون كاش للرقم:` : `Send ${planPrices[plan]} EGP by Vodafone Cash to:`} <strong dir="ltr">{vodafoneNumber}</strong></li>
          <li>{ar ? 'اكتب رقم العملية (من رسالة التأكيد) ورقم موبايلك اللي حولت منه.' : 'Enter the transaction reference (from the confirmation SMS) and the phone you sent from.'}</li>
          <li>{ar ? 'هنراجع التحويل ونفعل الخطة.' : 'We review the transfer and activate the plan.'}</li>
        </ol>
      )}
      <label htmlFor="ref">{bk ? (ar ? 'رقم المرجع' : 'Transfer reference') : (ar ? 'رقم العملية' : 'Transaction reference')}</label>
      <input id="ref" type="text" dir="ltr" value={ref} onChange={(e) => setRef(e.target.value)} />
      {!bk && <><label htmlFor="ph">{ar ? 'رقم الموبايل اللي حولت منه' : 'Phone you sent from'}</label>
      <input id="ph" type="text" dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} /></>}
      <p><button type="button" className="btn primary" disabled={!ok || hasPending || ref.trim().length < 4 || (!bk && phone.trim().length < 6)} onClick={submit}>{ar ? 'ابعت للمراجعة' : 'Send for review'}</button></p>
      <p className="muted small">{ar ? 'ما تكتبش بيانات كارت أو بنك أو الرقم السري. رقم العملية بس.' : 'Never enter card, bank or PIN data. The transaction reference only.'}</p>
      {msg && <div className="callout">{msg}</div>}
      {list.length > 0 && (<><h2>{ar ? 'طلباتك' : 'Your requests'}</h2><table className="tbl"><tbody>{list.map((x) => <tr key={x.id}><td>{x.plan}</td><td>{x.amount} {x.currency}</td><td>{st[x.status]?.[ar ? 0 : 1]}</td></tr>)}</tbody></table></>)}
    </>
  );
}
