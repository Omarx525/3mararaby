'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

type Pay = { id: string; email: string; plan: string; amount: number; currency: string; method: string; reference: string; sender_phone: string; status: string; created: string };
type Stats = {
  views_total: number; visitors_total: number; visitors_7d: number; visitors_today: number; signups: number; lessons_done: number; certificates: number;
  daily: { day: string; visitors: number; views: number }[]; top_pages: { path: string; views: number }[];
  users: { email: string; created: string; lessons: number; certs: number }[];
};

export default function Owner() {
  const { user, ready } = useAuth();
  const [s, setS] = useState<Stats | null>(null);
  const [pays, setPays] = useState<Pay[]>([]);
  const loadPays = () => supabase().rpc('admin_payments').then(({ data }) => setPays((data as Pay[]) || []));
  const decide = async (id: string, st: string) => { await supabase().rpc('admin_set_payment', { p_id: id, p_status: st }); loadPays(); };
  const [denied, setDenied] = useState(false);
  useEffect(() => {
    if (!user) return;
    supabase().rpc('admin_stats').then(({ data, error }) => { if (error || !data) setDenied(true); else { setS(data as Stats); loadPays(); } });
  }, [user]);
  if (!ready) return <p>...</p>;
  if (!user) return <div className="callout warn">سجّل دخول بحساب المالك. <Link href="/login">دخول</Link></div>;
  if (denied) return <div className="callout warn">الحساب ده مش مصرح له بفتح اللوحة.</div>;
  if (!s) return <p>...</p>;
  const cards: [number, string][] = [[s.visitors_total, 'زوار (فريدين)'], [s.visitors_today, 'زوار النهارده'], [s.visitors_7d, 'زوار آخر 7 أيام'], [s.views_total, 'مشاهدات صفحات'], [s.signups, 'حسابات'], [s.lessons_done, 'دروس مكتملة'], [s.certificates, 'شهادات']];
  return (
    <>
      <span className="pill">خاص بالمالك</span>
      <h1>لوحة المالك</h1>
      <div className="stats">{cards.map(([n, l]) => <div key={l} className="stat"><strong>{n}</strong><span>{l}</span></div>)}</div>
      <h2>آخر 14 يوم</h2>
      <table className="tbl"><thead><tr><th>اليوم</th><th>زوار</th><th>مشاهدات</th></tr></thead><tbody>{s.daily.map((d) => <tr key={d.day}><td dir="ltr">{d.day}</td><td>{d.visitors}</td><td>{d.views}</td></tr>)}</tbody></table>
      <h2>أكتر الصفحات زيارة</h2>
      <table className="tbl"><thead><tr><th>الصفحة</th><th>مشاهدات</th></tr></thead><tbody>{s.top_pages.map((p) => <tr key={p.path}><td dir="ltr">{p.path}</td><td>{p.views}</td></tr>)}</tbody></table>
      <h2>مدفوعات فودافون كاش</h2>
      <div style={{ overflowX: 'auto' }}><table className="tbl"><thead><tr><th>الإيميل</th><th>الخطة</th><th>المبلغ</th><th>الطريقة</th><th>رقم العملية</th><th>موبايل</th><th>الحالة</th><th></th></tr></thead><tbody>{pays.map((p) => <tr key={p.id}><td dir="ltr">{p.email}</td><td>{p.plan}</td><td>{p.amount} {p.currency}</td><td>{p.method === 'bank' ? 'بنك' : 'فودافون'}</td><td dir="ltr">{p.reference}</td><td dir="ltr">{p.sender_phone}</td><td>{p.status}</td><td>{p.status === 'pending' && <><button type="button" className="btn primary sm" onClick={() => decide(p.id, 'approved')}>قبول</button> <button type="button" className="btn sm" onClick={() => decide(p.id, 'rejected')}>رفض</button></>}</td></tr>)}{pays.length === 0 && <tr><td colSpan={8}>مفيش طلبات</td></tr>}</tbody></table></div>
      <h2>المستخدمين</h2>
      <div style={{ overflowX: 'auto' }}><table className="tbl"><thead><tr><th>الإيميل</th><th>تاريخ التسجيل</th><th>دروس</th><th>شهادات</th></tr></thead><tbody>{s.users.map((u) => <tr key={u.email}><td dir="ltr">{u.email}</td><td dir="ltr">{u.created}</td><td>{u.lessons}</td><td>{u.certs}</td></tr>)}</tbody></table></div>
      <h2>لوحات التحكم</h2>
      <p><a className="btn" href="https://supabase.com/dashboard/project/bswdtqxbqrhhqqovbyzg" target="_blank" rel="noreferrer">Supabase</a> <a className="btn" href="https://vercel.com/omar-a335/3mararaby" target="_blank" rel="noreferrer">Vercel</a> <a className="btn" href="https://github.com/Omarx525/3mararaby" target="_blank" rel="noreferrer">GitHub</a></p>
    </>
  );
}
