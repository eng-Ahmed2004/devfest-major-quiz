// Arabic / English strings. Arabic (RTL) is the default.
import { store } from './firebase.js';

const DICT = {
  ar: {
    slogan: 'لا تقرأ… شوف!',
    event: 'GDGoC · DevFest',
    langBtn: 'English',
    langShort: 'EN',
    mute: 'كتم الصوت',
    unmute: 'تشغيل الصوت',
    rule: 'اختر لون الخط… لا معنى الكلمة',
    notConfigured: 'لم تُضبط إعدادات Firebase بعد. ضع القيم في public/js/firebase-config.js',
    connecting: 'جارٍ الاتصال…',
    offline: 'انقطع الاتصال… نحاول مجددًا',
    authError: 'تعذّر تسجيل الدخول المجهول. تأكد من تفعيل Anonymous في Firebase Authentication.',
    questionOf: 'السؤال {n} من {total}',
    pts: 'نقطة',
    sec: 'ث',
    getReady: 'استعدوا!',
    timeUp: 'انتهى الوقت!',

    // host
    creatingRoom: 'جارٍ إنشاء الغرفة…',
    joinOnPhone: 'ادخل من هاتفك',
    roomCode: 'كود الغرفة',
    scanOrOpen: 'امسح الرمز أو افتح',
    players: 'اللاعبون',
    waitingPlayers: 'بانتظار انضمام اللاعبين…',
    start: 'ابدأ اللعبة',
    kick: 'إخراج',
    kickConfirm: 'تأكيد؟',
    kickAria: 'إخراج {name}',
    kicked: 'تم إخراج {name}',
    answered: 'أجاب {n} من {total}',
    endNow: 'إنهاء الآن',
    correctColor: 'اللون الصحيح',
    wordSaid: 'الكلمة تقول «{word}» لكن الخط {ink}',
    congruent: 'الكلمة ولون الخط متطابقان هذه المرة!',
    fastest: 'الأسرع إجابةً صحيحة',
    noCorrect: 'لم يُجب أحد إجابة صحيحة',
    leaderboard: 'الترتيب',
    next: 'التالي',
    showResults: 'النتائج النهائية',
    finalResults: 'المنصة النهائية',
    newGame: 'لعبة جديدة',
    newRoom: 'غرفة جديدة',
    fullscreen: 'ملء الشاشة',
    nextIn: 'التالي خلال {s}',
    roomLost: 'لم تعد الغرفة موجودة، أنشئ غرفة جديدة',
    offlineBadge: 'غير متصل',

    // player
    joinTitle: 'انضم إلى اللعبة',
    codeLabel: 'كود الغرفة',
    nameLabel: 'اسمك',
    namePh: 'اكتب اسمك',
    join: 'دخول',
    joining: 'جارٍ الدخول…',
    errCode: 'الكود 4 أرقام',
    errName: 'اكتب اسمك أولًا',
    errNoRoom: 'لا توجد غرفة بهذا الكود',
    errFull: 'الغرفة ممتلئة ({max} لاعبًا)',
    errKicked: 'أخرجك المضيف من هذه الغرفة',
    errEnded: 'انتهت هذه اللعبة، انتظر لعبة جديدة',
    errGeneric: 'حدث خطأ، حاول مجددًا',
    youAreIn: 'أنت في اللعبة!',
    waitHost: 'انتظر حتى يبدأ المضيف',
    renamed: 'الاسم مستخدم، فأصبح اسمك «{name}»',
    howTo: 'ستظهر كلمة لون مكتوبة بلون آخر. اضغط لون الخط بأسرع ما يمكن!',
    done: 'تم!',
    waitOthers: 'بانتظار الباقين…',
    correct: 'صحيح!',
    wrong: 'خطأ',
    noAnswer: 'لم تُجب',
    total: 'مجموعك',
    yourRank: 'ترتيبك',
    rankOf: '{rank} من {n}',
    yourTime: 'زمنك {s} ث',
    gameOver: 'انتهت اللعبة!',
    finalRank: 'ترتيبك النهائي',
    onPodium: 'أنت على المنصة!',
    thanks: 'شكرًا للعب!',
    stayForNext: 'ابقَ هنا، قد يبدأ المضيف لعبة جديدة',
    showNames: 'أسماء الألوان على الأزرار',
    changeRoom: 'تغيير الغرفة',
    removedTitle: 'تم إخراجك',
    joinOther: 'دخول غرفة أخرى',
    lateJoin: 'اللعبة جارية، ستشارك من السؤال القادم',
    correctWas: 'الصحيح: {color}',
    pickInk: 'اختر لون الخط',
    roomLabel: 'الغرفة {code}',
  },
  en: {
    slogan: "Don't read… look!",
    event: 'GDGoC · DevFest',
    langBtn: 'عربي',
    langShort: 'ع',
    mute: 'Mute',
    unmute: 'Unmute',
    rule: 'Pick the ink colour… not the word',
    notConfigured: 'Firebase is not configured yet. Put your values in public/js/firebase-config.js',
    connecting: 'Connecting…',
    offline: 'Connection lost… retrying',
    authError: 'Anonymous sign-in failed. Make sure Anonymous is enabled in Firebase Authentication.',
    questionOf: 'Question {n} of {total}',
    pts: 'pts',
    sec: 's',
    getReady: 'Get ready!',
    timeUp: "Time's up!",

    creatingRoom: 'Creating room…',
    joinOnPhone: 'Join on your phone',
    roomCode: 'Room code',
    scanOrOpen: 'Scan or open',
    players: 'Players',
    waitingPlayers: 'Waiting for players to join…',
    start: 'Start game',
    kick: 'Remove',
    kickConfirm: 'Sure?',
    kickAria: 'Remove {name}',
    kicked: '{name} was removed',
    answered: '{n} of {total} answered',
    endNow: 'End now',
    correctColor: 'Correct colour',
    wordSaid: 'The word said “{word}” but the ink was {ink}',
    congruent: 'Word and ink matched this time!',
    fastest: 'Fastest correct answers',
    noCorrect: 'Nobody got it right',
    leaderboard: 'Leaderboard',
    next: 'Next',
    showResults: 'Final results',
    finalResults: 'Final podium',
    newGame: 'New game',
    newRoom: 'New room',
    fullscreen: 'Fullscreen',
    nextIn: 'Next in {s}',
    roomLost: 'This room no longer exists — create a new one',
    offlineBadge: 'offline',

    joinTitle: 'Join the game',
    codeLabel: 'Room code',
    nameLabel: 'Your name',
    namePh: 'Type your name',
    join: 'Join',
    joining: 'Joining…',
    errCode: 'The code is 4 digits',
    errName: 'Enter your name first',
    errNoRoom: 'No room with this code',
    errFull: 'The room is full ({max} players)',
    errKicked: 'The host removed you from this room',
    errEnded: 'This game has ended — wait for a new one',
    errGeneric: 'Something went wrong, try again',
    youAreIn: "You're in!",
    waitHost: 'Wait for the host to start',
    renamed: 'That name was taken, so you are “{name}”',
    howTo: 'A colour word appears in a different ink. Tap the ink colour as fast as you can!',
    done: 'Done!',
    waitOthers: 'Waiting for the others…',
    correct: 'Correct!',
    wrong: 'Wrong',
    noAnswer: 'No answer',
    total: 'Your total',
    yourRank: 'Your rank',
    rankOf: '{rank} of {n}',
    yourTime: 'Your time {s}s',
    gameOver: 'Game over!',
    finalRank: 'Final rank',
    onPodium: "You're on the podium!",
    thanks: 'Thanks for playing!',
    stayForNext: 'Stay here — the host may start a new game',
    showNames: 'Colour names on buttons',
    changeRoom: 'Change room',
    removedTitle: 'You were removed',
    joinOther: 'Join another room',
    lateJoin: 'Game in progress — you will play from the next question',
    correctWas: 'Answer: {color}',
    pickInk: 'Pick the ink colour',
    roomLabel: 'Room {code}',
  },
};

let lang = store.get('lang', 'ar') === 'en' ? 'en' : 'ar';

export function getLang() {
  return lang;
}

export function t(key, vars = {}) {
  const s = DICT[lang][key] ?? DICT.ar[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));
}

export function applyI18n(root = document) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  root.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    el.placeholder = t(el.dataset.i18nPh);
  });
  root.querySelectorAll('[data-i18n-label]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nLabel));
    el.title = t(el.dataset.i18nLabel);
  });
}

export function setLang(next) {
  lang = next === 'en' ? 'en' : 'ar';
  store.set('lang', lang);
  applyI18n();
  window.dispatchEvent(new CustomEvent('langchange'));
}

export function toggleLang() {
  setLang(lang === 'ar' ? 'en' : 'ar');
}

/** Colour name in the current language. */
export function colorName(c) {
  return c ? (lang === 'ar' ? c.ar : c.en) : '';
}

/** The colour word shown in a question. */
export function colorWord(c) {
  return c ? (lang === 'ar' ? c.ar : c.en.toUpperCase()) : '';
}

export function fmtSeconds(ms) {
  return (ms / 1000).toFixed(2);
}
