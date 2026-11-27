'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'ar' | 'en';

const dict = {
  brand: ['3mararaby', '3mararaby'],
  home: ['الرئيسية', 'Home'], courses: ['الدورات', 'Courses'], login: ['دخول', 'Sign in'], logout: ['خروج', 'Sign out'],
  heroTitle: ['تعلم البرمجة بالعربي', 'Learn programming in Arabic'],
  heroText: ['دورات برمجة بالعربي، من اللغات المعروفة لحد اللغات اللي قليل بيتكلم عنها. كل دورة بتخلص بشهادة.', 'Programming courses in Arabic, from well-known languages to rare ones. Every course ends with a certificate.'],
  freeTitle: ['مجاني وعملي', 'Free and hands-on'],
  freeText: ['كل درس فيه شرح قصير، تمرين تكتب فيه الكود بنفسك، واختبار.', 'Every lesson has a short explanation, a code exercise you type yourself, and a quiz.'],
  browse: ['شوف الدورات', 'Browse courses'],
  how: ['كيف يشتغل', 'How it works'],
  step1: ['اختار دورة.', 'Pick a course.'], step2: ['خلّص الدروس والتمارين والاختبارات.', 'Finish the lessons, exercises and quizzes.'], step3: ['استلم شهادة برقم تحقق تقدر تنزلها.', 'Get a certificate with a verification number you can download.'],
  known: ['معروفة', 'Well known'], rare: ['أقل شهرة', 'Less known'], ai: ['ذكاء اصطناعي', 'AI'], beginner: ['مبتدئ', 'Beginner'], intermediate: ['متوسط', 'Intermediate'],
  lessons: ['الدروس', 'Lessons'], lessonsWord: ['درس', 'lessons'], hours: ['ساعات', 'hours'], progress: ['تقدمك', 'Your progress'],
  tryIt: ['جرّب بنفسك', 'Try it yourself'], fillIn: ['اكتب الجزء الناقص مكان ___', 'Type what replaces ___'], run: ['شغّل', 'Run'],
  correct: ['تمام، صح', 'Correct'], notYet: ['لسه مش مظبوط', 'Not yet'], quiz: ['اختبار قصير', 'Quick quiz'], check: ['تحقق', 'Check'],
  quizOk: ['إجابة صح، الدرس اتسجل كمكتمل.', 'Correct. The lesson is marked done.'], quizNo: ['مش دي. جرب إجابة تانية.', 'Not quite. Try another answer.'],
  prev: ['الدرس السابق', 'Previous'], next: ['الدرس التالي', 'Next'], done: ['مكتمل', 'Done'],
  signInToSave: ['سجّل دخول عشان تحفظ تقدمك.', 'Sign in to save your progress.'],
  email: ['الإيميل', 'Email'], password: ['كلمة السر', 'Password'], signUp: ['إنشاء حساب', 'Create account'], signInBtn: ['دخول', 'Sign in'],
  checkEmail: ['لو الحساب جديد، افتح الإيميل وأكد الحساب بعدين سجّل دخول.', 'If the account is new, confirm it from your email, then sign in.'],
  getCert: ['استلم الشهادة', 'Get certificate'], yourName: ['اسمك زي ما هيظهر على الشهادة', 'Your name as it will appear on the certificate'],
  certTitle: ['شهادة إتمام', 'Certificate of completion'], certifies: ['تشهد 3mararaby بأن', '3mararaby certifies that'], completed: ['أتم بنجاح دورة', 'has successfully completed the course'],
  completedOn: ['تاريخ إتمام الدورة', 'Completed on'], certNo: ['رقم التحقق', 'Verification number'], verifyAt: ['للتحقق:', 'Verify at:'],
  download: ['حمّل PDF', 'Download PDF'], downloadHint: ['اختار "حفظ كـ PDF" من نافذة الطباعة.', 'Choose "Save as PDF" in the print window.'],
  verifyTitle: ['التحقق من شهادة', 'Certificate verification'], valid: ['الشهادة صحيحة', 'This certificate is valid'], invalid: ['مفيش شهادة بالرقم ده', 'No certificate with this number'],
  issuedOn: ['صدرت في', 'Issued on'], lookup: ['اكتب رقم التحقق', 'Enter a verification number'], verify: ['تحقق', 'Verify'],
  notDone: ['لسه ما خلصتش كل الدروس.', 'You have not finished every lesson yet.'], setupMissing: ['الموقع مش متوصل بقاعدة البيانات لسه. راجع README.', 'The site is not connected to its database yet. See the README.'],
  footer: ['مجاني. الدروس مسودة وبتتطور.', 'Free. Lessons are drafts and keep improving.'],
} as const;
export type Key = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string };
const LangContext = createContext<Ctx>({ lang: 'ar', setLang: () => {}, t: (k) => dict[k][0] });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ar');
  useEffect(() => {
    const saved = window.localStorage.getItem('lang');
    if (saved === 'ar' || saved === 'en') setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); window.localStorage.setItem('lang', l); };
  const t = (k: Key) => dict[k][lang === 'ar' ? 0 : 1];
  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}
export const useLang = () => useContext(LangContext);
