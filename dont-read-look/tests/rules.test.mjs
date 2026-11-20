// Security-rule tests against the real Realtime Database (deployed rules).
// Creates a temporary room, tries allowed and forbidden writes/reads, then deletes the room.
// Run: cd tests && npm install && node rules.test.mjs
import { ref, get, set, update, remove, serverTimestamp } from '@firebase/database';
import { client, sleep } from './shared.mjs';

let pass = 0;
let fail = 0;
async function expectOk(label, fn) {
  try {
    await fn();
    pass++;
    console.log(`  ✓ allowed   ${label}`);
  } catch (e) {
    fail++;
    console.log(`  ✗ EXPECTED ALLOWED  ${label}: ${e.code || e.message}`);
  }
}
async function expectDenied(label, fn) {
  try {
    await fn();
    fail++;
    console.log(`  ✗ EXPECTED DENIED   ${label}`);
  } catch (e) {
    if (String(e.code || e.message).toLowerCase().includes('permission')) {
      pass++;
      console.log(`  ✓ denied    ${label}`);
    } else {
      fail++;
      console.log(`  ✗ unexpected error  ${label}: ${e.code || e.message}`);
    }
  }
}

const [host, p1, p2, p3, outsider] = await Promise.all(['host', 'p1', 'p2', 'p3', 'outsider'].map(client));
let code;
for (;;) {
  code = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  if (!(await get(ref(host.db, `roomIndex/${code}`))).exists()) break;
}
const room = (c, p = '') => ref(c.db, `rooms/${code}${p ? '/' + p : ''}`);
const DURATION = 3000;
const questions = [
  { w: 'red', i: 'green', o: ['green', 'red', 'blue', 'yellow'] },
  { w: 'blue', i: 'yellow', o: ['blue', 'yellow', 'red', 'green'] },
];
const join = (c, slot, key, name) =>
  update(room(c), {
    [`slots/${slot}`]: c.uid,
    [`names/${key}`]: c.uid,
    [`players/${c.uid}`]: { name, slot: String(slot), key, joinedAt: serverTimestamp() },
  });

console.log(`Room ${code}`);
console.log('Room creation');
await expectDenied('create a room with someone else as host', () =>
  set(ref(outsider.db, `rooms/${code}`), { meta: { hostUid: host.uid, createdAt: serverTimestamp(), state: 'lobby', current: -1, total: 2, duration: DURATION } }));
await expectOk('host creates room + index', () =>
  update(ref(host.db), {
    [`rooms/${code}`]: { meta: { hostUid: host.uid, createdAt: serverTimestamp(), state: 'lobby', current: -1, total: 2, duration: DURATION }, questions },
    [`roomIndex/${code}`]: serverTimestamp(),
  }));
await expectDenied('outsider overwrites existing room', () =>
  set(ref(outsider.db, `rooms/${code}`), { meta: { hostUid: outsider.uid, createdAt: serverTimestamp(), state: 'lobby', current: -1, total: 2, duration: DURATION } }));
await expectDenied('outsider changes meta/state', () => set(room(outsider, 'meta/state'), 'final'));
await expectDenied('outsider deletes a fresh room', () => remove(room(outsider)));
await expectDenied('outsider deletes a fresh roomIndex entry', () => remove(ref(outsider.db, `roomIndex/${code}`)));
await expectDenied('outsider rewrites roomIndex entry', () => set(ref(outsider.db, `roomIndex/${code}`), serverTimestamp()));

console.log('Reading');
await expectOk('player reads meta', () => get(room(p1, 'meta')));
await expectDenied('player reads all questions', () => get(room(p1, 'questions')));
await expectDenied('player reads whole room', () => get(room(p1)));
await expectOk('player reads slots/names (to pick a seat and a free name)', () => Promise.all([get(room(p1, 'slots')), get(room(p1, 'names'))]));

console.log('Joining');
await expectDenied('join without claiming slot+name together', () =>
  set(room(p1, `players/${p1.uid}`), { name: 'Ali', slot: '5', key: 'ali', joinedAt: serverTimestamp() }));
await expectOk('p1 joins (slot 5, name ali)', () => join(p1, 5, 'ali', 'Ali'));
await expectDenied('p1 claims a second slot', () => set(room(p1, 'slots/6'), p1.uid));
await expectDenied('p1 renames itself', () => set(room(p1, `players/${p1.uid}/name`), 'Boss'));
await expectDenied('p2 takes the same name key', () => join(p2, 7, 'ali', 'Ali'));
await expectDenied('p2 takes a used slot', () => join(p2, 5, 'ali_2', 'Ali 2'));
await expectDenied('p2 uses slot 60 (limit is 60 seats: 0..59)', () => join(p2, 60, 'ali_2', 'Ali 2'));
await expectDenied('p2 fakes joinedAt in the future', () =>
  update(room(p2), { 'slots/7': p2.uid, 'names/ali_2': p2.uid, [`players/${p2.uid}`]: { name: 'Ali 2', slot: '7', key: 'ali_2', joinedAt: Date.now() + 1e7 } }));
await expectOk('p2 joins (slot 7, name ali_2)', () => join(p2, 7, 'ali_2', 'Ali 2'));
await expectOk('p3 joins (slot 59)', () => join(p3, 59, 'sara', 'Sara'));
await expectDenied('p1 claims a seat for p2', () => set(room(p1, 'slots/8'), p2.uid));
await expectDenied('p1 reads the player list', () => get(room(p1, 'players')));
await expectOk('p1 reads own player record', () => get(room(p1, `players/${p1.uid}`)));
await expectDenied('p1 deletes own record (host only)', () => remove(room(p1, `players/${p1.uid}`)));

console.log('Presence');
await expectOk('p1 sets own presence', () => set(room(p1, `presence/${p1.uid}`), true));
await expectDenied('p1 sets presence for p2', () => set(room(p1, `presence/${p2.uid}`), true));
await expectDenied('non-member sets presence', () => set(room(outsider, `presence/${outsider.uid}`), true));

console.log('Answers');
await expectDenied('answer while in lobby', () => set(room(p1, `answers/0/${p1.uid}`), { c: 'green', t: serverTimestamp() }));
await expectOk('host opens question 0', () =>
  update(room(host), { 'meta/state': 'question', 'meta/current': 0, live: { key: '0', ...questions[0], startAt: serverTimestamp() } }));
await expectDenied('player writes live', () => set(room(p1, 'live/i'), 'red'));
await expectDenied('p1 answers for p2', () => set(room(p1, `answers/0/${p2.uid}`), { c: 'green', t: serverTimestamp() }));
await expectDenied('answer a colour that is not an option', () => set(room(p1, `answers/0/${p1.uid}`), { c: 'pink', t: serverTimestamp() }));
await expectDenied('answer with a client clock time', () => set(room(p1, `answers/0/${p1.uid}`), { c: 'green', t: Date.now() - 5000 }));
await expectDenied('answer a question that is not live', () => set(room(p1, `answers/1/${p1.uid}`), { c: 'yellow', t: serverTimestamp() }));
await expectDenied('answer with extra fields', () => set(room(p1, `answers/0/${p1.uid}`), { c: 'green', t: serverTimestamp(), pts: 1000 }));
await expectOk('p1 answers once', () => set(room(p1, `answers/0/${p1.uid}`), { c: 'green', t: serverTimestamp() }));
await expectDenied('p1 changes its answer', () => set(room(p1, `answers/0/${p1.uid}`), { c: 'red', t: serverTimestamp() }));
await expectDenied('p1 deletes its answer', () => remove(room(p1, `answers/0/${p1.uid}`)));
await expectOk('p1 reads own answer', () => get(room(p1, `answers/0/${p1.uid}`)));
await expectDenied('p2 reads p1 answer', () => get(room(p2, `answers/0/${p1.uid}`)));
await expectDenied('p2 reads all answers', () => get(room(p2, 'answers/0')));
await expectOk('host reads all answers', () => get(room(host, 'answers/0')));
await expectOk('host closes question', () => set(room(host, 'meta/state'), 'closed'));
await expectDenied('p2 answers after the host closed it', () => set(room(p2, `answers/0/${p2.uid}`), { c: 'green', t: serverTimestamp() }));

console.log('Scores');
await expectDenied('p1 writes own score', () => set(room(p1, `scores/${p1.uid}`), { score: 99999 }));
await expectDenied('p1 writes p2 score', () => set(room(p1, `scores/${p2.uid}`), { score: 0 }));
await expectOk('host writes scores', () =>
  set(room(host, 'scores'), { [p1.uid]: { name: 'Ali', score: 938, time: 1000, correct: 1, rank: 1, n: 3, last: { q: 0, ok: true, pts: 938, ms: 1000, c: 'green' } } }));
await expectOk('p1 reads own score', () => get(room(p1, `scores/${p1.uid}`)));
await expectDenied('p2 reads p1 score', () => get(room(p2, `scores/${p1.uid}`)));
await expectDenied('p2 reads all scores', () => get(room(p2, 'scores')));

console.log('Answer deadline');
await expectOk('host opens question 1', () =>
  update(room(host), { 'meta/state': 'question', 'meta/current': 1, live: { key: '1', ...questions[1], startAt: serverTimestamp() } }));
await sleep(DURATION + 2600);
await expectDenied('answer after duration + 2 s grace', () => set(room(p3, `answers/1/${p3.uid}`), { c: 'yellow', t: serverTimestamp() }));

console.log('Kick');
await expectOk('host kicks p2', () =>
  update(room(host), { [`players/${p2.uid}`]: null, 'slots/7': null, 'names/ali_2': null, [`presence/${p2.uid}`]: null, [`kicked/${p2.uid}`]: true }));
await expectDenied('kicked p2 rejoins', () => join(p2, 8, 'ali_3', 'Ali 3'));
await expectDenied('p1 un-kicks p2', () => remove(room(p1, `kicked/${p2.uid}`)));

console.log('Cleanup of old rooms');
let oldCode;
for (;;) {
  oldCode = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  if (oldCode !== code && !(await get(ref(host.db, `roomIndex/${oldCode}`))).exists()) break;
}
await expectOk('host creates a room stamped 2 days ago', () =>
  set(ref(p3.db, `rooms/${oldCode}`), { meta: { hostUid: p3.uid, createdAt: Date.now() - 2 * 86400e3, state: 'lobby', current: -1, total: 1, duration: DURATION } }));
await expectOk('anyone deletes a room older than 24 h', () => remove(ref(outsider.db, `rooms/${oldCode}`)));

console.log('Teardown');
await expectOk('host deletes its room + index together', () => update(ref(host.db), { [`rooms/${code}`]: null, [`roomIndex/${code}`]: null }));

await Promise.all([host, p1, p2, p3, outsider].map((c) => c.close()));
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
