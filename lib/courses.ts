export type Course = {
  id: string; ar: string; en: string; kind: 'known' | 'rare'; level: 'beginner' | 'intermediate';
  hours: number; descAr: string; descEn: string; lessons: [string, string][];
};

export const courses: Course[] = [
  { id: 'python', ar: 'بايثون من الصفر', en: 'Python from scratch', kind: 'known', level: 'beginner', hours: 6, descAr: 'أسهل بداية للبرمجة.', descEn: 'The easiest way into programming.',
    lessons: [['أول برنامج', 'Your first program'], ['المتغيرات', 'Variables'], ['الشروط', 'Conditions'], ['الحلقات', 'Loops'], ['الدوال', 'Functions'], ['مشروع صغير', 'Mini project']] },
  { id: 'javascript', ar: 'جافاسكريبت للويب', en: 'JavaScript for the web', kind: 'known', level: 'beginner', hours: 7, descAr: 'اعمل صفحات ويب تتفاعل مع المستخدم.', descEn: 'Build web pages that react to users.',
    lessons: [['أساسيات اللغة', 'Language basics'], ['الدوال', 'Functions'], ['التعامل مع الصفحة', 'Working with the page'], ['الأحداث', 'Events'], ['مشروع صغير', 'Mini project']] },
  { id: 'c', ar: 'لغة سي', en: 'The C language', kind: 'known', level: 'intermediate', hours: 9, descAr: 'افهم الذاكرة والمؤشرات.', descEn: 'Understand memory and pointers.',
    lessons: [['أول برنامج', 'Your first program'], ['الأنواع', 'Types'], ['المؤشرات', 'Pointers'], ['الذاكرة', 'Memory'], ['مشروع صغير', 'Mini project']] },
  { id: 'rust', ar: 'راست', en: 'Rust', kind: 'rare', level: 'intermediate', hours: 8, descAr: 'لغة سريعة وآمنة في التعامل مع الذاكرة.', descEn: 'A fast language that keeps memory safe.',
    lessons: [['التثبيت وكارجو', 'Install and Cargo'], ['الملكية', 'Ownership'], ['الاستعارة', 'Borrowing'], ['الأنواع المخصصة', 'Custom types'], ['مشروع صغير', 'Mini project']] },
  { id: 'lua', ar: 'لوا', en: 'Lua', kind: 'rare', level: 'beginner', hours: 4, descAr: 'لغة خفيفة للألعاب والأدوات.', descEn: 'A light language for games and tools.',
    lessons: [['الأساسيات', 'Basics'], ['الجداول', 'Tables'], ['الدوال', 'Functions'], ['مشروع صغير', 'Mini project']] },
  { id: 'elixir', ar: 'إليكسير', en: 'Elixir', kind: 'rare', level: 'intermediate', hours: 6, descAr: 'برمجة وظيفية لأنظمة كبيرة.', descEn: 'Functional programming for large systems.',
    lessons: [['الأساسيات', 'Basics'], ['مطابقة الأنماط', 'Pattern matching'], ['العمليات', 'Processes'], ['مشروع صغير', 'Mini project']] },
];

export const getCourse = (id: string) => courses.find((c) => c.id === id);
