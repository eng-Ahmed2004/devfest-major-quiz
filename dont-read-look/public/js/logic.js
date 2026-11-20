// Pure game logic (no browser or Firebase dependencies) — shared by host, player and tests.
import { GAME, COLORS, SIMILAR_PAIRS } from './game-config.js';

const BY_ID = Object.fromEntries(COLORS.map((c) => [c.id, c]));

export function colorById(id) {
  return BY_ID[id] || null;
}

export function areSimilar(a, b) {
  return SIMILAR_PAIRS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

/** true if `id` is different from and not similar to every colour in `set`. */
export function fitsWith(id, set) {
  return set.every((o) => o !== id && !areSimilar(id, o));
}

export function shuffle(arr, rnd = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr, rnd) {
  return arr[Math.floor(rnd() * arr.length)];
}

/**
 * One question: { w: word colour id, i: ink colour id, o: [option ids in display order] }.
 * Rules: the ink is always an option; no two similar colours anywhere in the question
 * (word, ink and options); options are shuffled.
 */
export function generateQuestion(pool, prevInk = null, rnd = Math.random, cfg = GAME) {
  const n = cfg.optionCount;
  if (pool.length < n) throw new Error(`Colour pool has ${pool.length} colours, need ${n}`);
  for (let attempt = 0; attempt < 500; attempt++) {
    const inkChoices = pool.filter((c) => c !== prevInk);
    const ink = pick(inkChoices.length ? inkChoices : pool, rnd);
    let word = ink;
    if (rnd() >= cfg.matchRatio) {
      const wordChoices = pool.filter((c) => fitsWith(c, [ink]));
      if (!wordChoices.length) continue;
      word = pick(wordChoices, rnd);
    }
    const options = [ink];
    if (word !== ink && cfg.includeWordAsDecoy) options.push(word);
    const guard = word === ink || cfg.includeWordAsDecoy ? options : [...options, word];
    for (const c of shuffle(pool, rnd)) {
      if (options.length >= n) break;
      if (fitsWith(c, guard)) {
        options.push(c);
        if (guard !== options) guard.push(c);
      }
    }
    if (options.length < n) continue;
    return { w: word, i: ink, o: shuffle(options, rnd) };
  }
  throw new Error('Could not build a question: too many similar-colour pairs for this pool');
}

export function generateQuestions(cfg = GAME, rnd = Math.random) {
  const all = COLORS.map((c) => c.id);
  const base = COLORS.filter((c) => c.base).map((c) => c.id);
  const list = [];
  let prevInk = null;
  for (let q = 0; q < cfg.questionCount; q++) {
    const pool = q < cfg.baseQuestionCount ? base : all;
    const question = generateQuestion(pool, prevInk, rnd, cfg);
    list.push(question);
    prevInk = question.i;
  }
  return list;
}

/** Problems with a question, as strings (empty array = valid). Used by tests. */
export function validateQuestion(q, pool) {
  const errs = [];
  if (!q.o.includes(q.i)) errs.push('ink missing from options');
  if (new Set(q.o).size !== q.o.length) errs.push('duplicate option');
  const all = [...new Set([q.w, q.i, ...q.o])];
  for (let a = 0; a < all.length; a++)
    for (let b = a + 1; b < all.length; b++)
      if (areSimilar(all[a], all[b])) errs.push(`similar: ${all[a]}+${all[b]}`);
  for (const c of all) if (!pool.includes(c)) errs.push(`${c} not in pool`);
  return errs;
}

/** Linear points: maxPoints when instant, minPoints at the end of the timer. */
export function pointsFor(ms, durationMs, cfg = GAME) {
  const t = Math.min(Math.max(ms, 0), durationMs);
  return Math.round(cfg.maxPoints - ((cfg.maxPoints - cfg.minPoints) * t) / durationMs);
}

/**
 * Score one question.
 * players: { uid: { name } }   answers: { uid: { c, t } }   prev: { uid: { score, time, correct } }
 * Returns { scores, fastest, counts } where scores already include ranks.
 */
export function scoreQuestion({ qIndex, question, players, answers, startAt, durationMs, prev = {}, cfg = GAME }) {
  const scores = {};
  const correctList = [];
  const counts = Object.fromEntries(question.o.map((c) => [c, 0]));
  for (const [uid, p] of Object.entries(players || {})) {
    const before = prev[uid] || { score: 0, time: 0, correct: 0 };
    const a = answers ? answers[uid] : null;
    let ok = false;
    let pts = 0;
    let ms = -1;
    let choice = '';
    if (a && typeof a.t === 'number' && typeof a.c === 'string') {
      choice = a.c;
      ms = Math.max(0, a.t - startAt);
      if (choice in counts) counts[choice]++;
      ok = choice === question.i;
      if (ok) {
        pts = pointsFor(ms, durationMs, cfg);
        correctList.push({ uid, name: p.name, ms });
      }
    }
    scores[uid] = {
      name: p.name,
      score: (before.score || 0) + pts,
      time: (before.time || 0) + (ok ? Math.min(ms, durationMs) : 0),
      correct: (before.correct || 0) + (ok ? 1 : 0),
      last: { q: qIndex, ok, pts, ms, c: choice },
    };
  }
  applyRanks(scores);
  correctList.sort((x, y) => x.ms - y.ms);
  return { scores, fastest: correctList.slice(0, 3), counts };
}

/** Higher score first; on a tie, lower total time of correct answers first. */
export function compareStanding(a, b) {
  return b.score - a.score || a.time - b.time;
}

/** Adds rank (1-based, ties share a rank) and n (player count) to every entry, in place. */
export function applyRanks(scores) {
  const list = Object.entries(scores).map(([uid, s]) => ({ uid, ...s }));
  list.sort((a, b) => compareStanding(a, b) || String(a.name).localeCompare(String(b.name)));
  let rank = 0;
  list.forEach((s, idx) => {
    const prevS = list[idx - 1];
    if (!prevS || compareStanding(prevS, s) !== 0) rank = idx + 1;
    scores[s.uid].rank = rank;
    scores[s.uid].n = list.length;
  });
  return list.map((s) => ({ ...s, rank: scores[s.uid].rank }));
}

/** Sorted standings array from a scores object. */
export function standings(scores) {
  return Object.entries(scores || {})
    .map(([uid, s]) => ({ uid, ...s }))
    .sort((a, b) => (a.rank || 0) - (b.rank || 0) || compareStanding(a, b));
}

/** Database-safe key for duplicate-name detection (case/space-insensitive). */
export function nameKey(name) {
  return (
    String(name)
      .trim()
      .toLowerCase()
      .replace(/[ً-ْـ]/g, '') // tashkeel + tatweel
      .replace(/[.#$\[\]\/\s]+/g, '_')
      .slice(0, 40) || '_'
  );
}

export function cleanName(name, max = GAME.nameMaxLength) {
  return String(name || '')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
    .trim();
}

/** "Ahmad" -> "Ahmad", "Ahmad 2", "Ahmad 3"... the first whose key is free. */
export function uniqueName(base, takenKeys, max = GAME.nameMaxLength) {
  const taken = new Set(takenKeys);
  if (!taken.has(nameKey(base))) return base;
  for (let k = 2; k < 1000; k++) {
    const suffix = ` ${k}`;
    const candidate = base.slice(0, max - suffix.length).trim() + suffix;
    if (!taken.has(nameKey(candidate))) return candidate;
  }
  return base;
}
