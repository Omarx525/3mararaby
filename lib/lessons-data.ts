import type { Lesson, Ex } from './lessons';
// Original lesson drafts for the data courses (Egyptian Arabic + English). Written from scratch.
const L = (ar: string[], en: string[], code: string, qa: string, qe: string, options: string[], answer: number): Lesson => ({ ar, en, code, q: { ar: qa, en: qe, options, answer } });

const excel: Lesson[] = [
  L(['الشيت شبكة خلايا، وكل خلية ليها عنوان من العمود والصف زي B3. الشغل الحقيقي بيبدأ لما تفهم المراجع: B3 مرجع نسبي بيتحرك لما تنسخ المعادلة، و $B$3 مرجع مقفول ما بيتحركش.',
     'استخدم $ لما المعادلة هتتنسخ على عمود أو صف كامل، زي نسبة ضريبة أو سعر صرف في خلية واحدة.'],
    ['A sheet is a grid of cells, each with an address from its column and row like B3. The real work starts when you understand references: B3 is relative and shifts when the formula is copied, while $B$3 is locked and stays put.',
     'Use $ when a formula will be copied down a column or across a row, like a tax rate or an exchange rate sitting in one cell.'],
    `=B2*C2
=B2*C2*(1+$B$1)
=SUM(D2:D10)`,
    'لو نسخت المعادلة =B2*C2 من الصف 2 للصف 3، بتبقى إيه؟', 'If you copy =B2*C2 from row 2 down to row 3, what does it become?', ['=B3*C3', '=B2*C2', '=B3*C2', 'بتفضل زي ما هي'], 0),
  L(['أغلب شغل الشيت دوال جاهزة: SUM بتجمع، AVERAGE بتحسب المتوسط، و IF بتختار بين نتيجتين حسب شرط.',
     'COUNTIF بتعد الخلايا اللي بتحقق شرط، SUMIF بتجمع بشرط، و XLOOKUP (أو VLOOKUP في النسخ القديمة) بتجيب قيمة من جدول تاني بمفتاح مشترك زي كود المنتج.'],
    ['Most spreadsheet work is built-in functions: SUM adds, AVERAGE gives the mean, and IF picks between two results based on a condition.',
     'COUNTIF counts cells that match a condition, SUMIF adds with a condition, and XLOOKUP (or VLOOKUP on older versions) pulls a value from another table using a shared key like a product code.'],
    `=SUM(D2:D100)
=AVERAGE(D2:D100)
=IF(E2>1000,"big","small")
=COUNTIF(A2:A100,"Cairo")
=SUMIF(A2:A100,"Cairo",D2:D100)
=XLOOKUP(F2,Products!A:A,Products!C:C)`,
    'أي دالة بتجمع بشرط؟', 'Which function adds values that match a condition?', ['SUM', 'COUNTIF', 'SUMIF', 'IF'], 2),
  L(['الجدول المحوري بيلخص آلاف الصفوف في ثواني: تحط عمود في Rows، وعمود تاني في Columns، والرقم اللي عايزه في Values وتختار مجموع أو عدد أو متوسط.',
     'أحسن حاجة فيه هي التفصيل (drill down): دبل كليك على أي رقم بيوريك الصفوف اللي كوّنته.'],
    ['A pivot table summarizes thousands of rows in seconds: put one column in Rows, another in Columns, and the number you care about in Values, then pick sum, count or average.',
     'Its best feature is drill down: double-click any number and it shows the source rows behind it.'],
    `Rows:    city
Columns: month
Values:  sum of amount
Filter:  year = 2026`,
    'لو عايز مجموع المبيعات لكل مدينة، تحط المدينة فين؟', 'To total sales per city, where does the city column go?', ['Values', 'Rows', 'Filter', 'Chart'], 1),
  L(['البيانات اللي جاية من نظام أو نموذج بتبقى فيها مسافات زيادة، صفوف مكررة، وتواريخ متخزنة كنص. التنضيف في الشيت بيبدأ بـ TRIM للمسافات، Remove duplicates للتكرار، و Split text to columns للتفكيك.',
     'علّم الأعمدة بقائمة اختيار (Data validation) من الأول عشان المدخلات الجديدة تبقى نضيفة من غير تنضيف بعد كده.'],
    ['Data coming from a system or a form has extra spaces, duplicate rows, and dates stored as text. Cleaning in a sheet starts with TRIM for spaces, Remove duplicates for repeats, and Split text to columns for splitting.',
     'Add dropdown lists (data validation) from the start so new input stays clean without cleaning it later.'],
    `=TRIM(A2)                   // spaces
=COUNTIF($A$2:$A$100,A2)>1 // repeats
=DATEVALUE(B2)     // text->date`,
    'أي دالة بتشيل المسافات الزيادة من النص؟', 'Which function removes extra spaces from text?', ['TRIM', 'CLEAN', 'STRIP', 'SPACE'], 0),
  L(['التنسيق الشرطي بيلوّن الخلايا حسب قيمتها، فتشوف المشكلة من غير ما تقرا كل رقم: أحمر لأي رقم تحت الهدف.',
     'اختار الشارت حسب السؤال: أعمدة للمقارنة بين فئات، وخط للتغير عبر الزمن. خلي العنوان خلاصة، وشيل خطوط الشبكة الزيادة.'],
    ['Conditional formatting colors cells by their value, so you see the problem without reading every number: red for anything below target.',
     'Pick the chart by the question: bars to compare categories, a line for change over time. Make the title the takeaway and drop extra gridlines.'],
    `Format > Conditional formatting
  > Color scale
Chart type: Column
Title: "Q3 sales fell in Giza"`,
    'أنسب شارت لتغير المبيعات كل شهر؟', 'Best chart for how sales changed each month?', ['أعمدة', 'خط', 'فطيرة', 'مفيش شارت'], 1),
  L(['مشروع صغير: عندك ملف مبيعات فيه التاريخ والمدينة والمنتج والكمية والسعر، والمطلوب تقرير من صفحة واحدة.',
     'الخطوات: نضّف التكرار الأول، ضيف عمود إجمالي = الكمية × السعر، اعمل جدول محوري لكل مدينة، ضيف شارت أعمدة، واكتب 3 أسطر فيها أهم استنتاج.'],
    ['Mini project: you have a sales file with date, city, product, quantity and price, and the deliverable is a one-page report.',
     'Steps: clean duplicates first, add a total column = quantity × price, build a pivot per city, add a bar chart, and write three lines with the main takeaway.'],
    `F2: =D2*E2
Pivot: Rows city, Values sum of F
Chart: bars by city
Summary: "Cairo 41%, Giza -18% in Q3"`,
    'إيه اللي لازم تعمله قبل ما تبني الجدول المحوري؟', 'What must you do before building the pivot table?', ['تنضف التكرار والبيانات', 'تلون الشيت', 'تطبع الملف', 'تحذف الأعمدة'], 0),
];

const statistics: Lesson[] = [
  L(['المتوسط هو مجموع القيم على عددها. سهل وسريع، لكن أي قيمة شاذة بتسحبه معاها.',
     'الوسيط هو القيمة اللي في النص بعد الترتيب، فمش بيتأثر بالشواذ. في الرواتب وأسعار الشقق الوسيط بيوصف الواقع أحسن. والمنوال هو القيمة الأكثر تكرار.'],
    ['The mean is the sum of the values divided by how many there are. It is fast, but a single outlier drags it.',
     'The median is the middle value after sorting, so outliers do not move it. For salaries and apartment prices the median describes reality better. The mode is the value that repeats most.'],
    `import statistics as st

salaries = [8000, 8500, 9000,
            9000, 9500, 60000]
st.mean(salaries)    # 17333.33
st.median(salaries)  # 9000
st.mode(salaries)    # 9000`,
    'عندك 5 رواتب فيهم راتب مدير كبير جدًا. أنهي مقياس بيوصف الرواتب أحسن؟', 'You have five salaries and one is a very large manager salary. Which measure describes them better?', ['المتوسط', 'الوسيط', 'المجموع', 'أكبر قيمة'], 1),
  L(['المتوسط لوحده مش كفاية: ممكن مجموعتين ليهم نفس المتوسط وواحدة بياناتها كلها قريبة والتانية متفرقة. المدى = أكبر قيمة − أصغر قيمة.',
     'الانحراف المعياري بيقيس متوسط بعد القيم عن المتوسط. كل ما يكبر، البيانات أكتر تشتت. ومعامل الاختلاف (الانحراف ÷ المتوسط) بيقارن تشتت مجموعتين بمقاييس مختلفة.'],
    ['The mean alone is not enough: two groups can share a mean while one is tight and the other is spread out. The range is the largest value minus the smallest.',
     'The standard deviation measures how far values typically sit from the mean. The bigger it is, the more spread out the data. The coefficient of variation (standard deviation ÷ mean) compares spread across different scales.'],
    `import statistics as st

a = [9, 10, 11, 10, 10]
b = [2, 5, 10, 15, 18]
st.mean(a), st.stdev(a)   # 10, 0.71
st.mean(b), st.stdev(b)   # 10, 6.6`,
    'مجموعتين بنفس المتوسط وواحدة انحرافها المعياري أكبر. ده معناه إيه؟', 'Two groups share a mean and one has a larger standard deviation. What does that mean?', ['البيانات متفرقة أكتر', 'المتوسط غلط', 'فيها أرقام أقل', 'مفيش فرق بينهم'], 0),
  L(['كتير من الظواهر بتتوزع حوالين المتوسط في شكل جرس: الأغلبية قريبة من النص، والقليل في الأطراف.',
     'قاعدة سريعة: حوالي 68% من القيم داخل ±1 انحراف معياري، و95% داخل ±2، و99.7% داخل ±3. أي قيمة أبعد من 3 انحرافات تستاهل تسأل ليه.'],
    ['Many things cluster around a mean in a bell shape: most values near the middle and a few at the edges.',
     'Quick rule: about 68% of values fall within ±1 standard deviation, 95% within ±2, and 99.7% within ±3. Anything more than three deviations away is worth a second look.'],
    `mean, sd = 70, 10
# 68% score between 60 and 80
# 95% score between 50 and 90

z = (85 - mean) / sd   # 1.5, normal`,
    'كام في المية تقريبًا من القيم جوه ±2 انحراف معياري؟', 'Roughly what share of values sits within ±2 standard deviations?', ['68%', '75%', '95%', '99.7%'], 2),
  L(['كتير من الأوقات مش بنقدر نسأل كل الناس، فبناخد عينة. العينة الكويسة عشوائية، بتمثل المجتمع، وحجمها كافي.',
     'الانحياز بييجي من طريقة اختيار العينة: تسأل متابعينك بس، أو العملاء الراضيين بس، أو الناس اللي في مكان واحد. النتيجة بتبقى رقم واثق في نفسه وهو غلط.'],
    ['Often you cannot ask everyone, so you take a sample. A good sample is random, representative, and big enough.',
     'Bias comes from how you pick the sample: asking only your followers, only happy customers, or only people in one place. You end up with a confident number that is wrong.'],
    `import random
# good: everyone had a chance
sample = random.sample(customers, 400)

# bad: survey on the brand page only`,
    'أنهي عينة تعتبرها متحيزة؟', 'Which sample would you call biased?', ['عينة عشوائية من كل العملاء', 'استبيان على صفحة الشركة بس', 'عينة من كل المحافظات', 'عينة كبيرة عشوائية'], 1),
  L(['الارتباط معناه إن قيمتين بيتحركوا مع بعض. معامل الارتباط r من −1 لـ +1: قريب من 1 علاقة طردية قوية، قريب من −1 عكسية قوية، وقريب من 0 مفيش علاقة خطية.',
     'بس الارتباط مش سببية. ممكن حاجة تالتة بتحرك الاتنين (مبيعات الآيس كريم والغرق بيرتفعوا في الصيف بسبب الحرارة)، وممكن العلاقة تبقى صدفة.'],
    ['Correlation means two values move together. The coefficient r runs from -1 to +1: near 1 is a strong positive link, near -1 a strong negative one, and near 0 no straight-line link.',
     'But correlation is not causation. A third thing can drive both (ice cream sales and drownings both rise in summer because of heat), and some links are pure coincidence.'],
    `import pandas as pd

df = pd.read_csv("data.csv")
r = df["ad_spend"].corr(df["sales"])
print(r)   # 0.82, strong positive`,
    'مبيعات الآيس كريم والغرق بيرتفعوا مع بعض في الصيف. السبب الحقيقي إيه؟', 'Ice cream sales and drownings rise together in summer. What is the real reason?', ['الآيس كريم بيغرق الناس', 'الحرارة بتزود الاتنين', 'مفيش علاقة بينهم', 'الغرق بيزود المبيعات'], 1),
];

const dataViz: Lesson[] = [
  L(['matplotlib هي المكتبة الأساسية للرسم في بايثون. الشغل 3 خطوات: جهّز البيانات، ارسم، واظهر الرسم بـ show.',
     'في Jupyter الرسم بيظهر لوحده، وفي السكربت لازم تنادي plt.show() أو تحفظ الصورة بـ savefig.'],
    ['matplotlib is the base plotting library in Python. Three steps: prepare the data, plot it, and show it with show.',
     'In Jupyter the plot appears on its own. In a script you call plt.show() or save the image with savefig.'],
    `import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr"]
sales = [120, 150, 90, 180]

plt.plot(months, sales)
plt.savefig("sales.png")
plt.show()`,
    'إيه الأمر اللي بيعرض الرسم؟', 'Which command displays the plot?', ['plt.draw', 'plt.show', 'plt.render', 'plt.print'], 1),
  L(['لكل سؤال شارت: خط للتغير عبر الزمن، أعمدة لمقارنة فئات، scatter للعلاقة بين رقمين، وهيستوجرام لتوزيع قيمة واحدة.',
     'الفطيرة ممنوعة إلا لو عندك 3 شرايح بالكتير، لأن العين مش بتقارن زوايا كويس.'],
    ['Each question has its chart: a line for change over time, bars to compare categories, a scatter for the link between two numbers, and a histogram for the distribution of one value.',
     'Skip pie charts unless you have three slices at most, because eyes are bad at comparing angles.'],
    `plt.plot(dates, revenue)    # time
plt.bar(cities, totals)     # compare
plt.scatter(price, orders)  # relation
plt.hist(ages, bins=10)     # spread`,
    'عايز تشوف العلاقة بين السعر وعدد الطلبات. تستخدم إيه؟', 'You want to see the link between price and number of orders. Which chart?', ['أعمدة', 'scatter', 'فطيرة', 'هيستوجرام'], 1),
  L(['رسم من غير عنوان ومحاور مسمّاة مجرد خربشة. خلي العنوان جملة فيها الخلاصة، وسمّي المحورين بالوحدة (جنيه، ألف زائر).',
     'قلل الحبر الزايد: شيل خطوط الشبكة الغامقة، واستخدم لون واحد للعناصر العادية ولون مميز للعنصر اللي بتتكلم عنه.'],
    ['A chart without a title and named axes is a scribble. Make the title a sentence with the takeaway, and label both axes with their unit (EGP, thousands of visitors).',
     'Cut ink: drop heavy gridlines, use one color for ordinary items and a highlight color for the point you are making.'],
    `plt.figure(figsize=(8, 4))
plt.bar(cities, totals,
        color=["#94a3b8","#0ea5e9"])
plt.title("Cairo is half of sales")
plt.xlabel("City")
plt.ylabel("Sales (EGP)")
plt.grid(axis="y", alpha=0.3)`,
    'إيه أهم حاجة في عنوان الشارت؟', 'What matters most in a chart title?', ['اسم المكتبة', 'الخلاصة اللي عايز توصلها', 'تاريخ اليوم', 'اسم الملف'], 1),
  L(['pandas بيختصر الرسم: groupby بتجمع، وبعدها plot بترسم على طول من غير ما تحوّل الأرقام بإيدك.',
     'sort_values بترتب الأعمدة من الأكبر للأصغر عشان الرسم يبقى مفهوم، و rotate بتلف التسميات الطويلة على المحور.'],
    ['pandas shortens plotting: groupby aggregates, then plot draws straight from the table without converting values by hand.',
     'sort_values orders bars from largest to smallest so the chart reads easily, and rotate turns long axis labels.'],
    `import pandas as pd

df = pd.read_csv("orders.csv")
g = df.groupby("city")["amount"]
s = g.sum()
top = s.sort_values(ascending=False)
top.plot(kind="bar")`,
    'إيه اللي بيرتب القيم من الأكبر للأصغر؟', 'What orders the values from largest to smallest?', ['sort_values(ascending=False)', 'groupby', 'read_csv', 'plot'], 0),
  L(['المشروع: خد ملف طلبات، اطلع إجمالي كل مدينة، ارسم أعمدة مرتّبة، سمّي المحاور، واحفظ الرسم PNG عشان تحطه في التقرير.',
     'التقرير البصري من صفحة واحدة: عنوان فيه الخلاصة، رسم واحد كبير، وجملتين شرح. مفيش رسومات زيادة.'],
    ['Project: take an orders file, total each city, draw sorted bars, label the axes, and save the figure as a PNG for the report.',
     'A one-page visual report: a title with the takeaway, one large chart, and two lines of explanation. No extra decoration.'],
    `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("orders.csv")
g = df.groupby("city")["amount"]
s = g.sum()
top = s.sort_values(
    ascending=False)

fig, ax = plt.subplots(figsize=(7, 4))
ax.bar(top.index, top.values)
ax.set_title("Cairo: 41% of orders")
ax.set_ylabel("Orders (EGP)")
plt.tight_layout()
plt.savefig("report.png", dpi=150)`,
    'إيه اللي بيحفظ الرسم كصورة؟', 'Which call saves the figure as an image?', ['plt.show', 'plt.savefig', 'plt.write', 'plt.export'], 1),
];

export const dataLessons: Record<string, Lesson[]> = { excel, statistics, 'data-viz': dataViz };

export const dataExercises: Record<string, Record<number, Ex>> = {
  excel: {
    0: { ar: 'اكتب المرجع المقفول لخلية C2.', en: 'Write the locked reference for cell C2.', code: '=B2*___', answer: '$C$2' },
    1: { ar: 'اكتب الدالة اللي بتجمع بشرط.', en: 'Write the function that adds with a condition.', code: '=___(A2:A100,"Cairo",D2:D100)', answer: 'SUMIF' },
    2: { ar: 'اكتب اسم المكان اللي بنحط فيه الأرقام اللي هنجمعها.', en: 'Write the area where the numbers to total go.', code: 'Rows: city\n___: sum of amount', answer: 'Values' },
    3: { ar: 'اكتب الدالة اللي بتشيل المسافات الزيادة.', en: 'Write the function that removes extra spaces.', code: '=___(A2)', answer: 'TRIM' },
    4: { ar: 'اكتب نوع الشارت اللي بيوضح التغير مع الزمن.', en: 'Write the chart type that shows change over time.', code: 'chart type: ___', answer: 'line' },
    5: { ar: 'اكتب العملية الحسابية للإجمالي.', en: 'Write the operation that gives the total.', code: 'F2: =D2___E2', answer: '*' },
  },
  statistics: {
    0: { ar: 'اكتب دالة الوسيط.', en: 'Write the median function.', code: 'st.___(salaries)', answer: 'median' },
    1: { ar: 'اكتب دالة الانحراف المعياري للعينة.', en: 'Write the sample standard deviation function.', code: 'st.___(a)', answer: 'stdev' },
    2: { ar: 'كمّل حساب z.', en: 'Complete the z calculation.', code: 'z = (x - mean) / ___', answer: 'sd' },
    3: { ar: 'اكتب دالة اختيار عينة عشوائية من random.', en: 'Write the random sampling function.', code: 'sample = random.___(customers, 400)', answer: 'sample' },
    4: { ar: 'اكتب دالة معامل الارتباط في pandas.', en: 'Write the pandas correlation method.', code: 'df["ad_spend"].___(df["sales"])', answer: 'corr' },
  },
  'data-viz': {
    0: { ar: 'كمّل أمر عرض الرسم.', en: 'Complete the command that shows the plot.', code: 'plt.___()', answer: 'show' },
    1: { ar: 'كمّل أمر رسم الأعمدة.', en: 'Complete the bar chart call.', code: 'plt.___(cities, totals)', answer: 'bar' },
    2: { ar: 'كمّل تسمية المحور الأفقي.', en: 'Complete the horizontal axis label.', code: 'plt.___("City")', answer: 'xlabel' },
    3: { ar: 'كمّل ترتيب القيم تنازلي.', en: 'Complete the descending sort.', code: 'g = df.groupby("city")["amount"]\ns = g.sum()\ntop = s.sort_values(ascending=___)', answer: 'False' },
    4: { ar: 'كمّل أمر حفظ الصورة.', en: 'Complete the call that saves the image.', code: 'plt.___("report.png", dpi=150)', answer: 'savefig' },
  },
};
