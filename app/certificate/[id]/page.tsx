'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCourse } from '@/lib/courses';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

type Cert = { code: string; student_name: string; completed_at: string };

export default function CertificatePage() {
  const { id } = useParams<{ id: string }>();
  const c = getCourse(id);
  const { t, lang } = useLang();
  const { user, ready, progress } = useAuth();
  const [cert, setCert] = useState<Cert | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user || !c) return;
    supabase().from('certificates').select('code, student_name, completed_at').eq('course_id', c.id).maybeSingle()
      .then(({ data }) => { setCert(data as Cert | null); setLoaded(true); });
  }, [user, c]);

  if (!c) return <p>404</p>;
  if (ready && !user) return <div className="callout warn">{t('signInToSave')} <Link href="/login">{t('login')}</Link></div>;
  if (!user || !loaded) return null;

  const full = (progress[c.id] || []).length >= c.lessons.length;
  const issue = async () => {
    setBusy(true); setErr('');
    const { data, error } = await supabase().rpc('issue_certificate', { p_course: c.id, p_name: name });
    if (error) { setErr(error.message); setBusy(false); return; }
    const { data: row } = await supabase().from('certificates').select('code, student_name, completed_at').eq('code', data as string).single();
    setCert(row as Cert); setBusy(false);
  };

  if (!cert) {
    return (
      <>
        <h1>{t('getCert')}</h1>
        {!full ? <div className="callout warn">{t('notDone')}</div> : (
          <>
            <label htmlFor="nm">{t('yourName')}</label>
            <input id="nm" type="text" value={name} maxLength={80} onChange={(e) => setName(e.target.value)} />
            <p><button type="button" className="btn primary" disabled={busy || name.trim().length < 2} onClick={issue}>{t('getCert')}</button></p>
            {err && <div className="callout warn">{err}</div>}
          </>
        )}
      </>
    );
  }

  const date = new Date(cert.completed_at).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const url = typeof window !== 'undefined' ? `${window.location.origin}/verify/${cert.code}` : '';
  return (
    <>
      <h1 className="no-print">{t('certTitle')}</h1>
      <div className="cert">
        <div className="cert-inner">
          <div className="cert-brand">{t('brand')}</div>
          <div className="cert-title">{t('certTitle')}</div>
          <div className="cert-rule" />
          <div className="muted">{t('certifies')}</div>
          <div className="cert-name">{cert.student_name}</div>
          <div className="muted">{t('completed')}</div>
          <div className="cert-course">{lang === 'ar' ? c.ar : c.en}</div>
          <div className="cert-foot">
            <div className="seal" aria-hidden="true">✓</div>
            <div className="meta"><span>{t('completedOn')}</span><strong>{date}</strong></div>
            <div className="meta"><span>{t('certNo')}</span><strong>{cert.code}</strong></div>
          </div>
          <div className="muted small" style={{ direction: 'ltr' }}>{t('verifyAt')} {url}</div>
        </div>
      </div>
      <p className="no-print"><button type="button" className="btn primary" onClick={() => window.print()}>{t('download')}</button></p>
      <p className="muted small no-print">{t('downloadHint')}</p>
    </>
  );
}
