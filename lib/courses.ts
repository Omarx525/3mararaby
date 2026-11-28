export type Course = {
  id: string; ar: string; en: string; kind: 'known' | 'rare' | 'ai' | 'data'; level: 'beginner' | 'intermediate';
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
  { id: 'ai-basics', ar: 'الذكاء الاصطناعي من الصفر', en: 'AI from scratch', kind: 'ai', level: 'beginner', hours: 3, descAr: 'افهم الذكاء الاصطناعي واستخدمه صح وبأمان.', descEn: 'Understand AI and use it well and safely.',
    lessons: [['يعني إيه ذكاء اصطناعي', 'What AI actually is'], ['إزاي بيتعلم', 'How it learns'], ['اكتب أوامر كويسة', 'Writing good prompts'], ['استخدمه بأمان', 'Using it safely']] },
  { id: 'data-analyst', ar: 'محلل بيانات من الصفر', en: 'Data Analyst from scratch', kind: 'data', level: 'beginner', hours: 10, descAr: 'من السؤال لحد الشارت: جداول وSQL وبايثون وpandas.', descEn: 'From question to chart: spreadsheets, SQL, Python and pandas.',
    lessons: [['دورة حياة تحليل البيانات', 'The data analysis workflow'], ['الجداول: Excel وSheets', 'Spreadsheets: Excel and Sheets'], ['SQL للتحليل', 'SQL for analysis'], ['pandas في بايثون', 'pandas in Python'], ['تنضيف البيانات', 'Cleaning data'], ['الشارتات ومشروع صغير', 'Charts and a mini project']] },
  { id: 'sql', ar: 'SQL من الصفر', en: 'SQL from scratch', kind: 'data', level: 'beginner', hours: 4, descAr: 'اسأل قواعد البيانات واطلع إجابات.', descEn: 'Question databases and get answers.',
    lessons: [['SELECT', 'SELECT'], ['الفلترة والترتيب', 'Filtering and sorting'], ['التجميع', 'Aggregation'], ['الربط JOIN', 'JOINs']] },
  { id: 'git', ar: 'Git وGitHub', en: 'Git and GitHub', kind: 'known', level: 'beginner', hours: 3, descAr: 'سجّل تاريخ مشروعك وشارك شغلك.', descEn: 'Track your project history and share your work.',
    lessons: [['أول commit', 'Your first commit'], ['الحالة والتاريخ', 'Status and history'], ['الفروع', 'Branches'], ['GitHub وPull Request', 'GitHub and Pull Requests']] },
  { id: 'html-css', ar: 'HTML وCSS', en: 'HTML and CSS', kind: 'known', level: 'beginner', hours: 5, descAr: 'اعمل صفحة ويب شكلها حلو وتشتغل على الموبايل.', descEn: 'Build a good-looking web page that works on mobile.',
    lessons: [['هيكل الصفحة', 'Page structure'], ['التنسيق بـ CSS', 'Styling with CSS'], ['Flexbox', 'Flexbox'], ['الموبايل والاستجابة', 'Mobile and responsive design']] },
];

export const getCourse = (id: string) => courses.find((c) => c.id === id);
