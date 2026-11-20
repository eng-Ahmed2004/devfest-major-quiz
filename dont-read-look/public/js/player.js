// Player (phone) screen: join a room, answer each question once, see results.
import {
  db, configured, signIn, watchServerOffset, serverNow, store,
  ref, get, set, update, onValue, onDisconnect, serverTimestamp,
} from './firebase.js';
import { GAME, COLORS } from './game-config.js';
import { colorById, cleanName, nameKey, uniqueName, shuffle } from './logic.js';
import { t, applyI18n, toggleLang, colorName, colorWord, fmtSeconds } from './i18n.js';
import { sfx, bindMuteButton } from './sound.js';
import { $, showScreen, toast, colorOption, confetti, replay, connectionBanner } from './ui.js';

const S = {
  uid: null,
  code: null,
  name: '',
  meta: undefined,
  live: null,
  score: null,
  me: undefined,
  hadMe: false,
  kicked: false,
  unsubs: [],
  answered: {},     // question key -> colour id, or null when the write was refused (too late)
  checked: new Set(),
  viewKey: '',
  resultFor: null,
  finalFor: null,
  timerRaf: 0,
  showNames: store.get('showNames', GAME.showColorNamesDefault),
};

const R = (p) => ref(db, `rooms/${S.code}/${p}`);

// --------------------------------------------------------------------------- boot
async function boot() {
  applyI18n();
  bindChrome();
  demoWord();
  if (!configured) return bootMsg(t('notConfigured'));
  try {
    S.uid = (await signIn()).uid;
  } catch (err) {
    console.error(err);
    return bootMsg(t('authError'));
  }
  watchServerOffset();
  connectionBanner(onValue, ref, db, t);

  const params = new URLSearchParams(location.search);
  const urlCode = (params.get('room') || params.get('r') || '').replace(/\D/g, '').slice(0, 4);
  const saved = store.get('player');
  const code = urlCode.length === 4 ? urlCode : saved && saved.code;
  if (code && (await isMember(code))) return attach(code);
  showJoin({ code: urlCode, name: (saved && saved.name) || '' });
}

function bootMsg(msg) {
  showScreen('s-boot');
  $('#bootMsg').removeAttribute('data-i18n');
  $('#bootMsg').textContent = msg;
  $('.spinner').hidden = true;
}

function bindChrome() {
  $('#btnLang').addEventListener('click', toggleLang);
  bindMuteButton($('#btnMute'), t);
  const namesBtn = $('#btnNames');
  const renderNames = () => {
    document.body.classList.toggle('show-names', S.showNames);
    namesBtn.setAttribute('aria-pressed', String(S.showNames));
  };
  namesBtn.addEventListener('click', () => {
    S.showNames = !S.showNames;
    store.set('showNames', S.showNames);
    renderNames();
    toast(`${t('showNames')}: ${S.showNames ? '✓' : '✗'}`, 1400);
  });
  renderNames();

  $('#joinForm').addEventListener('submit', (e) => {
    e.preventDefault();
    join();
  });
  $('#inCode').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (e.target.value.length === 4 && !$('#inName').value) $('#inName').focus();
  });
  $('#btnChangeRoom').addEventListener('click', leaveRoom);
  $('#btnJoinOther').addEventListener('click', leaveRoom);

  window.addEventListener('langchange', () => {
    demoWord();
    S.viewKey = '';
    route();
  });
  window.addEventListener('keydown', (e) => {
    if (document.body.dataset.screen !== 's-question') return;
    const n = Number(e.key);
    if (n >= 1 && n <= 4) {
      const btn = $('#pOptions').children[n - 1];
      if (btn) btn.dispatchEvent(new Event('pointerdown'));
    }
  });
  document.addEventListener('visibilitychange', keepAwake);
}

let wakeLock = null;
async function keepAwake() {
  try {
    if (document.visibilityState === 'visible' && 'wakeLock' in navigator && !wakeLock && S.code) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => (wakeLock = null));
    }
  } catch { /* not allowed */ }
}

/** A small Stroop example on the join card: a colour word in a different ink. */
function demoWord() {
  const el = $('#demoWord');
  const [a, b] = shuffle(COLORS.filter((c) => c.base));
  el.textContent = colorWord(a);
  el.style.color = b.hex;
}

// --------------------------------------------------------------------------- join
function showJoin({ code = '', name = '', error = '' } = {}) {
  teardown();
  S.viewKey = 'join';
  $('#codeBadge').hidden = true;
  showScreen('s-join');
  const inCode = $('#inCode');
  const inName = $('#inName');
  if (code) inCode.value = code;
  if (name) inName.value = name;
  $('#joinError').textContent = error;
  setJoinBusy(false);
  (inCode.value.length === 4 ? inName : inCode).focus({ preventScroll: true });
}

function setJoinBusy(busy) {
  const btn = $('#btnJoin');
  btn.disabled = busy;
  btn.textContent = busy ? t('joining') : t('join');
}

async function isMember(code) {
  try {
    return (await get(ref(db, `rooms/${code}/players/${S.uid}`))).exists();
  } catch {
    return false;
  }
}

async function join() {
  const code = $('#inCode').value.trim();
  const base = cleanName($('#inName').value);
  const err = $('#joinError');
  err.textContent = '';
  if (!/^\d{4}$/.test(code)) return (err.textContent = t('errCode'));
  if (!base) return (err.textContent = t('errName'));
  setJoinBusy(true);
  try {
    const room = `rooms/${code}`;
    const meta = (await get(ref(db, `${room}/meta`)).catch(() => null))?.val();
    if (!meta) throw new Error('no-room');
    if ((await get(ref(db, `${room}/players/${S.uid}`))).exists()) {
      S.name = base;
      return attach(code);
    }
    if ((await get(ref(db, `${room}/kicked/${S.uid}`))).exists()) throw new Error('kicked');

    for (let attempt = 0; attempt < 6; attempt++) {
      const [slotsSnap, namesSnap] = await Promise.all([get(ref(db, `${room}/slots`)), get(ref(db, `${room}/names`))]);
      const slots = slotsSnap.val() || {};
      const free = [];
      for (let n = 0; n < GAME.maxPlayers; n++) if (!slots[n]) free.push(n);
      if (!free.length) throw new Error('full');
      const slot = free[Math.floor(Math.random() * Math.min(free.length, 8))];
      const name = uniqueName(base, Object.keys(namesSnap.val() || {}));
      const key = nameKey(name);
      try {
        await update(ref(db, room), {
          [`slots/${slot}`]: S.uid,
          [`names/${key}`]: S.uid,
          [`players/${S.uid}`]: { name, slot: String(slot), key, joinedAt: serverTimestamp() },
        });
        S.name = name;
        store.set('player', { code, name: base });
        if (name !== base) toast(t('renamed', { name }), 3500);
        sfx.correct();
        return attach(code);
      } catch (e) {
        console.warn('join attempt', attempt, e.code || e);
        await new Promise((r) => setTimeout(r, 150 + Math.random() * 300));
      }
    }
    throw new Error('generic');
  } catch (e) {
    setJoinBusy(false);
    const msg = {
      'no-room': t('errNoRoom'),
      kicked: t('errKicked'),
      full: t('errFull', { max: GAME.maxPlayers }),
    }[e.message] || t('errGeneric');
    err.textContent = msg;
    if (e.message === 'generic') console.error(e);
  }
}

// --------------------------------------------------------------------------- room
function teardown() {
  S.unsubs.forEach((u) => u());
  S.unsubs = [];
  cancelAnimationFrame(S.timerRaf);
  S.code = null;
  S.meta = undefined;
  S.live = null;
  S.score = null;
  S.me = undefined;
  S.hadMe = false;
  S.kicked = false;
  S.answered = {};
  S.checked = new Set();
  S.viewKey = '';
}

function attach(code) {
  teardown();
  S.code = code;
  const saved = store.get('player') || {};
  store.set('player', { code, name: saved.name || S.name });
  $('#codeBadge').textContent = code;
  $('#codeBadge').hidden = false;
  keepAwake();

  // keep the URL clean but keep ?profile= for testing
  const params = new URLSearchParams(location.search);
  if (params.has('room') || params.has('r')) {
    params.delete('room');
    params.delete('r');
    const qs = params.toString();
    history.replaceState(null, '', location.pathname + (qs ? `?${qs}` : ''));
  }

  const on = (path, cb) => S.unsubs.push(onValue(R(path), cb, (e) => console.warn(path, e.code)));
  on(`players/${S.uid}`, (snap) => {
    S.me = snap.val();
    if (S.me) {
      S.hadMe = true;
      S.name = S.me.name;
    }
    route();
  });
  on(`kicked/${S.uid}`, (snap) => {
    S.kicked = snap.exists();
    route();
  });
  on('meta', (snap) => {
    S.meta = snap.val();
    route();
  });
  on('live', (snap) => {
    S.live = snap.val();
    route();
  });
  on(`scores/${S.uid}`, (snap) => {
    S.score = snap.val();
    route();
  });

  // presence: lets the host know who is still connected
  S.unsubs.push(
    onValue(ref(db, '.info/connected'), async (snap) => {
      if (snap.val() !== true || !S.code) return;
      try {
        await onDisconnect(R(`presence/${S.uid}`)).remove();
        await set(R(`presence/${S.uid}`), true);
      } catch { /* not a member yet */ }
    }),
  );
}

function leaveRoom() {
  const saved = store.get('player') || {};
  store.set('player', { code: '', name: saved.name || S.name });
  showJoin({ code: '', name: saved.name || S.name });
}

// --------------------------------------------------------------------------- routing
function options(live) {
  const o = live.o || [];
  return Array.isArray(o) ? o : Object.keys(o).sort().map((k) => o[k]);
}

function route() {
  if (!S.code) return;
  if (S.kicked) {
    store.set('player', { code: '', name: (store.get('player') || {}).name || '' });
    return go('kicked', () => showScreen('s-kicked'));
  }
  if (S.meta === undefined || S.me === undefined) return; // still loading
  if (S.meta === null) {
    const name = (store.get('player') || {}).name || S.name;
    store.set('player', { code: '', name });
    return showJoin({ name, error: t('errNoRoom') });
  }
  if (!S.me) {
    if (S.hadMe) return; // removal; the kicked listener decides what to show
    const name = (store.get('player') || {}).name || S.name;
    return showJoin({ code: S.code, name });
  }

  const m = S.meta;
  const key = String(m.current);
  switch (m.state) {
    case 'lobby':
      return go(`wait:${S.name}`, renderWait);
    case 'ready':
      return go(`ready:${key}`, () => renderReady(m));
    case 'question': {
      if (!S.live || S.live.key !== key) return go(`ready:${key}`, () => renderReady(m));
      if (S.answered[key] === null) return go(`timeup:${key}`, () => showScreen('s-timeup'));
      if (S.answered[key]) return go(`done:${key}`, () => renderDone(S.answered[key]));
      if (!checkedOwnAnswer(key)) return undefined;
      return go(`question:${key}`, () => renderQuestion(S.live, m));
    }
    case 'closed':
      cancelAnimationFrame(S.timerRaf);
      if (!S.answered[key] && !checkedOwnAnswer(key)) return undefined;
      if (S.answered[key]) return go(`done:${key}`, () => renderDone(S.answered[key]));
      return go(`timeup:${key}`, () => showScreen('s-timeup'));
    case 'reveal':
      if (S.score && S.score.last && S.score.last.q === m.current) return go(`result:${key}`, () => renderResult(m));
      return go(`late:${key}`, () => showScreen('s-late'));
    case 'final':
      if (!S.score) return go('late:final', () => renderWait());
      return go(`final:${S.score.score}:${S.score.rank}`, () => renderFinal(m));
    default:
      return undefined;
  }
}

/** After a reload, find out once whether this player already answered question `key`. */
function checkedOwnAnswer(key) {
  if (S.checked.has(key)) return true;
  S.checked.add(key);
  get(R(`answers/${key}/${S.uid}`))
    .then((snap) => {
      if (snap.exists()) S.answered[key] = snap.val().c;
    })
    .catch(() => {})
    .finally(route);
  return false;
}

/** Render a view only when it actually changes. */
function go(key, render) {
  if (S.viewKey === key) return;
  S.viewKey = key;
  render();
}

// --------------------------------------------------------------------------- views
function renderWait() {
  $('#myName').textContent = S.name;
  $('#waitRoom').textContent = t('roomLabel', { code: S.code });
  showScreen('s-wait');
}

function renderReady(m) {
  $('#pReadyQ').textContent = m.current >= 0 ? t('questionOf', { n: m.current + 1, total: m.total }) : '';
  showScreen('s-ready');
}

function renderQuestion(live, m) {
  const key = live.key;
  const ink = colorById(live.i);
  const word = colorById(live.w);
  const w = $('#pWord');
  w.textContent = colorWord(word);
  w.style.color = ink.hex;
  $('#pStage').dataset.stage = GAME.wordStage;

  const grid = $('#pOptions');
  grid.innerHTML = '';
  grid.classList.remove('locked');
  options(live).forEach((id) => {
    const c = colorById(id);
    if (!c) return;
    const btn = colorOption(c, { tag: 'button', label: colorName(c) });
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      answer(key, id, btn);
    });
    btn.addEventListener('click', (e) => e.preventDefault());
    grid.appendChild(btn);
  });
  showScreen('s-question');
  replay(w, 'word-in');

  // local countdown bar (display only — the score uses server timestamps)
  const fill = $('#pTimer');
  const end = live.startAt + m.duration;
  cancelAnimationFrame(S.timerRaf);
  const frame = () => {
    const left = end - serverNow();
    fill.style.transform = `scaleX(${Math.max(0, Math.min(1, left / m.duration))})`;
    if (left <= 0) {
      if (!S.answered[key] && S.meta && S.meta.state === 'question') {
        S.answered[key] = null;
        S.viewKey = '';
        route();
      }
      return;
    }
    S.timerRaf = requestAnimationFrame(frame);
  };
  S.timerRaf = requestAnimationFrame(frame);
}

function answer(key, colorId, btn) {
  if (S.answered[key] !== undefined) return; // first tap is final
  S.answered[key] = colorId;
  cancelAnimationFrame(S.timerRaf);
  sfx.tap();
  buzz(25);
  const grid = $('#pOptions');
  grid.classList.add('locked');
  btn.classList.add('chosen');
  set(R(`answers/${key}/${S.uid}`), { c: colorId, t: serverTimestamp() }).catch(async (err) => {
    console.warn('answer refused', err.code || err);
    const mine = await get(R(`answers/${key}/${S.uid}`)).catch(() => null);
    if (mine && mine.exists()) return;
    S.answered[key] = null; // arrived after the deadline
    S.viewKey = '';
    route();
  });
  setTimeout(() => {
    S.viewKey = '';
    route();
  }, 220);
}

function renderDone(colorId) {
  const c = colorById(colorId);
  const box = $('#doneChip');
  box.innerHTML = '';
  if (c) {
    const el = colorOption(c, { tag: 'div', label: colorName(c), showName: true });
    box.appendChild(el);
  }
  showScreen('s-done');
}

const ICONS = {
  ok: '<svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg>',
  bad: '<svg viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  none: '<svg viewBox="0 0 24 24"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61 1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.96 8.96 0 0 0 12 4a9 9 0 1 0 9 9c0-2.12-.74-4.07-1.97-5.61zM12 20a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"/></svg>',
};

function renderResult(m) {
  const s = S.score;
  const last = s.last;
  const answered = last.ms >= 0;
  const kind = last.ok ? 'ok' : answered ? 'bad' : 'none';
  const icon = $('#resIcon');
  icon.className = `result-icon ${kind}`;
  icon.innerHTML = ICONS[kind];
  $('#resTitle').textContent = last.ok ? t('correct') : answered ? t('wrong') : t('noAnswer');
  $('#resultCard').dataset.kind = kind;
  countUp($('#resPoints'), last.pts, '+');
  $('#resTime').textContent = answered && last.ok ? t('yourTime', { s: fmtSeconds(last.ms) }) : '';
  const box = $('#resCorrect');
  box.innerHTML = '';
  if (!last.ok && S.live && S.live.key === String(m.current)) {
    const ink = colorById(S.live.i);
    if (ink) {
      const label = document.createElement('p');
      label.className = 'muted';
      label.textContent = t('correctWas', { color: colorName(ink) });
      box.appendChild(label);
      box.appendChild(colorOption(ink, { tag: 'div', label: colorName(ink), showName: true }));
    }
  }
  $('#resTotal').textContent = String(s.score);
  $('#resRank').textContent = t('rankOf', { rank: s.rank, n: s.n });
  showScreen('s-result');
  replay(icon, 'pop-in');
  if (S.resultFor !== m.current) {
    S.resultFor = m.current;
    if (last.ok) sfx.correct();
    else sfx.wrong();
    buzz(last.ok ? [20, 40, 20] : 60);
  }
}

function renderFinal(m) {
  const s = S.score;
  $('#finalRank').textContent = `#${s.rank}`;
  $('#finalOf').textContent = t('rankOf', { rank: s.rank, n: s.n });
  $('#finalScore').textContent = `${s.score} ${t('pts')}`;
  const podium = s.rank <= 3;
  $('#podiumMsg').hidden = !podium;
  $('#finalCard').dataset.rank = String(Math.min(s.rank, 4));
  showScreen('s-final');
  const marker = `${S.code}:${m.createdAt}`;
  if (S.finalFor !== marker) {
    S.finalFor = marker;
    if (podium) {
      confetti({ duration: 3500, density: 0.6 });
      sfx.correct();
    }
  }
}

/** Vibrate only after the player has interacted with the page (browsers block it otherwise). */
function buzz(pattern) {
  if (navigator.vibrate && (!navigator.userActivation || navigator.userActivation.hasBeenActive)) navigator.vibrate(pattern);
}

function countUp(el, value, prefix = '') {
  el.textContent = `${prefix}${value}`;
  if (document.hidden || !value) return;
  const start = performance.now();
  const dur = 600;
  const step = (now) => {
    const k = Math.min(1, (now - start) / dur);
    el.textContent = `${prefix}${Math.round(value * (1 - Math.pow(1 - k, 3)))}`;
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

boot();
