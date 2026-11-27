'use client';
import Link from 'next/link';
import { courses } from '@/lib/courses';
import { useLang } from '@/lib/i18n';
import CourseCard from '@/components/CourseCard';

export default function Home() {
  const { lang, t } = useLang();
  const ar = lang === 'ar';
  const lessonsTotal = courses.reduce((a, c) => a + c.lessons.length, 0);
  const stats: [string, string][] = [
    [String(courses.length), ar ? 'كورسات' : 'Courses'],
    [String(lessonsTotal), ar ? 'درس تفاعلي' : 'Interactive lessons'],
    ['0', ar ? 'جنيه، مجاني بالكامل' : 'Cost, fully free'],
    [ar ? 'شهادة' : 'Cert', ar ? 'بتاريخ الإتمام ورقم تحقق' : 'With date and verification ID'],
  ];
  const steps: [string, string, string][] = [
    ['1', ar ? 'اختار كورس' : 'Pick a course', ar ? 'من بايثون وجافاسكريبت لحد راست وإليكسير.' : 'From Python and JavaScript to Rust and Elixir.'],
    ['2', ar ? 'اتعلم بإيدك' : 'Learn by doing', ar ? 'شرح قصير، تمرين تكتبه، واختبار بعد كل درس.' : 'A short explanation, an exercise you type, and a quiz in every lesson.'],
    ['3', ar ? 'خد شهادتك' : 'Earn your certificate', ar ? 'حمّلها PDF وأي حد يقدر يتأكد منها برقم التحقق.' : 'Download it as PDF. Anyone can check it with the verification ID.'],
  ];
  return (
    <>
      <section className="hero-wrap">
        <div className="hero-text">
          <span className="pill">{ar ? 'مجاني · بالعربي · بشهادة' : 'Free · Arabic-first · Certified'}</span>
          <h1 className="hero-h">{ar ? 'اتعلم البرمجة بالعربي، من الصفر لحد المشروع' : 'Learn programming in Arabic, from zero to your first project'}</h1>
          <p className="lead">{t('heroText')}</p>
          <div className="cta-row">
            <Link className="btn primary lg" href="/courses">{t('browse')}</Link>
            <Link className="btn lg" href="/courses/python">{ar ? 'ابدأ بايثون' : 'Start Python'}</Link>
          </div>
        </div>
        <div className="hero-art"><img src="/hero.png" alt="" /></div>
      </section>

      <section className="stats">
        {stats.map(([n, l]) => <div key={l} className="stat"><strong>{n}</strong><span>{l}</span></div>)}
      </section>

      <section>
        <div className="sec-head"><h2>{ar ? 'الكورسات' : 'Courses'}</h2><Link href="/courses" className="more">{ar ? 'شوف الكل' : 'See all'}</Link></div>
        <div className="grid">{courses.map((c) => <CourseCard key={c.id} c={c} />)}</div>
      </section>

      <section>
        <h2>{t('how')}</h2>
        <div className="steps">
          {steps.map(([n, h, p]) => <div key={n} className="step"><span className="num">{n}</span><h3>{h}</h3><p className="muted">{p}</p></div>)}
        </div>
      </section>

      <section className="band">
        <h2>{ar ? 'جاهز تبدأ؟' : 'Ready to start?'}</h2>
        <p>{ar ? 'اعمل حساب مجاني عشان تحفظ تقدمك وتاخد شهاداتك.' : 'Create a free account to save progress and earn certificates.'}</p>
        <Link className="btn lg light" href="/login">{ar ? 'إنشاء حساب مجاني' : 'Create a free account'}</Link>
      </section>
    </>
  );
}
