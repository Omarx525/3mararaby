'use client';
import Link from 'next/link';
import type { Course } from '@/lib/courses';
import { themes } from '@/lib/theme';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';

export default function CourseCard({ c }: { c: Course }) {
  const { t, lang } = useLang();
  const { progress } = useAuth();
  const done = (progress[c.id] || []).length;
  const pct = Math.round((100 * done) / c.lessons.length);
  const th = themes[c.id];
  return (
    <Link href={`/courses/${c.id}`} className="card">
      <div className="card-cover" style={{ background: th.grad }}>
        <span className="card-mark" dir="ltr">{th.mark}</span>
        <span className="badge">{t(c.kind)}</span>
      </div>
      <div className="card-body">
        <h3>{lang === 'ar' ? c.ar : c.en}</h3>
        <p className="muted small">{lang === 'ar' ? c.descAr : c.descEn}</p>
        <p className="meta-line">{t(c.level)} · {c.lessons.length} {t('lessonsWord')} · {c.hours} {t('hours')}</p>
        <div className="bar" aria-hidden="true"><div style={{ width: `${pct}%` }} /></div>
        <p className="muted small">{done > 0 ? `${pct}% · ${done}/${c.lessons.length}` : (lang === 'ar' ? 'ابدأ دلوقتي' : 'Start now')}</p>
      </div>
    </Link>
  );
}
