'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useLang } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

export default function Members() {
  const { user, ready } = useAuth();
  const { lang } = useLang();
  const ar = lang === 'ar';
  const [plan, setPlan] = useState<string | null | undefined>(undefined);
  useEffect(() => { if (user) supabase().rpc('my_plan').then(({ data }) => setPlan((data as string) || null)); }, [user]);
  if (!ready || (user && plan === undefined)) return <p>...</p>;
  if (!user) return <div className="callout warn">{ar ? 'سجّل دخول الأول.' : 'Sign in first.'} <Link href="/login">{ar ? 'دخول' : 'Sign in'}</Link></div>;
  if (!plan) return (<><h1>{ar ? 'المحتوى المدفوع' : 'Paid content'}</h1><div className="callout warn">{ar ? 'الخطة مش مفعّلة على حسابك.' : 'No paid plan is active on your account.'} <Link href="/pricing">{ar ? 'شوف الخطط' : 'See plans'}</Link></div></>);
  const items: [string, string][] = [['مسارات الذكاء الاصطناعي المتقدمة', 'Advanced AI tracks'], ['مشاريع بمراجعة', 'Reviewed projects'], ['دروس جديدة أولا', 'New lessons first']];
  return (
    <>
      <span className="pill">{plan === 'pro' ? 'Pro' : 'Plus'}</span>
      <h1>{ar ? 'محتوى الأعضاء' : 'Members content'}</h1>
      <p className="muted">{ar ? 'خطتك مفعّلة. المحتوى هنا مكان مؤقت لحد ما يتضاف.' : 'Your plan is active. Content here is a placeholder until it is added.'}</p>
      <div className="tracks">{items.map((i) => <div key={i[1]} className="track"><h3>{ar ? i[0] : i[1]}</h3><p className="muted small">{ar ? 'قريبا' : 'Coming soon'}</p></div>)}</div>
    </>
  );
}
