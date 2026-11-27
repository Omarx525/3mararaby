'use client';
import Link from 'next/link';
import { courses } from '@/lib/courses';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { themes } from '@/lib/theme';

export default function Dashboard() {
  const { lang, t } = useLang();
  const { user, ready, progress } = useAuth();
  const ar = lang === 'ar';
  if (ready && !user) return <div className="callout warn">{t('signInToSave')} <Link href="/login">{t('login')}</Link></div>;
  const total = courses.reduce((a, c) => a + c.lessons.length, 0);
  const done = courses.reduce((a, c) => a + (progress[c.id] || []).length, 0);
  const next = courses.find((c) => (progress[c.id] || []).length > 0 && (progress[c.id] || []).length < c.lessons.length) || courses[0];
  const nextIdx = Math.min((progress[next.id] || []).length, next.lessons.length - 1) + 1;
  return (
    <>
      <h1>{ar ? 'لوحة تعلمي' : 'My learning'}</h1>
      <div className="stats">
        <div className="stat"><strong>{done}/{total}</strong><span>{ar ? 'دروس مكتملة' : 'Lessons done'}</span></div>
        <div className="stat"><strong>{courses.filter((c) => (progress[c.id] || []).length >= c.lessons.length).length}</strong><span>{ar ? 'كورسات خلصت' : 'Courses finished'}</span></div>
      </div>
      <div className="callout"><strong>{ar ? 'كمّل من حيث وقفت' : 'Continue learning'}</strong><br />{ar ? next.ar : next.en} · <Link href={`/courses/${next.id}/${nextIdx}`}>{ar ? 'الدرس' : 'Lesson'} {nextIdx}</Link></div>
      <h2>{ar ? 'تقدمك في الكورسات' : 'Your courses'}</h2>
      {courses.map((c) => {
        const d = (progress[c.id] || []).length; const full = d >= c.lessons.length;
        return (
          <div key={c.id} className="dash-row">
            <span className="mini" style={{ background: themes[c.id].grad }} dir="ltr">{themes[c.id].mark}</span>
            <div className="grow"><Link href={`/courses/${c.id}`}><strong>{ar ? c.ar : c.en}</strong></Link>
              <div className="bar" aria-hidden="true"><div style={{ width: `${(100 * d) / c.lessons.length}%` }} /></div></div>
            <span className="muted small">{d}/{c.lessons.length}</span>
            {full && <Link className="btn sm primary" href={`/certificate/${c.id}`}>{t('certTitle')}</Link>}
          </div>
        );
      })}
    </>
  );
}
