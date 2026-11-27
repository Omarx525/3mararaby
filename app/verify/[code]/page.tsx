'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCourse } from '@/lib/courses';
import { useLang } from '@/lib/i18n';
import { supabase } from '@/lib/supabase';

type Row = { student_name: string; course_id: string; completed_at: string; issued_at: string };

export default function Verify() {
  const { code } = useParams<{ code: string }>();
  const { t, lang } = useLang();
  const [row, setRow] = useState<Row | null | undefined>(undefined);
  useEffect(() => {
    supabase().rpc('verify_certificate', { p_code: code }).then(({ data }) => setRow((data as Row[] | null)?.[0] ?? null));
  }, [code]);
  const fmt = (d: string) => new Date(d).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const c = row ? getCourse(row.course_id) : undefined;
  return (
    <>
      <h1>{t('verifyTitle')}</h1>
      <p className="muted" style={{ direction: 'ltr', textAlign: 'start' }}>{decodeURIComponent(code)}</p>
      {row === undefined && null}
      {row === null && <div className="callout warn">{t('invalid')}</div>}
      {row && (
        <div className="callout">
          <strong>{t('valid')}</strong>
          <p>{row.student_name}<br />{c ? (lang === 'ar' ? c.ar : c.en) : row.course_id}</p>
          <p className="muted small">{t('completedOn')}: {fmt(row.completed_at)} · {t('issuedOn')}: {fmt(row.issued_at)}</p>
        </div>
      )}
    </>
  );
}
