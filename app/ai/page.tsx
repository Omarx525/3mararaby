'use client';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { getCourse } from '@/lib/courses';
import CourseCard from '@/components/CourseCard';

const tracks: [string, string, string, string][] = [
  ['أدوات الذكاء الاصطناعي في شغلك', 'AI tools for your work', 'كتابة، تلخيص، بحث وتنظيم وقت بأدوات مجانية.', 'Writing, summarising, research and planning with free tools.'],
  ['هندسة الأوامر (Prompting)', 'Prompt engineering', 'إزاي تكتب أوامر بتجيب نتيجة قوية كل مرة.', 'How to write prompts that work every time.'],
  ['بناء مساعد شخصي', 'Build a personal assistant', 'اعمل مساعد على واتساب يشتغل بالعربي المصري.', 'Build an assistant on WhatsApp that speaks Egyptian Arabic.'],
  ['صناعة محتوى بالذكاء الاصطناعي', 'Content creation with AI', 'فيديوهات وصوت وصور لقناتك، مع ذكر المصادر.', 'Video, voice and images for your channel, with credits.'],
  ['الأمان والخصوصية', 'Safety and privacy', 'إيه تشاركه وإيه لأ، وإزاي تراجع المعلومات.', 'What to share, what not to, and how to fact-check.'],
];

export default function AI() {
  const { lang } = useLang();
  const ar = lang === 'ar';
  const c = getCourse('ai-basics')!;
  return (
    <>
      <span className="pill">{ar ? 'تعليم الذكاء الاصطناعي' : 'AI education'}</span>
      <h1>{ar ? 'اتعلم الذكاء الاصطناعي بالعربي' : 'Learn AI in Arabic'}</h1>
      <p className="lead">{ar ? 'قسم من قناة 3mararaby لتعليم الذكاء الاصطناعي. ابدأ بكورس الأساسيات المجاني، والباقي جاي.' : 'The AI education section of the 3mararaby channel. Start with the free basics course; more tracks are coming.'}</p>
      <h2>{ar ? 'متاح دلوقتي' : 'Available now'}</h2>
      <div className="grid"><CourseCard c={c} /></div>
      <h2>{ar ? 'مسارات جاية' : 'Coming tracks'}</h2>
      <div className="tracks">
        {tracks.map((t) => (
          <div key={t[1]} className="track">
            <span className="tag soon">{ar ? 'قريبا' : 'Coming soon'}</span>
            <h3>{ar ? t[0] : t[1]}</h3>
            <p className="muted small">{ar ? t[2] : t[3]}</p>
          </div>
        ))}
      </div>
      <section className="band alt">
        <h2>{ar ? 'عايز المسارات المتقدمة؟' : 'Want the advanced tracks?'}</h2>
        <p>{ar ? 'المسارات دي هتبقى ضمن الخطط المدفوعة. الدفع لسه مش شغال.' : 'These tracks will be part of the paid plans. Payment is not live yet.'}</p>
        <Link className="btn lg light" href="/pricing">{ar ? 'شوف الخطط' : 'See plans'}</Link>
      </section>
    </>
  );
}
