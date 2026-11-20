// Run: node tests/logic.test.mjs
// Checks the question generator and the scoring / ranking / tie-break rules.
import assert from 'node:assert/strict';
import { GAME, COLORS } from '../public/js/game-config.js';
import {
  generateQuestions, validateQuestion, pointsFor, scoreQuestion, applyRanks,
  standings, uniqueName, nameKey, areSimilar,
} from '../public/js/logic.js';

const ALL = COLORS.map((c) => c.id);
const BASE = COLORS.filter((c) => c.base).map((c) => c.id);

// ---------- questions ----------
const GAMES = 5000;
let total = 0, matched = 0, decoy = 0;
const inkHits = Object.fromEntries(ALL.map((c) => [c, 0]));
const posHits = [0, 0, 0, 0];
for (let g = 0; g < GAMES; g++) {
  const qs = generateQuestions();
  assert.equal(qs.length, GAME.questionCount);
  qs.forEach((q, i) => {
    const pool = i < GAME.baseQuestionCount ? BASE : ALL;
    const errs = validateQuestion(q, pool);
    assert.deepEqual(errs, [], `game ${g} q${i} ${JSON.stringify(q)}: ${errs.join(', ')}`);
    assert.equal(q.o.length, 4);
    if (i > 0) assert.notEqual(q.i, qs[i - 1].i, 'same ink twice in a row');
    total++;
    if (q.w === q.i) matched++;
    else if (q.o.includes(q.w)) decoy++;
    inkHits[q.i]++;
    posHits[q.o.indexOf(q.i)]++;
  });
}
const ratio = matched / total;
assert.ok(ratio > 0.12 && ratio < 0.18, `match ratio ${ratio}`);
assert.equal(decoy, total - matched, 'word colour should be a decoy option when it differs');
for (const p of posHits) assert.ok(Math.abs(p / total - 0.25) < 0.02, `answer position skew ${posHits}`);
for (const c of ALL) assert.ok(inkHits[c] > 0, `${c} never used as ink`);
assert.ok(areSimilar('pink', 'red') && areSimilar('blue', 'purple') && !areSimilar('red', 'blue'));
console.log(`✓ ${total} questions valid · congruent ${(ratio * 100).toFixed(1)}% · correct-button position`, posHits.map((p) => (p / total * 100).toFixed(1) + '%').join(' '));

// ---------- points ----------
assert.equal(pointsFor(0, 8000), 1000);
assert.equal(pointsFor(8000, 8000), 500);
assert.equal(pointsFor(4000, 8000), 750);
assert.equal(pointsFor(9500, 8000), 500, 'late (grace) answers clamp to min points');
assert.equal(pointsFor(-50, 8000), 1000);
console.log('✓ points: 1000 → 500 linear');

// ---------- scoring + tie-break ----------
const q = { w: 'red', i: 'green', o: ['green', 'red', 'blue', 'yellow'] };
const players = { a: { name: 'Ali' }, b: { name: 'Bana' }, c: { name: 'Carl' }, d: { name: 'Dina' }, e: { name: 'Eve' } };
const start = 1_000_000;
const r1 = scoreQuestion({
  qIndex: 0, question: q, players, startAt: start, durationMs: 8000,
  answers: {
    a: { c: 'green', t: start + 1000 },  // 938
    b: { c: 'green', t: start + 2000 },  // 875
    c: { c: 'red', t: start + 500 },     // wrong
    d: { c: 'green', t: start + 1000 },  // 938, same as a
    // e: no answer
  },
});
assert.equal(r1.scores.a.score, 938);
assert.equal(r1.scores.b.score, 875);
assert.equal(r1.scores.c.score, 0);
assert.equal(r1.scores.e.score, 0);
assert.equal(r1.scores.e.last.ms, -1);
assert.equal(r1.counts.green, 3);
assert.equal(r1.counts.red, 1);
assert.deepEqual(r1.fastest.map((f) => f.uid).sort(), ['a', 'b', 'd'].sort());
assert.equal(r1.fastest[2].uid, 'b');
assert.equal(r1.scores.a.rank, 1);
assert.equal(r1.scores.d.rank, 1, 'identical score and time share the rank');
assert.equal(r1.scores.b.rank, 3);
assert.equal(r1.scores.c.rank, 4);
assert.equal(r1.scores.e.rank, 4, 'zero-point players share last rank');

// Tie on points, broken by total time of correct answers.
const tie = {
  x: { name: 'X', score: 1750, time: 5000, correct: 2 },
  y: { name: 'Y', score: 1750, time: 4200, correct: 2 },
  z: { name: 'Z', score: 1900, time: 9000, correct: 2 },
};
applyRanks(tie);
assert.deepEqual(standings(tie).map((s) => s.uid), ['z', 'y', 'x']);
assert.equal(tie.y.rank, 2);
assert.equal(tie.x.rank, 3);
assert.equal(tie.x.n, 3);
console.log('✓ scoring, ranks, shared ranks and time tie-break');

// Cumulative over two questions.
const r2 = scoreQuestion({
  qIndex: 1, question: { w: 'blue', i: 'yellow', o: ['blue', 'yellow', 'red', 'green'] }, players,
  startAt: start, durationMs: 8000, prev: r1.scores,
  answers: { c: { c: 'yellow', t: start } , b: { c: 'yellow', t: start + 8000 } },
});
assert.equal(r2.scores.c.score, 1000);
assert.equal(r2.scores.b.score, 875 + 500);
assert.equal(r2.scores.b.time, 2000 + 8000);
assert.equal(r2.scores.b.correct, 2);
assert.equal(r2.scores.a.last.ok, false);
console.log('✓ cumulative totals');

// ---------- names ----------
assert.equal(uniqueName('Ahmad', []), 'Ahmad');
assert.equal(uniqueName('Ahmad', [nameKey('ahmad ')]), 'Ahmad 2');
assert.equal(uniqueName('Ahmad', [nameKey('Ahmad'), nameKey('Ahmad 2')]), 'Ahmad 3');
assert.equal(nameKey('a.b#c$d[e]f/g'), 'a_b_c_d_e_f_g');
assert.equal(uniqueName('أحمد', [nameKey('أحمد')]), 'أحمد 2');
console.log('✓ duplicate names get a number');
console.log('All logic tests passed.');
