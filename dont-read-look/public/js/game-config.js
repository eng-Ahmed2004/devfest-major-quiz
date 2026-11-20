// ============================================================================
//  Don't Read, Look! — إعدادات اللعبة (عدّل هنا فقط)
//  Game settings: everything you may want to tweak lives in this one file.
// ============================================================================

export const GAME = {
  title: "Don't Read, Look!",

  questionCount: 10,      // عدد الأسئلة
  questionSeconds: 8,     // مدة كل سؤال بالثواني
  baseQuestionCount: 4,   // أول N أسئلة تستخدم الألوان الأساسية فقط (base: true)
  matchRatio: 0.15,       // احتمال أن تتطابق الكلمة مع لون خطها (0.15 = 15%)
  optionCount: 4,         // عدد أزرار الإجابة (التخطيط 2×2 مصمم لأربعة)
  includeWordAsDecoy: true, // ضع لون "معنى الكلمة" بين الأزرار كفخ عندما يختلف عن لون الخط

  maxPoints: 1000,        // نقاط الإجابة الصحيحة الفورية
  minPoints: 500,         // نقاط الإجابة الصحيحة عند نهاية المؤقت

  // ملاحظة: الحد الأقصى للاعبين مكتوب أيضًا في database.rules.json (نمط slots من 0 إلى 59).
  // إن غيّرته هنا فغيّر النمط هناك أيضًا.
  maxPlayers: 60,
  nameMaxLength: 16,

  readyMs: 2500,          // شاشة "استعد" قبل كل سؤال (بالمللي ثانية)
  firstReadyMs: 3500,     // قبل السؤال الأول (عدّ تنازلي 3-2-1)
  closeDelayMs: 500,      // مهلة بعد انتهاء المؤقت لاستقبال الإجابات المتأخرة بسبب الشبكة
  autoNextSeconds: 0,     // 0 = المضيف يضغط "التالي" يدويًا، أو عدد ثوانٍ للانتقال التلقائي
  roomTtlHours: 24,       // تُحذف الغرف الأقدم من هذا عند إنشاء غرفة جديدة (القواعد تسمح بالحذف بعد 24 ساعة)

  // رابط صفحة اللاعب في QR. اتركه فارغًا ليستخدم نفس موقع صفحة المضيف.
  // مفيد إن شغّلت المضيف محليًا وأردت أن يفتح اللاعبون الموقع المنشور، مثل: 'https://dont-read-look.web.app/'
  joinBaseUrl: '',

  showColorNamesDefault: false, // عرض اسم اللون على الأزرار افتراضيًا (يستطيع اللاعب تغييره)
  wordStage: 'dark',      // خلفية بطاقة الكلمة: 'dark' (أوضح للأصفر والسماوي على البروجكتر) أو 'light'
};

// ----------------------------------------------------------------------------
//  ألوان الأسئلة الثمانية — Question colours
//  id: معرّف ثابت (لا تغيّره بعد إنشاء غرف)   hex: اللون
//  ar / en: الاسم المعروض   shape: الرمز الهندسي الثابت على الزر (لعمى الألوان)
//  fg: لون الرمز والنص فوق الزر   base: من الألوان الأساسية للأسئلة الأولى
//  الأشكال المتاحة: circle, triangle, square, diamond, star, heart, hexagon, arrow
// ----------------------------------------------------------------------------
export const COLORS = [
  { id: 'blue',   hex: '#4285F4', ar: 'أزرق',   en: 'Blue',   shape: 'circle',   fg: '#FFFFFF', base: true },
  { id: 'red',    hex: '#EA4335', ar: 'أحمر',   en: 'Red',    shape: 'triangle', fg: '#FFFFFF', base: true },
  { id: 'yellow', hex: '#FBBC04', ar: 'أصفر',   en: 'Yellow', shape: 'square',   fg: '#202124', base: true },
  { id: 'green',  hex: '#34A853', ar: 'أخضر',   en: 'Green',  shape: 'diamond',  fg: '#FFFFFF', base: true },
  { id: 'orange', hex: '#FF6D01', ar: 'برتقالي', en: 'Orange', shape: 'star',     fg: '#202124', base: false },
  { id: 'purple', hex: '#A142F4', ar: 'بنفسجي', en: 'Purple', shape: 'heart',    fg: '#FFFFFF', base: false },
  { id: 'pink',   hex: '#F538A0', ar: 'وردي',   en: 'Pink',   shape: 'hexagon',  fg: '#FFFFFF', base: false },
  { id: 'cyan',   hex: '#24C1E0', ar: 'سماوي',  en: 'Cyan',   shape: 'arrow',    fg: '#202124', base: false },
];

// ----------------------------------------------------------------------------
//  الألوان المتشابهة — لا يجتمع لونان من أي زوج هنا في نفس السؤال
//  (لا في الأزرار، ولا بين لون الخط ومعنى الكلمة). أضف أو احذف أزواجًا بحرية.
// ----------------------------------------------------------------------------
export const SIMILAR_PAIRS = [
  ['red', 'pink'],
  ['yellow', 'orange'],
  ['blue', 'cyan'],
  ['purple', 'blue'],
  ['purple', 'pink'],
];

// ألوان تصميم الواجهة (هوية Google) — ليست ألوان الأسئلة
export const BRAND = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC04',
  green: '#34A853',
};
