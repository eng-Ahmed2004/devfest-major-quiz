// Host screen: creates the room, drives the game, scores answers after each timer.
import {
  db, configured, signIn, watchServerOffset, serverNow, store,
  ref, get, set, update, remove, onValue, query, orderByValue, endAt, serverTimestamp,
} from './firebase.js';
import { GAME } from './game-config.js';
import { generateQuestions, scoreQuestion, standings, colorById } from './logic.js';
import { t, applyI18n, toggleLang, colorName, colorWord, fmtSeconds } from './i18n.js';
import { sfx, bindMuteButton } from './sound.js';
import { $, showScreen, toast, colorOption, confetti, stopConfetti, replay, connectionBanner } from './ui.js';

const D = GAME.questionSeconds * 1000;
const S = {
  uid: null,
  code: null,
  meta: null,
  questions: [],
  players: {},
  presence: {},
  scores: {},
  answers: {},
  startAt: 0,
  current: -1,
  view: 'boot',
  token: 0,          // bumps on every phase change so stale timers stop
  finishing: null,
  roomUnsubs: [],
  answersUnsub: null,
  timerInt: 0,
  timerRaf: 0,
  lastTick: null,
  autoNextInt: 0,
  results: null,
  chipEls: new Map(),
  busy: false,
};

const R = (p = '') => ref(db, `rooms/${S.code}${p ? '/' + p : ''}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --------------------------------------------------------------------------- boot
function bootError(msg, retry = true) {
  showScreen('s-boot');
  S.view = 'boot';
  $('#bootMsg').textContent = msg;
  $('#bootMsg').removeAttribute('data-i18n');
  $('.spinner').hidden = true;
  $('#btnRetry').hidden = !retry;
}

async function boot() {
  applyI18n();
  bindChrome();
  if (!configured) return bootError(t('notConfigured'), false);
  try {
    const user = await signIn();
    S.uid = user.uid;
  } catch (err) {
    console.error(err);
    return bootError(t('authError'), false);
  }
  watchServerOffset();
  connectionBanner(onValue, ref, db, t);
  await serverOffsetReady();
  const saved = store.get('hostRoom');
  if (saved && (await tryResume(saved))) return;
  await createRoom();
}

function serverOffsetReady() {
  return new Promise((resolve) => {
    const stop = onValue(ref(db, '.info/serverTimeOffset'), () => {
      stop();
      resolve();
    });
    setTimeout(resolve, 2000);
  });
}

function bindChrome() {
  $('#btnLang').addEventListener('click', toggleLang);
  bindMuteButton($('#btnMute'), t);
  $('#btnFullscreen').addEventListener('click', toggleFullscreen);
  $('#btnRetry').addEventListener('click', () => newRoom());
  $('#btnStart').addEventListener('click', () => startGame());
  $('#btnNext').addEventListener('click', () => nextStep());
  $('#btnEndNow').addEventListener('click', () => endNow());
  $('#btnNewGame').addEventListener('click', () => newGame());
  $('#btnNewRoom').addEventListener('click', () => newRoom());
  window.addEventListener('langchange', rerender);
  window.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea')) return;
    if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    if (e.key === ' ' || e.key === 'Enter') {
      const primary = {
        lobby: '#btnStart', reveal: '#btnNext', final: '#btnNewGame',
      }[S.view];
      const btn = primary && $(primary);
      if (btn && !btn.disabled) {
        e.preventDefault();
        btn.click();
      }
    }
  });
  document.addEventListener('visibilitychange', keepAwake);
  window.addEventListener('pointerdown', keepAwake, { once: true });
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.().catch(() => {});
}

let wakeLock = null;
async function keepAwake() {
  try {
    if (document.visibilityState === 'visible' && 'wakeLock' in navigator && !wakeLock) {
      wakeLock = await navigator.wakeLock.request('screen');
      wakeLock.addEventListener('release', () => (wakeLock = null));
    }
  } catch { /* not allowed */ }
}

// --------------------------------------------------------------------------- rooms
async function cleanupOldRooms() {
  try {
    const cutoff = serverNow() - GAME.roomTtlHours * 3600e3;
    const snap = await get(query(ref(db, 'roomIndex'), orderByValue(), endAt(cutoff)));
    const codes = [];
    snap.forEach((c) => {
      codes.push(c.key);
    });
    await Promise.all(
      codes.map(async (code) => {
        await remove(ref(db, `rooms/${code}`)).catch((e) => console.warn('cleanup room', code, e.code));
        await remove(ref(db, `roomIndex/${code}`)).catch((e) => console.warn('cleanup index', code, e.code));
      }),
    );
    if (codes.length) console.info(`Cleaned ${codes.length} old room(s)`);
  } catch (err) {
    console.warn('cleanup failed', err);
  }
}

async function createRoom() {
  teardownRoom();
  showScreen('s-boot');
  S.view = 'boot';
  $('.spinner').hidden = false;
  $('#btnRetry').hidden = true;
  $('#bootMsg').textContent = t('creatingRoom');
  await cleanupOldRooms();
  const questions = generateQuestions();
  for (let attempt = 0; attempt < 20; attempt++) {
    const code = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    try {
      if ((await get(ref(db, `roomIndex/${code}`))).exists()) continue;
      await update(ref(db), {
        [`rooms/${code}`]: {
          meta: {
            hostUid: S.uid,
            createdAt: serverTimestamp(),
            state: 'lobby',
            current: -1,
            total: questions.length,
            duration: D,
          },
          questions,
        },
        [`roomIndex/${code}`]: serverTimestamp(),
      });
      S.code = code;
      S.questions = questions;
      store.set('hostRoom', code);
      await attachRoom();
      return;
    } catch (err) {
      console.warn('room create attempt failed', code, err.code || err);
    }
  }
  bootError(t('errGeneric'));
}

async function tryResume(code) {
  try {
    const snap = await get(ref(db, `rooms/${code}`));
    const room = snap.val();
    if (!room || !room.meta || room.meta.hostUid !== S.uid) return false;
    if (serverNow() - room.meta.createdAt > GAME.roomTtlHours * 3600e3) return false;
    S.code = code;
    S.questions = room.questions || [];
    await attachRoom();
    return true;
  } catch {
    return false;
  }
}

function teardownRoom() {
  S.roomUnsubs.forEach((u) => u());
  S.roomUnsubs = [];
  stopAnswers();
  stopTimer();
  clearInterval(S.autoNextInt);
  S.token++;
  S.players = {};
  S.presence = {};
  S.scores = {};
  S.chipEls.forEach((el) => el.remove());
  S.chipEls.clear();
}

async function attachRoom() {
  const code = S.code;
  $('#roomCode').textContent = code;
  $('#topCodeValue').textContent = code;
  renderJoinInfo();

  const first = await get(R());
  const room = first.val() || {};
  S.meta = room.meta;
  S.players = room.players || {};
  S.presence = room.presence || {};
  S.scores = room.scores || {};
  S.questions = room.questions || S.questions;

  const on = (path, cb) => S.roomUnsubs.push(onValue(R(path), cb, (e) => console.warn(path, e.code)));
  on('meta', (snap) => {
    S.meta = snap.val();
    if (!S.meta && S.code === code) {
      teardownRoom();
      store.remove('hostRoom');
      bootError(t('roomLost'));
    }
  });
  on('players', (snap) => {
    const before = new Set(Object.keys(S.players));
    S.players = snap.val() || {};
    const joined = Object.keys(S.players).filter((u) => !before.has(u));
    if (joined.length && S.view === 'lobby') sfx.join();
    renderPlayers();
    updateAnswered();
  });
  on('presence', (snap) => {
    S.presence = snap.val() || {};
    renderPlayers();
  });
  on('scores', (snap) => {
    S.scores = snap.val() || {};
  });

  route(room);
}

function route(room) {
  const m = room.meta;
  const i = m.current;
  switch (m.state) {
    case 'ready':
      return startQuestion(i);
    case 'question':
      return resumeQuestion(i, room.live);
    case 'closed':
      return finishQuestion(i);
    case 'reveal':
      S.results = (room.results && room.results[i]) || null;
      return showReveal(i);
    case 'final':
      return showFinal(false, true);
    default:
      return enterLobby();
  }
}

async function newRoom() {
  const old = S.code;
  teardownRoom();
  store.remove('hostRoom');
  if (old) {
    // one atomic write: the index rule checks room ownership before the room disappears
    await update(ref(db), { [`rooms/${old}`]: null, [`roomIndex/${old}`]: null }).catch((e) => console.warn(e));
  }
  S.code = null;
  await createRoom();
}

async function newGame() {
  stopConfetti();
  const questions = generateQuestions();
  const base = `rooms/${S.code}`;
  await update(ref(db), {
    [`${base}/questions`]: questions,
    [`${base}/scores`]: null,
    [`${base}/answers`]: null,
    [`${base}/results`]: null,
    [`${base}/live`]: null,
    [`${base}/meta/state`]: 'lobby',
    [`${base}/meta/current`]: -1,
    [`${base}/meta/total`]: questions.length,
    [`${base}/meta/createdAt`]: serverTimestamp(),
    [`roomIndex/${S.code}`]: serverTimestamp(),
  });
  S.questions = questions;
  S.scores = {};
  enterLobby();
}

// --------------------------------------------------------------------------- lobby
function joinBase() {
  const base = (GAME.joinBaseUrl || `${location.origin}/`).replace(/\/?$/, '/');
  return base;
}

function renderJoinInfo() {
  const url = `${joinBase()}?room=${S.code}`;
  $('#joinUrl').textContent = joinBase().replace(/^https?:\/\//, '').replace(/\/$/, '');
  const box = $('#qr');
  box.innerHTML = '';
  if (window.qrcode) {
    const qr = window.qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    box.innerHTML = qr.createSvgTag({ cellSize: 8, margin: 2, scalable: true });
  } else {
    box.textContent = url;
  }
  box.title = url;
}

function enterLobby() {
  S.view = 'lobby';
  S.token++;
  stopAnswers();
  stopTimer();
  $('#topCode').hidden = true;
  showScreen('s-lobby');
  renderPlayers();
}

function playerOrder() {
  return Object.entries(S.players).sort((a, b) => (a[1].joinedAt || 0) - (b[1].joinedAt || 0));
}

function renderPlayers() {
  const list = $('#playerList');
  const entries = playerOrder();
  const ids = new Set(entries.map(([u]) => u));
  for (const [uid, el] of S.chipEls) {
    if (!ids.has(uid)) {
      el.classList.add('leaving');
      setTimeout(() => el.remove(), 250);
      S.chipEls.delete(uid);
    }
  }
  const palette = ['blue', 'red', 'yellow', 'green'];
  entries.forEach(([uid, p], idx) => {
    let el = S.chipEls.get(uid);
    if (!el) {
      el = document.createElement('li');
      el.className = 'chip pop';
      el.innerHTML = '<span class="chip-dot"></span><span class="chip-name"></span><button class="chip-kick" type="button">×</button>';
      el.querySelector('.chip-kick').addEventListener('click', (e) => kickClick(e.currentTarget, uid));
      S.chipEls.set(uid, el);
      list.appendChild(el);
    }
    el.dataset.tone = palette[(Number(p.slot) || idx) % 4];
    el.querySelector('.chip-name').textContent = p.name;
    const kick = el.querySelector('.chip-kick');
    if (!kick.classList.contains('confirm')) kick.textContent = '×';
    kick.setAttribute('aria-label', t('kickAria', { name: p.name }));
    kick.title = t('kick');
    const online = S.presence[uid] === true;
    el.classList.toggle('offline', !online);
  });
  const n = entries.length;
  $('#playerCount').textContent = `${n} / ${GAME.maxPlayers}`;
  $('#emptyHint').hidden = n > 0;
  $('#btnStart').disabled = n < 1;
}

function kickClick(btn, uid) {
  if (!btn.classList.contains('confirm')) {
    btn.classList.add('confirm');
    btn.textContent = t('kickConfirm');
    setTimeout(() => {
      btn.classList.remove('confirm');
      btn.textContent = '×';
    }, 3000);
    return;
  }
  kickPlayer(uid);
}

async function kickPlayer(uid) {
  const p = S.players[uid];
  if (!p) return;
  const upd = {
    [`players/${uid}`]: null,
    [`scores/${uid}`]: null,
    [`presence/${uid}`]: null,
    [`kicked/${uid}`]: true,
  };
  if (p.slot !== undefined) upd[`slots/${p.slot}`] = null;
  if (p.key) upd[`names/${p.key}`] = null;
  try {
    await update(R(), upd);
    toast(t('kicked', { name: p.name }));
  } catch (err) {
    console.error(err);
    toast(t('errGeneric'));
  }
}

// --------------------------------------------------------------------------- questions
async function startGame() {
  if (S.busy || Object.keys(S.players).length < 1) return;
  S.busy = true;
  sfx.start();
  try {
    await startQuestion(0);
  } finally {
    S.busy = false;
  }
}

async function startQuestion(i) {
  const token = ++S.token;
  stopAnswers();
  stopTimer();
  clearInterval(S.autoNextInt);
  S.current = i;
  S.finishing = null;
  await update(R(), { 'meta/state': 'ready', 'meta/current': i, live: null });
  if (token !== S.token) return;

  S.view = 'ready';
  $('#topCode').hidden = false;
  showScreen('s-ready');
  $('#readyQ').textContent = t('questionOf', { n: i + 1, total: S.questions.length });
  const wait = i === 0 ? GAME.firstReadyMs : GAME.readyMs;
  const countEl = $('#readyCount');
  const end = performance.now() + wait;
  const steps = Math.max(1, Math.round(wait / 1000));
  let shown = null;
  while (performance.now() < end) {
    if (token !== S.token) return;
    const left = Math.ceil(((end - performance.now()) / wait) * steps);
    if (left !== shown && left > 0) {
      shown = left;
      countEl.textContent = String(left);
      replay(countEl, 'beat');
      if (i === 0) sfx.tick(false);
    }
    await sleep(50);
  }
  if (token !== S.token) return;

  const q = S.questions[i];
  await update(R(), {
    'meta/state': 'question',
    live: { key: String(i), w: q.w, i: q.i, o: q.o, startAt: serverTimestamp() },
  });
  if (token !== S.token) return;
  const startSnap = await get(R('live/startAt'));
  S.startAt = startSnap.val();
  sfx.start();
  beginQuestion(i, token);
}

function resumeQuestion(i, live) {
  const token = ++S.token;
  S.current = i;
  S.startAt = (live && live.startAt) || serverNow() - D;
  if (serverNow() >= S.startAt + D) return finishQuestion(i);
  beginQuestion(i, token);
}

function beginQuestion(i, token) {
  S.answers = {};
  S.view = 'question';
  $('#topCode').hidden = false;
  renderQuestion(i);
  showScreen('s-question');
  replay($('#qWord'), 'word-in');
  listenAnswers(i);
  runTimer(i, token);
}

function renderQuestion(i) {
  const q = S.questions[i];
  const ink = colorById(q.i);
  const word = colorById(q.w);
  $('#qNum').textContent = t('questionOf', { n: i + 1, total: S.questions.length });
  const w = $('#qWord');
  w.textContent = colorWord(word);
  w.style.color = ink.hex;
  $('#wordStage').dataset.stage = GAME.wordStage;
  const row = $('#qOptions');
  row.innerHTML = '';
  q.o.forEach((id) => {
    const c = colorById(id);
    row.appendChild(colorOption(c, { tag: 'div', label: colorName(c), showName: true }));
  });
  $('#s-question').classList.remove('time-up');
  updateAnswered();
}

function listenAnswers(i) {
  stopAnswers();
  S.answersUnsub = onValue(R(`answers/${i}`), (snap) => {
    S.answers = snap.val() || {};
    updateAnswered();
    maybeEndEarly(i);
  });
}

function stopAnswers() {
  if (S.answersUnsub) S.answersUnsub();
  S.answersUnsub = null;
}

function updateAnswered() {
  if (S.view !== 'question') return;
  const total = Object.keys(S.players).length;
  const n = Object.keys(S.answers).filter((u) => S.players[u]).length;
  $('#qAnswered').textContent = t('answered', { n, total });
}

function maybeEndEarly(i) {
  if (S.view !== 'question' || S.current !== i) return;
  const uids = Object.keys(S.players);
  const online = uids.filter((u) => S.presence[u] === true);
  const mustAnswer = online.length ? online : uids;
  const answered = mustAnswer.filter((u) => S.answers[u]).length;
  if (mustAnswer.length > 0 && answered >= mustAnswer.length) {
    const token = S.token;
    setTimeout(() => {
      if (token === S.token && S.view === 'question') finishQuestion(i);
    }, 600);
  }
}

function runTimer(i, token) {
  stopTimer();
  const fill = $('#timerFill');
  S.lastTick = null;
  const tick = () => {
    if (token !== S.token) return stopTimer();
    const left = S.startAt + D - serverNow();
    const ratio = Math.max(0, Math.min(1, left / D));
    fill.style.transform = `scaleX(${ratio})`;
    const sec = Math.ceil(left / 1000);
    if (sec <= 3 && sec >= 1 && sec !== S.lastTick) {
      S.lastTick = sec;
      sfx.tick(sec === 1);
      $('#s-question').dataset.hurry = 'true';
    }
    if (left <= 0) {
      stopTimer();
      $('#s-question').classList.add('time-up');
      setTimeout(() => {
        if (token === S.token) finishQuestion(i);
      }, GAME.closeDelayMs);
    }
  };
  $('#s-question').dataset.hurry = 'false';
  const loop = () => {
    tick();
    if (S.timerInt) S.timerRaf = requestAnimationFrame(loop);
  };
  S.timerInt = setInterval(tick, 250); // keeps running in a background tab
  S.timerRaf = requestAnimationFrame(loop);
}

function stopTimer() {
  clearInterval(S.timerInt);
  cancelAnimationFrame(S.timerRaf);
  S.timerInt = 0;
}

function endNow() {
  if (S.view === 'question') finishQuestion(S.current);
}

/** Close answers, read them once, score, then reveal. */
async function finishQuestion(i) {
  if (S.finishing === i) return;
  S.finishing = i;
  S.token++;
  stopTimer();
  stopAnswers();
  try {
    await update(R(), { 'meta/state': 'closed' });
    const [ansSnap, liveSnap, playersSnap, scoresSnap] = await Promise.all([
      get(R(`answers/${i}`)), get(R('live')), get(R('players')), get(R('scores')),
    ]);
    const answers = ansSnap.val() || {};
    const startAt = (liveSnap.val() && liveSnap.val().startAt) || S.startAt;
    const res = scoreQuestion({
      qIndex: i,
      question: S.questions[i],
      players: playersSnap.val() || {},
      answers,
      startAt,
      durationMs: D,
      prev: scoresSnap.val() || {},
    });
    S.results = { fastest: res.fastest, counts: res.counts, answered: Object.keys(answers).length, startAt };
    await update(R(), {
      scores: res.scores,
      [`results/${i}`]: S.results,
      'meta/state': 'reveal',
    });
    S.scores = res.scores;
    showReveal(i);
  } catch (err) {
    console.error('finishQuestion', err);
    S.finishing = null;
    toast(t('errGeneric'));
    setTimeout(() => finishQuestion(i), 1500);
  }
}

// --------------------------------------------------------------------------- reveal
function showReveal(i, silent = false) {
  S.view = 'reveal';
  S.current = i;
  $('#topCode').hidden = false;
  const q = S.questions[i];
  const ink = colorById(q.i);
  const word = colorById(q.w);
  const res = S.results || { fastest: [], counts: {} };

  $('#rNum').textContent = t('questionOf', { n: i + 1, total: S.questions.length });
  const ans = $('#rAnswer');
  ans.innerHTML = '';
  const big = colorOption(ink, { tag: 'div', label: colorName(ink), showName: true });
  big.classList.add('big');
  ans.appendChild(big);
  $('#rNote').textContent = q.w === q.i ? t('congruent') : t('wordSaid', { word: colorWord(word), ink: colorName(ink) });

  const row = $('#rOptions');
  row.innerHTML = '';
  q.o.forEach((id) => {
    const c = colorById(id);
    const el = colorOption(c, { tag: 'div', label: colorName(c), showName: true });
    el.classList.add(id === q.i ? 'is-correct' : 'is-dim');
    el.querySelector('.opt-count').textContent = String((res.counts && res.counts[id]) || 0);
    row.appendChild(el);
  });

  const fast = $('#rFastest');
  fast.innerHTML = '';
  const fastest = res.fastest || [];
  if (!fastest.length) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = t('noCorrect');
    fast.appendChild(li);
  }
  fastest.forEach((f, k) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="medal m${k + 1}" dir="ltr">${k + 1}</span><span class="who"></span><span class="val" dir="ltr"></span>`;
    li.querySelector('.who').textContent = f.name;
    li.querySelector('.val').textContent = `${fmtSeconds(f.ms)} ${t('sec')}`;
    li.style.animationDelay = `${k * 120}ms`;
    fast.appendChild(li);
  });

  renderBoard($('#rBoard'), standings(S.scores).slice(0, 5), true);

  const last = i >= S.questions.length - 1;
  $('#btnNext').textContent = last ? t('showResults') : t('next');
  showScreen('s-reveal');
  if (silent) return;
  sfx.reveal();
  scheduleAutoNext();
}

function renderBoard(ol, rows, showDelta) {
  ol.innerHTML = '';
  rows.forEach((s, k) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="rank" dir="ltr">${s.rank}</span><span class="who"></span><span class="delta" dir="ltr"></span><span class="val" dir="ltr"></span>`;
    li.dataset.rank = String(s.rank);
    li.querySelector('.who').textContent = s.name;
    li.querySelector('.val').textContent = String(s.score);
    if (showDelta && s.last && s.last.pts > 0) li.querySelector('.delta').textContent = `+${s.last.pts}`;
    li.style.animationDelay = `${k * 70}ms`;
    ol.appendChild(li);
  });
}

function scheduleAutoNext() {
  clearInterval(S.autoNextInt);
  const el = $('#autoNext');
  el.textContent = '';
  if (!GAME.autoNextSeconds) return;
  let left = GAME.autoNextSeconds;
  const token = S.token;
  el.textContent = t('nextIn', { s: left });
  S.autoNextInt = setInterval(() => {
    if (token !== S.token || S.view !== 'reveal') return clearInterval(S.autoNextInt);
    left--;
    el.textContent = t('nextIn', { s: left });
    if (left <= 0) {
      clearInterval(S.autoNextInt);
      nextStep();
    }
  }, 1000);
}

async function nextStep() {
  if (S.busy || S.view !== 'reveal') return;
  S.busy = true;
  clearInterval(S.autoNextInt);
  try {
    const nxt = S.current + 1;
    if (nxt < S.questions.length) await startQuestion(nxt);
    else await showFinal(true);
  } finally {
    S.busy = false;
  }
}

// --------------------------------------------------------------------------- final
async function showFinal(write, celebrate = true) {
  S.token++;
  stopTimer();
  stopAnswers();
  if (write) await update(R(), { 'meta/state': 'final', live: null });
  S.view = 'final';
  $('#topCode').hidden = false;
  const rows = standings(S.scores);
  const pod = $('#podium');
  pod.innerHTML = '';
  const order = [1, 0, 2]; // 2nd, 1st, 3rd
  const tones = ['yellow', 'blue', 'green'];
  order.forEach((idx) => {
    const s = rows[idx];
    const col = document.createElement('div');
    col.className = `pod pod-${idx + 1}`;
    col.dataset.tone = tones[idx];
    if (!s) {
      col.classList.add('empty');
      pod.appendChild(col);
      return;
    }
    col.innerHTML = `
      <div class="pod-person">
        <div class="pod-avatar"></div>
        <div class="pod-name"></div>
        <div class="pod-score" dir="ltr"></div>
      </div>
      <div class="pod-block"><span dir="ltr">${s.rank}</span></div>`;
    col.querySelector('.pod-avatar').textContent = Array.from(s.name.trim())[0] || '?';
    col.querySelector('.pod-name').textContent = s.name;
    col.querySelector('.pod-score').textContent = `${s.score} ${t('pts')}`;
    pod.appendChild(col);
  });
  renderBoard($('#restBoard'), rows.slice(3, 10), false);
  showScreen('s-final');
  if (celebrate) {
    setTimeout(() => {
      confetti({ duration: 6000 });
      sfx.fanfare();
    }, 350);
  }
}

// --------------------------------------------------------------------------- language
function rerender() {
  if (S.view === 'lobby') renderPlayers();
  if (S.view === 'question') renderQuestion(S.current);
  if (S.view === 'ready') $('#readyQ').textContent = t('questionOf', { n: S.current + 1, total: S.questions.length });
  if (S.view === 'reveal') showReveal(S.current, true);
  if (S.view === 'final') showFinal(false, false);
}

boot();
