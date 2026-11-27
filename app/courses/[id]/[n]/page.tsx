'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getCourse } from '@/lib/courses';
import { lessonsByCourse, exercises } from '@/lib/lessons';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';

export default function LessonPage() {
  const { id, n: nStr } = useParams<{ id: string; n: string }>();
  const c = getCourse(id);
  const n = Number(nStr) - 1;
  const { t, lang } = useLang();
  const { user, progress, markDone } = useAuth();
  const [sel, setSel] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState(false);
  const [exVal, setExVal] = useState('');
  const [exOk, setExOk] = useState<boolean | null>(null);
  const L = c ? lessonsByCourse[c.id]?.[n] : undefined;
  if (!c || !L) return <p>404</p>;
  const E = exercises[c.id]?.[n];
  const right = sel === L.q.answer;
  const isDone = (progress[c.id] || []).includes(n);
  const body = lang === 'ar' ? L.ar : L.en;

  return (
    <>
      <p className="muted small">{`${lang === 'ar' ? c.ar : c.en} · ${n + 1}/${c.lessons.length}`}</p>
      <h1>{c.lessons[n][lang === 'ar' ? 0 : 1]}</h1>
      {body.map((p) => <p key={p}>{p}</p>)}
      <pre className="code"><code>{L.code}</code></pre>

      {E && (
        <section>
          <h2>{t('tryIt')}</h2>
          <p>{lang === 'ar' ? E.ar : E.en}</p>
          <pre className="code"><code>{E.code}</code></pre>
          <label htmlFor="ex">{t('fillIn')}</label>
          <input id="ex" type="text" dir="ltr" value={exVal} onChange={(e) => { setExVal(e.target.value); setExOk(null); }} />
          <p><button type="button" className="btn primary" disabled={!exVal.trim()} onClick={() => setExOk(exVal.trim() === E.answer)}>{t('run')}</button></p>
          {exOk === true && <div className="callout">{t('correct')}</div>}
          {exOk === false && <div className="callout warn">{t('notYet')}</div>}
        </section>
      )}

      <section>
        <h2>{t('quiz')}</h2>
        <p><strong>{lang === 'ar' ? L.q.ar : L.q.en}</strong></p>
        <div className="choices">
          {L.q.options.map((o, k) => (
            <button key={k} type="button" className={sel === k ? 'btn on' : 'btn'} onClick={() => { setSel(k); setQuizChecked(false); }}>{o}</button>
          ))}
        </div>
        <button type="button" className="btn primary" disabled={sel === null} onClick={() => { setQuizChecked(true); if (right) markDone(c.id, n); }}>{t('check')}</button>
        {quizChecked && (right ? <div className="callout">{user ? t('quizOk') : t('correct')}</div> : <div className="callout warn">{t('quizNo')}</div>)}
        {!user && <div className="callout warn">{t('signInToSave')} <Link href="/login">{t('login')}</Link></div>}
        {isDone && !quizChecked && <p className="muted">✓ {t('done')}</p>}
      </section>

      <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {n > 0 && <Link className="btn" href={`/courses/${c.id}/${n}`}>{t('prev')}</Link>}
        {n < c.lessons.length - 1 && <Link className="btn" href={`/courses/${c.id}/${n + 2}`}>{t('next')}</Link>}
        <Link className="btn" href={`/courses/${c.id}`}>{lang === 'ar' ? c.ar : c.en}</Link>
      </p>
    </>
  );
}
