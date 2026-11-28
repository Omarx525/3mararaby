import type { Lesson, Ex } from './lessons';
import { dataLessons, dataExercises } from './lessons-data';
// Original lesson drafts (Egyptian Arabic + English). Written from scratch, no copied material.
const L = (ar: string[], en: string[], code: string, qa: string, qe: string, options: string[], answer: number): Lesson => ({ ar, en, code, q: { ar: qa, en: qe, options, answer } });

const dataAnalyst: Lesson[] = [
  L(['تحليل البيانات معناه إنك تاخد أرقام خام وتطلع منها إجابة لسؤال. الشغل بيمشي في خطوات: اسأل، اجمع، نضّف، حلل، اعرض، وبعدين شارك النتيجة.', 'أهم خطوة هي السؤال. من غير سؤال واضح هتغرق في أرقام من غير فايدة.'],
    ['Data analysis means taking raw numbers and getting an answer to a question. The work follows steps: ask, collect, clean, analyze, present, share.', 'The question is the most important step. Without a clear question you drown in numbers.'],
    `1. السؤال: مبيعات أنهي شهر نزلت؟\n2. البيانات: ملف المبيعات\n3. التنضيف: شيل التكرار والفاضي\n4. التحليل: قارن الشهور\n5. العرض: رسم بياني\n6. المشاركة: ملخص من 3 أسطر`,
    'إيه أول خطوة في تحليل البيانات؟', 'What is the first step of data analysis?', ['رسم الشارت', 'تحديد السؤال', 'كتابة التقرير', 'شراء أداة'], 1),
  L(['الجداول (Excel أو Google Sheets) هي أسهل بداية. الدوال الأساسية: SUM بتجمع، AVERAGE بتحسب المتوسط، COUNTIF بتعد الخلايا اللي بتحقق شرط.', 'الجدول المحوري (Pivot Table) بيلخص آلاف الصفوف في جدول صغير بالمجموع أو العدد لكل فئة.'],
    ['Spreadsheets (Excel or Google Sheets) are the easiest start. Core functions: SUM adds, AVERAGE gives the mean, COUNTIF counts cells that match a condition.', 'A pivot table summarizes thousands of rows into a small table of totals or counts per category.'],
    '=SUM(B2:B100)\n=AVERAGE(B2:B100)\n=COUNTIF(C2:C100, "Cairo")', 'أي دالة بتحسب المتوسط؟', 'Which function calculates the average?', ['SUM', 'COUNTIF', 'AVERAGE', 'TOTAL'], 2),
  L(['SQL لغة بنسأل بيها قواعد البيانات. SELECT بتختار الأعمدة، FROM بتحدد الجدول، WHERE بتفلتر الصفوف.', 'GROUP BY بتجمع الصفوف حسب عمود، ومعاها دوال زي SUM و COUNT و AVG.'],
    ['SQL is the language we use to question databases. SELECT picks columns, FROM names the table, WHERE filters rows.', 'GROUP BY groups rows by a column, together with functions like SUM, COUNT and AVG.'],
    `SELECT city, SUM(amount) AS total\nFROM sales\nWHERE year = 2026\nGROUP BY city\nORDER BY total DESC;`, 'أي جزء بيجمع الصفوف حسب عمود؟', 'Which clause groups rows by a column?', ['WHERE', 'GROUP BY', 'ORDER BY', 'FROM'], 1),
  L(['مكتبة pandas في بايثون بتخلينا نشتغل على الجداول بالكود. DataFrame هو الجدول جوه بايثون.', 'read_csv بتقرا ملف CSV، head بتعرض أول صفوف، describe بتديك ملخص إحصائي، و groupby بتجمع زي SQL.'],
    ['The pandas library in Python lets us work with tables in code. A DataFrame is a table inside Python.', 'read_csv loads a CSV file, head shows the first rows, describe gives summary statistics, and groupby groups like SQL.'],
    `import pandas as pd\n\ndf = pd.read_csv("sales.csv")\nprint(df.head())\nprint(df.describe())\nprint(df.groupby("city")["amount"].sum())`, 'إيه الدالة اللي بتقرا ملف CSV في pandas؟', 'Which pandas function reads a CSV file?', ['read_csv', 'open_csv', 'load', 'import_csv'], 0),
  L(['البيانات الحقيقية دايمًا وحشة شوية: قيم ناقصة، صفوف مكررة، وأنواع غلط (رقم متخزن كنص). ده بياخد أغلب وقت المحلل.', 'dropna بتشيل الصفوف الناقصة، fillna بتملا الناقص، drop_duplicates بتشيل التكرار، و astype بتغير النوع.'],
    ['Real data is always a bit messy: missing values, duplicate rows, wrong types (a number stored as text). This takes most of an analyst time.', 'dropna removes rows with gaps, fillna fills them, drop_duplicates removes repeats, and astype changes the type.'],
    `df = df.drop_duplicates()\ndf["amount"] = df["amount"].fillna(0)\ndf["amount"] = df["amount"].astype(float)`, 'أي دالة بتشيل الصفوف المكررة؟', 'Which function removes duplicate rows?', ['drop_duplicates', 'remove_same', 'unique_only', 'fillna'], 0),
  L(['اختار الشارت حسب السؤال: خط لتغير الأرقام عبر الزمن، أعمدة لمقارنة فئات، وفطيرة لنسب قليلة بس. العنوان لازم يقول الخلاصة.', 'مشروع صغير: خد ملف مبيعات، نضّفه، اطلع مجموع كل مدينة، وارسم أعمدة بـ matplotlib.'],
    ['Pick the chart by the question: a line for change over time, bars to compare categories, a pie only for a few shares. The title should state the takeaway.', 'Mini project: take a sales file, clean it, total each city, and draw bars with matplotlib.'],
    `import matplotlib.pyplot as plt\n\ntotals = df.groupby("city")["amount"].sum()\ntotals.plot(kind="bar", title="Cairo leads sales")\nplt.show()`, 'أنسب شارت لمقارنة مبيعات 5 مدن؟', 'Best chart to compare sales of 5 cities?', ['أعمدة', 'فطيرة بـ 5 شرايح صغيرة', 'خط', 'مفيش'], 0),
];

const sql: Lesson[] = [
  L(['قاعدة البيانات العلائقية بتخزن البيانات في جداول، كل جدول فيه أعمدة وصفوف. SQL بنسألها بيها.', 'SELECT بتختار الأعمدة اللي عايزها من جدول، والنجمة * معناها كل الأعمدة.'],
    ['A relational database stores data in tables made of columns and rows. We question it with SQL.', 'SELECT picks the columns you want from a table, and the star * means all columns.'],
    `SELECT name, price\nFROM products;`, 'إيه معنى SELECT * ؟', 'What does SELECT * mean?', ['كل الأعمدة', 'أول صف', 'عد الصفوف', 'مسح الجدول'], 0),
  L(['WHERE بتفلتر الصفوف بشرط، و ORDER BY بترتبها، و LIMIT بتحدد عددها.', 'نقدر نركب الشروط بـ AND و OR.'],
    ['WHERE filters rows by a condition, ORDER BY sorts them, LIMIT caps how many come back.', 'Conditions can be combined with AND and OR.'],
    `SELECT name, price\nFROM products\nWHERE price > 100 AND stock > 0\nORDER BY price DESC\nLIMIT 5;`, 'إيه اللي بيرتب النتيجة؟', 'Which clause sorts the result?', ['WHERE', 'ORDER BY', 'LIMIT', 'GROUP'], 1),
  L(['دوال التجميع: COUNT بتعد، SUM بتجمع، AVG بتحسب المتوسط، MIN و MAX للأصغر والأكبر.', 'مع GROUP BY بتطلع رقم لكل مجموعة. HAVING بتفلتر المجموعات بعد التجميع.'],
    ['Aggregate functions: COUNT counts, SUM adds, AVG averages, MIN and MAX give smallest and largest.', 'With GROUP BY you get one number per group. HAVING filters groups after grouping.'],
    `SELECT category, COUNT(*) AS n, AVG(price) AS avg_price\nFROM products\nGROUP BY category\nHAVING COUNT(*) > 3;`, 'أي كلمة بتفلتر المجموعات بعد GROUP BY؟', 'Which keyword filters groups after GROUP BY?', ['WHERE', 'HAVING', 'FILTER', 'ORDER'], 1),
  L(['JOIN بيربط جدولين بعمود مشترك، زي رقم العميل. INNER JOIN بيرجع الصفوف اللي ليها مقابل في الجدولين بس.', 'LEFT JOIN بيرجع كل صفوف الجدول الأول حتى لو مالهاش مقابل.'],
    ['JOIN links two tables through a shared column, like a customer id. INNER JOIN returns only rows that match in both tables.', 'LEFT JOIN returns every row of the first table even when there is no match.'],
    `SELECT c.name, o.total\nFROM customers c\nJOIN orders o ON o.customer_id = c.id;`, 'أي JOIN بيرجع صفوف الجدول الأول كلها؟', 'Which JOIN keeps all rows of the first table?', ['INNER JOIN', 'LEFT JOIN', 'CROSS', 'SELF'], 1),
];

const git: Lesson[] = [
  L(['Git بيسجل تاريخ التعديلات على مشروعك، فتقدر ترجع لأي نسخة قديمة. GitHub موقع بيخزن مشاريع Git أونلاين.', 'git init بيبدأ مشروع، git add بيجهز الملفات، و git commit بيحفظ لقطة برسالة.'],
    ['Git records the history of changes in your project so you can go back to any old version. GitHub is a website that hosts Git projects online.', 'git init starts a project, git add stages files, and git commit saves a snapshot with a message.'],
    `git init\ngit add .\ngit commit -m "first version"`, 'أي أمر بيحفظ لقطة بالتعديلات؟', 'Which command saves a snapshot of the changes?', ['git add', 'git commit', 'git init', 'git push'], 1),
  L(['git status بيوريك إيه اللي اتغير، و git log بيوريك تاريخ الـ commits، و git diff بيوريك الفرق سطر سطر.'],
    ['git status shows what changed, git log shows the commit history, and git diff shows the line by line difference.'],
    `git status\ngit log --oneline\ngit diff`, 'أي أمر بيعرض تاريخ الـ commits؟', 'Which command shows the commit history?', ['git log', 'git diff', 'git init', 'git reset'], 0),
  L(['الفرع (branch) نسخة موازية تجرب فيها من غير ما تبوظ الأصل. git switch -c بيعمل فرع جديد وبينقلك له، و git merge بيدمجه في فرع تاني.'],
    ['A branch is a parallel copy where you can experiment without breaking the original. git switch -c creates a new branch and moves you to it, and git merge combines it into another.'],
    `git switch -c new-header\n# edit and commit...\ngit switch main\ngit merge new-header`, 'ليه بنعمل فرع جديد؟', 'Why create a new branch?', ['نجرب من غير ما نبوظ الأصل', 'نمسح التاريخ', 'نسرّع الجهاز', 'نقفل المشروع'], 0),
  L(['git remote بيربط مشروعك بـ GitHub. git push بيرفع الـ commits، و git pull بينزل أحدث نسخة. التعديل في مشروع حد تاني بيتم بـ Pull Request: بتطلب إنهم يدمجوا فرعك بعد ما يراجعوه.'],
    ['git remote links your project to GitHub. git push uploads your commits and git pull downloads the latest. Changing someone else project is done with a Pull Request: you ask them to merge your branch after they review it.'],
    `git remote add origin https://github.com/you/project.git\ngit push -u origin main\ngit pull`, 'أي أمر بيرفع الـ commits لـ GitHub؟', 'Which command uploads commits to GitHub?', ['git pull', 'git push', 'git clone', 'git log'], 1),
];

const htmlCss: Lesson[] = [
  L(['HTML بيحدد هيكل الصفحة: عناوين h1 لـ h6، فقرات p، روابط a، وصور img. كل صفحة بتبدأ بـ doctype وجواها head و body.'],
    ['HTML defines the page structure: headings h1 to h6, paragraphs p, links a and images img. Every page has a doctype and a head and body inside.'],
    `<!doctype html>\n<html lang="ar" dir="rtl">\n<head><meta charset="utf-8"><title>صفحتي</title></head>\n<body>\n  <h1>أهلا</h1>\n  <p>أول صفحة ليا.</p>\n</body>\n</html>`, 'أي وسم بيعمل رابط؟', 'Which tag makes a link?', ['<link>', '<a>', '<href>', '<url>'], 1),
  L(['CSS بيحدد الشكل. القاعدة بتتكون من محدد (إيه العنصر) وخصائص (إيه التنسيق).', 'المحدد ممكن يكون اسم وسم زي p، أو كلاس زي .card، أو id زي #top.'],
    ['CSS sets the look. A rule has a selector (which element) and properties (what style).', 'A selector can be a tag name like p, a class like .card, or an id like #top.'],
    `.card {\n  background: #f8fafc;\n  color: #1e293b;\n  padding: 16px;\n  border-radius: 12px;\n}`, 'أي محدد بيشاور على كلاس اسمه card؟', 'Which selector targets a class named card?', ['#card', '.card', 'card()', '*card'], 1),
  L(['Flexbox بيرتب العناصر في صف أو عمود بسهولة. display: flex على الأب، و gap للمسافة، و justify-content لمحاذاة العناصر على المحور الأفقي.'],
    ['Flexbox lays out items in a row or column easily. Use display: flex on the parent, gap for spacing, and justify-content to align items along the main axis.'],
    `.row {\n  display: flex;\n  gap: 12px;\n  justify-content: space-between;\n  align-items: center;\n}`, 'إيه الخاصية اللي بتفعل Flexbox؟', 'Which property turns on Flexbox?', ['display: flex', 'position: flex', 'layout: flex', 'flex: on'], 0),
  L(['الموبايل مهم جدًا. أضف وسم viewport في الـ head، واستخدم media query عشان تغير التنسيق على الشاشات الصغيرة.', 'اكتب التنسيق للموبايل الأول وبعدين وسّعه للشاشات الكبيرة.'],
    ['Mobile matters a lot. Add the viewport meta tag in the head and use a media query to change styles on small screens.', 'Write styles for mobile first, then widen them for large screens.'],
    `<meta name="viewport" content="width=device-width, initial-scale=1">\n\n@media (min-width: 768px) {\n  .grid { grid-template-columns: 1fr 1fr; }\n}`, 'إيه اللي بيخلي التنسيق يتغير حسب عرض الشاشة؟', 'What changes styles by screen width?', ['media query', 'alert', 'console', 'doctype'], 0),
];

export const extraLessons: Record<string, Lesson[]> = { 'data-analyst': dataAnalyst, sql, git, 'html-css': htmlCss, ...dataLessons };

export const extraExercises: Record<string, Record<number, Ex>> = {
  ...dataExercises,
  'data-analyst': {
    0: { ar: 'اكتب أول خطوة (بالإنجليزي).', en: 'Write the first step.', code: '1. ___ the question', answer: 'ask' },
    1: { ar: 'اكتب الدالة اللي بتجمع.', en: 'Write the function that adds.', code: '=___(B2:B100)', answer: 'SUM' },
    2: { ar: 'اكتب الكلمة اللي بتجمع الصفوف حسب عمود.', en: 'Write the clause that groups rows by a column.', code: 'SELECT city, SUM(amount)\nFROM sales\n___ BY city;', answer: 'GROUP' },
    3: { ar: 'اكتب اسم الدالة اللي بتقرا CSV.', en: 'Write the CSV reading function.', code: 'df = pd.___("sales.csv")', answer: 'read_csv' },
    4: { ar: 'اكتب الدالة اللي بتشيل التكرار.', en: 'Write the function that removes duplicates.', code: 'df = df.___()', answer: 'drop_duplicates' },
    5: { ar: 'اكتب نوع الشارت للمقارنة بين المدن.', en: 'Write the chart kind for comparing cities.', code: 'totals.plot(kind="___")', answer: 'bar' },
  },
  sql: {
    0: { ar: 'اكتب الكلمة اللي بتحدد الجدول.', en: 'Write the keyword that names the table.', code: 'SELECT name\n___ products;', answer: 'FROM' },
    1: { ar: 'اكتب الكلمة اللي بتفلتر الصفوف.', en: 'Write the keyword that filters rows.', code: 'SELECT * FROM products\n___ price > 100;', answer: 'WHERE' },
    2: { ar: 'اكتب دالة العد.', en: 'Write the counting function.', code: 'SELECT ___(*) FROM products;', answer: 'COUNT' },
    3: { ar: 'اكتب الكلمة اللي بتربط الجدولين.', en: 'Write the word that links the tables.', code: 'FROM customers c\n___ orders o ON o.customer_id = c.id;', answer: 'JOIN' },
  },
  git: {
    0: { ar: 'كمّل الأمر اللي بيحفظ اللقطة.', en: 'Complete the command that saves the snapshot.', code: 'git ___ -m "first version"', answer: 'commit' },
    1: { ar: 'كمّل الأمر اللي بيعرض الحالة.', en: 'Complete the command that shows the state.', code: 'git ___', answer: 'status' },
    2: { ar: 'كمّل الأمر اللي بيدمج الفرع.', en: 'Complete the command that merges the branch.', code: 'git ___ new-header', answer: 'merge' },
    3: { ar: 'كمّل الأمر اللي بيرفع.', en: 'Complete the command that uploads.', code: 'git ___ origin main', answer: 'push' },
  },
  'html-css': {
    0: { ar: 'اكتب اسم وسم الفقرة.', en: 'Write the paragraph tag name.', code: '<___>أول صفحة ليا.</___>', answer: 'p' },
    1: { ar: 'اكتب الخاصية اللي بتغير لون الخلفية.', en: 'Write the property that sets the background color.', code: '.card { ___: #f8fafc; }', answer: 'background' },
    2: { ar: 'اكتب خاصية المسافة بين العناصر.', en: 'Write the spacing property between items.', code: '.row { display: flex; ___: 12px; }', answer: 'gap' },
    3: { ar: 'اكتب الكلمة اللي بتبدأ بيها قاعدة حسب الشاشة.', en: 'Write the rule keyword for screen-based styles.', code: '@___ (min-width: 768px) { }', answer: 'media' },
  },
};
