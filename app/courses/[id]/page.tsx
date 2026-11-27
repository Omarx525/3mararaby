'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCourse } from '@/lib/courses';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const c = getCourse(id);
  const { t, lang } = useLang();
  const { user, progress } = useAuth();
  const [hasCert, setHasCert] = useState(false);
  useEffect(() => {
    if (!user || !c) return;
    supabase().from('certificates').select('code').eq('course_id', c.id).maybeSingle().then(({ data }) => setHasCert(Boolean(data)));
  }, [user, c]);
  if (!c) return <p>404</p>;
  const done = progress[c.id] || [];
  const full = done.length >= c.lessons.length;
  return (
    <>
      <p className="muted small">{t(c.kind)}</p>
      <h1>{lang === 'ar' ? c.ar : c.en}</h1>
      <p>{lang === 'ar' ? c.descAr : c.descEn}</p>
      <div className="bar" aria-hidden="true"><div style={{ width: `${(100 * done.length) / c.lessons.length}%` }} /></div>
      <p className="muted small">{t('progress')}: {done.length}/{c.lessons.length} · {c.hours} {t('hours')}</p>
      {!user && <div className="callout warn">{t('signInToSave')} <Link href="/login">{t('login')}</Link></div>}
      <h2>{t('lessons')}</h2>
      {c.lessons.map((l, n) => (
        <Link key={n} href={`/courses/${c.id}/${n + 1}`} className="row">
          <span>{`${n + 1}. ${l[lang === 'ar' ? 0 : 1]}`}</span>
          {done.includes(n) && <span className="chip" style={{ background: 'var(--teal)', color: '#fff' }}>✓ {t('done')}</span>}
        </Link>
      ))}
      {full && <p><Link className="btn primary" href={`/certificate/${c.id}`}>{hasCert ? t('certTitle') : t('getCert')}</Link></p>}
    </>
  );
}
