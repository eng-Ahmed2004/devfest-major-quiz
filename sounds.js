/* ==========================================================================
   sounds.js — كل أصوات اللعبة مولّدة بـ Web Audio API (بدون أي ملفات صوتية)
   --------------------------------------------------------------------------
   • لا يُنشأ أي AudioContext ولا يُشغَّل أي صوت قبل أول ضغطة/لمسة/زر من المستخدم.
   • اختيار الكتم يُحفظ في localStorage ويُتذكَّر في الزيارات القادمة.
   • الواجهة العامة: window.Sound.click() / correct() / wrong() / timeout()
                     tick(secondsLeft) / final(ratio) / toggle() / isMuted()
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "gdgoc-quiz-muted";
  var MASTER_VOLUME = 0.9;          // مستوى الصوت العام (0 – 1)
  var AC = window.AudioContext || window.webkitAudioContext;

  var ctx = null;
  var master = null;
  var unlocked = false;             // يصبح true بعد أول تفاعل من المستخدم
  var muted = false;
  try { muted = localStorage.getItem(STORAGE_KEY) === "1"; } catch (e) { /* تخزين غير متاح */ }

  // نغمات موسيقية (Hz)
  var N = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
    C6: 1046.5, E6: 1318.51, G6: 1567.98, C7: 2093.0
  };

  /* ---------- إنشاء السياق الصوتي (فقط بعد تفاعل المستخدم) ---------- */
  function getCtx() {
    if (!unlocked || !AC) return null;
    if (!ctx) {
      ctx = new AC();
      var comp = ctx.createDynamicsCompressor();       // يمنع التشوّه عند تداخل الأصوات
      comp.threshold.value = -16;
      comp.knee.value = 20;
      comp.ratio.value = 4;
      comp.attack.value = 0.003;
      comp.release.value = 0.2;
      master = ctx.createGain();
      master.gain.value = muted ? 0 : MASTER_VOLUME;
      master.connect(comp);
      comp.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume().catch(function () {});
    return ctx;
  }

  var UNLOCK_EVENTS = ["pointerdown", "pointerup", "touchend", "keydown", "click"];
  function unlock() {
    unlocked = true;
    if (!muted) getCtx();
    // نزيل المستمعين فقط بعد أن يصبح السياق يعمل فعلًا (بعض الأحداث لا تُعدّ تفاعلًا كافيًا)
    if (ctx && ctx.state === "running") {
      UNLOCK_EVENTS.forEach(function (ev) { window.removeEventListener(ev, unlock, true); });
    }
  }
  UNLOCK_EVENTS.forEach(function (ev) { window.addEventListener(ev, unlock, true); });

  /* ---------- أدوات توليد الصوت ---------- */
  // نغمة واحدة بغلاف ناعم (attack / decay) لتجنّب الطقطقة
  function tone(freq, opt) {
    if (muted) return;               // لا نُنشئ سياقًا صوتيًا أصلًا عندما يكون الصوت مكتومًا
    var c = getCtx();
    if (!c) return;
    opt = opt || {};
    var at = opt.at || 0, dur = opt.dur || 0.15, vol = opt.vol || 0.18;
    var attack = opt.attack || 0.008, type = opt.type || "sine";
    var t0 = c.currentTime + 0.005 + at;

    var osc = c.createOscillator();
    var g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (opt.to) osc.frequency.exponentialRampToValueAtTime(opt.to, t0 + dur);
    if (opt.detune) osc.detune.setValueAtTime(opt.detune, t0);

    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

    osc.connect(g);
    g.connect(master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  // دفقة ضوضاء قصيرة مُرشّحة — تعطي صوت "تك" يشبه الساعة
  var noiseBuffer = null;
  function noise(opt) {
    if (muted) return;
    var c = getCtx();
    if (!c) return;
    opt = opt || {};
    if (!noiseBuffer) {
      noiseBuffer = c.createBuffer(1, Math.floor(c.sampleRate * 0.25), c.sampleRate);
      var d = noiseBuffer.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    var t0 = c.currentTime + 0.005 + (opt.at || 0);
    var dur = opt.dur || 0.04;
    var src = c.createBufferSource();
    src.buffer = noiseBuffer;
    var bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = opt.freq || 3000;
    bp.Q.value = opt.q || 4;
    var g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(opt.vol || 0.3, t0 + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(bp); bp.connect(g); g.connect(master);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  function chord(freqs, opt) {
    freqs.forEach(function (f) { tone(f, opt); });
  }

  /* ---------- أصوات اللعبة ---------- */
  var Sound = {
    // نقرة ناعمة لأي زر
    click: function () {
      tone(620, { dur: 0.08, vol: 0.1, to: 860, type: "sine" });
    },

    // نجاح مرح: أربيجيو صاعد + لمعة
    correct: function () {
      [N.C5, N.E5, N.G5, N.C6].forEach(function (f, i) {
        tone(f, { at: i * 0.07, dur: 0.22, vol: 0.14, type: "triangle" });
      });
      tone(N.C7, { at: 0.28, dur: 0.3, vol: 0.04, type: "sine" });
      tone(N.G6, { at: 0.33, dur: 0.25, vol: 0.03, type: "sine" });
    },

    // خطأ: نغمتان هابطتان منخفضتان وهادئتان (غير مزعجة)
    wrong: function () {
      tone(330, { dur: 0.16, vol: 0.1, type: "triangle", to: 311 });
      tone(247, { at: 0.13, dur: 0.3, vol: 0.1, type: "triangle", to: 220 });
    },

    // انتهى الوقت: ثلاث نغمات هابطة ناعمة
    timeout: function () {
      tone(N.A4, { dur: 0.14, vol: 0.09, type: "triangle" });
      tone(N.F4, { at: 0.14, dur: 0.14, vol: 0.09, type: "triangle" });
      tone(N.D4, { at: 0.28, dur: 0.32, vol: 0.09, type: "triangle" });
    },

    // تكتكة آخر الثواني — الأخيرة أعلى قليلًا
    tick: function (secondsLeft) {
      var last = secondsLeft <= 1;
      noise({ freq: last ? 4200 : 3200, q: 5, dur: 0.035, vol: 0.28 });
      tone(last ? 1320 : 990, { dur: 0.06, vol: 0.05, type: "sine" });
    },

    // جملة موسيقية للنتيجة النهائية — أقوى كلما كانت النتيجة أعلى
    final: function (ratio) {
      if (ratio >= 0.8) {
        // فانفار احتفالي
        [N.G4, N.C5, N.E5, N.G5].forEach(function (f, i) {
          tone(f, { at: i * 0.11, dur: 0.2, vol: 0.13, type: "triangle" });
        });
        chord([N.C5, N.E5, N.G5, N.C6], { at: 0.46, dur: 1.1, vol: 0.09, type: "triangle", attack: 0.02 });
        chord([N.C4, N.G4], { at: 0.46, dur: 1.1, vol: 0.07, type: "sine", attack: 0.02 });
        [N.C6, N.E6, N.G6, N.C7].forEach(function (f, i) {
          tone(f, { at: 0.5 + i * 0.07, dur: 0.25, vol: ratio >= 1 ? 0.05 : 0.035, type: "sine" });
        });
        if (ratio >= 1) {
          // لمسة إضافية للعلامة الكاملة
          [N.E6, N.G6, N.C7].forEach(function (f, i) {
            tone(f, { at: 1.0 + i * 0.09, dur: 0.35, vol: 0.04, type: "sine" });
          });
        }
      } else if (ratio >= 0.4) {
        // لحن لطيف متوسط
        [N.C5, N.E5, N.G5].forEach(function (f, i) {
          tone(f, { at: i * 0.13, dur: 0.22, vol: 0.11, type: "triangle" });
        });
        chord([N.C5, N.E5, N.G5], { at: 0.42, dur: 0.7, vol: 0.07, type: "triangle", attack: 0.02 });
      } else {
        // لحن هادئ ومشجّع
        [N.E4, N.G4, N.C5].forEach(function (f, i) {
          tone(f, { at: i * 0.17, dur: 0.3, vol: 0.08, type: "sine" });
        });
        chord([N.C4, N.E4, N.G4], { at: 0.55, dur: 0.7, vol: 0.05, type: "sine", attack: 0.03 });
      }
    },

    /* ---------- التحكم بالكتم ---------- */
    isMuted: function () { return muted; },

    setMuted: function (value) {
      muted = !!value;
      try { localStorage.setItem(STORAGE_KEY, muted ? "1" : "0"); } catch (e) { /* تجاهل */ }
      if (!muted && unlocked) getCtx();
      if (ctx && master) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(muted ? 0 : MASTER_VOLUME, ctx.currentTime, 0.02);
      }
      return muted;
    },

    toggle: function () { return Sound.setMuted(!muted); },

    // للتشخيص فقط
    _debug: function () {
      return { supported: !!AC, unlocked: unlocked, hasContext: !!ctx, state: ctx ? ctx.state : null, muted: muted };
    }
  };

  window.Sound = Sound;
})();
