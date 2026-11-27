export type Lesson = { ar: string[]; en: string[]; code: string; q: { ar: string; en: string; options: string[]; answer: number } };
// Python lesson drafts, in the same order as the course's lesson list.
const python: Lesson[] = [
    { ar: ['بايثون لغة سهلة القراءة. أول حاجة بنتعلمها هي إزاي نخلي البرنامج يكتب رسالة على الشاشة.', 'الأمر print بيطبع أي نص بين علامتي تنصيص.'],
      en: ['Python is easy to read. The first thing to learn is how to make a program write a message on the screen.', 'The print command shows any text placed between quotes.'],
      code: 'print("مرحبا يا عالم")',
      q: { ar: 'أي أمر بيطبع نص على الشاشة في بايثون؟', en: 'Which command shows text on the screen in Python?', options: ['print', 'show', 'echo', 'say'], answer: 0 } },
    { ar: ['المتغير هو اسم بنحط فيه قيمة عشان نستخدمها بعدين.', 'العلامة = بتحط القيمة اللي على اليمين جوه الاسم اللي على الشمال.'],
      en: ['A variable is a name that holds a value so you can use it later.', 'The = sign puts the value on its right into the name on its left.'],
      code: 'age = 19\nname = "Omar"\nprint(name, age)',
      q: { ar: 'لو x بـ 5 و y بـ x زائد 2، كام قيمة y؟', en: 'If x is 5 and y is x plus 2, what is y?', options: ['5', '7', '52', '2'], answer: 1 } },
    { ar: ['الشرط بيخلي البرنامج ياخد قرار. if معناها لو، و else معناها غير كده.', 'لازم المسافة البادئة (4 مسافات) قبل الأسطر اللي جوه الشرط.'],
      en: ['A condition lets the program decide. if means when this is true, else means otherwise.', 'Lines inside the condition must be indented (4 spaces).'],
      code: 'age = 19\nif age >= 18:\n    print("adult")\nelse:\n    print("minor")',
      q: { ar: 'لو الرقم 3 أكبر من 5 اطبع a، وإلا اطبع b. إيه اللي هيتطبع؟', en: 'If 3 is greater than 5 print a, otherwise print b. What prints?', options: ['a', 'b', 'a و b', 'مفيش حاجة'], answer: 1 } },
    { ar: ['الحلقة بتكرر كود أكتر من مرة من غير ما نكتبه كل مرة.', 'range(3) بيدي الأرقام 0 و 1 و 2.'],
      en: ['A loop repeats code without writing it again each time.', 'range(3) gives the numbers 0, 1 and 2.'],
      code: 'for i in range(3):\n    print(i)',
      q: { ar: 'كام مرة هتتكرر حلقة for مع range(4)؟', en: 'How many times does a for loop over range(4) repeat?', options: ['3', '4', '5', '0'], answer: 1 } },
    { ar: ['الدالة مجموعة أوامر ليها اسم، نكتبها مرة ونستدعيها كل ما نحتاجها.', 'return بترجع نتيجة الدالة.'],
      en: ['A function is a named group of commands. Write it once, call it whenever you need it.', 'return sends back the function result.'],
      code: 'def hello(name):\n    return "Hello " + name\n\nprint(hello("Sara"))',
      q: { ar: 'إيه الكلمة اللي بنعرّف بيها دالة؟', en: 'Which keyword defines a function?', options: ['func', 'function', 'def', 'define'], answer: 2 } },
    { ar: ['نجمع اللي اتعلمناه في لعبة تخمين رقم صغيرة.', 'الدالة input بتاخد كلام من المستخدم وبترجعه دايمًا كنص، فنحوله لرقم بـ int.'],
      en: ['We combine what we learned in a small number guessing game.', 'input reads text from the user and always returns a string, so we convert it with int.'],
      code: 'secret = 7\nguess = int(input("خمّن الرقم: "))\nif guess == secret:\n    print("صح!")\nelse:\n    print("حاول تاني")',
      q: { ar: 'input() بترجع أي نوع بيانات؟', en: 'What type does input() return?', options: ['رقم', 'نص', 'قائمة', 'صح أو خطأ'], answer: 1 } },
];

const L = (ar: string[], en: string[], code: string, qa: string, qe: string, options: string[], answer: number): Lesson => ({ ar, en, code, q: { ar: qa, en: qe, options, answer } });

const javascript: Lesson[] = [
    L(['جافاسكريبت هي لغة الويب. بتشتغل جوه المتصفح وبتخلي الصفحة تتفاعل.', 'console.log بتطبع رسالة في أداة المطور.'], ['JavaScript is the language of the web. It runs in the browser and makes pages interactive.', 'console.log prints a message in the developer tools.'],
      'console.log("Hello");', 'أي أمر بيطبع رسالة في أداة المطور؟', 'Which command prints a message in developer tools?', ['console.log', 'print', 'echo', 'write'], 0),
    L(['بنعرّف الدوال بكلمة function. والمتغيرات بـ let أو const.', 'const للقيمة اللي مش هتتغير، و let للقيمة اللي ممكن تتغير.'], ['Functions use the function keyword. Variables use let or const.', 'Use const for values that will not change and let for values that may.'],
      'const name = "Sara";\nfunction hi(n) {\n  return "Hi " + n;\n}\nconsole.log(hi(name));', 'أي كلمة بنستخدمها لمتغير قيمته ثابتة؟', 'Which keyword is for a variable whose value stays fixed?', ['let', 'const', 'var', 'fixed'], 1),
    L(['المتصفح بيحول الصفحة لشجرة اسمها DOM. نقدر نلاقي عنصر ونغيّر نصه.', 'document.querySelector بتجيب أول عنصر بيطابق المحدد.'], ['The browser turns the page into a tree called the DOM. We can find an element and change its text.', 'document.querySelector returns the first element matching a selector.'],
      'const title = document.querySelector("h1");\ntitle.textContent = "Welcome";', 'أي دالة بتجيب أول عنصر بيطابق محدد CSS؟', 'Which function returns the first element matching a CSS selector?', ['document.querySelector', 'document.getFirst', 'document.find', 'window.select'], 0),
    L(['الأحداث بتخلينا نرد على ضغطة أو كتابة. addEventListener بتربط دالة بحدث.'], ['Events let us react to clicks or typing. addEventListener attaches a function to an event.'],
      'button.addEventListener("click", () => {\n  alert("Clicked");\n});', 'إيه اسم الحدث لما المستخدم يضغط على زرار؟', 'What is the event name for a button press?', ['press', 'click', 'tap', 'push'], 1),
    L(['نجمع المعلومات في عداد بسيط: كل ضغطة تزود الرقم واحد وتحدّث النص.'], ['We combine everything in a simple counter: each click adds one and updates the text.'],
      'let n = 0;\nbutton.addEventListener("click", () => {\n  n = n + 1;\n  label.textContent = n;\n});', 'لو n بـ 0 وضغطنا مرتين، كام قيمة n؟', 'If n starts at 0 and we click twice, what is n?', ['0', '1', '2', '3'], 2),
];

const c: Lesson[] = [
    L(['لغة سي بتتحول لبرنامج تنفيذي قبل التشغيل (بنسميها compile). أي برنامج بيبدأ من الدالة main.', 'printf بتطبع نص، ولازم نضيف #include <stdio.h> فوق.'], ['C is compiled into an executable before it runs. Every program starts at the main function.', 'printf prints text, and you need #include <stdio.h> at the top.'],
      '#include <stdio.h>\n\nint main(void) {\n    printf("Hello\\n");\n    return 0;\n}', 'أي دالة بيبدأ منها أي برنامج سي؟', 'Which function does every C program start from?', ['start', 'main', 'run', 'init'], 1),
    L(['لغة سي لازم تعرّف نوع كل متغير: int للأعداد الصحيحة، double للأعداد العشرية، char لحرف واحد.'], ['C needs a type for every variable: int for whole numbers, double for decimals, char for one character.'],
      'int age = 19;\ndouble price = 9.5;\nchar grade = \'A\';', 'أي نوع بنستخدمه لعدد صحيح؟', 'Which type holds a whole number?', ['char', 'int', 'double', 'text'], 1),
    L(['المؤشر متغير بيخزن عنوان متغير تاني في الذاكرة. العلامة & بتجيب العنوان، و * بتوصل للقيمة.'], ['A pointer is a variable that stores the memory address of another variable. & gets the address and * reaches the value.'],
      'int x = 5;\nint *p = &x;\n*p = 9;   // x is now 9', 'إيه اللي بيجيب عنوان المتغير؟', 'Which operator gets a variable\'s address?', ['*', '&', '#', '@'], 1),
    L(['الذاكرة الديناميكية بنطلبها بـ malloc ولازم نحررها بـ free لما نخلص.', 'لو ما حررناهاش بيحصل تسريب في الذاكرة.'], ['Dynamic memory is requested with malloc and must be released with free when done.', 'If you forget, the program leaks memory.'],
      'int *a = malloc(3 * sizeof(int));\na[0] = 1;\nfree(a);', 'إيه الدالة اللي بتحرر الذاكرة اللي اتحجزت بـ malloc؟', 'Which function releases memory taken by malloc?', ['delete', 'free', 'release', 'clear'], 1),
    L(['مشروع صغير: برنامج بيجمع رقمين من المستخدم. scanf بتقرأ المدخلات.'], ['Mini project: a program that adds two numbers from the user. scanf reads the input.'],
      'int a, b;\nscanf("%d %d", &a, &b);\nprintf("%d\\n", a + b);', 'لو دخلنا 2 و 3، إيه اللي هيتطبع؟', 'If the user enters 2 and 3, what prints?', ['23', '5', '6', '1'], 1),
];

const rust: Lesson[] = [
    L(['راست لغة سريعة وآمنة. cargo هي الأداة اللي بتبني وتشغل المشاريع.', 'الأمر cargo new بيعمل مشروع جديد، و cargo run بيشغله.'], ['Rust is fast and safe. cargo is the tool that builds and runs projects.', 'cargo new creates a project and cargo run runs it.'],
      'fn main() {\n    println!("Hello");\n}', 'أي أمر بيشغل مشروع راست؟', 'Which command runs a Rust project?', ['cargo run', 'rust start', 'cargo go', 'rustc new'], 0),
    L(['في راست كل قيمة ليها مالك واحد. لما المالك يخرج من النطاق القيمة بتتمسح.', 'لما نحرك القيمة لمتغير تاني المتغير الأول مش بيشتغل بعدها.'], ['In Rust every value has one owner. When the owner goes out of scope, the value is dropped.', 'After you move a value to another variable, the first one can no longer be used.'],
      'let a = String::from("hi");\nlet b = a;   // a moved to b\nprintln!("{}", b);', 'بعد let b = a لقيمة String، مين بيقدر يستخدم القيمة؟', 'After let b = a with a String, who can use the value?', ['a', 'b', 'الاتنين', 'مفيش حد'], 1),
    L(['الاستعارة بتخلينا نستخدم قيمة من غير ما ناخد ملكيتها. العلامة & بتعمل استعارة للقراءة بس.'], ['Borrowing lets us use a value without taking ownership. The & symbol makes a read-only borrow.'],
      'fn len(s: &String) -> usize {\n    s.len()\n}', 'أي علامة بتعمل استعارة للقراءة؟', 'Which symbol makes a read-only borrow?', ['&', '*', '#', '@'], 0),
    L(['struct بتجمع بيانات مرتبطة، و enum بتمثل اختيارات محددة.'], ['A struct groups related data and an enum represents a fixed set of choices.'],
      'struct User { name: String, age: u32 }\nenum Level { Easy, Hard }', 'إيه اللي بنستخدمه لتمثيل مجموعة اختيارات محددة؟', 'What represents a fixed set of choices?', ['struct', 'enum', 'loop', 'let'], 1),
    L(['مشروع صغير: برنامج بيحسب مجموع قائمة أرقام باستخدام حلقة for.'], ['Mini project: a program that sums a list of numbers with a for loop.'],
      'let nums = [1, 2, 3];\nlet mut sum = 0;\nfor n in nums {\n    sum += n;\n}\nprintln!("{}", sum);', 'كام هيتطبع للمجموع؟', 'What sum prints?', ['3', '5', '6', '123'], 2),
];

const lua: Lesson[] = [
    L(['لوا لغة صغيرة وخفيفة بتُستخدم في الألعاب والتطبيقات. print بتطبع نص.', 'المتغيرات في لوا بنعرّفها بكلمة local.'], ['Lua is small and light, used in games and apps. print shows text.', 'Variables are declared with the local keyword.'],
      'local name = "Sara"\nprint("Hello " .. name)', 'إيه العلامة اللي بتدمج النصوص في لوا؟', 'Which operator joins strings in Lua?', ['+', '..', '&', ','], 1),
    L(['الجدول هو الهيكل الوحيد في لوا. بيشتغل كقائمة وكقاموس.', 'الفهرسة بتبدأ من 1 مش من 0.'], ['The table is Lua\'s only data structure. It works as a list and as a dictionary.', 'Indexing starts at 1, not 0.'],
      'local fruits = {"apple", "banana"}\nprint(fruits[1])   -- apple', 'الفهرس الأول في جدول لوا بيبدأ من كام؟', 'What is the first index of a Lua table?', ['0', '1', '-1', '2'], 1),
    L(['الدوال بنعرّفها بـ function وبنقفلها بـ end.'], ['Functions start with function and close with end.'],
      'local function double(x)\n  return x * 2\nend\nprint(double(4))', 'بنقفل الدالة بإيه في لوا؟', 'What closes a function in Lua?', ['}', 'end', 'stop', ')'], 1),
    L(['مشروع صغير: جمع أرقام جدول بحلقة for.'], ['Mini project: sum a table of numbers with a for loop.'],
      'local sum = 0\nfor _, n in ipairs({1, 2, 3}) do\n  sum = sum + n\nend\nprint(sum)', 'كام هيتطبع؟', 'What prints?', ['3', '5', '6', '0'], 2),
];

const elixir: Lesson[] = [
    L(['إليكسير لغة وظيفية بتتشغل على آلة إيرلانج الافتراضية. IO.puts بتطبع نص.', 'ممكن نجرب الكود في iex وهي الواجهة التفاعلية.'], ['Elixir is a functional language running on the Erlang VM. IO.puts prints text.', 'You can try code in iex, the interactive shell.'],
      'IO.puts("Hello")', 'أي أمر بيطبع نص في إليكسير؟', 'Which call prints text in Elixir?', ['IO.puts', 'print', 'echo', 'say'], 0),
    L(['العلامة = في إليكسير مش تعيين بس، دي مطابقة أنماط. الطرفين لازم يتطابقوا.'], ['In Elixir the = sign is pattern matching, not just assignment. Both sides must match.'],
      '{status, value} = {:ok, 42}\nIO.puts(value)   # 42', 'بعد المطابقة {a, b} = {1, 2}، كام قيمة b؟', 'After {a, b} = {1, 2}, what is b?', ['1', '2', '3', 'nil'], 1),
    L(['العمليات خفيفة جدًا في إليكسير. spawn بتشغل دالة في عملية منفصلة، والعمليات بتتراسل برسائل.'], ['Processes are very light in Elixir. spawn runs a function in a separate process and processes talk through messages.'],
      'pid = spawn(fn -> IO.puts("in a process") end)\nsend(pid, :hello)', 'إيه الدالة اللي بتشغل كود في عملية جديدة؟', 'Which function starts code in a new process?', ['run', 'spawn', 'fork', 'start'], 1),
    L(['مشروع صغير: جمع قائمة بدون حلقات، باستخدام Enum.sum.'], ['Mini project: sum a list without loops, using Enum.sum.'],
      'IO.puts(Enum.sum([1, 2, 3]))', 'كام هيتطبع؟', 'What prints?', ['3', '5', '6', '123'], 2),
];

const ai: Lesson[] = [
  L(['الذكاء الاصطناعي برنامج بيتعلم من أمثلة كتير بدل ما حد يكتبله كل خطوة.', 'مثال: بدل ما نكتب قواعد لكل صورة قطة، بنوريه آلاف الصور لحد ما يتعرف عليها.'],
    ['AI is software that learns from many examples instead of someone writing every step.', 'Instead of writing rules for every cat photo, we show it thousands of photos until it recognizes them.'],
    '# فكرة مبسطة\nأمثلة + تدريب = نموذج بيتوقع', 'أي وصف أقرب للذكاء الاصطناعي؟', 'Which description is closest to AI?', ['برنامج بيتعلم من أمثلة', 'إنسان مختبي جوه الجهاز', 'قاعدة بيانات بس', 'فيروس'], 0),
  L(['النموذج بيشوف أمثلة، بيتوقع، وبعدين بيتصحح لما يغلط. بيكرر ده ملايين المرات.', 'جودة الأمثلة مهمة: أمثلة غلط بتطلع نموذج غلط.'],
    ['A model looks at examples, predicts, then corrects itself when wrong, repeated millions of times.', 'Example quality matters: bad examples make a bad model.'],
    '# حلقة التعلم\nتوقع -> قارن بالإجابة -> صحح', 'لو الأمثلة غلط، النتيجة غالبا:', 'If the examples are wrong, the result is usually:', ['نموذج غلط', 'نموذج أذكى', 'مفيش فرق', 'أسرع'], 0),
  L(['الأمر الواضح بيجيب نتيجة أحسن. قول المطلوب، السياق، والشكل اللي عايزه للإجابة.', 'جرب تقول: "اشرحلي الحلقات في بايثون لمبتدئ في خمس جمل مع مثال".'],
    ['A clear prompt gives a better result. State the task, the context, and the format you want.', 'Try: "Explain loops in Python to a beginner in five sentences with an example."'],
    'المطلوب: اشرح الحلقات\nالسياق: مبتدئ\nالشكل: خمس جمل + مثال', 'أي أمر أوضح؟', 'Which prompt is clearer?', ['اشرح الحلقات لمبتدئ في 5 جمل مع مثال', 'قولي حاجة', 'برمجة', 'اشرح'], 0),
  L(['الذكاء الاصطناعي ممكن يغلط ويألف معلومات بثقة. راجع أي حاجة مهمة من مصدر تاني.', 'ما تكتبش فيه كلمات سر أو بيانات بنك أو أي أسرار.'],
    ['AI can be wrong and invent facts with confidence. Check anything important elsewhere.', 'Never type passwords, bank details or secrets into it.'],
    '# قاعدة بسيطة\nراجع المهم · ما تشاركش أسرار', 'إيه اللي ما تكتبوش لأداة ذكاء اصطناعي؟', 'What should you never type into an AI tool?', ['كلمة السر', 'سؤال عن درس', 'اسم لغة برمجة', 'طلب ملخص'], 0),
];
export const lessonsByCourse: Record<string, Lesson[]> = { python, javascript, c, rust, lua, elixir, 'ai-basics': ai };

export type Ex = { ar: string; en: string; code: string; answer: string };
export const exercises: Record<string, Record<number, Ex>> = {
    python: {
        0: { ar: 'كمّل الأمر عشان يطبع الكلمة hi.', en: 'Complete the command so it prints hi.', code: '___("hi")', answer: 'print' },
        1: { ar: 'خلّي المتغير age قيمته 19.', en: 'Set the variable age to 19.', code: 'age = ___', answer: '19' },
        2: { ar: 'اكتب العلامة اللي بتعني أكبر من أو يساوي.', en: 'Write the operator for greater than or equal to.', code: 'if age ___ 18:\n    print("adult")', answer: '>=' },
        3: { ar: 'كمّل الدالة اللي بتدي الأرقام 0 و 1 و 2.', en: 'Complete the function that gives 0, 1 and 2.', code: 'for i in ___(3):\n    print(i)', answer: 'range' },
        4: { ar: 'اكتب الكلمة اللي بنعرّف بيها دالة.', en: 'Write the keyword that defines a function.', code: '___ hello(name):\n    return "Hello " + name', answer: 'def' },
        5: { ar: 'حوّل المدخل لرقم صحيح.', en: 'Convert the input to a whole number.', code: 'guess = ___(input("?"))', answer: 'int' },
    },
    javascript: { 0: { ar: 'كمّل الأمر عشان يطبع الرسالة.', en: 'Complete the command to print the message.', code: 'console.___("Hello");', answer: 'log' },
        1: { ar: 'اكتب الكلمة اللي بنعرّف بيها دالة.', en: 'Write the keyword that defines a function.', code: '___ hi(n) {\n  return "Hi " + n;\n}', answer: 'function' },
        2: { ar: 'اكتب الدالة اللي بتجيب أول عنصر بيطابق محدد.', en: 'Write the function that returns the first matching element.', code: 'const title = document.___("h1");', answer: 'querySelector' },
        3: { ar: 'اكتب الدالة اللي بتربط دالة بحدث.', en: 'Write the function that attaches a function to an event.', code: 'button.___("click", () => {\n  alert("Clicked");\n});', answer: 'addEventListener' },
        4: { ar: 'اكتب العلامة اللي بتزود الرقم واحد.', en: 'Write the operator that adds one.', code: 'let n = 0;\nn = n ___ 1;', answer: '+' },
    },
    c: { 0: { ar: 'اكتب اسم الدالة اللي بيبدأ منها البرنامج.', en: 'Write the name of the function the program starts from.', code: 'int ___(void) {\n    return 0;\n}', answer: 'main' },
        1: { ar: 'اكتب نوع العدد الصحيح.', en: 'Write the whole number type.', code: '___ age = 19;', answer: 'int' },
        2: { ar: 'اكتب العلامة اللي بتجيب عنوان المتغير.', en: 'Write the operator that gets the variable address.', code: 'int x = 5;\nint *p = ___x;', answer: '&' },
        3: { ar: 'اكتب الدالة اللي بتحجز الذاكرة.', en: 'Write the function that reserves memory.', code: 'int *a = ___(3 * sizeof(int));', answer: 'malloc' },
        4: { ar: 'اكتب العلامة اللي بتجمع الرقمين.', en: 'Write the operator that adds the two numbers.', code: 'printf("%d\\n", a ___ b);', answer: '+' },
    },
    rust: { 0: { ar: 'كمّل الأمر اللي بيشغل المشروع.', en: 'Complete the command that runs the project.', code: 'cargo ___', answer: 'run' },
        1: { ar: 'كمّل الجملة: القيمة اتـ ___ للمتغير الجديد (بالإنجليزي).', en: 'Fill in the comment: the value was ___ to the new variable.', code: 'let a = String::from("hi");\nlet b = a;   // a was ___ to b', answer: 'moved' },
        2: { ar: 'اكتب العلامة اللي بتعمل استعارة للقراءة.', en: 'Write the symbol for a read-only borrow.', code: 'fn len(s: ___String) -> usize {\n    s.len()\n}', answer: '&' },
        3: { ar: 'اكتب الكلمة اللي بنعرّف بيها مجموعة اختيارات.', en: 'Write the keyword that defines a set of choices.', code: '___ Level { Easy, Hard }', answer: 'enum' },
        4: { ar: 'اكتب العلامة اللي بتزود على المجموع.', en: 'Write the operator that adds to the sum.', code: 'let mut sum = 0;\nfor n in nums {\n    sum ___ n;\n}', answer: '+=' },
    },
    lua: { 0: { ar: 'اكتب الكلمة اللي بنعرّف بيها متغير.', en: 'Write the keyword that declares a variable.', code: '___ name = "Sara"', answer: 'local' },
        1: { ar: 'اكتب رقم أول عنصر في الجدول.', en: 'Write the index of the first item.', code: 'local fruits = {"apple", "banana"}\nprint(fruits[___])', answer: '1' },
        2: { ar: 'اكتب الكلمة اللي بتقفل الدالة.', en: 'Write the word that closes the function.', code: 'local function double(x)\n  return x * 2\n___', answer: 'end' },
        3: { ar: 'اكتب الدالة اللي بتلف على عناصر الجدول.', en: 'Write the function that loops over table items.', code: 'for _, n in ___({1, 2, 3}) do\n  print(n)\nend', answer: 'ipairs' },
    },
    elixir: { 0: { ar: 'كمّل الدالة اللي بتطبع نص.', en: 'Complete the function that prints text.', code: 'IO.___("Hello")', answer: 'puts' },
        1: { ar: 'اكتب العلامة اللي بتعمل مطابقة أنماط.', en: 'Write the operator that does pattern matching.', code: '{status, value} ___ {:ok, 42}', answer: '=' },
        2: { ar: 'اكتب الدالة اللي بتشغل عملية جديدة.', en: 'Write the function that starts a new process.', code: 'pid = ___(fn -> IO.puts("hi") end)', answer: 'spawn' },
        3: { ar: 'اكتب الدالة اللي بتجمع عناصر القائمة.', en: 'Write the function that sums a list.', code: 'IO.puts(Enum.___([1, 2, 3]))', answer: 'sum' },
    },
};
