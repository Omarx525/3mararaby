'use client';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';

type P = { ar: string; en: string; price: [string, string]; f: [string, string][]; hl?: boolean; cta: [string, string]; href?: string };
const plans: P[] = [
  { ar: 'مجاني', en: 'Free', price: ['0 جنيه', 'Free'], cta: ['ابدأ مجانا', 'Start free'], href: '/courses', f: [['كل كورسات البرمجة', 'All programming courses'], ['كورس الذكاء الاصطناعي الأساسي', 'The AI basics course'], ['شهادة إتمام برقم تحقق', 'Certificate with verification ID']] },
  { ar: 'بلس', en: 'Plus', hl: true, price: ['سعر يتحدد', 'Price to be set'], cta: ['قريبا', 'Coming soon'], f: [['مسارات الذكاء الاصطناعي المتقدمة', 'Advanced AI tracks'], ['مشاريع بمراجعة', 'Reviewed projects'], ['دروس جديدة أولا', 'New lessons first']] },
  { ar: 'برو', en: 'Pro', price: ['سعر يتحدد', 'Price to be set'], cta: ['قريبا', 'Coming soon'], f: [['كل ما في بلس', 'Everything in Plus'], ['جلسات مباشرة', 'Live sessions'], ['شهادات بشعار مخصص', 'Branded certificates']] },
];

export default function Pricing() {
  const { lang } = useLang();
  const ar = lang === 'ar';
  return (
    <>
      <h1>{ar ? 'الخطط' : 'Plans'}</h1>
      <p className="lead">{ar ? 'التعلم الأساسي هيفضل مجاني. الخطط المدفوعة لسه تحت التجهيز.' : 'Core learning stays free. Paid plans are still being prepared.'}</p>
      <div className="callout warn">{ar ? 'الدفع مش شغال دلوقتي. الأسعار والمميزات هنا تجريبية وبتتغير قبل الإطلاق.' : 'Payments are not live. Prices and features here are placeholders and will change before launch.'}</div>
      <div className="plans">
        {plans.map((p) => (
          <div key={p.en} className={p.hl ? 'plan hl' : 'plan'}>
            <h3>{ar ? p.ar : p.en}</h3>
            <div className="price">{ar ? p.price[0] : p.price[1]}</div>
            <ul>{p.f.map((x) => <li key={x[1]}>{ar ? x[0] : x[1]}</li>)}</ul>
            {p.href ? <Link className="btn primary" href={p.href}>{ar ? p.cta[0] : p.cta[1]}</Link> : <button type="button" className="btn" disabled>{ar ? p.cta[0] : p.cta[1]}</button>}
          </div>
        ))}
      </div>
    </>
  );
}
