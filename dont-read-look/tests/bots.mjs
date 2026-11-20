// Bot players for rehearsing a game without 60 phones.
// Usage: node bots.mjs <roomCode> [count=6] [accuracy=0.8]
// Bots join like real players (same rules), then answer each question after a random delay.
import { ref, get, set, update, onValue, onDisconnect, serverTimestamp } from '@firebase/database';
import { client, sleep } from './shared.mjs';
import { nameKey, uniqueName } from '../public/js/logic.js';

const [code, countArg = '6', accArg = '0.8'] = process.argv.slice(2);
if (!/^\d{4}$/.test(code || '')) {
  console.error('Usage: node bots.mjs <roomCode> [count] [accuracy]');
  process.exit(1);
}
const COUNT = Math.min(60, Number(countArg) || 6);
const ACCURACY = Number(accArg);
const NAMES = ['ليان', 'Omar', 'سارة', 'Yousef', 'نور', 'Lina', 'كريم', 'Hala', 'رامي', 'Dana', 'مريم', 'Zaid'];

async function bot(k) {
  const c = await client(`bot${k}`);
  const room = (p) => ref(c.db, `rooms/${code}/${p}`);
  const base = `${NAMES[k % NAMES.length]}${k >= NAMES.length ? ' ' + Math.floor(k / NAMES.length) : ''} 🤖`.slice(0, 16);
  let name = base;
  for (let attempt = 0; attempt < 6; attempt++) {
    const [slotsSnap, namesSnap] = await Promise.all([get(room('slots')), get(room('names'))]);
    const slots = slotsSnap.val() || {};
    const free = [];
    for (let n = 0; n < 60; n++) if (!slots[n]) free.push(n);
    if (!free.length) throw new Error('room full');
    const slot = free[Math.floor(Math.random() * Math.min(8, free.length))];
    name = uniqueName(base, Object.keys(namesSnap.val() || {}));
    const key = nameKey(name);
    try {
      await update(ref(c.db, `rooms/${code}`), {
        [`slots/${slot}`]: c.uid,
        [`names/${key}`]: c.uid,
        [`players/${c.uid}`]: { name, slot: String(slot), key, joinedAt: serverTimestamp() },
      });
      break;
    } catch (e) {
      if (attempt === 5) throw e;
      await sleep(100 + Math.random() * 300);
    }
  }
  await onDisconnect(room(`presence/${c.uid}`)).remove();
  await set(room(`presence/${c.uid}`), true);
  console.log(`+ ${name} joined`);

  const answered = new Set();
  let meta = null;
  return new Promise((resolve) => {
    onValue(room('meta'), (s) => {
      meta = s.val();
      if (!meta) {
        console.log(`- ${name}: room gone`);
        c.close().then(resolve);
      } else if (meta.state === 'final') {
        get(room(`scores/${c.uid}`)).then((sc) => {
          const v = sc.val();
          console.log(`= ${name}: #${v?.rank} ${v?.score} pts (${v?.correct} correct, ${v?.time} ms)`);
          setTimeout(() => c.close().then(resolve), 500);
        });
      }
    });
    onValue(room('live'), (s) => {
      const live = s.val();
      if (!live || answered.has(live.key)) return;
      answered.add(live.key);
      const options = Array.isArray(live.o) ? live.o : Object.values(live.o);
      const skip = Math.random() < 0.08;
      if (skip) return;
      const delay = 400 + Math.random() * 5200;
      const correct = Math.random() < ACCURACY;
      const choice = correct ? live.i : options.filter((o) => o !== live.i)[Math.floor(Math.random() * 3)];
      setTimeout(() => {
        if (!meta || meta.state !== 'question' || String(meta.current) !== live.key) return;
        set(room(`answers/${live.key}/${c.uid}`), { c: choice, t: serverTimestamp() }).catch((e) =>
          console.log(`  ${name} q${live.key} refused: ${e.code}`));
      }, delay);
    });
  });
}

console.log(`Joining ${COUNT} bots to room ${code} (accuracy ${ACCURACY})…`);
const bots = [];
for (let k = 0; k < COUNT; k++) {
  bots.push(bot(k).catch((e) => console.error(`bot ${k}:`, e.code || e.message)));
  await sleep(250);
}
await Promise.all(bots);
console.log('All bots done.');
process.exit(0);
