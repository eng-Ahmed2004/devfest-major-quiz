/* ==========================================================================
   مين أنت في التخصص؟ — GDGoC DevFest
   game.js: منطق اللعبة (المطابقة، الجولات، المؤقت، النتيجة، اللغة، confetti)
   ========================================================================== */

/* ⚙️ إعدادات سهلة التعديل ------------------------------------------------- */
const CONFIG = {
  QUESTIONS_PER_ROUND: 5,     // عدد الأسئلة في كل جولة
  SECONDS_PER_QUESTION: 20,   // مدة المؤقت لكل سؤال (بالثواني)
  TICK_LAST_SECONDS: 3,       // التكتكة تبدأ في آخر كم ثانية
  HIGH_SCORE_RATIO: 0.8,      // من هذه النسبة فما فوق = نتيجة عالية (confetti + موسيقى أقوى)
  DEFAULT_LANG: "ar",         // لغة البداية: "ar" أو "en"
  EVENT_NAME: "DevFest",      // يظهر في الشريط العلوي بجانب GDGoC

  // مطابقة التخصص (لا تحتاج تعديلها عادةً)
  AUTO_MATCH_SCORE: 0.8,      // أقل تشابه لبدء التخصص مباشرة
  AUTO_MATCH_MARGIN: 0.08,    // الفارق المطلوب عن ثاني أقرب تخصص
  SUGGEST_MIN_SCORE: 0.45,    // أقل تشابه لعرض التخصص كاقتراح
  SUGGESTIONS_COUNT: 3,       // عدد الاقتراحات
  GENERAL_ID: "general",      // معرّف تخصص الثقافة التقنية العامة في questions.js
};

/* 🌐 نصوص الواجهة ------------------------------------------------------- */
const STRINGS = {
  ar: {
    docTitle: "مين أنت في التخصص؟ | GDGoC DevFest",
    kicker: "تحدّي DevFest",
    heroTitle: "مين أنت في التخصص؟",
    heroSub: "جاوب على {n} أسئلة عن تخصصك واكتشف إذا كنت فعلًا «ابن التخصص» 😎",
    askMajor: "شو تخصصك؟",
    placeholder: "مثلًا: طب، محاسبة، CS…",
    start: "ابدأ",
    emptyInput: "اكتب تخصصك أولًا 🙂",
    meta: "{n} أسئلة · {s} ثانية لكل سؤال · {m} تخصصًا",
    browse: "أو اختر من كل التخصصات",
    suggestTitle: "ما لقينا «{q}» بالضبط…",
    suggestSub: "قصدك واحد من هدول؟",
    generalBtn: "العب أسئلة ثقافة تقنية عامة",
    showAll: "عرض كل التخصصات",
    back: "رجوع",
    noMatch: "ما لقينا تخصص «{q}» عندنا، فجهّزنا لك أسئلة ثقافة تقنية عامة 🚀",
    qCounter: "سؤال {i} من {n}",
    score: "النقاط",
    quit: "البداية",
    correct: "إجابة صحيحة! 🎉",
    wrong: "إجابة خاطئة",
    timeout: "انتهى الوقت! ⏰",
    rightAnswer: "الإجابة الصحيحة: {a}",
    next: "التالي",
    finish: "شوف النتيجة",
    resultIn: "نتيجتك في {major}",
    scoreOf: "من {n}",
    playAgain: "العب مرة ثانية",
    changeMajor: "غيّر التخصص",
    review: "مراجعة إجاباتك",
    yourAnswer: "إجابتك: {a}",
    noAnswer: "لم تُجب — انتهى الوقت",
    muteOn: "تشغيل الصوت",
    muteOff: "كتم الصوت",
    langLabel: "Switch to English",
    langShort: "EN",
    keysHint: "تلميح: استخدم الأرقام 1–4 للإجابة و Enter للسؤال التالي",
    footer: "صُنعت بحب لمجتمع GDGoC 💙",
    timerLabel: "الوقت المتبقي",
  },
  en: {
    docTitle: "What's Your Major IQ? | GDGoC DevFest",
    kicker: "DevFest Challenge",
    heroTitle: "How well do you know your major?",
    heroSub: "Answer {n} questions about your field and find out if you're the real deal 😎",
    askMajor: "What's your major?",
    placeholder: "e.g. Medicine, Law, حاسوب…",
    start: "Start",
    emptyInput: "Type your major first 🙂",
    meta: "{n} questions · {s}s per question · {m} majors",
    browse: "Or pick from all majors",
    suggestTitle: "We couldn't find “{q}” exactly…",
    suggestSub: "Did you mean one of these?",
    generalBtn: "Play general tech trivia",
    showAll: "Show all majors",
    back: "Back",
    noMatch: "We don't have “{q}” yet, so here's some general tech trivia 🚀",
    qCounter: "Question {i} of {n}",
    score: "Score",
    quit: "Home",
    correct: "Correct! 🎉",
    wrong: "Wrong answer",
    timeout: "Time's up! ⏰",
    rightAnswer: "Correct answer: {a}",
    next: "Next",
    finish: "See my result",
    resultIn: "Your score in {major}",
    scoreOf: "out of {n}",
    playAgain: "Play again",
    changeMajor: "Change major",
    review: "Review your answers",
    yourAnswer: "Your answer: {a}",
    noAnswer: "No answer — time ran out",
    muteOn: "Unmute sound",
    muteOff: "Mute sound",
    langLabel: "التبديل إلى العربية",
    langShort: "ع",
    keysHint: "Tip: press 1–4 to answer and Enter for the next question",
    footer: "Made with love for the GDGoC community 💙",
    timerLabel: "Time left",
  },
};

const LETTERS = { ar: ["أ", "ب", "ج", "د", "هـ", "و"], en: ["A", "B", "C", "D", "E", "F"] };
const GOOGLE_COLORS = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

// مستويات النتيجة (حسب نسبة الإجابات الصحيحة)
const TIERS = [
  { min: 1,   emoji: "🏆", ar: ["أسطورة التخصص", "علامة كاملة! أنت المرجع اللي كل الدفعة بترجعله."], en: ["Field Legend", "Perfect score! You're the one your whole class comes to for answers."] },
  { min: 0.8, emoji: "🌟", ar: ["خبير حقيقي", "مستوى رائع! ناقصك خطوة صغيرة للعلامة الكاملة."], en: ["True Expert", "Excellent! Just one small step away from a perfect score."] },
  { min: 0.6, emoji: "💪", ar: ["على الطريق الصحيح", "أساسك قوي، وشوية مراجعة بتخليك خبير."], en: ["On the Right Track", "Solid foundation — a little more review and you're an expert."] },
  { min: 0.4, emoji: "🌱", ar: ["المستكشف", "بداية حلوة! في أشياء بتعرفها، والباقي بتتعلمه — جرّب كمان مرة."], en: ["The Explorer", "Nice start! You know some of it, and the rest is learnable — try again."] },
  { min: 0.2, emoji: "📚", ar: ["المتعلّم الطموح", "كل خبير كان مبتدئ يومًا ما. اقرأ الشروحات وارجع اكسر الرقم!"], en: ["Ambitious Learner", "Every expert was once a beginner. Read the explanations and come back to beat it!"] },
  { min: 0,   emoji: "🤗", ar: ["الوافد الجديد", "ولا يهمك! اليوم يوم تعلّم — العب مرة ثانية وشوف الفرق."], en: ["The Newcomer", "No worries! Today is for learning — play again and see the difference."] },
];

/* ==========================================================================
   مطابقة التخصص المرنة (عربي/إنجليزي، تتجاهل الهمزات والتشكيل والأخطاء الصغيرة)
   ========================================================================== */
const Matcher = (() => {
  const DIACRITICS = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/g; // تشكيل + تطويل
  const STOPWORDS = new Set([
    // عربي (بعد التطبيع)
    "انا", "اني", "ادرس", "بدرس", "طالب", "طالبه", "طلاب", "تخصص", "تخصصي", "بتخصص", "اختصاص",
    "اختصاصي", "قسم", "كليه", "بكالوريوس", "ماجستير", "دكتوراه", "دبلوم", "سنه", "اولي", "ثانيه",
    "ثالثه", "رابعه", "خامسه", "في", "من", "عن", "يا", "هو", "هي", "برنامج", "مسار", "شعبه", "جامعه",
    // English
    "i", "im", "am", "a", "an", "the", "in", "of", "and", "my", "is", "at", "for", "study", "studying",
    "studies", "student", "students", "major", "majoring", "degree", "bachelor", "bachelors", "bsc",
    "ba", "bs", "msc", "phd", "year", "first", "second", "third", "fourth", "final", "department",
    "dept", "faculty", "school", "college", "university", "program", "programme", "track",
  ]);

  function stripArticle(t) {
    // "وال" و"بال" و"لل" و"ال" في بداية الكلمة العربية
    let s = t;
    for (let i = 0; i < 3; i++) {
      if (s.length >= 5 && (s.startsWith("وال") || s.startsWith("بال") || s.startsWith("فال") || s.startsWith("كال"))) s = s.slice(3);
      else if (s.length >= 6 && s.startsWith("لل")) s = s.slice(2);
      else if (s.length >= 4 && s.startsWith("ال")) s = s.slice(2);
      else break;
    }
    return s;
  }

  function tokens(str) {
    let s = String(str || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "");
    s = s.replace(DIACRITICS, "")
      .replace(/[أإآٱ]/g, "ا").replace(/[ىی]/g, "ي").replace(/ک/g, "ك")
      .replace(/ؤ/g, "و").replace(/ئ/g, "ي").replace(/ء/g, "").replace(/ة/g, "ه")
      .replace(/[^\p{L}\p{N}]+/gu, " ");
    return s.trim().split(/\s+/)
      .map(stripArticle)
      .filter((t) => t.length > 1 && !STOPWORDS.has(t));
  }

  function lev(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[b.length];
  }

  const sim = (a, b) => { const m = Math.max(a.length, b.length); return m ? 1 - lev(a, b) / m : 0; };

  function tokenSim(a, b) {
    if (a === b) return 1;
    const minL = Math.min(a.length, b.length), maxL = Math.max(a.length, b.length);
    if (minL >= 3 && (a.startsWith(b) || b.startsWith(a))) return 0.85; // كلمة ناقصة: "كهربا" ← "كهربائية"
    if (maxL <= 3) return 0;                                            // الكلمات القصيرة جدًا: تطابق تام فقط
    const s = sim(a, b);
    return s >= 0.6 ? s : 0;                                           // أقل من ذلك = تشابه بالصدفة (مثل اللاحقة "ية")
  }

  function scoreAlias(inT, inKey, alias) {
    if (inKey === alias.key) return 1;
    const best = (t, list) => list.reduce((m, x) => Math.max(m, tokenSim(t, x)), 0);
    const cov = alias.tokens.reduce((s, a) => s + best(a, inT), 0) / alias.tokens.length; // كم من كلمات التخصص موجودة
    const rev = inT.reduce((s, t) => s + best(t, alias.tokens), 0) / inT.length;          // كم من كلمات المستخدم مفهومة
    let score = (cov + rev) / 2;
    if (cov === 1) score = Math.max(score, 0.75 + 0.25 * rev); // كل كلمات التخصص موجودة مع كلمات إضافية
    // أخطاء إملائية في النص كاملًا (أو كلمات ملتصقة) — نعتمدها فقط إن كانت قريبة جدًا
    const a = inKey.replace(/ /g, ""), b = alias.key.replace(/ /g, "");
    const whole = Math.min(a.length, b.length) >= 4 ? sim(a, b) : 0;
    return Math.max(score, whole >= 0.85 ? whole : 0);
  }

  let index = null;
  function buildIndex(majors) {
    index = majors.map((m, idx) => {
      const seen = new Set();
      const make = (list) => list.map((txt) => {
        const t = tokens(txt);
        return { tokens: t, key: t.join(" ") };
      }).filter((a) => a.tokens.length && !seen.has(a.key) && seen.add(a.key));
      const names = make([m.name.ar, m.name.en].filter(Boolean));
      const aliases = names.concat(make(m.aliases || []));
      return { major: m, idx, names, aliases };
    });
  }

  function match(query, opts = {}) {
    const inT = tokens(query);
    if (!inT.length) return { type: "none", ranked: [] };
    const inKey = inT.join(" ");
    const ranked = index.map((e) => ({
      major: e.major,
      idx: e.idx,
      score: e.aliases.reduce((m, a) => Math.max(m, scoreAlias(inT, inKey, a)), 0),
      nameScore: e.names.reduce((m, a) => Math.max(m, scoreAlias(inT, inKey, a)), 0),
    })).sort((a, b) => b.score - a.score || b.nameScore - a.nameScore || a.idx - b.idx);

    const [top, second] = ranked;
    const gap = top.score - (second ? second.score : 0);
    if (top.score >= CONFIG.AUTO_MATCH_SCORE && (gap >= CONFIG.AUTO_MATCH_MARGIN || (top.score === 1 && second.score < 1))) {
      return { type: "match", major: top.major, score: top.score, ranked };
    }
    const candidates = ranked
      .filter((r) => r.score >= CONFIG.SUGGEST_MIN_SCORE && r.major.id !== opts.excludeId)
      .slice(0, CONFIG.SUGGESTIONS_COUNT)
      .map((r) => r.major);
    if (candidates.length) return { type: "suggest", candidates, ranked };
    return { type: "none", ranked };
  }

  return { tokens, match, buildIndex };
})();

/* ==========================================================================
   Confetti بألوان جوجل الأربعة (Canvas)
   ========================================================================== */
const Confetti = (() => {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  let parts = [];
  let raf = null;
  let last = 0;
  let W = 0, H = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(power) {
    const count = Math.round(Math.min(260, 90 + W / 8) * power);
    for (let i = 0; i < count; i++) {
      const fromLeft = i % 2 === 0;
      const angle = (fromLeft ? -60 : -120) + (Math.random() * 30 - 15);
      const speed = (0.55 + Math.random() * 0.55) * Math.sqrt(H) * 0.95;
      const rad = (angle * Math.PI) / 180;
      parts.push({
        x: fromLeft ? -10 : W + 10,
        y: H * (0.72 + Math.random() * 0.12),
        vx: Math.cos(rad) * speed,
        vy: Math.sin(rad) * speed,
        w: 7 + Math.random() * 7,
        h: 4 + Math.random() * 5,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.35,
        flip: Math.random() * Math.PI,
        vf: 0.08 + Math.random() * 0.12,
        color: GOOGLE_COLORS[Math.floor(Math.random() * 4)],
        round: Math.random() < 0.3,
      });
    }
  }

  function frame(now) {
    const dt = Math.min(3, (now - last) / 16.67 || 1);
    last = now;
    ctx.clearRect(0, 0, W, H);
    parts = parts.filter((p) => p.y < H + 40 && p.x > -60 && p.x < W + 60);
    for (const p of parts) {
      p.vy += 0.32 * dt;
      p.vx *= Math.pow(0.986, dt);
      p.vy *= Math.pow(0.986, dt);
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.flip += p.vf * dt;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(1, Math.cos(p.flip));
      ctx.fillStyle = p.color;
      if (p.round) { ctx.beginPath(); ctx.arc(0, 0, p.h * 0.7, 0, Math.PI * 2); ctx.fill(); }
      else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
    if (parts.length) raf = requestAnimationFrame(frame);
    else { raf = null; ctx.clearRect(0, 0, W, H); }
  }

  function burst(power = 1) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    resize();
    spawn(power);
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }

  function stop() { parts = []; }

  window.addEventListener("resize", () => { if (raf) resize(); });
  return { burst, stop };
})();

/* ==========================================================================
   حالة اللعبة وعناصر الواجهة
   ========================================================================== */
const MAJORS = (window.QUESTION_BANK || []).filter((m) => m && m.id && Array.isArray(m.questions) && m.questions.length);
Matcher.buildIndex(MAJORS);

const $ = (id) => document.getElementById(id);
const el = {
  html: document.documentElement,
  topProgress: $("topProgress"),
  langBtn: $("langBtn"), langBtnText: $("langBtnText"),
  muteBtn: $("muteBtn"),
  screens: { start: $("screenStart"), suggest: $("screenSuggest"), quiz: $("screenQuiz"), result: $("screenResult") },
  heroSub: $("heroSub"), form: $("majorForm"), input: $("majorInput"), formError: $("formError"),
  startMeta: $("startMeta"), gridStart: $("majorsGridStart"),
  suggestTitle: $("suggestTitle"), suggestList: $("suggestList"), btnGeneral: $("btnGeneral"),
  btnBackSuggest: $("btnBackSuggest"), gridSuggest: $("majorsGridSuggest"),
  quizMajor: $("quizMajor"), qCounter: $("qCounter"), scorePill: $("scorePill"), btnQuit: $("btnQuit"),
  timer: $("timer"), timerRing: $("timerRing"), timerNum: $("timerNum"),
  notice: $("quizNotice"), qCard: $("qCard"), qText: $("qText"), options: $("options"),
  feedback: $("feedback"), fbTitle: $("fbTitle"), fbAnswer: $("fbAnswer"), fbExplain: $("fbExplain"), btnNext: $("btnNext"),
  resultMajor: $("resultMajor"), scoreRing: $("scoreRing"), scoreNum: $("scoreNum"), scoreOf: $("scoreOf"),
  tierEmoji: $("tierEmoji"), tierTitle: $("tierTitle"), tierMsg: $("tierMsg"),
  btnPlayAgain: $("btnPlayAgain"), btnChangeMajor: $("btnChangeMajor"), reviewList: $("reviewList"),
  footer: $("footer"), srLive: $("srLive"),
};

const TIMER_CIRC = 2 * Math.PI * 26; // نصف قطر دائرة المؤقت في index.html
const LANG_KEY = "gdgoc-quiz-lang";
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const state = {
  lang: CONFIG.DEFAULT_LANG,
  screen: "start",
  major: null,
  notice: null,          // نص المستخدم عند عدم وجود تطابق
  suggest: null,         // { q, candidates }
  round: [],
  index: 0,
  score: 0,
  used: {},              // الأسئلة التي ظهرت لكل تخصص (لتقليل التكرار)
  timerId: null,
  deadline: 0,
  lastTick: null,
  busy: false,
};
try { const saved = localStorage.getItem(LANG_KEY); if (saved === "ar" || saved === "en") state.lang = saved; } catch (e) { /* تجاهل */ }

/* ---------- أدوات مساعدة ---------- */
function t(key, vars) {
  let s = (STRINGS[state.lang] && STRINGS[state.lang][key]) ?? STRINGS.ar[key] ?? key;
  if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
  return s;
}
const majorName = (m) => (m.name && (m.name[state.lang] || m.name.ar || m.name.en)) || m.id;
function qPart(src, key) {
  const block = src[state.lang] && src[state.lang][key] != null ? src[state.lang] : (src.ar || src.en);
  return block ? block[key] : "";
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function generalMajor() { return MAJORS.find((m) => m.id === CONFIG.GENERAL_ID) || MAJORS[0]; }
function announce(text) { el.srLive.textContent = ""; setTimeout(() => { el.srLive.textContent = text; }, 30); }

/* ==========================================================================
   الشاشات
   ========================================================================== */
function showScreen(name) {
  Object.entries(el.screens).forEach(([k, s]) => { s.hidden = k !== name; });
  const s = el.screens[name];
  s.classList.remove("screen-enter");
  void s.offsetWidth; // إعادة تشغيل الأنيميشن
  s.classList.add("screen-enter");
  state.screen = name;
  renderTopProgress();
  window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
}

function renderTopProgress() {
  const bar = el.topProgress;
  bar.innerHTML = "";
  const inQuiz = state.screen === "quiz" && state.round.length;
  bar.classList.toggle("is-brand", !inQuiz);
  const n = inQuiz ? state.round.length : 4;
  for (let i = 0; i < n; i++) {
    const seg = document.createElement("span");
    seg.className = "seg";
    seg.style.setProperty("--c", GOOGLE_COLORS[i % 4]);
    if (!inQuiz) seg.classList.add("done");
    else if (i < state.index || (i === state.index && state.round[i].status)) seg.classList.add("done");
    else if (i === state.index) seg.classList.add("current");
    bar.appendChild(seg);
  }
}

/* ---------- شاشة البداية ---------- */
function renderStart() {
  el.heroSub.textContent = t("heroSub", { n: CONFIG.QUESTIONS_PER_ROUND });
  el.input.placeholder = t("placeholder");
  const count = MAJORS.filter((m) => m.id !== CONFIG.GENERAL_ID).length;
  el.startMeta.textContent = t("meta", { n: CONFIG.QUESTIONS_PER_ROUND, s: CONFIG.SECONDS_PER_QUESTION, m: count });
  renderMajorsGrid(el.gridStart);
}

function renderMajorsGrid(container) {
  container.innerHTML = "";
  const list = MAJORS.filter((m) => m.id !== CONFIG.GENERAL_ID).concat(MAJORS.filter((m) => m.id === CONFIG.GENERAL_ID));
  list.forEach((m, i) => container.appendChild(majorButton(m, i, "chip")));
}

function majorButton(m, i, variant) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = variant === "chip" ? "major-chip-btn" : "major-btn";
  b.style.setProperty("--c", GOOGLE_COLORS[i % 4]);
  const icon = document.createElement("span");
  icon.className = "mb-icon";
  icon.textContent = m.icon || "🎓";
  icon.setAttribute("aria-hidden", "true");
  const name = document.createElement("span");
  name.className = "mb-name";
  name.textContent = majorName(m);
  b.append(icon, name);
  b.addEventListener("click", () => { Sound.click(); startRound(m); });
  return b;
}

function handleQuery(raw) {
  const q = raw.trim();
  if (!q) {
    el.formError.textContent = t("emptyInput");
    el.input.classList.remove("shake"); void el.input.offsetWidth; el.input.classList.add("shake");
    el.input.focus();
    return;
  }
  el.formError.textContent = "";
  const res = Matcher.match(q, { excludeId: CONFIG.GENERAL_ID });
  if (res.type === "match") startRound(res.major);
  else if (res.type === "suggest") { state.suggest = { q, candidates: res.candidates }; renderSuggest(); showScreen("suggest"); }
  else startRound(generalMajor(), { notice: q });
}

/* ---------- شاشة الاقتراحات ---------- */
function renderSuggest() {
  if (!state.suggest) return;
  el.suggestTitle.textContent = t("suggestTitle", { q: state.suggest.q });
  el.suggestList.innerHTML = "";
  state.suggest.candidates.forEach((m, i) => el.suggestList.appendChild(majorButton(m, i, "big")));
  el.btnGeneral.textContent = "🚀 " + t("generalBtn");
  renderMajorsGrid(el.gridSuggest);
}

/* ==========================================================================
   الجولة والأسئلة
   ========================================================================== */
function buildRound(major) {
  const pool = major.questions.map((_, i) => i);
  const n = Math.min(CONFIG.QUESTIONS_PER_ROUND, pool.length);
  const used = state.used[major.id] || (state.used[major.id] = new Set());
  let ordered = shuffle(pool.filter((i) => !used.has(i)));
  if (ordered.length < n) {
    // لا توجد أسئلة جديدة كافية: نكمل من الأسئلة القديمة ونبدأ دورة جديدة
    ordered = ordered.concat(shuffle(pool.filter((i) => used.has(i))));
    used.clear();
  }
  const picked = ordered.slice(0, n);
  picked.forEach((i) => used.add(i));

  return shuffle(picked).map((i) => {
    const src = major.questions[i];
    const optCount = (src.ar || src.en).options.length;
    return {
      src,
      order: shuffle([...Array(optCount).keys()]),          // ترتيب جديد للخيارات في كل جولة
      correct: Number.isInteger(src.answer) ? src.answer : 0, // الخيار الأول هو الصحيح افتراضيًا
      status: null,                                          // correct | wrong | timeout
      chosen: null,
    };
  });
}

function startRound(major, opts = {}) {
  stopTimer();
  Confetti.stop();
  state.major = major;
  state.notice = opts.notice || null;
  state.round = buildRound(major);
  state.index = 0;
  state.score = 0;
  state.busy = false;
  showScreen("quiz");
  renderQuestion();
  startTimer();
}

function renderQuizHeader() {
  const m = state.major;
  el.quizMajor.textContent = "";
  const icon = document.createElement("span"); icon.textContent = m.icon || "🎓"; icon.setAttribute("aria-hidden", "true");
  const name = document.createElement("span"); name.textContent = majorName(m);
  el.quizMajor.append(icon, name);
  el.qCounter.textContent = t("qCounter", { i: state.index + 1, n: state.round.length });
  el.scorePill.textContent = t("score") + ": " + state.score;
  el.btnQuit.textContent = t("quit");
  el.timer.setAttribute("aria-label", t("timerLabel"));
  el.notice.hidden = !state.notice;
  if (state.notice) el.notice.textContent = t("noMatch", { q: state.notice });
}

function renderQuestion() {
  const q = state.round[state.index];
  renderQuizHeader();
  el.qText.textContent = qPart(q.src, "q");
  const texts = qPart(q.src, "options");
  const letters = LETTERS[state.lang];
  el.options.innerHTML = "";
  q.order.forEach((orig, pos) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "option";
    b.dataset.c = String(pos % 4);
    b.dataset.pos = String(pos);
    const badge = document.createElement("span"); badge.className = "opt-badge"; badge.textContent = letters[pos] || pos + 1;
    const txt = document.createElement("span"); txt.className = "opt-text"; txt.dir = "auto"; txt.textContent = texts[orig];
    const mark = document.createElement("span"); mark.className = "opt-mark"; mark.setAttribute("aria-hidden", "true");
    b.append(badge, txt, mark);
    b.addEventListener("click", () => choose(pos));
    el.options.appendChild(b);
  });
  if (q.status) applyAnswered(q, false);
  else el.feedback.hidden = true;
  renderTopProgress();
}

function choose(pos) {
  const q = state.round[state.index];
  if (!q || q.status || state.busy) return;
  stopTimer();
  q.chosen = pos;
  q.status = q.order[pos] === q.correct ? "correct" : "wrong";
  if (q.status === "correct") { state.score++; Sound.correct(); }
  else Sound.wrong();
  applyAnswered(q, true);
}

function onTimeout() {
  const q = state.round[state.index];
  if (!q || q.status) return;
  q.status = "timeout";
  Sound.timeout();
  applyAnswered(q, true);
}

function applyAnswered(q, fresh) {
  const buttons = el.options.querySelectorAll(".option");
  const correctPos = q.order.indexOf(q.correct);
  buttons.forEach((b, pos) => {
    b.disabled = true;
    const mark = b.querySelector(".opt-mark");
    if (pos === correctPos) { b.classList.add("is-correct"); mark.textContent = "✓"; }
    else if (pos === q.chosen) {
      b.classList.add("is-wrong"); mark.textContent = "✗";
      if (fresh && !reducedMotion()) b.classList.add("shake");
    } else b.classList.add("is-dim");
  });

  const texts = qPart(q.src, "options");
  el.feedback.hidden = false;
  el.feedback.dataset.status = q.status;
  el.fbTitle.textContent = t(q.status);
  el.fbAnswer.hidden = q.status === "correct";
  el.fbAnswer.textContent = t("rightAnswer", { a: texts[q.correct] });
  el.fbExplain.textContent = qPart(q.src, "explain") || "";
  const isLast = state.index >= state.round.length - 1;
  el.btnNext.querySelector(".btn-label").textContent = isLast ? t("finish") : t("next");
  el.scorePill.textContent = t("score") + ": " + state.score;
  if (fresh) {
    el.scorePill.classList.toggle("bump", q.status === "correct");
    renderTopProgress();
    announce(t(q.status) + ". " + (qPart(q.src, "explain") || ""));
    el.btnNext.focus({ preventScroll: true });
    requestAnimationFrame(() => el.feedback.scrollIntoView({ block: "nearest", behavior: reducedMotion() ? "auto" : "smooth" }));
  }
}

function next() {
  if (state.busy) return;
  Sound.click();
  if (state.index >= state.round.length - 1) { showResult(); return; }
  const go = () => { state.index++; renderQuestion(); startTimer(); };
  if (reducedMotion()) { go(); return; }
  state.busy = true;
  el.qCard.classList.remove("q-enter");
  el.qCard.classList.add("q-leave");
  setTimeout(() => {
    el.qCard.classList.remove("q-leave");
    if (state.screen !== "quiz") { state.busy = false; return; } // خرج اللاعب أثناء الانتقال
    go();
    void el.qCard.offsetWidth;
    el.qCard.classList.add("q-enter");
    state.busy = false;
  }, 230);
}

/* ---------- المؤقت ---------- */
function startTimer() {
  stopTimer();
  const total = CONFIG.SECONDS_PER_QUESTION * 1000;
  state.deadline = performance.now() + total;
  state.lastTick = null;
  updateTimer(total);
  state.timerId = setInterval(() => {
    const left = state.deadline - performance.now();
    updateTimer(left);
    const sec = Math.ceil(left / 1000);
    if (sec <= CONFIG.TICK_LAST_SECONDS && sec > 0 && sec !== state.lastTick) {
      state.lastTick = sec;
      Sound.tick(sec);
    }
    if (left <= 0) { stopTimer(); onTimeout(); }
  }, 100);
}

function stopTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
}

function updateTimer(left) {
  const total = CONFIG.SECONDS_PER_QUESTION * 1000;
  const frac = Math.max(0, Math.min(1, left / total));
  const sec = Math.max(0, Math.ceil(left / 1000));
  el.timerRing.style.strokeDashoffset = String(TIMER_CIRC * (1 - frac));
  el.timerNum.textContent = String(sec);
  el.timer.dataset.level = sec <= CONFIG.TICK_LAST_SECONDS ? "danger" : frac <= 0.5 ? "warn" : "ok";
}

/* ==========================================================================
   النتيجة
   ========================================================================== */
function showResult() {
  stopTimer();
  renderResult();
  showScreen("result");
  const ratio = state.round.length ? state.score / state.round.length : 0;
  Sound.final(ratio);
  if (ratio >= CONFIG.HIGH_SCORE_RATIO) {
    setTimeout(() => Confetti.burst(ratio >= 1 ? 1.3 : 1), 250);
    if (ratio >= 1) setTimeout(() => Confetti.burst(0.8), 1100);
  }
}

function renderResult() {
  const n = state.round.length;
  const ratio = n ? state.score / n : 0;
  const tier = TIERS.find((x) => ratio >= x.min - 1e-9) || TIERS[TIERS.length - 1];
  el.resultMajor.textContent = (state.major.icon || "🎓") + "  " + t("resultIn", { major: majorName(state.major) });
  el.scoreNum.textContent = String(state.score);
  el.scoreOf.textContent = t("scoreOf", { n });
  el.tierEmoji.textContent = tier.emoji;
  el.tierTitle.textContent = tier[state.lang][0];
  el.tierMsg.textContent = tier[state.lang][1];
  el.btnPlayAgain.querySelector(".btn-label").textContent = t("playAgain");
  el.btnChangeMajor.querySelector(".btn-label").textContent = t("changeMajor");
  drawScoreRing(n);
  renderReview();
}

// حلقة النتيجة: قطعة لكل سؤال، ملوّنة بألوان جوجل إن كانت الإجابة صحيحة
function drawScoreRing(n) {
  const svg = el.scoreRing;
  const r = 52, C = 2 * Math.PI * r;
  const gap = n > 1 ? Math.min(18, (C / n) * 0.35) : 0; // يراعي الأطراف المدوّرة للخط
  const seg = C / n;
  let html = "";
  state.round.forEach((q, i) => {
    const color = q.status === "correct" ? GOOGLE_COLORS[i % 4] : "#E8EAED";
    html += `<circle class="ring-seg" cx="60" cy="60" r="${r}" stroke="${color}" stroke-dasharray="${(seg - gap).toFixed(2)} ${(C - seg + gap).toFixed(2)}" stroke-dashoffset="${(-i * seg).toFixed(2)}" style="animation-delay:${(i * 0.12).toFixed(2)}s"></circle>`;
  });
  svg.innerHTML = html;
}

function renderReview() {
  el.reviewList.innerHTML = "";
  state.round.forEach((q) => {
    const texts = qPart(q.src, "options");
    const li = document.createElement("li");
    li.className = "review-item";
    li.dataset.status = q.status || "timeout";
    const icon = document.createElement("span");
    icon.className = "rv-icon";
    icon.textContent = q.status === "correct" ? "✓" : q.status === "wrong" ? "✗" : "⏰";
    icon.setAttribute("aria-hidden", "true");
    const body = document.createElement("div");
    body.className = "rv-body";
    const qq = document.createElement("p"); qq.className = "rv-q"; qq.dir = "auto"; qq.textContent = qPart(q.src, "q");
    const ans = document.createElement("p"); ans.className = "rv-a";
    if (q.status === "correct") ans.textContent = "✓ " + texts[q.correct];
    else {
      ans.textContent = (q.status === "wrong" ? t("yourAnswer", { a: texts[q.order[q.chosen]] }) : t("noAnswer")) + " — " + t("rightAnswer", { a: texts[q.correct] });
    }
    body.append(qq, ans);
    li.append(icon, body);
    el.reviewList.appendChild(li);
  });
}

/* ==========================================================================
   اللغة والصوت
   ========================================================================== */
function applyLang() {
  const lang = state.lang;
  el.html.lang = lang;
  el.html.dir = lang === "ar" ? "rtl" : "ltr";
  document.title = t("docTitle");
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
  el.langBtnText.textContent = t("langShort");
  el.langBtn.setAttribute("aria-label", t("langLabel"));
  el.langBtn.title = t("langLabel");
  el.footer.textContent = t("footer");
  renderMute();
  renderStart();
  if (state.screen === "suggest") renderSuggest();
  if (state.screen === "quiz" && state.round.length) renderQuestion();
  if (state.screen === "result" && state.round.length) renderResult();
}

function renderMute() {
  const muted = Sound.isMuted();
  el.muteBtn.classList.toggle("is-muted", muted);
  el.muteBtn.setAttribute("aria-pressed", String(muted));
  const label = muted ? t("muteOn") : t("muteOff");
  el.muteBtn.setAttribute("aria-label", label);
  el.muteBtn.title = label;
}

/* ==========================================================================
   الأحداث
   ========================================================================== */
el.form.addEventListener("submit", (e) => { e.preventDefault(); Sound.click(); handleQuery(el.input.value); });
el.input.addEventListener("input", () => { el.formError.textContent = ""; });
el.btnGeneral.addEventListener("click", () => { Sound.click(); startRound(generalMajor()); });
el.btnBackSuggest.addEventListener("click", () => { Sound.click(); showScreen("start"); el.input.focus(); });
el.btnNext.addEventListener("click", next);
el.btnQuit.addEventListener("click", () => { Sound.click(); stopTimer(); showScreen("start"); });
el.btnPlayAgain.addEventListener("click", () => { Sound.click(); startRound(state.major, { notice: state.notice }); });
el.btnChangeMajor.addEventListener("click", () => {
  Sound.click(); Confetti.stop(); showScreen("start");
  el.input.select(); el.input.focus({ preventScroll: true });
});
el.langBtn.addEventListener("click", () => {
  state.lang = state.lang === "ar" ? "en" : "ar";
  try { localStorage.setItem(LANG_KEY, state.lang); } catch (e) { /* تجاهل */ }
  Sound.click();
  applyLang();
});
el.muteBtn.addEventListener("click", () => {
  Sound.toggle();
  renderMute();
  Sound.click(); // لا يُسمع إن كان الصوت مكتومًا
});
el.input.addEventListener("animationend", () => el.input.classList.remove("shake"));
el.options.addEventListener("animationend", (e) => e.target.classList.remove("shake"));
el.scorePill.addEventListener("animationend", () => el.scorePill.classList.remove("bump"));

// لوحة المفاتيح أثناء الأسئلة: 1–4 (أو ١–٤ أو A–D) للإجابة، Enter للتالي
document.addEventListener("keydown", (e) => {
  if (state.screen !== "quiz" || e.ctrlKey || e.metaKey || e.altKey) return;
  const q = state.round[state.index];
  if (!q) return;
  const map = { "1": 0, "2": 1, "3": 2, "4": 3, "١": 0, "٢": 1, "٣": 2, "٤": 3, a: 0, b: 1, c: 2, d: 3 };
  const k = e.key.toLowerCase();
  if (!q.status && k in map && map[k] < q.order.length) { e.preventDefault(); choose(map[k]); }
  else if (q.status && e.key === "Enter" && document.activeElement !== el.btnNext) { e.preventDefault(); next(); }
});

/* ---------- تشغيل ---------- */
applyLang();
showScreen("start");

// للتجربة من الـConsole: GameDebug.match("هندسة")
window.GameDebug = { match: (q) => Matcher.match(q, { excludeId: CONFIG.GENERAL_ID }), tokens: Matcher.tokens, state, CONFIG };
