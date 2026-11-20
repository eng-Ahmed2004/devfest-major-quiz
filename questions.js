/* ==========================================================================
   بنك الأسئلة — Question Bank
   مين أنت في التخصص؟ | GDGoC DevFest
   --------------------------------------------------------------------------
   ➕ لإضافة تخصص جديد: انسخ أي كتلة تخصص كاملة { id: ..., } وعدّلها.
   ➕ لإضافة سؤال: أضف كائنًا داخل questions بهذا الشكل:

     {
       ar: { q: "نص السؤال؟", options: ["الإجابة الصحيحة", "خطأ", "خطأ", "خطأ"], explain: "شرح قصير" },
       en: { q: "Question?",  options: ["Correct answer",  "Wrong", "Wrong", "Wrong"], explain: "Short explanation" },
     },

   ⚠️ مهم:
   • الخيار الأول دائمًا هو الإجابة الصحيحة — اللعبة تخلط ترتيب الخيارات تلقائيًا.
     (إن أردت غير ذلك أضف answer: رقم الخيار الصحيح، والعد يبدأ من 0)
   • ترتيب الخيارات في en يجب أن يطابق ترتيبها في ar.
   • النسخة الإنجليزية en اختيارية؛ إن لم توجد يظهر النص العربي في الوضعين.
   • aliases: كلمات قد يكتبها الطالب للوصول لهذا التخصص (عربي أو إنجليزي).
     لا تقلق من الهمزات والتشكيل والتاء المربوطة و"ال" التعريف — اللعبة تتجاهلها.
   • التخصص الذي id = "general" هو أسئلة الثقافة التقنية العامة، ويُستخدم
     تلقائيًا عندما لا نجد أي تخصص قريب مما كتبه الطالب. لا تحذفه.
   • يُفضّل 8–10 أسئلة أو أكثر لكل تخصص حتى لا تتكرر الأسئلة بسرعة.
   ========================================================================== */

window.QUESTION_BANK = [
  /* ───────────────────────────── علوم الحاسوب ───────────────────────────── */
  {
    id: "cs",
    icon: "💻",
    name: { ar: "علوم الحاسوب", en: "Computer Science" },
    aliases: [
      "علوم الحاسوب", "علم الحاسوب", "حاسوب", "علوم الحاسب", "حاسب", "حاسب آلي",
      "علوم الكمبيوتر", "كمبيوتر", "برمجة", "مبرمج", "هندسة الحاسوب", "هندسة الكمبيوتر",
      "تكنولوجيا المعلومات", "تقنية المعلومات", "نظم المعلومات",
      "cs", "cse", "computer science", "comp sci", "compsci", "computer", "computing",
      "programming", "programmer", "computer engineering", "it", "information technology",
      "information systems", "cis"
    ],
    questions: [
      {
        ar: { q: "ما التعقيد الزمني لخوارزمية البحث الثنائي (Binary Search) على مصفوفة مرتبة؟", options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"], explain: "في كل خطوة يُقسَم نطاق البحث إلى النصف، لذلك يحتاج البحث إلى نحو log₂ n خطوة فقط." },
        en: { q: "What is the time complexity of binary search on a sorted array?", options: ["O(log n)", "O(n)", "O(n log n)", "O(1)"], explain: "Each step halves the search range, so it takes only about log₂ n steps." },
      },
      {
        ar: { q: "أي بنية بيانات تعمل بمبدأ LIFO (آخر من يدخل أول من يخرج)؟", options: ["المكدّس (Stack)", "الطابور (Queue)", "جدول التجزئة (Hash Table)", "الشجرة الثنائية (Binary Tree)"], explain: "المكدّس يضيف ويحذف من القمة فقط، فآخر عنصر يُضاف هو أول عنصر يُسحب — مثل كومة الأطباق. أما الطابور فيعمل بمبدأ FIFO." },
        en: { q: "Which data structure follows the LIFO (Last In, First Out) principle?", options: ["Stack", "Queue", "Hash table", "Binary tree"], explain: "A stack adds and removes only at the top, so the last item pushed is the first popped — like a pile of plates. A queue is FIFO." },
      },
      {
        ar: { q: "ماذا يعني الاختصار CPU؟", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Power Unit"], explain: "أي «وحدة المعالجة المركزية»، وهي «عقل» الحاسوب الذي ينفّذ تعليمات البرامج." },
        en: { q: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Power Unit"], explain: "The CPU is the 'brain' of the computer that executes program instructions." },
      },
      {
        ar: { q: "كم بِت (bit) يوجد في البايت (Byte) الواحد؟", options: ["8", "4", "16", "32"], explain: "البايت يتكوّن من 8 بِتات، ويمكنه تمثيل 256 قيمة مختلفة (2⁸)." },
        en: { q: "How many bits are in one byte?", options: ["8", "4", "16", "32"], explain: "A byte is 8 bits and can represent 256 different values (2⁸)." },
      },
      {
        ar: { q: "ما القيمة العشرية للعدد الثنائي 1010؟", options: ["10", "12", "8", "5"], explain: "1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10" },
        en: { q: "What is the decimal value of the binary number 1010?", options: ["10", "12", "8", "5"], explain: "1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10" },
      },
      {
        ar: { q: "أي خوارزمية ترتيب متوسط تعقيدها الزمني O(n log n)؟", options: ["الترتيب بالدمج (Merge Sort)", "ترتيب الفقاعة (Bubble Sort)", "الترتيب بالاختيار (Selection Sort)", "الترتيب بالإدراج (Insertion Sort)"], explain: "Merge Sort يقسّم المصفوفة إلى نصفين بشكل متكرر ثم يدمجها، فيبقى O(n log n)، بينما الثلاث الأخرى O(n²) في المتوسط." },
        en: { q: "Which sorting algorithm has an average time complexity of O(n log n)?", options: ["Merge sort", "Bubble sort", "Selection sort", "Insertion sort"], explain: "Merge sort recursively splits the array in halves and merges them, staying O(n log n); the other three are O(n²) on average." },
      },
      {
        ar: { q: "من العالِم الملقّب بأبي علوم الحاسوب النظرية والذكاء الاصطناعي؟", options: ["آلان تورنغ", "تشارلز باباج", "بيل غيتس", "تيم بيرنرز-لي"], explain: "قدّم آلان تورنغ مفهوم «آلة تورنغ» عام 1936، وهو أساس نظرية الحوسبة، كما اقترح «اختبار تورنغ» للذكاء الاصطناعي." },
        en: { q: "Which scientist is known as the father of theoretical computer science and AI?", options: ["Alan Turing", "Charles Babbage", "Bill Gates", "Tim Berners-Lee"], explain: "Alan Turing introduced the Turing machine in 1936 — the foundation of computability theory — and proposed the Turing Test for AI." },
      },
      {
        ar: { q: "ما الوظيفة الأساسية لنظام التشغيل؟", options: ["إدارة موارد الجهاز وتقديم الخدمات للبرامج", "ترجمة الشيفرة إلى لغة الآلة فقط", "تصميم صفحات الويب", "تسريع الاتصال بالإنترنت"], explain: "نظام التشغيل (مثل Windows وLinux وAndroid) يدير المعالج والذاكرة والملفات والأجهزة، ويوفّر بيئة لتشغيل البرامج." },
        en: { q: "What is the main role of an operating system?", options: ["Managing hardware resources and providing services to programs", "Only translating code into machine language", "Designing web pages", "Speeding up the internet connection"], explain: "An OS (e.g., Windows, Linux, Android) manages the CPU, memory, files and devices, and provides an environment for programs to run." },
      },
      {
        ar: { q: "ما وظيفة المترجم (Compiler)؟", options: ["يترجم الشيفرة المصدرية كاملة إلى لغة الآلة قبل التنفيذ", "ينفّذ الشيفرة سطرًا بسطر دون ترجمة مسبقة", "قطعة عتاد لتخزين البيانات", "محرّر نصوص لكتابة الشيفرة"], explain: "المترجم يحوّل البرنامج كاملًا إلى شيفرة قابلة للتنفيذ قبل تشغيله، أما المفسّر (Interpreter) فينفّذ الشيفرة سطرًا بسطر." },
        en: { q: "What does a compiler do?", options: ["Translates the whole source code into machine code before execution", "Runs code line by line without prior translation", "A hardware part that stores data", "A text editor for writing code"], explain: "A compiler converts the entire program into executable code before it runs, whereas an interpreter executes code line by line." },
      },
      {
        ar: { q: "في لغات مثل C وJava وPython، ما رقم الفهرس (index) لأول عنصر في المصفوفة؟", options: ["0", "1", "-1", "2"], explain: "تبدأ الفهارس من الصفر في هذه اللغات، لذا يكون أول عنصر هو arr[0]." },
        en: { q: "In languages like C, Java and Python, what is the index of the first element of an array?", options: ["0", "1", "-1", "2"], explain: "Indexing starts at zero in these languages, so the first element is arr[0]." },
      },
    ],
  },

  /* ───────────────────────────── هندسة البرمجيات ───────────────────────────── */
  {
    id: "se",
    icon: "🛠️",
    name: { ar: "هندسة البرمجيات", en: "Software Engineering" },
    aliases: [
      "هندسة البرمجيات", "هندسة برمجيات", "برمجيات", "مهندس برمجيات", "تطوير البرمجيات",
      "تطوير ويب", "مطور", "مطور برمجيات",
      "software engineering", "software engineer", "software", "se", "swe",
      "software development", "web development", "developer"
    ],
    questions: [
      {
        ar: { q: "ماذا يعني الاختصار SDLC؟", options: ["Software Development Life Cycle", "System Design Logic Code", "Software Data Link Control", "Standard Development Language Compiler"], explain: "أي «دورة حياة تطوير البرمجيات»، وتشمل: تحليل المتطلبات، التصميم، التنفيذ، الاختبار، النشر، والصيانة." },
        en: { q: "What does SDLC stand for?", options: ["Software Development Life Cycle", "System Design Logic Code", "Software Data Link Control", "Standard Development Language Compiler"], explain: "It covers the phases of building software: requirements, design, implementation, testing, deployment and maintenance." },
      },
      {
        ar: { q: "في أي نموذج تطوير تُنفَّذ المراحل بالتتابع (متطلبات ← تصميم ← تنفيذ ← اختبار ← صيانة)، ولا تبدأ مرحلة قبل انتهاء السابقة؟", options: ["الشلّال (Waterfall)", "سكرم (Scrum)", "كانبان (Kanban)", "البرمجة القصوى (XP)"], explain: "في نموذج الشلّال تتدفّق المراحل بالترتيب كالشلّال، بعكس المنهجيات الرشيقة (Agile) التي تعمل بدورات تكرارية قصيرة." },
        en: { q: "In which development model are phases done in sequence (requirements → design → implementation → testing → maintenance), each starting only after the previous one ends?", options: ["Waterfall", "Scrum", "Kanban", "Extreme Programming (XP)"], explain: "In Waterfall, phases flow in order like a waterfall — unlike Agile methods, which work in short iterative cycles." },
      },
      {
        ar: { q: "في منهجية Scrum، ما اسم الدورة الزمنية القصيرة الثابتة (عادةً 1–4 أسابيع) التي يُنجَز فيها جزء من العمل؟", options: ["Sprint", "Backlog", "Epic", "Stand-up"], explain: "الـSprint دورة محددة المدة ينتج عنها جزء قابل للاستخدام من المنتج. أما Backlog فهو قائمة المهام، وStand-up هو الاجتماع اليومي القصير." },
        en: { q: "In Scrum, what is the short fixed time-box (usually 1–4 weeks) in which a chunk of work is completed called?", options: ["Sprint", "Backlog", "Epic", "Stand-up"], explain: "A sprint is a fixed-length iteration that produces a usable increment. The backlog is the task list; the stand-up is the short daily meeting." },
      },
      {
        ar: { q: "أي أمر Git يرفع الـcommits المحلية إلى المستودع البعيد (مثل GitHub)؟", options: ["git push", "git pull", "git clone", "git init"], explain: "git push يرسل التغييرات إلى المستودع البعيد، وgit pull يجلب التغييرات منه، وgit clone ينسخ مستودعًا، وgit init ينشئ مستودعًا جديدًا." },
        en: { q: "Which Git command uploads local commits to a remote repository (e.g., GitHub)?", options: ["git push", "git pull", "git clone", "git init"], explain: "git push sends changes to the remote; git pull fetches them; git clone copies a repo; git init creates a new one." },
      },
      {
        ar: { q: "ماذا يختبر «اختبار الوحدة» (Unit Testing)؟", options: ["أصغر أجزاء الشيفرة (كالدوال) كلٌّ على حدة", "النظام كاملًا من قِبل المستخدم النهائي", "أداء النظام تحت ضغط كبير", "تصميم الواجهة وألوانها فقط"], explain: "اختبار الوحدة يتحقق من أن كل دالة أو وحدة صغيرة تعمل بشكل صحيح بمعزل عن بقية النظام، وغالبًا يكون مؤتمتًا." },
        en: { q: "What does unit testing test?", options: ["The smallest pieces of code (e.g., functions) in isolation", "The whole system, by end users", "System performance under heavy load", "Only the UI design and colors"], explain: "Unit tests check that each function or small unit works correctly in isolation, usually automatically." },
      },
      {
        ar: { q: "ماذا يعني الاختصار UML؟", options: ["Unified Modeling Language", "Universal Machine Language", "User Management Logic", "Unified Markup Language"], explain: "أي «لغة النمذجة الموحّدة»: مجموعة مخططات قياسية (مثل Class Diagram وUse Case Diagram) لوصف تصميم الأنظمة البرمجية." },
        en: { q: "What does UML stand for?", options: ["Unified Modeling Language", "Universal Machine Language", "User Management Logic", "Unified Markup Language"], explain: "UML is a standard set of diagrams (e.g., class and use-case diagrams) used to model software designs." },
      },
      {
        ar: { q: "المتطلب «يجب أن يستجيب النظام خلال ثانيتين» هو مثال على:", options: ["متطلب غير وظيفي (Non-functional)", "متطلب وظيفي (Functional)", "نمط تصميم (Design Pattern)", "حالة اختبار (Test Case)"], explain: "المتطلبات غير الوظيفية تصف جودة النظام مثل الأداء والأمان وسهولة الاستخدام، أما الوظيفية فتصف ما يفعله النظام." },
        en: { q: "The requirement 'the system must respond within 2 seconds' is an example of a:", options: ["Non-functional requirement", "Functional requirement", "Design pattern", "Test case"], explain: "Non-functional requirements describe qualities like performance, security and usability; functional ones describe what the system does." },
      },
      {
        ar: { q: "أي نمط تصميم (Design Pattern) يضمن وجود نسخة واحدة فقط من الكلاس؟", options: ["Singleton", "Factory", "Observer", "Adapter"], explain: "نمط Singleton يمنع إنشاء أكثر من كائن واحد من الكلاس ويوفّر نقطة وصول عامة إليه، مثل كائن إعدادات التطبيق." },
        en: { q: "Which design pattern ensures a class has only one instance?", options: ["Singleton", "Factory", "Observer", "Adapter"], explain: "Singleton prevents creating more than one object of the class and provides a global access point to it, e.g., an app settings object." },
      },
      {
        ar: { q: "ما المقصود بإعادة هيكلة الشيفرة (Refactoring)؟", options: ["تحسين البنية الداخلية للشيفرة دون تغيير سلوكها الخارجي", "إضافة ميزات جديدة للمستخدم", "إعادة كتابة البرنامج بلغة برمجة أخرى", "حذف الاختبارات لتسريع البناء"], explain: "الـRefactoring يجعل الشيفرة أنظف وأسهل في القراءة والصيانة مع بقاء سلوكها ونتائجها كما هي تمامًا." },
        en: { q: "What does refactoring mean?", options: ["Improving the internal structure of code without changing its external behavior", "Adding new features for users", "Rewriting the program in another language", "Deleting tests to speed up the build"], explain: "Refactoring makes code cleaner and easier to maintain while its behavior stays exactly the same." },
      },
      {
        ar: { q: "وفقًا لبيان Agile (Agile Manifesto)، أيٌّ مما يلي يُقدَّر أكثر؟", options: ["البرمجيات العاملة", "التوثيق الشامل", "الالتزام الحرفي بالخطة", "التفاوض على العقود"], explain: "يقدّر البيان: الأفراد والتفاعلات أكثر من العمليات والأدوات، والبرمجيات العاملة أكثر من التوثيق الشامل، والتعاون مع العميل أكثر من التفاوض على العقود، والاستجابة للتغيير أكثر من اتباع الخطة." },
        en: { q: "According to the Agile Manifesto, which of these is valued more?", options: ["Working software", "Comprehensive documentation", "Following a plan strictly", "Contract negotiation"], explain: "The manifesto values individuals and interactions over processes and tools, working software over comprehensive documentation, customer collaboration over contract negotiation, and responding to change over following a plan." },
      },
    ],
  },

  /* ───────────────────────────── الذكاء الاصطناعي ───────────────────────────── */
  {
    id: "ai",
    icon: "🤖",
    name: { ar: "الذكاء الاصطناعي", en: "Artificial Intelligence" },
    aliases: [
      "الذكاء الاصطناعي", "ذكاء اصطناعي", "ذكاء صناعي", "تعلم الآلة", "تعلم آلي",
      "علم البيانات", "علوم البيانات", "تحليل البيانات",
      "ai", "artificial intelligence", "machine learning", "ml", "deep learning",
      "data science", "data scientist", "data analytics"
    ],
    questions: [
      {
        ar: { q: "ما الذي يميّز «التعلم الخاضع للإشراف» (Supervised Learning)؟", options: ["التدريب على بيانات مُعنونة (مدخلات مع إجاباتها الصحيحة)", "التدريب على بيانات غير مُعنونة فقط", "التعلّم من المكافآت والعقوبات عبر التفاعل مع بيئة", "عدم الحاجة إلى أي بيانات"], explain: "يتعلّم النموذج من أمثلة معروفة الإجابة — مثل صور قطط وكلاب مع تسمية كل صورة — ثم يتنبّأ لبيانات جديدة." },
        en: { q: "What characterizes supervised learning?", options: ["Training on labeled data (inputs with their correct outputs)", "Training on unlabeled data only", "Learning from rewards and penalties by interacting with an environment", "Needing no data at all"], explain: "The model learns from examples with known answers — e.g., cat and dog photos with labels — then predicts on new data." },
      },
      {
        ar: { q: "خوارزمية التجميع K-Means هي مثال على:", options: ["التعلم غير الخاضع للإشراف", "التعلم الخاضع للإشراف", "التعلم المعزّز", "الأنظمة الخبيرة"], explain: "K-Means تقسّم البيانات إلى مجموعات متشابهة دون وجود تسميات مسبقة، وهذا جوهر التعلم غير الخاضع للإشراف." },
        en: { q: "The K-Means clustering algorithm is an example of:", options: ["Unsupervised learning", "Supervised learning", "Reinforcement learning", "Expert systems"], explain: "K-Means groups similar data points without any prior labels — the essence of unsupervised learning." },
      },
      {
        ar: { q: "ما المقصود بالـOverfitting (فرط التخصيص)؟", options: ["أداء ممتاز على بيانات التدريب وضعيف على البيانات الجديدة", "أداء ضعيف على بيانات التدريب والاختبار معًا", "أن يتدرّب النموذج بسرعة كبيرة", "أن يستهلك النموذج ذاكرة قليلة"], explain: "النموذج «يحفظ» بيانات التدريب بتفاصيلها وضجيجها بدل أن يتعلّم النمط العام، فيفشل في التعميم. أما الأداء الضعيف على الاثنين فهو Underfitting." },
        en: { q: "What is overfitting?", options: ["Great performance on training data but poor on new data", "Poor performance on both training and test data", "The model trains too fast", "The model uses little memory"], explain: "The model memorizes the training data, noise included, instead of the general pattern, so it fails to generalize. Poor performance on both is underfitting." },
      },
      {
        ar: { q: "أي نوع من التعلم الآلي يعتمد على وكيل (Agent) يتعلّم من المكافآت والعقوبات أثناء تفاعله مع بيئة؟", options: ["التعلم المعزّز (Reinforcement Learning)", "التعلم الخاضع للإشراف", "التعلم غير الخاضع للإشراف", "الانحدار الخطي"], explain: "يجرّب الوكيل أفعالًا ويتلقّى مكافأة أو عقوبة، فيتعلّم تدريجيًا الاستراتيجية الأفضل — كما في الألعاب والروبوتات." },
        en: { q: "Which type of machine learning uses an agent that learns from rewards and penalties while interacting with an environment?", options: ["Reinforcement learning", "Supervised learning", "Unsupervised learning", "Linear regression"], explain: "The agent tries actions, receives rewards or penalties, and gradually learns the best strategy — as in games and robotics." },
      },
      {
        ar: { q: "ما اسم الاختبار الذي يقيس قدرة الآلة على إظهار سلوك ذكي لا يمكن تمييزه عن سلوك الإنسان؟", options: ["اختبار تورنغ", "اختبار المرآة", "اختبار رورشاخ", "اختبار ستروب"], explain: "اقترحه آلان تورنغ عام 1950: إذا لم يستطع المحاور التمييز بين الآلة والإنسان في محادثة نصية، تُعدّ الآلة قد اجتازت الاختبار." },
        en: { q: "What is the test of whether a machine can show intelligent behavior indistinguishable from a human called?", options: ["The Turing Test", "The Mirror Test", "The Rorschach Test", "The Stroop Test"], explain: "Proposed by Alan Turing in 1950: if a judge can't tell the machine from a human in a text conversation, the machine passes." },
      },
      {
        ar: { q: "الشبكات العصبية الالتفافية (CNN) تُستخدم بشكل رئيسي في:", options: ["معالجة الصور والرؤية الحاسوبية", "ترتيب المصفوفات", "إدارة قواعد البيانات", "توجيه حزم الشبكة"], explain: "طبقات الالتفاف في CNN تلتقط الحواف والأشكال والأنماط في الصور، لذلك تُستخدم في التعرّف على الوجوه وتصنيف الصور وغيرها." },
        en: { q: "Convolutional Neural Networks (CNNs) are mainly used for:", options: ["Image processing and computer vision", "Sorting arrays", "Database management", "Routing network packets"], explain: "Convolution layers detect edges, shapes and patterns in images, so CNNs power face recognition, image classification and more." },
      },
      {
        ar: { q: "ماذا يعني الاختصار NLP في الذكاء الاصطناعي؟", options: ["Natural Language Processing", "Neural Logic Programming", "Network Layer Protocol", "Numeric Linear Planning"], explain: "أي «معالجة اللغات الطبيعية»: فرع يجعل الحاسوب يفهم لغة البشر ويولّدها، مثل الترجمة الآلية والمساعدات الذكية." },
        en: { q: "What does NLP stand for in AI?", options: ["Natural Language Processing", "Neural Logic Programming", "Network Layer Protocol", "Numeric Linear Planning"], explain: "NLP lets computers understand and generate human language — e.g., machine translation and chat assistants." },
      },
      {
        ar: { q: "أي خوارزمية تحدّث أوزان النموذج بالتحرّك في اتجاه تناقص دالة الخطأ (Loss)؟", options: ["الانحدار التدرّجي (Gradient Descent)", "البحث الثنائي (Binary Search)", "خوارزمية ديكسترا (Dijkstra)", "ترتيب الفقاعة (Bubble Sort)"], explain: "Gradient Descent يحسب ميل (مشتقة) دالة الخطأ ويحرّك الأوزان بخطوات صغيرة عكس اتجاه الميل حتى يقل الخطأ." },
        en: { q: "Which algorithm updates model weights by moving in the direction that decreases the loss function?", options: ["Gradient descent", "Binary search", "Dijkstra's algorithm", "Bubble sort"], explain: "Gradient descent computes the slope (gradient) of the loss and moves the weights in small steps against it to reduce the error." },
      },
      {
        ar: { q: "مَن صاغ مصطلح «الذكاء الاصطناعي» (Artificial Intelligence) المرتبط بمؤتمر دارتموث عام 1956؟", options: ["جون مكارثي", "آلان تورنغ", "تشارلز باباج", "آدا لوفليس"], explain: "صاغه جون مكارثي في مقترح مؤتمر دارتموث الذي شارك في تنظيمه، ويُعدّ هذا المؤتمر ميلاد المجال. كما طوّر مكارثي لغة LISP." },
        en: { q: "Who coined the term 'Artificial Intelligence', associated with the 1956 Dartmouth conference?", options: ["John McCarthy", "Alan Turing", "Charles Babbage", "Ada Lovelace"], explain: "John McCarthy coined it in the proposal for the Dartmouth conference he co-organized — considered the birth of the field. He also created LISP." },
      },
      {
        ar: { q: "ماذا يعني الحرف T في GPT؟", options: ["Transformer", "Training", "Tensor", "Turing"], explain: "GPT = Generative Pre-trained Transformer. والـTransformer معمارية شبكات عصبية قدّمها باحثون من Google عام 2017 في ورقة «Attention Is All You Need»." },
        en: { q: "What does the 'T' in GPT stand for?", options: ["Transformer", "Training", "Tensor", "Turing"], explain: "GPT = Generative Pre-trained Transformer. The Transformer architecture was introduced by Google researchers in the 2017 paper 'Attention Is All You Need'." },
      },
    ],
  },

  /* ───────────────────────────── أمن المعلومات ───────────────────────────── */
  {
    id: "security",
    icon: "🔐",
    name: { ar: "أمن المعلومات", en: "Cybersecurity" },
    aliases: [
      "أمن المعلومات", "الأمن السيبراني", "أمن سيبراني", "سايبر", "سايبر سكيورتي",
      "أمن الشبكات", "اختراق", "اختراق أخلاقي",
      "cyber security", "cybersecurity", "cyber", "information security", "infosec",
      "security", "network security", "ethical hacking", "hacking", "pentest", "penetration testing"
    ],
    questions: [
      {
        ar: { q: "مثلث أمن المعلومات CIA يتكوّن من:", options: ["السرية، السلامة، التوافر", "التحكم، الهوية، الوصول", "التشفير، الهوية، المصادقة", "الامتثال، الاختراق، التدقيق"], explain: "CIA = Confidentiality (السرية) وIntegrity (سلامة البيانات من التعديل) وAvailability (توافر الخدمة)، وهي الأهداف الثلاثة الأساسية لأمن المعلومات." },
        en: { q: "The CIA triad of information security consists of:", options: ["Confidentiality, Integrity, Availability", "Control, Identity, Access", "Cryptography, Identity, Authentication", "Compliance, Intrusion, Auditing"], explain: "These are the three core goals of information security: keep data secret, unaltered and accessible." },
      },
      {
        ar: { q: "ما هو التصيّد الاحتيالي (Phishing)؟", options: ["رسائل أو مواقع مزيفة تخدع الضحية لكشف معلومات حساسة", "برنامج يحسّن سرعة الإنترنت", "نسخ احتياطي للبيانات", "جدار حماية للشبكة"], explain: "ينتحل المهاجم جهة موثوقة (بنك، جامعة، شركة) ليدفعك لإدخال كلمة المرور أو بيانات بطاقتك. انتبه دائمًا لعنوان المرسل والرابط." },
        en: { q: "What is phishing?", options: ["Fake messages or websites that trick victims into revealing sensitive information", "Software that boosts internet speed", "Backing up data", "A network firewall"], explain: "The attacker impersonates a trusted party (bank, university, company) to get your password or card details. Always check the sender and the link." },
      },
      {
        ar: { q: "ما نوع البرمجية الخبيثة التي تشفّر ملفات الضحية وتطلب فدية لفك التشفير؟", options: ["برامج الفدية (Ransomware)", "برامج التجسس (Spyware)", "برامج الإعلانات (Adware)", "الديدان (Worms)"], explain: "Ransomware تقفل ملفاتك بالتشفير وتطلب مبلغًا (غالبًا بعملة رقمية). أفضل حماية: نسخ احتياطية منتظمة وتحديث الأنظمة." },
        en: { q: "What type of malware encrypts a victim's files and demands payment to unlock them?", options: ["Ransomware", "Spyware", "Adware", "Worm"], explain: "Ransomware locks your files with encryption and demands money (often in crypto). Best defense: regular backups and up-to-date systems." },
      },
      {
        ar: { q: "ماذا تضيف المصادقة الثنائية (2FA)؟", options: ["طبقة تحقق ثانية من نوع مختلف بجانب كلمة المرور", "تغيير كلمة المرور تلقائيًا كل يوم", "حذف الحساب عند نسيان كلمة المرور", "إخفاء عنوان IP للمستخدم"], explain: "2FA تجمع بين شيء تعرفه (كلمة المرور) وشيء تملكه (رمز على الهاتف) أو شيء منك (البصمة)، فلا تكفي سرقة كلمة المرور وحدها." },
        en: { q: "What does two-factor authentication (2FA) add?", options: ["A second, different kind of verification besides the password", "Automatically changing the password every day", "Deleting the account if the password is forgotten", "Hiding the user's IP address"], explain: "2FA combines something you know (password) with something you have (a phone code) or something you are (fingerprint), so a stolen password alone isn't enough." },
      },
      {
        ar: { q: "ما وظيفة جدار الحماية (Firewall)؟", options: ["مراقبة حركة الشبكة وتصفيتها وفق قواعد محددة", "تسريع المعالج", "تشفير القرص الصلب بالكامل", "إزالة الفيروسات من الملفات المصابة"], explain: "الجدار الناري يسمح بالاتصالات الداخلة والخارجة أو يمنعها حسب قواعد (منافذ، عناوين، بروتوكولات)، وهو خط دفاع أول للشبكة." },
        en: { q: "What does a firewall do?", options: ["Monitors and filters network traffic based on defined rules", "Speeds up the processor", "Encrypts the entire hard drive", "Removes viruses from infected files"], explain: "A firewall allows or blocks incoming and outgoing connections by rules (ports, addresses, protocols) — a network's first line of defense." },
      },
      {
        ar: { q: "ما رقم المنفذ (Port) الافتراضي لبروتوكول HTTPS؟", options: ["443", "80", "21", "22"], explain: "HTTPS يستخدم المنفذ 443، بينما HTTP يستخدم 80، وFTP يستخدم 21، وSSH يستخدم 22." },
        en: { q: "What is the default port for HTTPS?", options: ["443", "80", "21", "22"], explain: "HTTPS uses 443, HTTP uses 80, FTP uses 21 and SSH uses 22." },
      },
      {
        ar: { q: "في التشفير المتماثل (Symmetric Encryption):", options: ["يُستخدم المفتاح نفسه للتشفير وفك التشفير", "يُستخدم زوج مفاتيح: عام وخاص", "لا يُستخدم أي مفتاح", "لا يمكن فك التشفير إطلاقًا"], explain: "مثل خوارزمية AES: الطرفان يملكان المفتاح السري نفسه. أما التشفير غير المتماثل (مثل RSA) فيستخدم مفتاحًا عامًا وآخر خاصًا." },
        en: { q: "In symmetric encryption:", options: ["The same key is used to encrypt and decrypt", "A public/private key pair is used", "No key is used", "Data can never be decrypted"], explain: "E.g., AES: both sides share the same secret key. Asymmetric encryption (e.g., RSA) uses a public and a private key." },
      },
      {
        ar: { q: "أيٌّ مما يلي خوارزمية تجزئة (Hash)؟", options: ["SHA-256", "AES", "RSA", "TLS"], explain: "SHA-256 دالة تجزئة أحادية الاتجاه تُنتج بصمة بطول ثابت (256 بِت). أما AES فتشفير متماثل، وRSA تشفير غير متماثل، وTLS بروتوكول اتصال آمن." },
        en: { q: "Which of these is a hashing algorithm?", options: ["SHA-256", "AES", "RSA", "TLS"], explain: "SHA-256 is a one-way hash producing a fixed 256-bit digest. AES is symmetric encryption, RSA is asymmetric, and TLS is a secure communication protocol." },
      },
      {
        ar: { q: "ما هو هجوم حقن SQL (SQL Injection)؟", options: ["إدخال أوامر SQL خبيثة عبر حقول الإدخال للتلاعب بقاعدة البيانات", "إرسال ملايين الطلبات لإسقاط الخادم", "سرقة الكوكيز عبر شبكة Wi-Fi عامة", "تخمين كلمات المرور بالتجربة"], explain: "يحدث عندما يُدمج إدخال المستخدم مباشرة في استعلام SQL. الحل: الاستعلامات المُهيّأة (Prepared Statements) والتحقق من المدخلات." },
        en: { q: "What is a SQL injection attack?", options: ["Inserting malicious SQL through input fields to manipulate the database", "Sending millions of requests to crash a server", "Stealing cookies over public Wi-Fi", "Guessing passwords by trial and error"], explain: "It happens when user input is placed directly into a SQL query. Fix: prepared statements (parameterized queries) and input validation." },
      },
      {
        ar: { q: "هجوم حجب الخدمة الموزّع (DDoS) يستهدف بشكل أساسي أي عنصر من مثلث CIA؟", options: ["التوافر (Availability)", "السرية (Confidentiality)", "السلامة (Integrity)", "لا يستهدف أيًّا منها"], explain: "DDoS يُغرق الخادم بطلبات من أجهزة كثيرة حتى يعجز عن خدمة المستخدمين الحقيقيين، أي أنه يضرب «التوافر»." },
        en: { q: "A DDoS attack mainly targets which element of the CIA triad?", options: ["Availability", "Confidentiality", "Integrity", "None of them"], explain: "DDoS floods a server with requests from many devices until it can't serve real users — hitting availability." },
      },
    ],
  },

  /* ───────────────────────────── الهندسة المدنية ───────────────────────────── */
  {
    id: "civil",
    icon: "🏗️",
    name: { ar: "الهندسة المدنية", en: "Civil Engineering" },
    aliases: [
      "الهندسة المدنية", "هندسة مدنية", "مدني", "مدنية", "هندسة إنشائية", "إنشاءات",
      "هندسة الطرق", "مهندس مدني",
      "civil engineering", "civil", "structural engineering", "construction engineering"
    ],
    questions: [
      {
        ar: { q: "لماذا يُضاف حديد التسليح إلى الخرسانة؟", options: ["لأن الخرسانة ضعيفة في مقاومة الشد", "لجعل الخرسانة أخف وزنًا", "لتسريع جفاف الخرسانة", "لتحسين لون الخرسانة"], explain: "الخرسانة قوية جدًا في الضغط لكنها ضعيفة في الشد، فيتحمّل حديد التسليح قوى الشد، ويشكّلان معًا «الخرسانة المسلحة»." },
        en: { q: "Why is steel reinforcement added to concrete?", options: ["Because concrete is weak in tension", "To make concrete lighter", "To make concrete dry faster", "To improve its color"], explain: "Concrete is very strong in compression but weak in tension; steel bars carry the tension, together forming reinforced concrete." },
      },
      {
        ar: { q: "ما المكونات الأساسية للخرسانة العادية؟", options: ["الإسمنت والماء والركام (رمل وحصى)", "الطين والجير والخشب", "الإسفلت والرمل والبلاستيك", "الجبس والماء والزجاج"], explain: "يتفاعل الإسمنت مع الماء (الإماهة) ليربط حبيبات الركام الناعم (الرمل) والخشن (الحصى) في كتلة صلبة." },
        en: { q: "What are the basic ingredients of normal concrete?", options: ["Cement, water and aggregates (sand and gravel)", "Clay, lime and wood", "Asphalt, sand and plastic", "Gypsum, water and glass"], explain: "Cement reacts with water (hydration) and binds fine (sand) and coarse (gravel) aggregates into a solid mass." },
      },
      {
        ar: { q: "ما وحدة قياس الإجهاد (Stress) في النظام الدولي SI؟", options: ["الباسكال (Pa)", "النيوتن (N)", "الجول (J)", "الواط (W)"], explain: "الإجهاد = القوة ÷ المساحة، فوحدته N/m² وتسمّى باسكال. وفي الإنشاءات تُستخدم غالبًا الميغاباسكال (MPa)." },
        en: { q: "What is the SI unit of stress?", options: ["Pascal (Pa)", "Newton (N)", "Joule (J)", "Watt (W)"], explain: "Stress = force ÷ area, so its unit is N/m², called the pascal. In structures, MPa is common." },
      },
      {
        ar: { q: "أي عنصر إنشائي ينقل أحمال المبنى إلى التربة؟", options: ["الأساسات", "الجسور (Beams)", "البلاطات", "الأعتاب"], explain: "تنتقل الأحمال من البلاطات إلى الجسور ثم إلى الأعمدة، وأخيرًا إلى الأساسات التي توزّعها على التربة." },
        en: { q: "Which structural element transfers a building's loads to the soil?", options: ["Foundations", "Beams", "Slabs", "Lintels"], explain: "Loads go from slabs to beams to columns, and finally to the foundations, which spread them onto the soil." },
      },
      {
        ar: { q: "ماذا يقيس اختبار الهبوط (Slump Test)؟", options: ["قابلية تشغيل الخرسانة الطازجة", "مقاومة الخرسانة للضغط", "نسبة الرطوبة في التربة", "مقاومة الحديد للشد"], explain: "يُملأ مخروط بالخرسانة الطازجة ثم يُرفع ويُقاس مقدار هبوطها، فيدل ذلك على قوامها وسهولة صبّها وتشغيلها." },
        en: { q: "What does the slump test measure?", options: ["The workability of fresh concrete", "Concrete's compressive strength", "Soil moisture content", "Steel's tensile strength"], explain: "A cone is filled with fresh concrete and lifted; how much it slumps shows its consistency and how easy it is to place." },
      },
      {
        ar: { q: "عادةً تُحدَّد مقاومة الخرسانة التصميمية للضغط بعد كم يومًا من الصب؟", options: ["28 يومًا", "7 أيام", "3 أيام", "90 يومًا"], explain: "يُعتمد عمر 28 يومًا كمرجع قياسي لمقاومة الخرسانة، لأنها تكون قد اكتسبت معظم مقاومتها عندها." },
        en: { q: "Concrete's design compressive strength is normally specified at what age after casting?", options: ["28 days", "7 days", "3 days", "90 days"], explain: "28 days is the standard reference age, by which concrete has gained most of its strength." },
      },
      {
        ar: { q: "أي جهاز مساحي يقيس الزوايا الأفقية والرأسية والمسافات إلكترونيًا؟", options: ["المحطة الشاملة (Total Station)", "البارومتر", "الهيدرومتر", "راسم الذبذبات (Oscilloscope)"], explain: "الـTotal Station يجمع بين الثيودوليت وجهاز قياس المسافات الإلكتروني (EDM)، وهو أساسي في أعمال المساحة والتوقيع." },
        en: { q: "Which surveying instrument measures horizontal and vertical angles and distances electronically?", options: ["Total station", "Barometer", "Hydrometer", "Oscilloscope"], explain: "A total station combines a theodolite with an electronic distance meter (EDM) — essential in surveying and setting out." },
      },
      {
        ar: { q: "قانون هوك: ضمن حد المرونة، يتناسب الإجهاد طرديًا مع:", options: ["الانفعال (Strain)", "درجة الحرارة", "الزمن", "الكثافة"], explain: "σ = E × ε، حيث E هو معامل المرونة (معامل يونغ). وبعد تجاوز حد المرونة لا يبقى هذا التناسب صحيحًا." },
        en: { q: "Hooke's law: within the elastic limit, stress is directly proportional to:", options: ["Strain", "Temperature", "Time", "Density"], explain: "σ = E × ε, where E is the modulus of elasticity (Young's modulus). Beyond the elastic limit this no longer holds." },
      },
      {
        ar: { q: "أي فرع من الهندسة المدنية يهتم بسلوك التربة وتصميم الأساسات؟", options: ["الهندسة الجيوتقنية", "هندسة النقل والمرور", "الهندسة الهيدروليكية", "الهندسة البيئية"], explain: "الهندسة الجيوتقنية تدرس خصائص التربة والصخور وقدرة تحمّلها، وتصمّم الأساسات والجدران الاستنادية." },
        en: { q: "Which branch of civil engineering deals with soil behavior and foundation design?", options: ["Geotechnical engineering", "Transportation engineering", "Hydraulic engineering", "Environmental engineering"], explain: "Geotechnical engineering studies soil and rock properties and bearing capacity, and designs foundations and retaining walls." },
      },
      {
        ar: { q: "ما العنصر الإنشائي الأفقي الذي يقاوم الأحمال بشكل رئيسي عن طريق الانحناء (العزم)؟", options: ["الجسر (Beam)", "العمود (Column)", "الخازوق (Pile)", "القاعدة (Footing)"], explain: "الجسر (الكمرة) عنصر أفقي يحمل الأحمال العمودية عليه فينحني، بينما يعمل العمود أساسًا تحت الضغط المحوري." },
        en: { q: "Which horizontal structural element mainly resists loads through bending?", options: ["Beam", "Column", "Pile", "Footing"], explain: "A beam carries loads perpendicular to its axis and bends, while a column mainly works in axial compression." },
      },
    ],
  },

  /* ───────────────────────────── الهندسة الكهربائية ───────────────────────────── */
  {
    id: "electrical",
    icon: "⚡",
    name: { ar: "الهندسة الكهربائية", en: "Electrical Engineering" },
    aliases: [
      "الهندسة الكهربائية", "هندسة كهربائية", "هندسة الكهرباء", "كهرباء", "كهربائية",
      "هندسة إلكترونية", "إلكترونيات", "هندسة الاتصالات", "اتصالات", "هندسة القوى", "مهندس كهرباء",
      "electrical engineering", "electrical", "ee", "electronics", "electronic engineering",
      "communications engineering", "telecommunications", "power engineering"
    ],
    questions: [
      {
        ar: { q: "قانون أوم يُكتب على الصورة:", options: ["V = I × R", "V = I ÷ R", "P = V ÷ I", "R = V × I"], explain: "الجهد (V) = التيار (I) × المقاومة (R). مثال: تيار 2A في مقاومة 5Ω ينتج جهدًا قدره 10V." },
        en: { q: "Ohm's law is written as:", options: ["V = I × R", "V = I ÷ R", "P = V ÷ I", "R = V × I"], explain: "Voltage (V) = current (I) × resistance (R). E.g., 2 A through 5 Ω gives 10 V." },
      },
      {
        ar: { q: "ما وحدة قياس المقاومة الكهربائية؟", options: ["الأوم (Ω)", "الفولت (V)", "الأمبير (A)", "الفاراد (F)"], explain: "المقاومة تُقاس بالأوم، والجهد بالفولت، والتيار بالأمبير، والسعة بالفاراد." },
        en: { q: "What is the unit of electrical resistance?", options: ["Ohm (Ω)", "Volt (V)", "Ampere (A)", "Farad (F)"], explain: "Resistance is measured in ohms, voltage in volts, current in amperes and capacitance in farads." },
      },
      {
        ar: { q: "أي عنصر يخزّن الطاقة في مجال كهربائي؟", options: ["المكثّف (Capacitor)", "المقاومة (Resistor)", "الملف (Inductor)", "الثنائي (Diode)"], explain: "المكثّف يخزّن الطاقة في المجال الكهربائي بين لوحيه، أما الملف فيخزّنها في مجال مغناطيسي." },
        en: { q: "Which component stores energy in an electric field?", options: ["Capacitor", "Resistor", "Inductor", "Diode"], explain: "A capacitor stores energy in the electric field between its plates; an inductor stores it in a magnetic field." },
      },
      {
        ar: { q: "القدرة الكهربائية (P) في دائرة تيار مستمر تساوي:", options: ["P = V × I", "P = V ÷ I", "P = I ÷ R", "P = R ÷ V"], explain: "القدرة = الجهد × التيار وتُقاس بالواط، ويمكن كتابتها أيضًا P = I²R أو P = V²/R." },
        en: { q: "Electric power (P) in a DC circuit equals:", options: ["P = V × I", "P = V ÷ I", "P = I ÷ R", "P = R ÷ V"], explain: "Power = voltage × current, measured in watts. It can also be written P = I²R or P = V²/R." },
      },
      {
        ar: { q: "ما وظيفة المحوّل الكهربائي (Transformer)؟", options: ["رفع الجهد المتردد (AC) أو خفضه", "تحويل التيار المتردد إلى مستمر", "تخزين الشحنة الكهربائية", "قياس شدة التيار"], explain: "يعمل المحوّل بالحث الكهرومغناطيسي بين ملفين، لذلك يعمل مع التيار المتردد فقط. أما تحويل AC إلى DC فهو وظيفة المقوّم (Rectifier)." },
        en: { q: "What does a transformer do?", options: ["Steps AC voltage up or down", "Converts AC to DC", "Stores electric charge", "Measures current"], explain: "A transformer works by electromagnetic induction between two coils, so it only works with AC. Converting AC to DC is a rectifier's job." },
      },
      {
        ar: { q: "أي عنصر إلكتروني يسمح بمرور التيار في اتجاه واحد فقط؟", options: ["الثنائي (Diode)", "المقاومة (Resistor)", "المكثّف (Capacitor)", "المحوّل (Transformer)"], explain: "الدايود يمرّر التيار في الانحياز الأمامي ويمنعه في الانحياز العكسي، ويُستخدم في دوائر التقويم." },
        en: { q: "Which electronic component lets current flow in one direction only?", options: ["Diode", "Resistor", "Capacitor", "Transformer"], explain: "A diode conducts when forward-biased and blocks when reverse-biased; it's used in rectifier circuits." },
      },
      {
        ar: { q: "ما وحدة قياس التردد؟", options: ["الهيرتز (Hz)", "التسلا (T)", "الهنري (H)", "الويبر (Wb)"], explain: "الهيرتز = دورة واحدة في الثانية. أما التسلا فوحدة كثافة الفيض المغناطيسي، والهنري وحدة المحاثة، والويبر وحدة الفيض المغناطيسي." },
        en: { q: "What is the unit of frequency?", options: ["Hertz (Hz)", "Tesla (T)", "Henry (H)", "Weber (Wb)"], explain: "One hertz = one cycle per second. Tesla is magnetic flux density, henry is inductance and weber is magnetic flux." },
      },
      {
        ar: { q: "عند توصيل عدة مقاومات على التوالي، تكون المقاومة الكلية:", options: ["مجموع المقاومات", "حاصل ضرب المقاومات", "مقلوب مجموع مقلوباتها", "أكبر مقاومة فقط"], explain: "على التوالي: R = R₁ + R₂ + … . أما «مقلوب مجموع المقلوبات» فهو قانون التوصيل على التوازي." },
        en: { q: "When resistors are connected in series, the total resistance is:", options: ["The sum of the resistances", "The product of the resistances", "The reciprocal of the sum of reciprocals", "Only the largest resistance"], explain: "Series: R = R₁ + R₂ + … . The reciprocal-of-reciprocals rule is for parallel connections." },
      },
      {
        ar: { q: "ينص قانون كيرشوف للتيار (KCL) على أن:", options: ["مجموع التيارات الداخلة إلى عقدة يساوي مجموع التيارات الخارجة منها", "مجموع الجهود حول أي مسار مغلق يساوي صفرًا", "الجهد يساوي التيار مضروبًا في المقاومة", "القدرة تساوي الجهد مضروبًا في التيار"], explain: "KCL مبني على حفظ الشحنة. أما «مجموع الجهود في مسار مغلق = صفر» فهو قانون كيرشوف للجهد (KVL)." },
        en: { q: "Kirchhoff's Current Law (KCL) states that:", options: ["The total current entering a node equals the total current leaving it", "The sum of voltages around any closed loop is zero", "Voltage equals current times resistance", "Power equals voltage times current"], explain: "KCL comes from conservation of charge. 'Sum of voltages around a loop = 0' is Kirchhoff's Voltage Law (KVL)." },
      },
      {
        ar: { q: "ما أشهر مادة شبه موصلة تُصنع منها الشرائح الإلكترونية؟", options: ["السيليكون", "النحاس", "الألمنيوم", "الحديد"], explain: "السيليكون شبه موصل وفير ورخيص، وتُصنع منه معظم الترانزستورات والدوائر المتكاملة — ومنه جاء اسم «وادي السيليكون»." },
        en: { q: "What is the most common semiconductor material used to make chips?", options: ["Silicon", "Copper", "Aluminum", "Iron"], explain: "Silicon is an abundant, cheap semiconductor used in most transistors and integrated circuits — hence 'Silicon Valley'." },
      },
    ],
  },

  /* ───────────────────────────── الهندسة الميكانيكية ───────────────────────────── */
  {
    id: "mechanical",
    icon: "⚙️",
    name: { ar: "الهندسة الميكانيكية", en: "Mechanical Engineering" },
    aliases: [
      "الهندسة الميكانيكية", "هندسة ميكانيكية", "ميكانيك", "ميكانيكا", "ميكانيكي",
      "ميكاترونكس", "هندسة الميكاترونكس", "هندسة السيارات", "مهندس ميكانيك",
      "mechanical engineering", "mechanical", "mech", "mechatronics", "automotive engineering"
    ],
    questions: [
      {
        ar: { q: "قانون نيوتن الثاني ينص على أن:", options: ["F = m × a", "F = m ÷ a", "F = m × v", "F = a ÷ m"], explain: "القوة المحصّلة = الكتلة × التسارع، فكلما زادت الكتلة احتجنا قوة أكبر لإكسابها التسارع نفسه." },
        en: { q: "Newton's second law states that:", options: ["F = m × a", "F = m ÷ a", "F = m × v", "F = a ÷ m"], explain: "Net force = mass × acceleration. The more mass, the more force is needed for the same acceleration." },
      },
      {
        ar: { q: "ما وحدة قياس القوة في النظام الدولي؟", options: ["النيوتن (N)", "الجول (J)", "الباسكال (Pa)", "الواط (W)"], explain: "1 نيوتن = 1 kg·m/s². أما الجول فللطاقة، والباسكال للضغط، والواط للقدرة." },
        en: { q: "What is the SI unit of force?", options: ["Newton (N)", "Joule (J)", "Pascal (Pa)", "Watt (W)"], explain: "1 N = 1 kg·m/s². Joule is energy, pascal is pressure and watt is power." },
      },
      {
        ar: { q: "القانون الأول للديناميكا الحرارية (الثرموديناميك) هو في جوهره:", options: ["قانون حفظ الطاقة", "قانون ازدياد الإنتروبي", "استحالة الوصول إلى الصفر المطلق", "قانون الاتزان الحراري"], explain: "الطاقة لا تفنى ولا تُستحدث من العدم بل تتحوّل من شكل لآخر: ΔU = Q − W. أما ازدياد الإنتروبي فهو القانون الثاني." },
        en: { q: "The first law of thermodynamics is essentially:", options: ["The law of conservation of energy", "The law of increasing entropy", "The impossibility of reaching absolute zero", "The law of thermal equilibrium"], explain: "Energy is neither created nor destroyed, only converted: ΔU = Q − W. Increasing entropy is the second law." },
      },
      {
        ar: { q: "ما الترتيب الصحيح لأشواط محرك الاحتراق الداخلي رباعي الأشواط؟", options: ["سحب ← انضغاط ← قدرة ← عادم", "انضغاط ← سحب ← عادم ← قدرة", "سحب ← قدرة ← انضغاط ← عادم", "عادم ← سحب ← قدرة ← انضغاط"], explain: "يسحب المكبس خليط الوقود والهواء، ثم يضغطه، ثم يحترق الوقود فيدفع المكبس (شوط القدرة)، وأخيرًا تُطرد الغازات (العادم)." },
        en: { q: "What is the correct order of strokes in a four-stroke internal combustion engine?", options: ["Intake → Compression → Power → Exhaust", "Compression → Intake → Exhaust → Power", "Intake → Power → Compression → Exhaust", "Exhaust → Intake → Power → Compression"], explain: "The piston draws in the fuel-air mix, compresses it, the fuel burns and pushes the piston (power stroke), and finally the gases are expelled (exhaust)." },
      },
      {
        ar: { q: "كيف تصل حرارة الشمس إلى الأرض؟", options: ["بالإشعاع", "بالتوصيل", "بالحمل", "بالتبخّر"], explain: "الفضاء شبه فارغ، والتوصيل والحمل يحتاجان إلى وسط مادي، أما الإشعاع (موجات كهرومغناطيسية) فينتقل عبر الفراغ." },
        en: { q: "How does heat from the Sun reach Earth?", options: ["Radiation", "Conduction", "Convection", "Evaporation"], explain: "Space is nearly empty; conduction and convection need a medium, but radiation (electromagnetic waves) travels through a vacuum." },
      },
      {
        ar: { q: "ما الوظيفة الأساسية للمحامل (Bearings)؟", options: ["تقليل الاحتكاك ودعم الأعمدة الدوّارة", "زيادة الاحتكاك لإيقاف الحركة", "تخزين الحرارة", "توليد الكهرباء"], explain: "المحامل (مثل محامل الكريات) تسمح بدوران سلس للأعمدة بأقل احتكاك، وتتحمّل الأحمال الواقعة عليها." },
        en: { q: "What is the main function of bearings?", options: ["Reducing friction and supporting rotating shafts", "Increasing friction to stop motion", "Storing heat", "Generating electricity"], explain: "Bearings (e.g., ball bearings) let shafts rotate smoothly with minimal friction while carrying loads." },
      },
      {
        ar: { q: "عزم الدوران (Torque) يساوي:", options: ["القوة × البعد العمودي عن محور الدوران", "الكتلة × السرعة", "القوة ÷ المساحة", "الطاقة ÷ الزمن"], explain: "τ = F × r ويُقاس بـ N·m؛ لذلك يسهل فتح الباب عند الدفع بعيدًا عن المفصّلات. أما الكتلة × السرعة فهي الزخم، والقوة ÷ المساحة هي الضغط، والطاقة ÷ الزمن هي القدرة." },
        en: { q: "Torque equals:", options: ["Force × perpendicular distance from the axis", "Mass × velocity", "Force ÷ area", "Energy ÷ time"], explain: "τ = F × r, measured in N·m — that's why a door opens more easily when pushed far from its hinges. Mass × velocity is momentum, force ÷ area is pressure, energy ÷ time is power." },
      },
      {
        ar: { q: "كفاءة أي محرك حراري حقيقي تكون دائمًا:", options: ["أقل من 100%", "تساوي 100% تمامًا", "أكبر من 100%", "50% بالضبط"], explain: "وفق القانون الثاني للديناميكا الحرارية لا بد أن يُطرد جزء من الحرارة إلى المستودع البارد، فلا يمكن تحويل كل الحرارة إلى شغل. والحد الأعلى النظري هو كفاءة كارنو." },
        en: { q: "The efficiency of any real heat engine is always:", options: ["Less than 100%", "Exactly 100%", "More than 100%", "Exactly 50%"], explain: "By the second law of thermodynamics some heat must be rejected to the cold reservoir, so not all heat becomes work. The theoretical upper limit is the Carnot efficiency." },
      },
      {
        ar: { q: "الضغط (Pressure) يساوي:", options: ["القوة ÷ المساحة", "القوة × المساحة", "الكتلة × التسارع", "الكتلة ÷ الحجم"], explain: "P = F/A، لذلك تخترق الإبرة الأشياء بسهولة لأن مساحة رأسها صغيرة جدًا. أما الكتلة ÷ الحجم فهي الكثافة." },
        en: { q: "Pressure equals:", options: ["Force ÷ area", "Force × area", "Mass × acceleration", "Mass ÷ volume"], explain: "P = F/A — that's why a needle pierces easily: its tip area is tiny. Mass ÷ volume is density." },
      },
      {
        ar: { q: "في منحنى الإجهاد–الانفعال، ما اسم النقطة التي تبدأ عندها المادة بالتشوّه اللدن (الدائم)؟", options: ["نقطة الخضوع (Yield Point)", "مقاومة الشد القصوى (Ultimate Strength)", "نقطة الكسر (Fracture Point)", "نقطة الأصل"], explain: "قبل نقطة الخضوع تعود المادة لشكلها الأصلي عند إزالة الحمل (سلوك مرن)، وبعدها يبقى جزء من التشوّه دائمًا." },
        en: { q: "On a stress–strain curve, what is the point where a material starts to deform plastically (permanently) called?", options: ["Yield point", "Ultimate tensile strength", "Fracture point", "Origin"], explain: "Before yielding, the material returns to its shape when unloaded (elastic); after it, part of the deformation is permanent." },
      },
    ],
  },

  /* ───────────────────────────── الطب ───────────────────────────── */
  {
    id: "medicine",
    icon: "🩺",
    name: { ar: "الطب", en: "Medicine" },
    aliases: [
      "الطب", "طب", "طب بشري", "طبيب", "دكتور", "طب عام",
      "medicine", "medical", "med", "mbbs", "md", "doctor", "physician", "human medicine"
    ],
    questions: [
      {
        ar: { q: "ما أكبر عضو في جسم الإنسان؟", options: ["الجلد", "الكبد", "الدماغ", "الرئتان"], explain: "الجلد أكبر عضو في الجسم (مساحته نحو 1.5–2 م² عند البالغ)، أما الكبد فهو أكبر عضو داخلي." },
        en: { q: "What is the largest organ of the human body?", options: ["Skin", "Liver", "Brain", "Lungs"], explain: "The skin is the largest organ (about 1.5–2 m² in adults); the liver is the largest internal organ." },
      },
      {
        ar: { q: "كم عدد العظام في جسم الإنسان البالغ؟", options: ["206", "186", "230", "300"], explain: "يولد الطفل بنحو 270–300 عظمة، يلتحم بعضها مع النمو ليصبح العدد 206 عند البالغ." },
        en: { q: "How many bones are in the adult human body?", options: ["206", "186", "230", "300"], explain: "A newborn has about 270–300 bones; some fuse during growth, leaving 206 in adults." },
      },
      {
        ar: { q: "ما المعدل الطبيعي لنبض القلب عند البالغ في وقت الراحة؟", options: ["60–100 نبضة/دقيقة", "30–50 نبضة/دقيقة", "120–160 نبضة/دقيقة", "180–200 نبضة/دقيقة"], explain: "أقل من 60 يسمّى بطء القلب (Bradycardia)، وأكثر من 100 يسمّى تسرّع القلب (Tachycardia)، وقد يكون أقل من 60 طبيعيًا عند الرياضيين." },
        en: { q: "What is the normal resting heart rate for an adult?", options: ["60–100 bpm", "30–50 bpm", "120–160 bpm", "180–200 bpm"], explain: "Below 60 is bradycardia and above 100 is tachycardia; below 60 can be normal in athletes." },
      },
      {
        ar: { q: "أي عضو يفرز هرمون الإنسولين؟", options: ["البنكرياس", "الكبد", "الغدة الدرقية", "الكليتان"], explain: "تفرزه خلايا بيتا في جزر لانغرهانس بالبنكرياس، وهو يخفّض سكر الدم بإدخال الغلوكوز إلى الخلايا." },
        en: { q: "Which organ secretes insulin?", options: ["Pancreas", "Liver", "Thyroid gland", "Kidneys"], explain: "Beta cells in the pancreatic islets of Langerhans secrete it; it lowers blood sugar by moving glucose into cells." },
      },
      {
        ar: { q: "أي فصيلة دم تُعرف بالمعطي العام لكريات الدم الحمراء؟", options: ["O سالب (O−)", "AB موجب (AB+)", "A موجب (A+)", "B سالب (B−)"], explain: "كريات O− لا تحمل مستضدات A ولا B ولا Rh، لذا يمكن نقلها لأي فصيلة تقريبًا في الطوارئ. أما AB+ فهي المستقبل العام." },
        en: { q: "Which blood type is known as the universal red-cell donor?", options: ["O negative (O−)", "AB positive (AB+)", "A positive (A+)", "B negative (B−)"], explain: "O− red cells carry no A, B or Rh antigens, so they can be given to almost anyone in emergencies. AB+ is the universal recipient." },
      },
      {
        ar: { q: "أي خلايا الدم تنقل الأكسجين؟", options: ["كريات الدم الحمراء", "كريات الدم البيضاء", "الصفائح الدموية", "الخلايا البلازمية"], explain: "تحتوي الكريات الحمراء على الهيموغلوبين الذي يرتبط بالأكسجين. أما البيضاء فللمناعة، والصفائح لتخثّر الدم." },
        en: { q: "Which blood cells carry oxygen?", options: ["Red blood cells", "White blood cells", "Platelets", "Plasma cells"], explain: "Red cells contain hemoglobin, which binds oxygen. White cells fight infection; platelets help clotting." },
      },
      {
        ar: { q: "ما أصغر عظمة في جسم الإنسان؟", options: ["عظمة الركاب (Stapes)", "عظمة الفخذ", "عظمة الكعبرة", "الرضفة (صابونة الركبة)"], explain: "الركاب في الأذن الوسطى طولها نحو 3 مم، وتنقل الاهتزازات الصوتية إلى الأذن الداخلية. أما عظمة الفخذ فهي الأطول." },
        en: { q: "What is the smallest bone in the human body?", options: ["Stapes", "Femur", "Radius", "Patella (kneecap)"], explain: "The stapes in the middle ear is about 3 mm long and passes sound vibrations to the inner ear. The femur is the longest bone." },
      },
      {
        ar: { q: "مَن اكتشف البنسلين عام 1928؟", options: ["ألكسندر فليمنغ", "لويس باستور", "إدوارد جينر", "روبرت كوخ"], explain: "لاحظ فليمنغ أن عفن Penicillium قتل البكتيريا في طبق المزرعة، فكان ذلك أول مضاد حيوي. أما جينر فارتبط اسمه بلقاح الجدري." },
        en: { q: "Who discovered penicillin in 1928?", options: ["Alexander Fleming", "Louis Pasteur", "Edward Jenner", "Robert Koch"], explain: "Fleming noticed Penicillium mold killing bacteria in a culture dish — the first antibiotic. Jenner is known for the smallpox vaccine." },
      },
      {
        ar: { q: "أي فيتامين يُصنع في الجلد عند التعرّض لأشعة الشمس؟", options: ["فيتامين D", "فيتامين C", "فيتامين B12", "فيتامين K"], explain: "الأشعة فوق البنفسجية (UVB) تحوّل مركّبًا في الجلد إلى فيتامين D الضروري لامتصاص الكالسيوم وصحة العظام." },
        en: { q: "Which vitamin is made in the skin when exposed to sunlight?", options: ["Vitamin D", "Vitamin C", "Vitamin B12", "Vitamin K"], explain: "UVB rays convert a compound in the skin into vitamin D, essential for calcium absorption and bone health." },
      },
      {
        ar: { q: "أي وعاء دموي ينقل الدم المؤكسج من الرئتين إلى القلب؟", options: ["الوريد الرئوي", "الشريان الرئوي", "الأبهر (الأورطي)", "الوريد الأجوف العلوي"], explain: "استثناء شهير: الأوردة الرئوية تحمل دمًا مؤكسجًا إلى الأذين الأيسر، بينما الشريان الرئوي يحمل دمًا غير مؤكسج إلى الرئتين." },
        en: { q: "Which blood vessel carries oxygenated blood from the lungs to the heart?", options: ["Pulmonary vein", "Pulmonary artery", "Aorta", "Superior vena cava"], explain: "A famous exception: pulmonary veins carry oxygen-rich blood to the left atrium, while the pulmonary artery carries oxygen-poor blood to the lungs." },
      },
    ],
  },

  /* ───────────────────────────── الصيدلة ───────────────────────────── */
  {
    id: "pharmacy",
    icon: "💊",
    name: { ar: "الصيدلة", en: "Pharmacy" },
    aliases: [
      "الصيدلة", "صيدلة", "صيدلي", "صيدلاني", "دكتور صيدلي", "دكتور صيدلة", "علوم صيدلانية", "علم الأدوية",
      "pharmacy", "pharmacist", "pharmd", "pharm", "pharmaceutical sciences", "pharmacology"
    ],
    questions: [
      {
        ar: { q: "في علم الحرائك الدوائية، إلامَ يشير الاختصار ADME؟", options: ["Absorption, Distribution, Metabolism, Excretion", "Action, Dose, Mechanism, Effect", "Administration, Dilution, Measurement, Elimination", "Analysis, Diagnosis, Medication, Evaluation"], explain: "ADME = الامتصاص، التوزيع، الاستقلاب (الأيض)، الإطراح: رحلة الدواء داخل الجسم منذ تناوله حتى خروجه." },
        en: { q: "In pharmacokinetics, what does ADME stand for?", options: ["Absorption, Distribution, Metabolism, Excretion", "Action, Dose, Mechanism, Effect", "Administration, Dilution, Measurement, Elimination", "Analysis, Diagnosis, Medication, Evaluation"], explain: "ADME describes a drug's journey through the body: absorption, distribution, metabolism and excretion." },
      },
      {
        ar: { q: "ما العضو الرئيسي المسؤول عن استقلاب (أيض) معظم الأدوية؟", options: ["الكبد", "القلب", "الرئتان", "الطحال"], explain: "يحتوي الكبد على إنزيمات مثل عائلة السيتوكروم P450 التي تحوّل الأدوية إلى مركّبات يسهل إطراحها." },
        en: { q: "Which organ is mainly responsible for metabolizing most drugs?", options: ["Liver", "Heart", "Lungs", "Spleen"], explain: "The liver contains enzymes such as the cytochrome P450 family that convert drugs into forms that are easier to excrete." },
      },
      {
        ar: { q: "المضادات الحيوية (Antibiotics) فعّالة ضد:", options: ["العدوى البكتيرية", "العدوى الفيروسية مثل الزكام", "الحساسية الموسمية", "ارتفاع ضغط الدم"], explain: "المضادات الحيوية تقتل البكتيريا أو توقف نموها ولا تؤثر في الفيروسات، واستخدامها دون داعٍ يزيد مقاومة البكتيريا لها." },
        en: { q: "Antibiotics are effective against:", options: ["Bacterial infections", "Viral infections like the common cold", "Seasonal allergies", "High blood pressure"], explain: "Antibiotics kill bacteria or stop their growth and do nothing against viruses; unnecessary use fuels antibiotic resistance." },
      },
      {
        ar: { q: "الباراسيتامول (Acetaminophen) يُستخدم أساسًا:", options: ["مسكّنًا للألم وخافضًا للحرارة", "مضادًا حيويًا", "مضادًا للتخثّر", "مضادًا للهيستامين"], explain: "الباراسيتامول مسكّن وخافض حرارة فعّال، لكن تأثيره المضاد للالتهاب ضعيف جدًا مقارنة بالأيبوبروفين، وجرعته الزائدة خطيرة على الكبد." },
        en: { q: "Paracetamol (acetaminophen) is mainly used as:", options: ["A pain reliever and fever reducer", "An antibiotic", "An anticoagulant", "An antihistamine"], explain: "Paracetamol is an effective analgesic and antipyretic but a very weak anti-inflammatory compared with ibuprofen; overdose is dangerous to the liver." },
      },
      {
        ar: { q: "ما الاسم الكيميائي للأسبرين؟", options: ["حمض أسيتيل الساليسيليك", "حمض الأسكوربيك", "حمض الستريك", "حمض الفوليك"], explain: "الأسبرين = Acetylsalicylic acid. أما حمض الأسكوربيك فهو فيتامين C، وحمض الفوليك من فيتامينات B." },
        en: { q: "What is the chemical name of aspirin?", options: ["Acetylsalicylic acid", "Ascorbic acid", "Citric acid", "Folic acid"], explain: "Aspirin is acetylsalicylic acid. Ascorbic acid is vitamin C; folic acid is a B vitamin." },
      },
      {
        ar: { q: "ما المقصود بعمر النصف (t½) للدواء؟", options: ["الزمن اللازم لانخفاض تركيز الدواء في البلازما إلى النصف", "الزمن اللازم لوصول الدواء إلى أقصى تأثير", "الزمن اللازم للتخلص من الدواء كليًا", "نصف مدة صلاحية الدواء على الرف"], explain: "عمر النصف يحدد عدد مرات أخذ الجرعة، ويُعدّ الدواء قد أُطرح تقريبًا بعد 4–5 أعمار نصف." },
        en: { q: "What is a drug's half-life (t½)?", options: ["The time for its plasma concentration to drop by half", "The time to reach maximum effect", "The time to eliminate it completely", "Half of its shelf life"], explain: "Half-life determines dosing frequency; a drug is considered almost eliminated after 4–5 half-lives." },
      },
      {
        ar: { q: "أي طريق لإعطاء الدواء يحقق توافرًا حيويًا (Bioavailability) بنسبة 100%؟", options: ["الوريدي (IV)", "الفموي", "الاستنشاقي", "الموضعي على الجلد"], explain: "في الحقن الوريدي يصل الدواء مباشرة إلى الدورة الدموية دون مرحلة امتصاص ودون المرور الأول بالكبد (First-pass effect)." },
        en: { q: "Which route of administration gives 100% bioavailability?", options: ["Intravenous (IV)", "Oral", "Inhalation", "Topical on the skin"], explain: "IV injection delivers the drug straight into the bloodstream, skipping absorption and first-pass liver metabolism." },
      },
      {
        ar: { q: "الأدوية التي تنتهي أسماؤها بـ ‎-pril (مثل Enalapril وLisinopril) تنتمي إلى أي مجموعة؟", options: ["مثبطات الإنزيم المحوّل للأنجيوتنسين (ACE Inhibitors)", "حاصرات بيتا (Beta Blockers)", "الستاتينات (Statins)", "مثبطات مضخة البروتون (PPIs)"], explain: "مثبطات ACE تُستخدم لعلاج ارتفاع ضغط الدم وفشل القلب. ومن مفاتيح الأسماء: ‎-olol لحاصرات بيتا، و‎-statin للستاتينات، و‎-prazole لمثبطات مضخة البروتون." },
        en: { q: "Drugs whose names end in -pril (e.g., enalapril, lisinopril) belong to which class?", options: ["ACE inhibitors", "Beta blockers", "Statins", "Proton pump inhibitors (PPIs)"], explain: "ACE inhibitors treat high blood pressure and heart failure. Name clues: -olol = beta blockers, -statin = statins, -prazole = PPIs." },
      },
      {
        ar: { q: "تُستخدم أدوية الستاتين (مثل Atorvastatin) أساسًا لـ:", options: ["خفض الكوليسترول", "علاج الالتهابات البكتيرية", "خفض الحرارة", "علاج الربو"], explain: "الستاتينات تثبّط إنزيم HMG-CoA reductase في الكبد، فتخفض الكوليسترول الضار (LDL) وتقلّل خطر أمراض القلب." },
        en: { q: "Statins (e.g., atorvastatin) are mainly used to:", options: ["Lower cholesterol", "Treat bacterial infections", "Reduce fever", "Treat asthma"], explain: "Statins inhibit the liver enzyme HMG-CoA reductase, lowering LDL ('bad') cholesterol and heart-disease risk." },
      },
      {
        ar: { q: "ما الترياق (Antidote) المستخدم لعلاج التسمم بجرعة زائدة من الباراسيتامول؟", options: ["N-أسيتيل سيستئين (NAC)", "النالوكسون", "الأتروبين", "فيتامين K"], explain: "NAC يعيد تكوين الغلوتاثيون في الكبد فيحميه من المستقلب السام. أما النالوكسون فترياق الأفيونات، وفيتامين K ترياق الوارفارين." },
        en: { q: "What is the antidote for a paracetamol (acetaminophen) overdose?", options: ["N-acetylcysteine (NAC)", "Naloxone", "Atropine", "Vitamin K"], explain: "NAC restores liver glutathione, protecting it from the toxic metabolite. Naloxone reverses opioids; vitamin K reverses warfarin." },
      },
    ],
  },

  /* ───────────────────────────── التمريض ───────────────────────────── */
  {
    id: "nursing",
    icon: "🩹",
    name: { ar: "التمريض", en: "Nursing" },
    aliases: [
      "التمريض", "تمريض", "ممرض", "ممرضة", "قبالة",
      "nursing", "nurse", "rn", "bsn", "midwifery"
    ],
    questions: [
      {
        ar: { q: "مَن تُلقَّب بمؤسِّسة التمريض الحديث؟", options: ["فلورنس نايتنغيل", "ماري كوري", "إليزابيث بلاكويل", "الأم تيريزا"], explain: "اشتهرت نايتنغيل خلال حرب القرم (1853–1856) بتحسين النظافة ورعاية الجرحى ولُقّبت «سيدة المصباح»، ويُحتفل باليوم العالمي للتمريض في ذكرى ميلادها 12 مايو." },
        en: { q: "Who is known as the founder of modern nursing?", options: ["Florence Nightingale", "Marie Curie", "Elizabeth Blackwell", "Mother Teresa"], explain: "Nightingale became famous in the Crimean War (1853–1856) for improving hygiene and care — 'the Lady with the Lamp'. International Nurses Day is on her birthday, 12 May." },
      },
      {
        ar: { q: "ما المعدل الطبيعي للتنفس عند البالغ في وقت الراحة؟", options: ["12–20 نفَسًا/دقيقة", "30–40 نفَسًا/دقيقة", "4–8 أنفاس/دقيقة", "50–60 نفَسًا/دقيقة"], explain: "يُقاس بعدّ مرات ارتفاع الصدر لمدة دقيقة كاملة دون أن يشعر المريض، حتى لا يغيّر نمط تنفسه." },
        en: { q: "What is the normal resting respiratory rate for an adult?", options: ["12–20 breaths/min", "30–40 breaths/min", "4–8 breaths/min", "50–60 breaths/min"], explain: "Count chest rises for a full minute without the patient noticing, so they don't change their breathing pattern." },
      },
      {
        ar: { q: "ما أكثر إجراء فعالية لمنع انتقال العدوى في المستشفيات؟", options: ["نظافة اليدين", "إغلاق النوافذ", "إعطاء مضاد حيوي لكل المرضى", "تقليل شرب الماء"], explain: "تؤكد منظمة الصحة العالمية أن نظافة اليدين (بالماء والصابون أو المعقّم الكحولي) في «اللحظات الخمس» أهم وسيلة لمنع العدوى." },
        en: { q: "What is the most effective measure to prevent the spread of infection in hospitals?", options: ["Hand hygiene", "Keeping windows closed", "Giving antibiotics to all patients", "Drinking less water"], explain: "The WHO promotes hand hygiene (soap and water or alcohol rub) at the 'five moments' as the most important infection-prevention measure." },
      },
      {
        ar: { q: "ماذا يقيس جهاز مقياس التأكسج النبضي (Pulse Oximeter)؟", options: ["نسبة تشبّع الدم بالأكسجين (SpO₂)", "سكر الدم", "ضغط الدم", "درجة حرارة الجسم"], explain: "يوضع على الإصبع ويقيس SpO₂ ومعدل النبض، والقيمة الطبيعية عادةً بين 95% و100%." },
        en: { q: "What does a pulse oximeter measure?", options: ["Blood oxygen saturation (SpO₂)", "Blood sugar", "Blood pressure", "Body temperature"], explain: "Clipped on a finger, it measures SpO₂ and pulse rate; normal values are usually 95–100%." },
      },
      {
        ar: { q: "ما معدل الضغطات الموصى به أثناء الإنعاش القلبي الرئوي (CPR) للبالغين؟", options: ["100–120 ضغطة/دقيقة", "60–80 ضغطة/دقيقة", "40–60 ضغطة/دقيقة", "150–180 ضغطة/دقيقة"], explain: "حسب إرشادات جمعية القلب الأمريكية (AHA): 100–120 ضغطة في الدقيقة بعمق 5–6 سم، مع السماح للصدر بالارتداد الكامل." },
        en: { q: "What compression rate is recommended during adult CPR?", options: ["100–120 per minute", "60–80 per minute", "40–60 per minute", "150–180 per minute"], explain: "Per American Heart Association guidelines: 100–120 compressions per minute, 5–6 cm deep, allowing full chest recoil." },
      },
      {
        ar: { q: "ما نسبة الضغطات إلى الأنفاس في الإنعاش القلبي الرئوي للبالغ (منقذ واحد)؟", options: ["30:2", "15:1", "5:1", "10:2"], explain: "30 ضغطة على الصدر يتبعها نفَسان إنقاذيان، وتتكرر الدورة حتى وصول المساعدة أو جهاز الصدمات الآلي (AED)." },
        en: { q: "What is the compression-to-breath ratio in adult CPR (single rescuer)?", options: ["30:2", "15:1", "5:1", "10:2"], explain: "30 chest compressions followed by 2 rescue breaths, repeated until help or an AED arrives." },
      },
      {
        ar: { q: "ما الخطوة الأولى في العملية التمريضية (Nursing Process)؟", options: ["التقييم (Assessment)", "التنفيذ (Implementation)", "التقويم (Evaluation)", "التخطيط (Planning)"], explain: "مراحلها بالترتيب (ADPIE): التقييم، التشخيص التمريضي، التخطيط، التنفيذ، ثم التقويم." },
        en: { q: "What is the first step of the nursing process?", options: ["Assessment", "Implementation", "Evaluation", "Planning"], explain: "The steps in order (ADPIE): Assessment, Diagnosis, Planning, Implementation, Evaluation." },
      },
      {
        ar: { q: "الحقنة التي تُعطى في العضلة الدالية (Deltoid) أعلى الذراع تسمّى:", options: ["حقنة عضلية (IM)", "حقنة وريدية (IV)", "حقنة تحت الجلد (SC)", "حقنة داخل الأدمة (ID)"], explain: "العضلة الدالية من أشهر مواقع الحقن العضلي، كما في كثير من اللقاحات. أما الحقن تحت الجلد فيكون في النسيج الدهني (كالإنسولين)." },
        en: { q: "An injection given into the deltoid muscle of the upper arm is called:", options: ["Intramuscular (IM)", "Intravenous (IV)", "Subcutaneous (SC)", "Intradermal (ID)"], explain: "The deltoid is a common IM site, e.g., for many vaccines. Subcutaneous injections go into fatty tissue (like insulin)." },
      },
      {
        ar: { q: "ماذا يقيس مقياس غلاسكو للغيبوبة (GCS)؟", options: ["مستوى الوعي", "شدة الألم", "مستوى سكر الدم", "الكتلة العضلية"], explain: "يقيّم فتح العينين والاستجابة اللفظية والحركية، ويتراوح المجموع من 3 (الأسوأ) إلى 15 (وعي كامل)." },
        en: { q: "What does the Glasgow Coma Scale (GCS) measure?", options: ["Level of consciousness", "Pain severity", "Blood sugar level", "Muscle mass"], explain: "It scores eye opening, verbal and motor responses; the total ranges from 3 (worst) to 15 (fully alert)." },
      },
      {
        ar: { q: "ما أهم إجراء للوقاية من تقرّحات الفراش (قُرح الضغط) لدى المرضى طريحي الفراش؟", options: ["تغيير وضعية المريض بانتظام", "إبقاء المريض على الوضعية نفسها", "تقليل السوائل", "استخدام ضمادات مشدودة"], explain: "الضغط المستمر يقلّل تروية الجلد، لذا تُغيَّر وضعية المريض بانتظام (غالبًا كل ساعتين) مع العناية بالجلد والتغذية." },
        en: { q: "What is the key measure to prevent pressure ulcers (bedsores) in bedridden patients?", options: ["Repositioning the patient regularly", "Keeping the patient in the same position", "Reducing fluids", "Using tight bandages"], explain: "Constant pressure cuts blood flow to the skin, so patients are repositioned regularly (often every 2 hours), with good skin care and nutrition." },
      },
    ],
  },

  /* ───────────────────────────── إدارة الأعمال ───────────────────────────── */
  {
    id: "business",
    icon: "📈",
    name: { ar: "إدارة الأعمال", en: "Business Administration" },
    aliases: [
      "إدارة الأعمال", "ادارة اعمال", "إدارة", "بزنس", "أعمال", "تسويق", "ريادة الأعمال",
      "موارد بشرية", "إدارة الموارد البشرية", "اقتصاد", "إدارة مشاريع",
      "business administration", "business", "bba", "mba", "management", "marketing",
      "entrepreneurship", "human resources", "hr", "economics", "project management"
    ],
    questions: [
      {
        ar: { q: "إلامَ يشير تحليل SWOT؟", options: ["نقاط القوة، نقاط الضعف، الفرص، التهديدات", "المبيعات، الأجور، العمليات، الضرائب", "الاستراتيجية، العمل، الأهداف، الوقت", "الموردون، العاملون، المالكون، التقنية"], explain: "SWOT = Strengths وWeaknesses (عوامل داخلية) وOpportunities وThreats (عوامل خارجية)، وهو أداة شائعة في التخطيط الاستراتيجي." },
        en: { q: "What does a SWOT analysis cover?", options: ["Strengths, Weaknesses, Opportunities, Threats", "Sales, Wages, Operations, Taxes", "Strategy, Work, Objectives, Time", "Suppliers, Workers, Owners, Technology"], explain: "Strengths and weaknesses are internal; opportunities and threats are external — a common strategic-planning tool." },
      },
      {
        ar: { q: "ما عناصر المزيج التسويقي (4Ps)؟", options: ["المنتج، السعر، المكان، الترويج", "الناس، الربح، الكوكب، الهدف", "التخطيط، الإنتاج، التسعير، الربح", "الشركاء، العمليات، الأداء، السياسات"], explain: "4Ps = Product, Price, Place, Promotion، وهو إطار شهير قدّمه إي. جيروم مكارثي عام 1960." },
        en: { q: "What are the 4Ps of the marketing mix?", options: ["Product, Price, Place, Promotion", "People, Profit, Planet, Purpose", "Planning, Production, Pricing, Profit", "Partners, Process, Performance, Policy"], explain: "The 4Ps framework was introduced by E. Jerome McCarthy in 1960." },
      },
      {
        ar: { q: "ما الوظائف الأربع الأساسية للإدارة؟", options: ["التخطيط، التنظيم، القيادة (التوجيه)، الرقابة", "الشراء، البيع، التوظيف، الفصل", "التسويق، المحاسبة، التمويل، الموارد البشرية", "القراءة، الكتابة، العرض، التقرير"], explain: "هذه الوظائف مستمدة من أعمال هنري فايول. أما التسويق والمحاسبة والتمويل فهي أقسام وظيفية في المنظمة وليست وظائف الإدارة." },
        en: { q: "What are the four basic functions of management?", options: ["Planning, Organizing, Leading, Controlling", "Buying, Selling, Hiring, Firing", "Marketing, Accounting, Finance, HR", "Reading, Writing, Presenting, Reporting"], explain: "These functions build on Henri Fayol's work. Marketing, accounting and finance are business departments, not management functions." },
      },
      {
        ar: { q: "ما المستوى الأعلى في هرم ماسلو للاحتياجات؟", options: ["تحقيق الذات", "الاحتياجات الفسيولوجية", "الأمان", "التقدير"], explain: "الترتيب من القاعدة: الفسيولوجية، الأمان، الانتماء، التقدير، ثم تحقيق الذات في القمة. ويُستخدم الهرم كثيرًا في تحفيز الموظفين والتسويق." },
        en: { q: "What is the top level of Maslow's hierarchy of needs?", options: ["Self-actualization", "Physiological needs", "Safety", "Esteem"], explain: "From the base: physiological, safety, love/belonging, esteem, and self-actualization at the top. It's widely used in motivation and marketing." },
      },
      {
        ar: { q: "ماذا يعني الاختصار KPI؟", options: ["Key Performance Indicator", "Key Profit Investment", "Knowledge Process Integration", "Key Product Inventory"], explain: "أي «مؤشر الأداء الرئيسي»: مقياس رقمي يبيّن مدى تحقيق هدف معيّن، مثل نسبة رضا العملاء أو نمو المبيعات." },
        en: { q: "What does KPI stand for?", options: ["Key Performance Indicator", "Key Profit Investment", "Knowledge Process Integration", "Key Product Inventory"], explain: "A KPI is a measurable value showing how well a goal is being achieved, e.g., customer satisfaction or sales growth." },
      },
      {
        ar: { q: "ماذا يعني نموذج الأعمال B2B؟", options: ["تعامل شركة مع شركة أخرى", "تعامل شركة مع المستهلك مباشرة", "تعامل المستهلكين فيما بينهم", "تعامل الشركة مع الحكومة"], explain: "B2B = Business to Business. أما B2C فمن الشركة إلى المستهلك، وC2C بين المستهلكين، وB2G من الشركة إلى الحكومة." },
        en: { q: "What does the B2B business model mean?", options: ["A business selling to another business", "A business selling directly to consumers", "Consumers selling to each other", "A business selling to the government"], explain: "B2B = Business to Business. B2C is business to consumer, C2C consumer to consumer, and B2G business to government." },
      },
      {
        ar: { q: "ماذا تُسمّى الشركة الناشئة التي تتجاوز قيمتها مليار دولار؟", options: ["يونيكورن (Unicorn)", "دراغون (Dragon)", "بيغاسوس (Pegasus)", "فينيكس (Phoenix)"], explain: "صاغت المستثمرة آيلين لي المصطلح عام 2013 لندرة هذه الشركات، فهي نادرة كالحصان وحيد القرن الأسطوري." },
        en: { q: "What is a startup valued at over $1 billion called?", options: ["Unicorn", "Dragon", "Pegasus", "Phoenix"], explain: "Investor Aileen Lee coined the term in 2013 because such startups were as rare as unicorns." },
      },
      {
        ar: { q: "إذا زاد الطلب على سلعة مع بقاء العرض ثابتًا، فإن سعرها يميل إلى:", options: ["الارتفاع", "الانخفاض", "البقاء ثابتًا دائمًا", "الهبوط إلى الصفر"], explain: "وفق قانون العرض والطلب، زيادة الطلب مع ثبات العرض تخلق ندرة نسبية، فيرتفع سعر التوازن." },
        en: { q: "If demand for a product rises while supply stays the same, its price tends to:", options: ["Rise", "Fall", "Always stay the same", "Drop to zero"], explain: "Under supply and demand, higher demand with fixed supply creates relative scarcity, raising the equilibrium price." },
      },
      {
        ar: { q: "ما المقصود بالعائد على الاستثمار (ROI)؟", options: ["نسبة صافي الربح إلى تكلفة الاستثمار", "إجمالي المبيعات السنوية", "عدد الموظفين إلى عدد العملاء", "قيمة الأصول الثابتة"], explain: "ROI = (صافي الربح ÷ تكلفة الاستثمار) × 100%، ويُستخدم لمقارنة جدوى الاستثمارات المختلفة." },
        en: { q: "What is Return on Investment (ROI)?", options: ["Net profit relative to the investment cost", "Total annual sales", "Employees per customer", "The value of fixed assets"], explain: "ROI = (net profit ÷ investment cost) × 100%, used to compare how worthwhile different investments are." },
      },
      {
        ar: { q: "ما المقصود بتكلفة الفرصة البديلة (Opportunity Cost)؟", options: ["قيمة أفضل بديل تم التخلّي عنه عند اتخاذ قرار", "التكلفة الإجمالية لإنتاج سلعة", "الضريبة المفروضة على الأرباح", "تكلفة الإعلان عن منتج جديد"], explain: "مثلًا: إذا قضيت المساء في الدراسة بدل عمل جزئي، فتكلفة الفرصة البديلة هي الأجر الذي كنت ستكسبه." },
        en: { q: "What is opportunity cost?", options: ["The value of the best alternative given up when making a choice", "The total cost of producing a good", "The tax on profits", "The cost of advertising a new product"], explain: "E.g., if you spend the evening studying instead of working a part-time shift, the opportunity cost is the wage you would have earned." },
      },
    ],
  },

  /* ───────────────────────────── المحاسبة ───────────────────────────── */
  {
    id: "accounting",
    icon: "🧮",
    name: { ar: "المحاسبة", en: "Accounting" },
    aliases: [
      "المحاسبة", "محاسبة", "محاسب", "تدقيق", "مالية", "علوم مالية ومصرفية", "مصارف", "تمويل",
      "accounting", "accountant", "acc", "finance", "banking", "auditing", "cpa", "acca", "financial"
    ],
    questions: [
      {
        ar: { q: "ما معادلة المحاسبة الأساسية؟", options: ["الأصول = الخصوم + حقوق الملكية", "الأصول = الخصوم − حقوق الملكية", "الإيرادات = الأصول + المصروفات", "حقوق الملكية = الأصول + الخصوم"], explain: "كل ما تملكه المنشأة (الأصول) مموَّل إما من الغير (الخصوم) أو من المالكين (حقوق الملكية)، ويجب أن تبقى المعادلة متوازنة دائمًا." },
        en: { q: "What is the basic accounting equation?", options: ["Assets = Liabilities + Equity", "Assets = Liabilities − Equity", "Revenue = Assets + Expenses", "Equity = Assets + Liabilities"], explain: "Everything a business owns (assets) is financed either by others (liabilities) or by its owners (equity), and the equation must always balance." },
      },
      {
        ar: { q: "في نظام القيد المزدوج، يجب أن يساوي مجموعُ المدين:", options: ["مجموعَ الدائن", "مجموعَ الأصول", "صافيَ الربح", "الصفر"], explain: "كل عملية تُسجَّل في حسابين على الأقل، طرف مدين وطرف دائن بالقيمة نفسها، ولذلك يتوازن ميزان المراجعة." },
        en: { q: "In double-entry bookkeeping, total debits must equal:", options: ["Total credits", "Total assets", "Net income", "Zero"], explain: "Every transaction is recorded in at least two accounts with equal debit and credit amounts, which is why the trial balance balances." },
      },
      {
        ar: { q: "أي قائمة مالية تعرض الإيرادات والمصروفات وصافي الربح خلال فترة زمنية؟", options: ["قائمة الدخل", "الميزانية العمومية (قائمة المركز المالي)", "قائمة التدفقات النقدية", "قائمة التغيرات في حقوق الملكية"], explain: "قائمة الدخل تغطي فترة (شهر أو سنة)، بينما الميزانية العمومية تعرض الأصول والخصوم وحقوق الملكية في لحظة زمنية محددة." },
        en: { q: "Which financial statement shows revenues, expenses and net profit over a period?", options: ["Income statement", "Balance sheet (statement of financial position)", "Cash flow statement", "Statement of changes in equity"], explain: "The income statement covers a period (month, year), while the balance sheet shows assets, liabilities and equity at a single point in time." },
      },
      {
        ar: { q: "ما المقصود بالإهلاك (Depreciation)؟", options: ["توزيع تكلفة الأصل الثابت على عمره الإنتاجي", "زيادة قيمة الأصل مع الزمن", "دفع ثمن الأصل نقدًا", "ضريبة على أرباح الشركة"], explain: "مثلًا: آلة تكلفتها 10,000 وعمرها 5 سنوات بلا قيمة متبقية، فيكون إهلاكها السنوي 2,000 بطريقة القسط الثابت." },
        en: { q: "What is depreciation?", options: ["Allocating a fixed asset's cost over its useful life", "An asset's value increasing over time", "Paying for an asset in cash", "A tax on company profits"], explain: "E.g., a 10,000 machine with a 5-year life and no salvage value gives 2,000 depreciation per year (straight-line)." },
      },
      {
        ar: { q: "أيٌّ مما يلي يُعدّ من الأصول المتداولة؟", options: ["الذمم المدينة (حسابات القبض)", "المباني", "الأراضي", "القروض طويلة الأجل"], explain: "الأصول المتداولة يُتوقع تحويلها إلى نقد خلال سنة، مثل النقدية والمخزون والذمم المدينة. أما القروض طويلة الأجل فهي خصوم." },
        en: { q: "Which of the following is a current asset?", options: ["Accounts receivable", "Buildings", "Land", "Long-term loans"], explain: "Current assets are expected to turn into cash within a year — cash, inventory, receivables. Long-term loans are liabilities." },
      },
      {
        ar: { q: "وفق أساس الاستحقاق (Accrual Basis)، متى يُعترف بالإيراد؟", options: ["عند اكتسابه بغضّ النظر عن وقت التحصيل", "فقط عند استلام النقد", "في نهاية السنة المالية دائمًا", "عند توقيع العقد فقط"], explain: "أساس الاستحقاق يسجّل الإيرادات عند تحققها والمصروفات عند تكبّدها، وليس عند حركة النقد كما في الأساس النقدي." },
        en: { q: "Under the accrual basis, when is revenue recognized?", options: ["When it is earned, regardless of when cash is collected", "Only when cash is received", "Always at the end of the fiscal year", "Only when the contract is signed"], explain: "Accrual accounting records revenue when earned and expenses when incurred, not when cash moves as in the cash basis." },
      },
      {
        ar: { q: "ماذا يعني الاختصار IFRS؟", options: ["International Financial Reporting Standards", "Internal Finance Review System", "International Fund Regulation Service", "Integrated Financial Records Software"], explain: "أي «المعايير الدولية لإعداد التقارير المالية» الصادرة عن مجلس معايير المحاسبة الدولية (IASB)، وتُطبَّق في أغلب دول العالم." },
        en: { q: "What does IFRS stand for?", options: ["International Financial Reporting Standards", "Internal Finance Review System", "International Fund Regulation Service", "Integrated Financial Records Software"], explain: "IFRS are the international accounting standards issued by the IASB and used in most countries worldwide." },
      },
      {
        ar: { q: "عند زيادة حساب أصل (مثل النقدية)، يُسجَّل المبلغ في الجانب:", options: ["المدين", "الدائن", "المدين والدائن معًا", "لا يُسجَّل"], explain: "الأصول والمصروفات تزيد بالمدين، بينما الخصوم وحقوق الملكية والإيرادات تزيد بالدائن." },
        en: { q: "When an asset account (e.g., cash) increases, the amount is recorded as a:", options: ["Debit", "Credit", "Both debit and credit", "It isn't recorded"], explain: "Assets and expenses increase with debits; liabilities, equity and revenues increase with credits." },
      },
      {
        ar: { q: "مجمل الربح (Gross Profit) يساوي:", options: ["صافي المبيعات − تكلفة البضاعة المباعة", "الإيرادات − جميع المصروفات", "الأصول − الخصوم", "النقد الداخل − النقد الخارج"], explain: "مجمل الربح يقيس الربح من النشاط الأساسي قبل المصروفات التشغيلية والضرائب. أما الإيرادات ناقص جميع المصروفات فهو صافي الربح." },
        en: { q: "Gross profit equals:", options: ["Net sales − cost of goods sold", "Revenue − all expenses", "Assets − liabilities", "Cash in − cash out"], explain: "Gross profit is profit from the core activity before operating expenses and taxes. Revenue minus all expenses is net profit." },
      },
      {
        ar: { q: "الذمم الدائنة (حسابات الدفع) تمثّل:", options: ["مبالغ مستحقة على المنشأة للموردين", "مبالغ مستحقة للمنشأة على العملاء", "أرباحًا محتجزة", "أصولًا ثابتة"], explain: "الذمم الدائنة (Accounts Payable) التزامات قصيرة الأجل، أما المبالغ المستحقة على العملاء فهي ذمم مدينة (Accounts Receivable)." },
        en: { q: "Accounts payable represent:", options: ["Amounts the business owes its suppliers", "Amounts customers owe the business", "Retained earnings", "Fixed assets"], explain: "Accounts payable are short-term liabilities; amounts customers owe are accounts receivable." },
      },
    ],
  },

  /* ───────────────────────────── القانون ───────────────────────────── */
  {
    id: "law",
    icon: "⚖️",
    name: { ar: "القانون", en: "Law" },
    aliases: [
      "القانون", "قانون", "الحقوق", "حقوق", "محاماة", "محامي", "الشريعة والقانون", "شريعة وقانون",
      "law", "laws", "legal", "llb", "lawyer", "jurisprudence", "legal studies"
    ],
    questions: [
      {
        ar: { q: "ما اسم المبدأ القائل «المتهم بريء حتى تثبت إدانته»؟", options: ["قرينة البراءة", "عدم جواز المحاكمة مرتين", "التقادم", "الإثراء بلا سبب"], explain: "قرينة البراءة مبدأ أساسي في القانون الجنائي، ومكرّس في المادة 11 من الإعلان العالمي لحقوق الإنسان، فعبء إثبات الإدانة يقع على الادعاء." },
        en: { q: "What is the principle 'the accused is innocent until proven guilty' called?", options: ["Presumption of innocence", "Double jeopardy", "Statute of limitations", "Unjust enrichment"], explain: "A cornerstone of criminal law, enshrined in Article 11 of the Universal Declaration of Human Rights; the prosecution bears the burden of proving guilt." },
      },
      {
        ar: { q: "مبدأ الفصل بين السلطات يقسّم سلطات الدولة إلى:", options: ["تشريعية وتنفيذية وقضائية", "مركزية ومحلية وبلدية", "عسكرية ومدنية ودينية", "اقتصادية وسياسية واجتماعية"], explain: "التشريعية تسنّ القوانين، والتنفيذية تنفّذها، والقضائية تفصل في النزاعات، ويهدف الفصل بينها إلى منع الاستبداد." },
        en: { q: "The separation of powers divides state authority into:", options: ["Legislative, executive and judicial", "Central, local and municipal", "Military, civil and religious", "Economic, political and social"], explain: "The legislature makes laws, the executive enforces them and the judiciary settles disputes — separating them prevents tyranny." },
      },
      {
        ar: { q: "مَن المفكّر الذي اشتهر بنظرية الفصل بين السلطات في كتابه «روح القوانين»؟", options: ["مونتسكيو", "ميكافيلي", "كارل ماركس", "آدم سميث"], explain: "نشر الفيلسوف الفرنسي مونتسكيو «روح القوانين» عام 1748، وأثّر في دساتير كثيرة منها الدستور الأمريكي." },
        en: { q: "Which thinker is famous for the separation-of-powers theory in 'The Spirit of the Laws'?", options: ["Montesquieu", "Machiavelli", "Karl Marx", "Adam Smith"], explain: "French philosopher Montesquieu published it in 1748, influencing many constitutions, including the U.S. Constitution." },
      },
      {
        ar: { q: "ينعقد العقد بشكل عام بتلاقي الإيجاب مع:", options: ["القبول", "الرفض", "النشر", "الاستئناف"], explain: "الإيجاب هو العرض الذي يقدّمه أحد الطرفين، والقبول موافقة الطرف الآخر عليه؛ وبتطابقهما يتحقق التراضي وهو ركن العقد." },
        en: { q: "A contract is generally formed when an offer meets:", options: ["Acceptance", "Rejection", "Publication", "Appeal"], explain: "The offer is one party's proposal and acceptance is the other's agreement; when they match, mutual consent — a core element of a contract — exists." },
      },
      {
        ar: { q: "ما القانون الأسمى في الدولة الذي يقع في قمة الهرم التشريعي؟", options: ["الدستور", "اللائحة التنفيذية", "القرار الإداري", "العقد"], explain: "الدستور يحدد شكل الدولة وسلطاتها وحقوق الأفراد، ولا يجوز لأي قانون أو لائحة أن يخالفه (مبدأ سمو الدستور)." },
        en: { q: "What is the supreme law of the state, at the top of the legal hierarchy?", options: ["The constitution", "Executive regulations", "An administrative decision", "A contract"], explain: "The constitution defines the state, its powers and individual rights; no law or regulation may contradict it (constitutional supremacy)." },
      },
      {
        ar: { q: "مبدأ «لا جريمة ولا عقوبة إلا بنص» يُعرف بـ:", options: ["مبدأ الشرعية الجنائية", "مبدأ حسن النية", "مبدأ سلطان الإرادة", "مبدأ سيادة الدولة"], explain: "لا يجوز تجريم فعل أو فرض عقوبة إلا بناءً على قانون صادر قبل ارتكاب الفعل، ومن نتائجه عدم رجعية القوانين الجنائية إلا الأصلح للمتهم." },
        en: { q: "The principle 'no crime and no punishment without law' is known as:", options: ["The principle of legality", "The principle of good faith", "Freedom of contract", "State sovereignty"], explain: "An act can only be criminalized or punished under a law that existed before it was committed; hence criminal laws aren't retroactive, except when more favorable to the accused." },
      },
      {
        ar: { q: "أين يقع مقر محكمة العدل الدولية؟", options: ["لاهاي – هولندا", "جنيف – سويسرا", "نيويورك – الولايات المتحدة", "باريس – فرنسا"], explain: "محكمة العدل الدولية هي الجهاز القضائي الرئيسي للأمم المتحدة، ومقرها قصر السلام في لاهاي، وتفصل في النزاعات بين الدول." },
        en: { q: "Where is the International Court of Justice based?", options: ["The Hague, Netherlands", "Geneva, Switzerland", "New York, USA", "Paris, France"], explain: "The ICJ, the UN's principal judicial organ, sits in the Peace Palace in The Hague and settles disputes between states." },
      },
      {
        ar: { q: "في أي عام اعتمدت الجمعية العامة للأمم المتحدة الإعلان العالمي لحقوق الإنسان؟", options: ["1948", "1919", "1965", "1989"], explain: "اعتُمد في 10 ديسمبر 1948 في باريس، ولذلك يُحتفل بيوم حقوق الإنسان في 10 ديسمبر من كل عام." },
        en: { q: "In which year did the UN General Assembly adopt the Universal Declaration of Human Rights?", options: ["1948", "1919", "1965", "1989"], explain: "It was adopted on 10 December 1948 in Paris, which is why Human Rights Day is marked every 10 December." },
      },
      {
        ar: { q: "في الدعوى المدنية، ما اسم الطرف الذي يرفع الدعوى؟", options: ["المدّعي", "المدّعى عليه", "الشاهد", "القاضي"], explain: "المدّعي يطالب بحق أمام القضاء، والمدّعى عليه هو من تُرفع الدعوى ضده." },
        en: { q: "In a civil lawsuit, what is the party who files the case called?", options: ["Plaintiff", "Defendant", "Witness", "Judge"], explain: "The plaintiff claims a right before the court; the defendant is the party being sued." },
      },
      {
        ar: { q: "وفق القاعدة العامة في الإثبات، على مَن يقع عبء الإثبات؟", options: ["على مَن يدّعي الحق (المدّعي)", "على المدّعى عليه دائمًا", "على القاضي", "على الشهود"], explain: "تلخّصها القاعدة الشهيرة «البيّنة على من ادّعى واليمين على من أنكر»، فمن يطالب بحق عليه أن يثبته." },
        en: { q: "Under the general rule of evidence, who bears the burden of proof?", options: ["The party making the claim (the claimant)", "Always the defendant", "The judge", "The witnesses"], explain: "As the classic maxim puts it, proof is upon the one who claims — whoever asserts a right must prove it." },
      },
    ],
  },

  /* ───────────────────────────── التربية ───────────────────────────── */
  {
    id: "education",
    icon: "📚",
    name: { ar: "التربية", en: "Education" },
    aliases: [
      "التربية", "تربية", "تعليم", "علوم تربوية", "تربية خاصة", "معلم", "معلمة", "مدرس",
      "معلم صف", "تعليم ابتدائي", "رياض أطفال", "طفولة مبكرة", "تربية رياضية", "تربية بدنية",
      "education", "teaching", "teacher", "pedagogy", "special education",
      "early childhood education", "kindergarten", "educational sciences", "physical education"
    ],
    questions: [
      {
        ar: { q: "تصنيف بلوم (Bloom's Taxonomy) هو تصنيف لـ:", options: ["الأهداف التعليمية ومستويات التفكير", "أنواع المدارس", "الوسائل التعليمية", "السلوكيات الصفية"], explain: "وضعه بنجامين بلوم وزملاؤه عام 1956 لترتيب الأهداف المعرفية من التذكّر البسيط إلى مهارات التفكير العليا." },
        en: { q: "Bloom's Taxonomy is a classification of:", options: ["Learning objectives and levels of thinking", "Types of schools", "Teaching aids", "Classroom behaviors"], explain: "Benjamin Bloom and colleagues created it in 1956 to order cognitive objectives from simple recall to higher-order thinking." },
      },
      {
        ar: { q: "ما أعلى مستوى في تصنيف بلوم المعدّل (2001)؟", options: ["الإبداع (Create)", "التذكّر (Remember)", "الفهم (Understand)", "التطبيق (Apply)"], explain: "الترتيب المعدّل: تذكّر، فهم، تطبيق، تحليل، تقويم، ثم الإبداع في القمة." },
        en: { q: "What is the highest level of the revised Bloom's Taxonomy (2001)?", options: ["Create", "Remember", "Understand", "Apply"], explain: "Revised order: Remember, Understand, Apply, Analyze, Evaluate, and Create at the top." },
      },
      {
        ar: { q: "نظرية جان بياجيه مشهورة في مجال:", options: ["مراحل النمو المعرفي عند الأطفال", "الذكاءات المتعددة", "هرم الحاجات", "الإشراط الإجرائي"], explain: "حدّد بياجيه أربع مراحل: الحسية الحركية، ما قبل العمليات، العمليات المادية، العمليات المجردة. الذكاءات المتعددة لغاردنر، وهرم الحاجات لماسلو، والإشراط الإجرائي لسكنر." },
        en: { q: "Jean Piaget's theory is famous for describing:", options: ["Children's stages of cognitive development", "Multiple intelligences", "The hierarchy of needs", "Operant conditioning"], explain: "Piaget defined four stages: sensorimotor, preoperational, concrete operational and formal operational. Multiple intelligences is Gardner, needs is Maslow, operant conditioning is Skinner." },
      },
      {
        ar: { q: "مَن صاحب نظرية الذكاءات المتعددة؟", options: ["هوارد غاردنر", "جان بياجيه", "ليف فيغوتسكي", "بي. إف. سكنر"], explain: "طرحها غاردنر عام 1983 في كتابه «أُطر العقل»، مؤكدًا أن الذكاء ليس قدرة واحدة بل أنواع متعددة كاللغوي والمنطقي والموسيقي وغيرها." },
        en: { q: "Who proposed the theory of multiple intelligences?", options: ["Howard Gardner", "Jean Piaget", "Lev Vygotsky", "B. F. Skinner"], explain: "Gardner proposed it in 1983 in 'Frames of Mind', arguing intelligence isn't one ability but many — linguistic, logical, musical and more." },
      },
      {
        ar: { q: "مفهوم «منطقة النمو القريبة» (ZPD) يرتبط بالعالِم:", options: ["ليف فيغوتسكي", "جون ديوي", "ماريا مونتيسوري", "إيفان بافلوف"], explain: "هي المسافة بين ما يستطيع المتعلم فعله وحده وما يستطيعه بمساعدة معلم أو زميل أكثر خبرة، ومنها جاءت فكرة «السقالات التعليمية»." },
        en: { q: "The concept of the 'Zone of Proximal Development' (ZPD) is associated with:", options: ["Lev Vygotsky", "John Dewey", "Maria Montessori", "Ivan Pavlov"], explain: "It's the gap between what a learner can do alone and with help from a teacher or more capable peer — the basis of 'scaffolding'." },
      },
      {
        ar: { q: "التقويم الذي يتم أثناء عملية التعلّم بهدف تقديم تغذية راجعة وتحسين التعلّم يسمّى:", options: ["التقويم التكويني (Formative)", "التقويم الختامي (Summative)", "الاختبار المعياري", "الامتحان النهائي"], explain: "التقويم التكويني مستمر (أسئلة صفية، مهام قصيرة) لتعديل التدريس، أما الختامي فيكون في نهاية الوحدة أو الفصل للحكم على التحصيل." },
        en: { q: "Assessment carried out during learning to give feedback and improve learning is called:", options: ["Formative assessment", "Summative assessment", "Standardized testing", "The final exam"], explain: "Formative assessment is ongoing (class questions, short tasks) to adjust teaching; summative comes at the end of a unit or term to judge achievement." },
      },
      {
        ar: { q: "نظرية الإشراط الإجرائي (التعزيز والعقاب) ترتبط بـ:", options: ["بي. إف. سكنر", "جان بياجيه", "هوارد غاردنر", "بنجامين بلوم"], explain: "أوضح سكنر أن السلوك المتبوع بتعزيز يميل إلى التكرار، والمتبوع بعقاب يميل إلى التراجع، وهي أساس كثير من أساليب إدارة الصف." },
        en: { q: "Operant conditioning (reinforcement and punishment) is associated with:", options: ["B. F. Skinner", "Jean Piaget", "Howard Gardner", "Benjamin Bloom"], explain: "Skinner showed that behavior followed by reinforcement tends to repeat and behavior followed by punishment tends to decrease — the basis of many classroom-management methods." },
      },
      {
        ar: { q: "مَن المربّي الأمريكي المرتبط بفكرة «التعلّم بالعمل» (Learning by Doing)؟", options: ["جون ديوي", "سيغموند فرويد", "تشارلز داروين", "إيفان بافلوف"], explain: "جون ديوي رائد التربية التقدمية، ودعا إلى أن يتعلّم الطالب من خلال التجربة والنشاط وحل المشكلات الحقيقية." },
        en: { q: "Which American educator is associated with 'learning by doing'?", options: ["John Dewey", "Sigmund Freud", "Charles Darwin", "Ivan Pavlov"], explain: "John Dewey, a pioneer of progressive education, argued that students learn through experience, activity and solving real problems." },
      },
      {
        ar: { q: "ما المقصود بالتعزيز الإيجابي؟", options: ["إضافة مثير محبّب بعد السلوك المرغوب لزيادة تكراره", "إزالة مثير محبّب لتقليل السلوك", "إضافة مثير مزعج بعد السلوك", "تجاهل جميع السلوكيات"], explain: "مثل مدح الطالب أو منحه نجمة بعد إجابة متميزة. وكلمة «إيجابي» هنا تعني إضافة شيء، وليس بالضرورة «جيدًا»." },
        en: { q: "What is positive reinforcement?", options: ["Adding a pleasant stimulus after a desired behavior to increase it", "Removing a pleasant stimulus to reduce a behavior", "Adding an unpleasant stimulus after a behavior", "Ignoring all behaviors"], explain: "E.g., praising a student or giving a star after a great answer. 'Positive' means adding something, not necessarily 'good'." },
      },
      {
        ar: { q: "أي عنصر في خطة الدرس يحدّد ما يجب أن يكون الطالب قادرًا على فعله في نهاية الحصة؟", options: ["الأهداف التعليمية (السلوكية)", "الوسائل التعليمية", "الواجب المنزلي", "التمهيد"], explain: "الأهداف الجيدة محددة وقابلة للقياس (مثل: «أن يحلّ الطالب معادلة من الدرجة الأولى»)، وتوجّه اختيار الأنشطة وأساليب التقويم." },
        en: { q: "Which part of a lesson plan states what students should be able to do by the end of the lesson?", options: ["Learning objectives", "Teaching aids", "Homework", "Warm-up"], explain: "Good objectives are specific and measurable (e.g., 'students will solve a linear equation') and guide the choice of activities and assessment." },
      },
    ],
  },

  /* ───────────────────────────── اللغة الإنجليزية ───────────────────────────── */
  {
    id: "english",
    icon: "🔤",
    name: { ar: "اللغة الإنجليزية", en: "English Language" },
    aliases: [
      "اللغة الإنجليزية", "لغة إنجليزية", "إنجليزي", "انكليزي", "انقليزي", "انجلش", "انقلش",
      "الأدب الإنجليزي", "أدب إنجليزي", "ترجمة", "لغويات", "لسانيات",
      "english", "english language", "english literature", "literature", "linguistics",
      "translation", "tefl", "tesol", "applied linguistics"
    ],
    questions: [
      {
        ar: { q: "ما التصريف الثالث (Past Participle) للفعل write؟", options: ["written", "wrote", "writed", "writing"], explain: "write فعل شاذ: write – wrote – written. مثال: I have written a letter." },
        en: { q: "What is the past participle of 'write'?", options: ["written", "wrote", "writed", "writing"], explain: "'Write' is irregular: write – wrote – written. E.g., 'I have written a letter.'" },
      },
      {
        ar: { q: "مَن مؤلف مسرحية «روميو وجولييت» (Romeo and Juliet)؟", options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"], explain: "كتبها شكسبير في تسعينيات القرن السادس عشر، وهي من أشهر تراجيدياته إلى جانب Hamlet وMacbeth." },
        en: { q: "Who wrote 'Romeo and Juliet'?", options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"], explain: "Shakespeare wrote it in the 1590s; it's among his most famous tragedies, alongside Hamlet and Macbeth." },
      },
      {
        ar: { q: "ما جمع كلمة child؟", options: ["children", "childs", "childes", "childrens"], explain: "child من الأسماء ذات الجمع الشاذ، مثل: man → men و tooth → teeth و mouse → mice." },
        en: { q: "What is the plural of 'child'?", options: ["children", "childs", "childes", "childrens"], explain: "'Child' has an irregular plural, like man → men, tooth → teeth and mouse → mice." },
      },
      {
        ar: { q: "اختر الجملة الصحيحة نحويًا:", options: ["She doesn't like coffee.", "She don't like coffee.", "She not like coffee.", "She doesn't likes coffee."], explain: "مع he/she/it في المضارع البسيط المنفي نستخدم doesn't، ويأتي بعدها الفعل في صورته الأساسية بدون s." },
        en: { q: "Choose the grammatically correct sentence:", options: ["She doesn't like coffee.", "She don't like coffee.", "She not like coffee.", "She doesn't likes coffee."], explain: "With he/she/it in the negative present simple we use 'doesn't' followed by the base verb, without -s." },
      },
      {
        ar: { q: "ما زمن الجملة: I have finished my homework؟", options: ["Present Perfect", "Past Simple", "Past Perfect", "Present Continuous"], explain: "التركيب have/has + Past Participle هو المضارع التام، ويُستخدم لحدث اكتمل وله أثر في الحاضر." },
        en: { q: "What tense is 'I have finished my homework'?", options: ["Present Perfect", "Past Simple", "Past Perfect", "Present Continuous"], explain: "have/has + past participle is the present perfect, used for a completed action that's relevant now." },
      },
      {
        ar: { q: "ما صيغة المبني للمجهول للجملة: The chef cooked the meal؟", options: ["The meal was cooked by the chef.", "The meal is cooked by the chef.", "The chef was cooked by the meal.", "The meal has cooking by the chef."], explain: "الجملة في الماضي البسيط، فيصبح المبني للمجهول: was/were + Past Participle، ويتحوّل المفعول به إلى فاعل." },
        en: { q: "What is the passive form of 'The chef cooked the meal'?", options: ["The meal was cooked by the chef.", "The meal is cooked by the chef.", "The chef was cooked by the meal.", "The meal has cooking by the chef."], explain: "The sentence is past simple, so the passive is was/were + past participle, with the object becoming the subject." },
      },
      {
        ar: { q: "مَن مؤلفة رواية «كبرياء وتحامل» (Pride and Prejudice)؟", options: ["Jane Austen", "Charlotte Brontë", "Virginia Woolf", "Mary Shelley"], explain: "نُشرت عام 1813 وهي من أشهر روايات الأدب الإنجليزي. أما Charlotte Brontë فكتبت Jane Eyre، وMary Shelley كتبت Frankenstein." },
        en: { q: "Who wrote the novel 'Pride and Prejudice'?", options: ["Jane Austen", "Charlotte Brontë", "Virginia Woolf", "Mary Shelley"], explain: "Published in 1813, it's one of the most famous English novels. Charlotte Brontë wrote 'Jane Eyre'; Mary Shelley wrote 'Frankenstein'." },
      },
      {
        ar: { q: "ما نوع الأسلوب البلاغي في عبارة: Time is a thief؟", options: ["Metaphor", "Simile", "Alliteration", "Onomatopoeia"], explain: "الاستعارة (Metaphor) تشبيه مباشر دون أداة، أما التشبيه (Simile) فيستخدم like أو as، مثل: Time is like a thief." },
        en: { q: "What figure of speech is 'Time is a thief'?", options: ["Metaphor", "Simile", "Alliteration", "Onomatopoeia"], explain: "A metaphor is a direct comparison without 'like' or 'as'; a simile uses them, e.g., 'Time is like a thief'." },
      },
      {
        ar: { q: "ما الصفة (Adjective) في الجملة: She bought a beautiful dress؟", options: ["beautiful", "bought", "dress", "She"], explain: "الصفة تصف الاسم، وهنا beautiful تصف الاسم dress. أما bought ففعل، وShe ضمير." },
        en: { q: "Which word is the adjective in 'She bought a beautiful dress'?", options: ["beautiful", "bought", "dress", "She"], explain: "An adjective describes a noun — here 'beautiful' describes 'dress'. 'Bought' is a verb and 'She' is a pronoun." },
      },
      {
        ar: { q: "أيٌّ من الكلمات التالية أداة ربط (Conjunction)؟", options: ["because", "quickly", "beautiful", "table"], explain: "أدوات الربط تصل الجمل أو الكلمات، مثل: and وbut وbecause وalthough. أما quickly فظرف، وbeautiful صفة، وtable اسم." },
        en: { q: "Which of these words is a conjunction?", options: ["because", "quickly", "beautiful", "table"], explain: "Conjunctions join clauses or words: and, but, because, although. 'Quickly' is an adverb, 'beautiful' an adjective and 'table' a noun." },
      },
    ],
  },

  /* ───────────────────────────── اللغة العربية ───────────────────────────── */
  {
    id: "arabic",
    icon: "🖋️",
    name: { ar: "اللغة العربية", en: "Arabic Language" },
    aliases: [
      "اللغة العربية", "لغة عربية", "عربي", "العربية", "الأدب العربي", "أدب عربي",
      "آداب عربية", "اللغة العربية وآدابها", "نحو",
      "arabic", "arabic language", "arabic literature"
    ],
    questions: [
      {
        ar: { q: "ما الحكم الإعرابي للفاعل؟", options: ["مرفوع", "منصوب", "مجرور", "مجزوم"], explain: "الفاعل مرفوع دائمًا، مثل: «نجحَ الطالبُ». أما الجزم فخاص بالفعل المضارع ولا يدخل الأسماء." },
        en: { q: "In Arabic grammar, what case is the subject of a verb (al-fāʿil) in?", options: ["Nominative (marfūʿ)", "Accusative (manṣūb)", "Genitive (majrūr)", "Jussive (majzūm)"], explain: "The fāʿil is always nominative, e.g., «نجحَ الطالبُ». The jussive applies only to present-tense verbs, never to nouns." },
      },
      {
        ar: { q: "ما عمل «كان وأخواتها» في الجملة الاسمية؟", options: ["ترفع المبتدأ وتنصب الخبر", "تنصب المبتدأ وترفع الخبر", "ترفع المبتدأ والخبر معًا", "تجرّ المبتدأ والخبر"], explain: "مثل: «كانَ الجوُّ جميلًا». أما «إنّ وأخواتها» فعكسها: تنصب المبتدأ وترفع الخبر." },
        en: { q: "What do «kāna and its sisters» do in a nominal sentence?", options: ["Make the subject nominative and the predicate accusative", "Make the subject accusative and the predicate nominative", "Keep both nominative", "Make both genitive"], explain: "E.g., «كانَ الجوُّ جميلًا». «Inna and its sisters» do the opposite: subject accusative, predicate nominative." },
      },
      {
        ar: { q: "مَن صاحب المعلّقة التي مطلعها «قِفا نبكِ من ذكرى حبيبٍ ومنزلِ»؟", options: ["امرؤ القيس", "عنترة بن شداد", "المتنبي", "أحمد شوقي"], explain: "امرؤ القيس شاعر جاهلي لُقّب بـ«الملك الضِّلّيل»، ومعلّقته من أشهر قصائد الشعر العربي." },
        en: { q: "Who composed the Muʿallaqa that opens «قِفا نبكِ من ذكرى حبيبٍ ومنزلِ» ('Halt, let us weep...')?", options: ["Imru' al-Qais", "Antarah ibn Shaddad", "Al-Mutanabbi", "Ahmed Shawqi"], explain: "Imru' al-Qais, a pre-Islamic poet nicknamed 'the Wandering King'; his Muʿallaqa is among the most famous Arabic poems." },
      },
      {
        ar: { q: "مَن الشاعر الملقّب بـ«أمير الشعراء»؟", options: ["أحمد شوقي", "حافظ إبراهيم", "المتنبي", "نزار قباني"], explain: "بويع أحمد شوقي أميرًا للشعراء عام 1927، أما حافظ إبراهيم فلُقّب بـ«شاعر النيل»." },
        en: { q: "Which poet is known as the 'Prince of Poets' (Amīr al-Shuʿarāʾ)?", options: ["Ahmed Shawqi", "Hafez Ibrahim", "Al-Mutanabbi", "Nizar Qabbani"], explain: "Ahmed Shawqi was proclaimed Prince of Poets in 1927. Hafez Ibrahim was called 'the Poet of the Nile'." },
      },
      {
        ar: { q: "مَن واضع علم العروض (أوزان الشعر العربي)؟", options: ["الخليل بن أحمد الفراهيدي", "سيبويه", "ابن مالك", "الجاحظ"], explain: "وضع الخليل خمسة عشر بحرًا، ثم استدرك الأخفش بحر المتدارك فصارت البحور ستة عشر." },
        en: { q: "Who founded ʿArūḍ, the science of Arabic poetic meters?", options: ["Al-Khalil ibn Ahmad al-Farahidi", "Sibawayh", "Ibn Malik", "Al-Jahiz"], explain: "Al-Khalil defined fifteen meters; al-Akhfash later added al-Mutadārak, making sixteen." },
      },
      {
        ar: { q: "مَن مؤلف «الكتاب»، أقدم ما وصلنا من كتب النحو العربي الشاملة؟", options: ["سيبويه", "الجاحظ", "ابن خلدون", "ابن منظور"], explain: "سيبويه تلميذ الخليل بن أحمد، ولمكانة كتابه لُقّب بـ«قرآن النحو»." },
        en: { q: "Who wrote 'Al-Kitāb', the oldest surviving comprehensive book of Arabic grammar?", options: ["Sibawayh", "Al-Jahiz", "Ibn Khaldun", "Ibn Manzur"], explain: "Sibawayh, a student of al-Khalil; his book is so central it was nicknamed 'the Qur'an of grammar'." },
      },
      {
        ar: { q: "ما علامة نصب جمع المذكر السالم؟", options: ["الياء", "الفتحة", "الواو", "الألف"], explain: "يُرفع جمع المذكر السالم بالواو، ويُنصب ويُجرّ بالياء، مثل: «رأيتُ المعلّمين»." },
        en: { q: "What marks the accusative case of the Arabic sound masculine plural?", options: ["The letter yāʾ (ي)", "Fatḥa", "The letter wāw (و)", "The letter alif (ا)"], explain: "It takes wāw in the nominative and yāʾ in the accusative and genitive, e.g., «رأيتُ المعلّمين»." },
      },
      {
        ar: { q: "عند دخول «لم» على الفعل المضارع فإنها:", options: ["تجزمه", "تنصبه", "ترفعه", "تجرّه"], explain: "«لم» حرف نفي وجزم وقلب: تجزم المضارع وتقلب زمنه إلى الماضي، مثل: «لم يكتبْ». والجرّ خاص بالأسماء." },
        en: { q: "When «lam» (لم) precedes a present-tense verb, it puts the verb in the:", options: ["Jussive (jazm)", "Subjunctive (naṣb)", "Indicative (rafʿ)", "Genitive (jarr)"], explain: "«Lam» negates, makes the verb jussive and shifts its meaning to the past, e.g., «لم يكتبْ». The genitive applies only to nouns." },
      },
      {
        ar: { q: "مَن مؤلف معجم «لسان العرب»؟", options: ["ابن منظور", "الفيروزآبادي", "الجوهري", "الخليل بن أحمد"], explain: "جمعه ابن منظور في أواخر القرن السابع الهجري. أما الفيروزآبادي فصاحب «القاموس المحيط»، والجوهري صاحب «الصحاح»، والخليل صاحب «العين»." },
        en: { q: "Who compiled the dictionary 'Lisān al-ʿArab'?", options: ["Ibn Manzur", "Al-Fairuzabadi", "Al-Jawhari", "Al-Khalil ibn Ahmad"], explain: "Ibn Manzur compiled it in the late 13th century CE. Al-Fairuzabadi wrote 'Al-Qāmūs al-Muḥīṭ', al-Jawhari 'Al-Ṣiḥāḥ' and al-Khalil 'Al-ʿAyn'." },
      },
      {
        ar: { q: "مَن قائل البيت: «الخيلُ والليلُ والبيداءُ تعرفني ... والسيفُ والرمحُ والقرطاسُ والقلمُ»؟", options: ["المتنبي", "أبو تمام", "البحتري", "أبو العلاء المعري"], explain: "أبو الطيب المتنبي من أعظم شعراء العربية، اشتهر بشعر الفخر والحكمة، وعاش في القرن الرابع الهجري." },
        en: { q: "Who wrote the verse «الخيلُ والليلُ والبيداءُ تعرفني» ('The horses, the night and the desert know me')?", options: ["Al-Mutanabbi", "Abu Tammam", "Al-Buhturi", "Abu al-Alaa al-Maarri"], explain: "Abu al-Tayyib al-Mutanabbi, one of the greatest Arab poets, famed for poems of pride and wisdom; he lived in the 10th century CE." },
      },
    ],
  },

  /* ───────────────────────────── علم النفس ───────────────────────────── */
  {
    id: "psychology",
    icon: "🧠",
    name: { ar: "علم النفس", en: "Psychology" },
    aliases: [
      "علم النفس", "علم نفس", "إرشاد نفسي", "الإرشاد النفسي", "علم نفس إكلينيكي", "طب نفسي", "صحة نفسية",
      "psychology", "psych", "psychologist", "counseling", "counselling", "clinical psychology",
      "mental health", "psychiatry"
    ],
    questions: [
      {
        ar: { q: "مَن مؤسس مدرسة التحليل النفسي؟", options: ["سيغموند فرويد", "إيفان بافلوف", "بي. إف. سكنر", "جان بياجيه"], explain: "طوّر فرويد التحليل النفسي أواخر القرن التاسع عشر، مركّزًا على اللاشعور والأحلام وخبرات الطفولة." },
        en: { q: "Who founded psychoanalysis?", options: ["Sigmund Freud", "Ivan Pavlov", "B. F. Skinner", "Jean Piaget"], explain: "Freud developed psychoanalysis in the late 19th century, focusing on the unconscious, dreams and childhood experiences." },
      },
      {
        ar: { q: "تجارب الإشراط الكلاسيكي الشهيرة على الكلاب (ربط مثير محايد بالطعام حتى يُسيل اللعاب) قام بها:", options: ["إيفان بافلوف", "سيغموند فرويد", "أبراهام ماسلو", "إريك إريكسون"], explain: "لاحظ بافلوف أن لعاب الكلاب صار يسيل عند سماع صوت اقترن سابقًا بالطعام، وهو مثال على التعلّم بالاقتران." },
        en: { q: "The famous classical-conditioning experiments on dogs (pairing a neutral stimulus with food until it triggered salivation) were done by:", options: ["Ivan Pavlov", "Sigmund Freud", "Abraham Maslow", "Erik Erikson"], explain: "Pavlov found dogs began salivating at a sound that had been paired with food — learning by association." },
      },
      {
        ar: { q: "ما المستوى الأدنى (القاعدة) في هرم ماسلو؟", options: ["الحاجات الفسيولوجية", "تحقيق الذات", "التقدير", "الانتماء والحب"], explain: "تشمل الطعام والماء والنوم؛ وحسب ماسلو تُلبّى الحاجات الأدنى عادةً قبل أن تصبح الحاجات الأعلى دافعًا رئيسيًا." },
        en: { q: "What is the base level of Maslow's hierarchy of needs?", options: ["Physiological needs", "Self-actualization", "Esteem", "Love and belonging"], explain: "Food, water and sleep; per Maslow, lower needs are usually met before higher ones become the main motivators." },
      },
      {
        ar: { q: "مَن أسّس أول مختبر لعلم النفس التجريبي في لايبزيغ عام 1879؟", options: ["فيلهلم فونت", "ويليام جيمس", "كارل يونغ", "ألفريد أدلر"], explain: "يُعدّ فونت «أبا علم النفس التجريبي»، ويُعتبر تأسيس مختبره بداية علم النفس علمًا مستقلًا عن الفلسفة." },
        en: { q: "Who founded the first experimental psychology laboratory, in Leipzig in 1879?", options: ["Wilhelm Wundt", "William James", "Carl Jung", "Alfred Adler"], explain: "Wundt is called the father of experimental psychology; his lab marks psychology's start as a science separate from philosophy." },
      },
      {
        ar: { q: "حسب فرويد، تتكوّن الشخصية من الهو (Id) والأنا (Ego) و:", options: ["الأنا الأعلى (Superego)", "الأنا البديلة (Alter Ego)", "القناع (Persona)", "تقدير الذات"], explain: "الهو يمثل الغرائز، والأنا الأعلى يمثل الضمير والقيم، والأنا يوازن بينهما وبين الواقع." },
        en: { q: "According to Freud, personality consists of the id, the ego and the:", options: ["Superego", "Alter ego", "Persona", "Self-esteem"], explain: "The id holds instincts, the superego holds conscience and values, and the ego balances them with reality." },
      },
      {
        ar: { q: "وفق الدراسة الشهيرة لجورج ميلر (1956)، كم عنصرًا تقريبًا تستطيع الذاكرة قصيرة المدى الاحتفاظ به؟", options: ["7 ± 2", "20 ± 5", "2 ± 1", "100 عنصر"], explain: "عنوان الدراسة «الرقم السحري سبعة، زائد أو ناقص اثنين»، ولهذا نقسّم أرقام الهواتف إلى مجموعات صغيرة (Chunking) ليسهل تذكّرها." },
        en: { q: "According to George Miller's famous 1956 paper, roughly how many items can short-term memory hold?", options: ["7 ± 2", "20 ± 5", "2 ± 1", "100 items"], explain: "The paper is 'The Magical Number Seven, Plus or Minus Two' — that's why we chunk phone numbers into small groups." },
      },
      {
        ar: { q: "ما اسم الشعور بالتوتر الناتج عن تبنّي معتقدين أو سلوكين متعارضين؟", options: ["التنافر المعرفي", "تأثير الدواء الوهمي (Placebo)", "الانحياز التأكيدي", "الإسقاط"], explain: "صاغ ليون فستنجر النظرية عام 1957، ويسعى الإنسان لتخفيف هذا التنافر بتغيير معتقده أو سلوكه أو بتبريره." },
        en: { q: "What is the mental discomfort from holding two conflicting beliefs or behaviors called?", options: ["Cognitive dissonance", "Placebo effect", "Confirmation bias", "Projection"], explain: "Leon Festinger proposed the theory in 1957; people reduce dissonance by changing a belief or behavior, or by justifying it." },
      },
      {
        ar: { q: "أي جزء من الدماغ يرتبط بشكل رئيسي بتكوين الذكريات الجديدة؟", options: ["الحُصين (Hippocampus)", "المخيخ (Cerebellum)", "النخاع المستطيل", "الفص القذالي"], explain: "الحُصين ضروري لتحويل الخبرات إلى ذكريات طويلة المدى. أما المخيخ فللتوازن والتناسق الحركي، والفص القذالي للرؤية." },
        en: { q: "Which part of the brain is mainly linked to forming new memories?", options: ["Hippocampus", "Cerebellum", "Medulla oblongata", "Occipital lobe"], explain: "The hippocampus is key to turning experiences into long-term memories. The cerebellum handles balance and coordination; the occipital lobe handles vision." },
      },
      {
        ar: { q: "اشتهر إريك إريكسون بنظرية:", options: ["مراحل النمو النفسي الاجتماعي الثماني", "الإشراط الكلاسيكي", "اختبار الذكاء IQ", "التحليل النفسي للأحلام"], explain: "قسّم إريكسون حياة الإنسان إلى ثماني مراحل، لكل منها أزمة نفسية اجتماعية، مثل «الهوية مقابل تشتت الدور» في المراهقة." },
        en: { q: "Erik Erikson is known for his theory of:", options: ["Eight stages of psychosocial development", "Classical conditioning", "The IQ test", "Dream psychoanalysis"], explain: "Erikson divided life into eight stages, each with a psychosocial crisis, such as 'identity vs. role confusion' in adolescence." },
      },
      {
        ar: { q: "ما هو الـDSM؟", options: ["الدليل التشخيصي والإحصائي للاضطرابات النفسية", "اختبار لقياس الذكاء", "نظرية في التعلّم", "جهاز لتصوير الدماغ"], explain: "تصدره الجمعية الأمريكية للطب النفسي (APA)، ومن إصداراته DSM-5، ويُستخدم على نطاق واسع لتشخيص الاضطرابات النفسية." },
        en: { q: "What is the DSM?", options: ["The Diagnostic and Statistical Manual of Mental Disorders", "An intelligence test", "A learning theory", "A brain-imaging device"], explain: "Published by the American Psychiatric Association (e.g., DSM-5), it's widely used to diagnose mental disorders." },
      },
    ],
  },

  /* ───────────────────────────── الرياضيات ───────────────────────────── */
  {
    id: "math",
    icon: "📐",
    name: { ar: "الرياضيات", en: "Mathematics" },
    aliases: [
      "الرياضيات", "رياضيات", "رياضيات تطبيقية", "إحصاء", "علم الإحصاء",
      "math", "maths", "mathematics", "applied mathematics", "statistics", "stats", "actuarial science"
    ],
    questions: [
      {
        ar: { q: "ما مشتقة الدالة f(x) = x²؟", options: ["2x", "x", "x³/3", "2"], explain: "قاعدة القوة: مشتقة xⁿ هي n·xⁿ⁻¹، إذن مشتقة x² هي 2x. أما x³/3 فهي تكاملها." },
        en: { q: "What is the derivative of f(x) = x²?", options: ["2x", "x", "x³/3", "2"], explain: "Power rule: the derivative of xⁿ is n·xⁿ⁻¹, so x² → 2x. x³/3 is its antiderivative." },
      },
      {
        ar: { q: "ما القيمة التقريبية للعدد π؟", options: ["3.14159", "2.71828", "1.61803", "1.41421"], explain: "π هو نسبة محيط الدائرة إلى قطرها. أما 2.71828 فهو العدد e، و1.61803 النسبة الذهبية، و1.41421 هو √2." },
        en: { q: "What is the approximate value of π?", options: ["3.14159", "2.71828", "1.61803", "1.41421"], explain: "π is a circle's circumference divided by its diameter. 2.71828 is e, 1.61803 is the golden ratio and 1.41421 is √2." },
      },
      {
        ar: { q: "ما ناتج التكامل ∫ (1/x) dx؟", options: ["ln|x| + C", "x² + C", "−1/x² + C", "eˣ + C"], explain: "لأن مشتقة ln|x| هي 1/x. ولاحظ أن قاعدة القوة للتكامل لا تنطبق هنا لأن الأس يساوي −1." },
        en: { q: "What is ∫ (1/x) dx?", options: ["ln|x| + C", "x² + C", "−1/x² + C", "eˣ + C"], explain: "Because the derivative of ln|x| is 1/x. The power rule for integrals doesn't apply here since the exponent is −1." },
      },
      {
        ar: { q: "في المثلث القائم الزاوية، تنص نظرية فيثاغورس على أن:", options: ["a² + b² = c²", "a + b = c", "a² − b² = c", "2a + 2b = c²"], explain: "مربع الوتر (c، الضلع المقابل للزاوية القائمة) يساوي مجموع مربعي الضلعين الآخرين، مثل المثلث 3-4-5." },
        en: { q: "In a right triangle, the Pythagorean theorem states:", options: ["a² + b² = c²", "a + b = c", "a² − b² = c", "2a + 2b = c²"], explain: "The square of the hypotenuse (c, opposite the right angle) equals the sum of the squares of the other two sides, e.g., the 3-4-5 triangle." },
      },
      {
        ar: { q: "أيٌّ من الأعداد التالية عدد أوّلي؟", options: ["29", "21", "27", "33"], explain: "29 لا يقبل القسمة إلا على 1 وعلى نفسه، بينما 21 = 3×7 و27 = 3×9 و33 = 3×11." },
        en: { q: "Which of these numbers is prime?", options: ["29", "21", "27", "33"], explain: "29 is divisible only by 1 and itself, while 21 = 3×7, 27 = 3×9 and 33 = 3×11." },
      },
      {
        ar: { q: "ما محدّد (Determinant) المصفوفة [[1, 2], [3, 4]]؟", options: ["−2", "2", "10", "−10"], explain: "لمصفوفة 2×2 من الشكل [[a, b], [c, d]] يكون المحدّد ad − bc = (1×4) − (2×3) = −2." },
        en: { q: "What is the determinant of the matrix [[1, 2], [3, 4]]?", options: ["−2", "2", "10", "−10"], explain: "For a 2×2 matrix [[a, b], [c, d]] the determinant is ad − bc = (1×4) − (2×3) = −2." },
      },
      {
        ar: { q: "ما قيمة log₁₀(1000)؟", options: ["3", "10", "100", "30"], explain: "لأن 10³ = 1000؛ فاللوغاريتم يجيب عن السؤال: 10 أُس كم يساوي 1000؟" },
        en: { q: "What is log₁₀(1000)?", options: ["3", "10", "100", "30"], explain: "Because 10³ = 1000 — a logarithm answers: 10 to what power gives 1000?" },
      },
      {
        ar: { q: "ما قيمة 0! (مضروب الصفر)؟", options: ["1", "0", "غير معرّف", "∞"], explain: "يُعرَّف 0! = 1، وهذا ينسجم مع أن هناك طريقة واحدة فقط لترتيب مجموعة خالية، ومع العلاقة n! = n × (n−1)!." },
        en: { q: "What is the value of 0! (zero factorial)?", options: ["1", "0", "Undefined", "∞"], explain: "0! is defined as 1; it matches the fact that there's exactly one way to arrange an empty set, and the rule n! = n × (n−1)!." },
      },
      {
        ar: { q: "متطابقة أويلر الشهيرة: e^(iπ) + 1 = ؟", options: ["0", "1", "−1", "i"], explain: "لأن e^(iπ) = cos π + i·sin π = −1، فتجمع المتطابقة خمسة من أهم الثوابت الرياضية: e وi وπ و1 و0." },
        en: { q: "Euler's famous identity: e^(iπ) + 1 = ?", options: ["0", "1", "−1", "i"], explain: "Since e^(iπ) = cos π + i·sin π = −1, the identity links five key constants: e, i, π, 1 and 0." },
      },
      {
        ar: { q: "العدد √2 هو عدد:", options: ["غير نسبي", "نسبي", "صحيح", "طبيعي"], explain: "لا يمكن كتابة √2 على صورة كسر a/b لعددين صحيحين، وتوسّعه العشري لا ينتهي ولا يتكرر (1.41421…)." },
        en: { q: "The number √2 is:", options: ["Irrational", "Rational", "An integer", "A natural number"], explain: "√2 can't be written as a fraction a/b of integers; its decimal expansion never ends or repeats (1.41421…)." },
      },
    ],
  },

  /* ───────────────────────────── الفيزياء ───────────────────────────── */
  {
    id: "physics",
    icon: "⚛️",
    name: { ar: "الفيزياء", en: "Physics" },
    aliases: [
      "الفيزياء", "فيزياء", "فيزيائي", "فيزياء تطبيقية", "علم الفلك", "فلك",
      "physics", "physicist", "applied physics", "astronomy", "astrophysics"
    ],
    questions: [
      {
        ar: { q: "ما السرعة التقريبية للضوء في الفراغ؟", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "340 m/s", "9.8 m/s"], explain: "سرعة الضوء ≈ 299,792 km/s. أما 340 m/s فهي تقريبًا سرعة الصوت في الهواء." },
        en: { q: "What is the approximate speed of light in a vacuum?", options: ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "340 m/s", "9.8 m/s"], explain: "The speed of light is ≈ 299,792 km/s. 340 m/s is roughly the speed of sound in air." },
      },
      {
        ar: { q: "ماذا تعبّر المعادلة E = mc²؟", options: ["تكافؤ الكتلة والطاقة", "قانون نيوتن الثاني", "حفظ الزخم", "قانون أوم"], explain: "معادلة أينشتاين (1905) تعني أن الكتلة شكل من أشكال الطاقة، وأن كتلة صغيرة جدًا تكافئ طاقة هائلة لأن c² كبيرة جدًا." },
        en: { q: "What does E = mc² express?", options: ["Mass–energy equivalence", "Newton's second law", "Conservation of momentum", "Ohm's law"], explain: "Einstein's 1905 equation means mass is a form of energy, and a tiny mass equals enormous energy because c² is huge." },
      },
      {
        ar: { q: "ما القيمة التقريبية لتسارع الجاذبية عند سطح الأرض؟", options: ["9.8 m/s²", "1.6 m/s²", "98 m/s²", "0.98 m/s²"], explain: "أي أن سرعة الجسم الساقط سقوطًا حرًا تزداد بنحو 9.8 m/s كل ثانية (بإهمال مقاومة الهواء). أما 1.6 m/s² فهي قيمتها على سطح القمر." },
        en: { q: "What is the approximate acceleration due to gravity at Earth's surface?", options: ["9.8 m/s²", "1.6 m/s²", "98 m/s²", "0.98 m/s²"], explain: "A freely falling object gains about 9.8 m/s of speed every second (ignoring air resistance). 1.6 m/s² is the Moon's value." },
      },
      {
        ar: { q: "ما وحدة الطاقة في النظام الدولي؟", options: ["الجول (J)", "الواط (W)", "النيوتن (N)", "الباسكال (Pa)"], explain: "الجول = نيوتن × متر. أما الواط فوحدة القدرة (جول لكل ثانية)." },
        en: { q: "What is the SI unit of energy?", options: ["Joule (J)", "Watt (W)", "Newton (N)", "Pascal (Pa)"], explain: "1 joule = 1 newton × 1 meter. The watt is the unit of power (joules per second)." },
      },
      {
        ar: { q: "ينص قانون نيوتن الثالث على أن:", options: ["لكل فعل ردّ فعل مساوٍ له في المقدار ومعاكس له في الاتجاه", "القوة تساوي الكتلة × التسارع", "الجسم الساكن يبقى ساكنًا ما لم تؤثر فيه قوة", "الطاقة لا تفنى ولا تُستحدث"], explain: "مثل دفع الصاروخ: تندفع الغازات إلى الأسفل فيندفع الصاروخ إلى الأعلى. أما «الجسم الساكن يبقى ساكنًا» فهو القانون الأول." },
        en: { q: "Newton's third law states that:", options: ["Every action has an equal and opposite reaction", "Force equals mass times acceleration", "An object at rest stays at rest unless acted on by a force", "Energy is neither created nor destroyed"], explain: "Like a rocket: gases are pushed down, so the rocket is pushed up. 'An object at rest stays at rest' is the first law." },
      },
      {
        ar: { q: "أي جسيم يحمل شحنة سالبة؟", options: ["الإلكترون", "البروتون", "النيوترون", "الفوتون"], explain: "الإلكترون سالب الشحنة والبروتون موجب، أما النيوترون والفوتون فمتعادلان." },
        en: { q: "Which particle carries a negative charge?", options: ["Electron", "Proton", "Neutron", "Photon"], explain: "The electron is negative and the proton positive; the neutron and the photon are neutral." },
      },
      {
        ar: { q: "ما صيغة الطاقة الحركية؟", options: ["½ m v²", "m g h", "m v", "m a"], explain: "الطاقة الحركية = ½ × الكتلة × مربع السرعة. أما mgh فهي طاقة الوضع، وmv هو الزخم، وma هي القوة." },
        en: { q: "What is the formula for kinetic energy?", options: ["½ m v²", "m g h", "m v", "m a"], explain: "KE = ½ × mass × speed². mgh is potential energy, mv is momentum and ma is force." },
      },
      {
        ar: { q: "كم يساوي الصفر المطلق (0 K) بالدرجة المئوية؟", options: ["−273.15 °C", "0 °C", "−100 °C", "−373.15 °C"], explain: "الصفر المطلق أدنى درجة حرارة ممكنة نظريًا، وللتحويل: K = °C + 273.15." },
        en: { q: "What is absolute zero (0 K) in degrees Celsius?", options: ["−273.15 °C", "0 °C", "−100 °C", "−373.15 °C"], explain: "Absolute zero is the lowest theoretically possible temperature; to convert, K = °C + 273.15." },
      },
      {
        ar: { q: "لا يستطيع الصوت الانتقال عبر:", options: ["الفراغ", "الماء", "الحديد", "الهواء"], explain: "الصوت موجة ميكانيكية تحتاج إلى وسط مادي تهتز جزيئاته، فلا ينتقل في الفضاء الخالي. وسرعته في المواد الصلبة أكبر منها في الهواء." },
        en: { q: "Sound cannot travel through:", options: ["A vacuum", "Water", "Iron", "Air"], explain: "Sound is a mechanical wave that needs a medium whose particles vibrate, so it can't cross empty space. It travels faster in solids than in air." },
      },
      {
        ar: { q: "ما اسم انحراف مسار الضوء عند انتقاله من وسط إلى آخر (مثل الهواء إلى الماء)؟", options: ["الانكسار", "الانعكاس", "الاستقطاب", "التداخل"], explain: "يحدث الانكسار لاختلاف سرعة الضوء بين الوسطين، ولهذا يبدو القلم مكسورًا داخل كوب الماء." },
        en: { q: "What is the bending of light as it passes from one medium to another (e.g., air to water) called?", options: ["Refraction", "Reflection", "Polarization", "Interference"], explain: "Refraction happens because light changes speed between media — that's why a pencil looks bent in a glass of water." },
      },
    ],
  },

  /* ───────────────────────────── الكيمياء ───────────────────────────── */
  {
    id: "chemistry",
    icon: "🧪",
    name: { ar: "الكيمياء", en: "Chemistry" },
    aliases: [
      "الكيمياء", "كيمياء", "كيميائي", "كيمياء حيوية", "هندسة كيميائية", "كيمياء تحليلية",
      "chemistry", "chem", "chemist", "biochemistry", "chemical engineering"
    ],
    questions: [
      {
        ar: { q: "ما الرمز الكيميائي للذهب؟", options: ["Au", "Ag", "Fe", "Gd"], explain: "Au من الكلمة اللاتينية Aurum. أما Ag فهو الفضة (Argentum)، وFe الحديد، وGd الغادولينيوم." },
        en: { q: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Gd"], explain: "Au comes from the Latin 'aurum'. Ag is silver (argentum), Fe is iron and Gd is gadolinium." },
      },
      {
        ar: { q: "ما الرقم الهيدروجيني (pH) للماء النقي عند 25°C؟", options: ["7", "0", "14", "1"], explain: "الماء النقي متعادل pH = 7؛ القيم الأقل من 7 حمضية، والأعلى من 7 قاعدية." },
        en: { q: "What is the pH of pure water at 25 °C?", options: ["7", "0", "14", "1"], explain: "Pure water is neutral at pH 7; below 7 is acidic and above 7 is basic." },
      },
      {
        ar: { q: "ما القيمة التقريبية لعدد أفوغادرو؟", options: ["6.022 × 10²³", "3.00 × 10⁸", "9.81", "1.602 × 10⁻¹⁹"], explain: "هو عدد الجسيمات في مول واحد من المادة. أما 3.00 × 10⁸ فسرعة الضوء بوحدة m/s، و1.602 × 10⁻¹⁹ مقدار شحنة الإلكترون بالكولوم." },
        en: { q: "What is the approximate value of Avogadro's number?", options: ["6.022 × 10²³", "3.00 × 10⁸", "9.81", "1.602 × 10⁻¹⁹"], explain: "It's the number of particles in one mole. 3.00 × 10⁸ is the speed of light in m/s and 1.602 × 10⁻¹⁹ is the electron's charge in coulombs." },
      },
      {
        ar: { q: "العدد الذري للعنصر يمثّل عدد:", options: ["البروتونات في النواة", "النيوترونات في النواة", "البروتونات والنيوترونات معًا", "إلكترونات المدار الأخير"], explain: "العدد الذري يحدد هوية العنصر، أما مجموع البروتونات والنيوترونات فهو العدد الكتلي." },
        en: { q: "An element's atomic number is the number of:", options: ["Protons in the nucleus", "Neutrons in the nucleus", "Protons plus neutrons", "Electrons in the outer shell"], explain: "The atomic number defines the element; protons plus neutrons is the mass number." },
      },
      {
        ar: { q: "ما الغاز الأكثر وفرة في الغلاف الجوي للأرض؟", options: ["النيتروجين", "الأكسجين", "ثاني أكسيد الكربون", "الأرغون"], explain: "يشكّل النيتروجين نحو 78% من الهواء، والأكسجين نحو 21%، والأرغون نحو 0.9%." },
        en: { q: "What is the most abundant gas in Earth's atmosphere?", options: ["Nitrogen", "Oxygen", "Carbon dioxide", "Argon"], explain: "Nitrogen makes up about 78% of air, oxygen about 21% and argon about 0.9%." },
      },
      {
        ar: { q: "ما الصيغة الكيميائية لملح الطعام؟", options: ["NaCl", "KCl", "NaOH", "HCl"], explain: "ملح الطعام هو كلوريد الصوديوم NaCl. أما KCl فكلوريد البوتاسيوم، وNaOH هيدروكسيد الصوديوم (قاعدة)، وHCl حمض الهيدروكلوريك." },
        en: { q: "What is the chemical formula of table salt?", options: ["NaCl", "KCl", "NaOH", "HCl"], explain: "Table salt is sodium chloride, NaCl. KCl is potassium chloride, NaOH is sodium hydroxide (a base) and HCl is hydrochloric acid." },
      },
      {
        ar: { q: "مَن وضع الجدول الدوري للعناصر عام 1869؟", options: ["ديمتري مندلييف", "أنطوان لافوازييه", "جون دالتون", "نيلز بور"], explain: "رتّب مندلييف العناصر حسب كتلها الذرية وخصائصها، وترك فراغات لعناصر لم تكن مكتشفة وتنبّأ بخصائصها بدقة." },
        en: { q: "Who created the periodic table of elements in 1869?", options: ["Dmitri Mendeleev", "Antoine Lavoisier", "John Dalton", "Niels Bohr"], explain: "Mendeleev arranged elements by atomic mass and properties, leaving gaps for undiscovered elements and accurately predicting their properties." },
      },
      {
        ar: { q: "ما نوع الرابطة التي تتكوّن بمشاركة أزواج من الإلكترونات بين الذرات؟", options: ["الرابطة التساهمية", "الرابطة الأيونية", "الرابطة الفلزية", "الرابطة الهيدروجينية"], explain: "في الرابطة التساهمية تتشارك الذرات الإلكترونات (كما في جزيء الماء H₂O)، أما الأيونية فتنتج عن انتقال الإلكترونات (كما في NaCl)." },
        en: { q: "What type of bond forms when atoms share pairs of electrons?", options: ["Covalent bond", "Ionic bond", "Metallic bond", "Hydrogen bond"], explain: "In a covalent bond atoms share electrons (as in H₂O); ionic bonds come from transferring electrons (as in NaCl)." },
      },
      {
        ar: { q: "ماذا ينتج عن تفاعل حمض قوي مع قاعدة قوية (تفاعل التعادل)؟", options: ["ملح وماء", "غاز الهيدروجين فقط", "فلز وأكسجين", "سكر وثاني أكسيد الكربون"], explain: "مثال: HCl + NaOH → NaCl + H₂O؛ يتحد أيون H⁺ من الحمض مع OH⁻ من القاعدة مكوّنَين الماء." },
        en: { q: "What does a strong acid reacting with a strong base (neutralization) produce?", options: ["Salt and water", "Only hydrogen gas", "A metal and oxygen", "Sugar and carbon dioxide"], explain: "E.g., HCl + NaOH → NaCl + H₂O: H⁺ from the acid combines with OH⁻ from the base to form water." },
      },
      {
        ar: { q: "ما دور العامل الحفّاز (Catalyst) في التفاعل الكيميائي؟", options: ["يسرّع التفاعل بخفض طاقة التنشيط دون أن يُستهلك", "يُستهلك بالكامل أثناء التفاعل", "يغيّر نواتج التفاعل دائمًا", "يرفع طاقة التنشيط لإبطاء التفاعل"], explain: "يوفّر الحفّاز مسارًا بديلًا بطاقة تنشيط أقل ويخرج من التفاعل كما دخل، والإنزيمات حفّازات حيوية." },
        en: { q: "What does a catalyst do in a chemical reaction?", options: ["Speeds it up by lowering the activation energy without being consumed", "Gets completely used up", "Always changes the products", "Raises the activation energy to slow it down"], explain: "A catalyst offers an alternative pathway with lower activation energy and comes out unchanged. Enzymes are biological catalysts." },
      },
    ],
  },

  /* ───────────────────────────── الأحياء ───────────────────────────── */
  {
    id: "biology",
    icon: "🧬",
    name: { ar: "الأحياء", en: "Biology" },
    aliases: [
      "الأحياء", "أحياء", "علم الأحياء", "علوم حياتية", "أحياء دقيقة", "تقنية حيوية",
      "تكنولوجيا حيوية", "وراثة", "علم الوراثة",
      "biology", "bio", "biologist", "biotechnology", "microbiology", "life sciences", "genetics"
    ],
    questions: [
      {
        ar: { q: "أي عضيّة تُلقَّب بـ«محطة الطاقة» في الخلية؟", options: ["الميتوكوندريا", "الرايبوسوم", "النواة", "جهاز غولجي"], explain: "تنتج الميتوكوندريا معظم طاقة الخلية على شكل ATP عبر التنفس الخلوي، ولها DNA خاص بها." },
        en: { q: "Which organelle is called the 'powerhouse of the cell'?", options: ["Mitochondrion", "Ribosome", "Nucleus", "Golgi apparatus"], explain: "Mitochondria produce most of the cell's energy as ATP through cellular respiration, and they have their own DNA." },
      },
      {
        ar: { q: "ماذا يعني الاختصار DNA؟", options: ["Deoxyribonucleic Acid", "Dinitrogen Acid", "Dual Nucleotide Assembly", "Deoxyribose Nitrate Acid"], explain: "أي «الحمض النووي الريبوزي منقوص الأكسجين»، ويحمل المعلومات الوراثية في تركيب حلزوني مزدوج." },
        en: { q: "What does DNA stand for?", options: ["Deoxyribonucleic Acid", "Dinitrogen Acid", "Dual Nucleotide Assembly", "Deoxyribose Nitrate Acid"], explain: "DNA carries genetic information in a double-helix structure." },
      },
      {
        ar: { q: "أين تحدث عملية البناء الضوئي في الخلية النباتية؟", options: ["البلاستيدات الخضراء", "الميتوكوندريا", "الرايبوسومات", "الفجوات العصارية"], explain: "تحتوي البلاستيدات الخضراء على الكلوروفيل الذي يمتص الضوء، فتُحوَّل فيها CO₂ والماء إلى غلوكوز وأكسجين." },
        en: { q: "Where does photosynthesis take place in a plant cell?", options: ["Chloroplasts", "Mitochondria", "Ribosomes", "Vacuoles"], explain: "Chloroplasts contain chlorophyll, which absorbs light; there CO₂ and water are turned into glucose and oxygen." },
      },
      {
        ar: { q: "في جزيء DNA، يرتبط الأدينين (A) دائمًا مع:", options: ["الثايمين (T)", "السايتوسين (C)", "الغوانين (G)", "اليوراسيل (U)"], explain: "قاعدة الأزواج: A مع T، وC مع G. أما اليوراسيل فيوجد في RNA بدل الثايمين." },
        en: { q: "In DNA, adenine (A) always pairs with:", options: ["Thymine (T)", "Cytosine (C)", "Guanine (G)", "Uracil (U)"], explain: "Base pairing: A with T, C with G. Uracil replaces thymine in RNA." },
      },
      {
        ar: { q: "كم عدد الكروموسومات في الخلية الجسدية للإنسان؟", options: ["46", "23", "44", "48"], explain: "46 كروموسومًا أي 23 زوجًا، منها زوج واحد من الكروموسومات الجنسية. أما الأمشاج فتحتوي على 23 فقط." },
        en: { q: "How many chromosomes are in a human body (somatic) cell?", options: ["46", "23", "44", "48"], explain: "46 chromosomes, i.e., 23 pairs, including one pair of sex chromosomes. Gametes have only 23." },
      },
      {
        ar: { q: "ما نوع الانقسام الخلوي الذي ينتج الأمشاج بنصف عدد الكروموسومات؟", options: ["الانقسام المنصّف (Meiosis)", "الانقسام المتساوي (Mitosis)", "الانشطار الثنائي", "التبرعم"], explain: "الانقسام المنصّف ينتج أربع خلايا أحادية المجموعة الكروموسومية، أما المتساوي فينتج خليتين مطابقتين للخلية الأم." },
        en: { q: "Which type of cell division produces gametes with half the number of chromosomes?", options: ["Meiosis", "Mitosis", "Binary fission", "Budding"], explain: "Meiosis produces four haploid cells; mitosis produces two cells identical to the parent cell." },
      },
      {
        ar: { q: "مَن صاحب نظرية التطور بالانتقاء الطبيعي في كتاب «أصل الأنواع» (1859)؟", options: ["تشارلز داروين", "غريغور مندل", "لويس باستور", "جيمس واتسون"], explain: "نشر داروين «أصل الأنواع» عام 1859. أما مندل فرائد علم الوراثة، وواتسون شارك في اكتشاف تركيب DNA." },
        en: { q: "Who proposed evolution by natural selection in 'On the Origin of Species' (1859)?", options: ["Charles Darwin", "Gregor Mendel", "Louis Pasteur", "James Watson"], explain: "Darwin published it in 1859. Mendel pioneered genetics, and Watson co-discovered DNA's structure." },
      },
      {
        ar: { q: "مَن يُلقَّب بـ«أبي علم الوراثة» بسبب تجاربه على نبات البازلاء؟", options: ["غريغور مندل", "تشارلز داروين", "جان باتيست لامارك", "روبرت هوك"], explain: "اكتشف مندل قوانين الوراثة (السيادة والانعزال والتوزيع المستقل) ونشر نتائجه عام 1866." },
        en: { q: "Who is called the 'father of genetics' for his experiments on pea plants?", options: ["Gregor Mendel", "Charles Darwin", "Jean-Baptiste Lamarck", "Robert Hooke"], explain: "Mendel discovered the laws of inheritance (dominance, segregation, independent assortment) and published them in 1866." },
      },
      {
        ar: { q: "مَن أول من شاهد الخلايا وأطلق عليها اسم «خلية» عام 1665؟", options: ["روبرت هوك", "أنطوني فان ليفنهوك", "تشارلز داروين", "لويس باستور"], explain: "رأى هوك خلايا الفلّين الميتة بمجهره ووصفها في كتابه Micrographia، بينما كان ليفنهوك أول من رأى الكائنات الحية الدقيقة." },
        en: { q: "Who first observed and named 'cells', in 1665?", options: ["Robert Hooke", "Antonie van Leeuwenhoek", "Charles Darwin", "Louis Pasteur"], explain: "Hooke saw dead cork cells under his microscope and described them in 'Micrographia'; Leeuwenhoek was the first to see living microorganisms." },
      },
      {
        ar: { q: "معظم الإنزيمات عبارة عن:", options: ["بروتينات", "دهون", "كربوهيدرات", "أملاح معدنية"], explain: "الإنزيمات في الغالب بروتينات تعمل حفّازات حيوية تسرّع التفاعلات في الجسم، مثل الأميليز الذي يبدأ هضم النشا في الفم." },
        en: { q: "Most enzymes are:", options: ["Proteins", "Lipids", "Carbohydrates", "Mineral salts"], explain: "Enzymes are mostly proteins acting as biological catalysts that speed up reactions in the body, like amylase starting starch digestion in the mouth." },
      },
    ],
  },

  /* ─────────────── ثقافة تقنية عامة (تُستخدم عند عدم وجود تطابق) ─────────────── */
  {
    id: "general",
    icon: "🚀",
    name: { ar: "ثقافة تقنية عامة", en: "General Tech Trivia" },
    aliases: [
      "ثقافة عامة", "ثقافة تقنية", "ثقافة تقنية عامة", "عام", "عامة", "تقنية", "تكنولوجيا", "تقني",
      "general", "general knowledge", "tech", "technology", "trivia"
    ],
    questions: [
      {
        ar: { q: "مَن اخترع الشبكة العنكبوتية العالمية (World Wide Web) عام 1989؟", options: ["تيم بيرنرز-لي", "بيل غيتس", "ستيف جوبز", "مارك زوكربيرغ"], explain: "اقترحها تيم بيرنرز-لي أثناء عمله في مختبر CERN بسويسرا، وطوّر معها HTML وHTTP وأول متصفح." },
        en: { q: "Who invented the World Wide Web in 1989?", options: ["Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"], explain: "Tim Berners-Lee proposed it while at CERN in Switzerland, creating HTML, HTTP and the first browser along with it." },
      },
      {
        ar: { q: "أي شركة تطوّر نظام التشغيل Android؟", options: ["Google", "Apple", "Microsoft", "Samsung"], explain: "استحوذت Google على شركة Android عام 2005، وأُطلق أول هاتف بالنظام عام 2008. أما Apple فتطوّر iOS." },
        en: { q: "Which company develops the Android operating system?", options: ["Google", "Apple", "Microsoft", "Samsung"], explain: "Google acquired Android Inc. in 2005 and the first Android phone launched in 2008. Apple develops iOS." },
      },
      {
        ar: { q: "ماذا يعني الاختصار GDGoC؟", options: ["Google Developer Groups on Campus", "Global Developers Guild of Coders", "Google Design Group of Creators", "Great Developers Gathering on Cloud"], explain: "مجتمعات طلابية جامعية تدعمها Google لتعلّم التقنيات وبناء المشاريع معًا — ونادينا واحد منها 💙. وكانت تُعرف سابقًا باسم GDSC." },
        en: { q: "What does GDGoC stand for?", options: ["Google Developer Groups on Campus", "Global Developers Guild of Coders", "Google Design Group of Creators", "Great Developers Gathering on Cloud"], explain: "University student communities supported by Google to learn tech and build projects together — like our club 💙. They were previously called GDSC." },
      },
      {
        ar: { q: "أي لغة أعلنت Google عام 2019 أنها اللغة المفضّلة لتطوير تطبيقات Android؟", options: ["Kotlin", "Swift", "Ruby", "Perl"], explain: "في مؤتمر Google I/O 2019 أعلنت Google نهج «Kotlin-first». أما Swift فهي لغة Apple لتطبيقات iOS." },
        en: { q: "Which language did Google announce in 2019 as the preferred language for Android development?", options: ["Kotlin", "Swift", "Ruby", "Perl"], explain: "At Google I/O 2019, Google announced a 'Kotlin-first' approach. Swift is Apple's language for iOS." },
      },
      {
        ar: { q: "إطار العمل Flutter من Google يستخدم لغة البرمجة:", options: ["Dart", "Kotlin", "Swift", "C#"], explain: "Flutter يتيح بناء تطبيقات للموبايل والويب وسطح المكتب من شيفرة واحدة مكتوبة بلغة Dart." },
        en: { q: "Google's Flutter framework uses which programming language?", options: ["Dart", "Kotlin", "Swift", "C#"], explain: "Flutter builds mobile, web and desktop apps from a single codebase written in Dart." },
      },
      {
        ar: { q: "ما اسم نواة نظام التشغيل مفتوحة المصدر التي أطلقها لينوس تورفالدس عام 1991؟", options: ["Linux", "Windows", "macOS", "iOS"], explain: "Linux نواة مفتوحة المصدر تشغّل معظم خوادم الإنترنت، وهي أيضًا أساس نظام Android." },
        en: { q: "What is the open-source OS kernel that Linus Torvalds released in 1991?", options: ["Linux", "Windows", "macOS", "iOS"], explain: "Linux is an open-source kernel that runs most internet servers and is also the base of Android." },
      },
      {
        ar: { q: "ماذا يعني الاختصار URL؟", options: ["Uniform Resource Locator", "Universal Routing Link", "Unified Remote Login", "User Resource Line"], explain: "الـURL هو عنوان المورد على الإنترنت، مثل: https://example.com/page" },
        en: { q: "What does URL stand for?", options: ["Uniform Resource Locator", "Universal Routing Link", "Unified Remote Login", "User Resource Line"], explain: "A URL is the address of a resource on the web, like https://example.com/page" },
      },
      {
        ar: { q: "أي لغة تُستخدم أساسًا لتنسيق مظهر صفحات الويب (الألوان والخطوط والتخطيط)؟", options: ["CSS", "Python", "SQL", "C"], explain: "HTML يبني هيكل الصفحة، وCSS ينسّق مظهرها، وJavaScript يضيف التفاعل — وهذه اللعبة مبنية بالثلاثة!" },
        en: { q: "Which language is mainly used to style web pages (colors, fonts, layout)?", options: ["CSS", "Python", "SQL", "C"], explain: "HTML builds the structure, CSS styles it and JavaScript adds interactivity — this very game uses all three!" },
      },
      {
        ar: { q: "ما هو Gemini من Google؟", options: ["عائلة نماذج ذكاء اصطناعي", "لغة برمجة", "متصفح ويب", "قاعدة بيانات"], explain: "Gemini عائلة نماذج ذكاء اصطناعي متعددة الوسائط من Google DeepMind، تفهم النصوص والصور والصوت والفيديو والشيفرة." },
        en: { q: "What is Google's Gemini?", options: ["A family of AI models", "A programming language", "A web browser", "A database"], explain: "Gemini is Google DeepMind's family of multimodal AI models that understand text, images, audio, video and code." },
      },
      {
        ar: { q: "مَن مؤسسا شركة Google عام 1998؟", options: ["لاري بيج وسيرغي برين", "بيل غيتس وبول ألن", "ستيف جوبز وستيف وزنياك", "جيف بيزوس وإيلون ماسك"], explain: "أسّسها لاري بيج وسيرغي برين عندما كانا طالبَي دكتوراه في جامعة ستانفورد." },
        en: { q: "Who founded Google in 1998?", options: ["Larry Page and Sergey Brin", "Bill Gates and Paul Allen", "Steve Jobs and Steve Wozniak", "Jeff Bezos and Elon Musk"], explain: "Larry Page and Sergey Brin founded it while they were PhD students at Stanford University." },
      },
      {
        ar: { q: "ماذا يعني الاختصار HTTP؟", options: ["HyperText Transfer Protocol", "High Transfer Text Process", "Hyperlink Text Tracking Program", "Host Terminal Transfer Protocol"], explain: "أي «بروتوكول نقل النص التشعبي»، وهو أساس تبادل البيانات على الويب، ونسخته الآمنة المشفّرة هي HTTPS." },
        en: { q: "What does HTTP stand for?", options: ["HyperText Transfer Protocol", "High Transfer Text Process", "Hyperlink Text Tracking Program", "Host Terminal Transfer Protocol"], explain: "It's the foundation of data exchange on the web; HTTPS is its secure, encrypted version." },
      },
      {
        ar: { q: "ماذا يعني أن يكون البرنامج «مفتوح المصدر» (Open Source)؟", options: ["شيفرته المصدرية متاحة للجميع للاطلاع والتعديل وإعادة التوزيع وفق ترخيصه", "أنه مجاني لكن شيفرته سرية", "أنه يعمل بدون إنترنت فقط", "أنه لا يحتوي على أي أخطاء"], explain: "أمثلة: Linux وAndroid (AOSP) وFlutter وTensorFlow. والمساهمة في المشاريع مفتوحة المصدر طريقة رائعة لتطوير مهاراتك!" },
        en: { q: "What does it mean for software to be 'open source'?", options: ["Its source code is available for anyone to view, modify and redistribute under its license", "It's free but its code is secret", "It only works offline", "It has no bugs at all"], explain: "Examples: Linux, Android (AOSP), Flutter and TensorFlow. Contributing to open-source projects is a great way to grow your skills!" },
      },
    ],
  },
];
