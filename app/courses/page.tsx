'use client';
import { useState } from 'react';
import { courses } from '@/lib/courses';
import { useLang } from '@/lib/i18n';
import CourseCard from '@/components/CourseCard';

export default function Courses() {
  const { t, lang } = useLang();
  const [f, setF] = useState<'all' | 'known' | 'rare' | 'ai' | 'data'>('all');
  const ar = lang === 'ar';
  const list = courses.filter((c) => f === 'all' || c.kind === f);
  const opts: ['all' | 'known' | 'rare' | 'ai' | 'data', string][] = [['all', ar ? 'الكل' : 'All'], ['known', t('known')], ['rare', t('rare')], ['ai', t('ai')], ['data', t('data')]];
  return (
    <>
      <h1>{t('courses')}</h1>
      <p className="muted">{ar ? 'كل كورس فيه دروس قصيرة وتمارين واختبارات، وبينتهي بشهادة.' : 'Every course has short lessons, exercises and quizzes, and ends with a certificate.'}</p>
      <div className="filters">{opts.map(([k, l]) => <button key={k} type="button" className={f === k ? 'chip on' : 'chip'} onClick={() => setF(k)}>{l}</button>)}</div>
      <div className="grid">{list.map((c) => <CourseCard key={c.id} c={c} />)}</div>
    </>
  );
}
