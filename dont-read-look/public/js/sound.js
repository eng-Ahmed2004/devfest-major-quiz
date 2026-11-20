// All sounds are synthesised with the Web Audio API (no audio files).
// The audio context starts on the first tap/click/key press (browser autoplay policy).
import { store } from './firebase.js';

let ctx = null;
let master = null;
let muted = store.get('muted', false);

function ensure() {
  if (ctx) return ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = muted ? 0 : 0.6;
  master.connect(ctx.destination);
  return ctx;
}

function unlock() {
  const c = ensure();
  if (c && c.state === 'suspended') c.resume();
}
['pointerdown', 'keydown', 'touchend'].forEach((ev) =>
  window.addEventListener(ev, unlock, { capture: true, passive: true }),
);

export function isMuted() {
  return muted;
}

export function setMuted(value) {
  muted = Boolean(value);
  store.set('muted', muted);
  if (master) master.gain.setTargetAtTime(muted ? 0 : 0.6, ctx.currentTime, 0.02);
}

/** One enveloped oscillator note. `at` is seconds from now. */
function note(freq, at = 0, dur = 0.15, { type = 'sine', gain = 0.3, attack = 0.008, glideTo = null } = {}) {
  const c = ensure();
  if (!c || muted || c.state !== 'running') return;
  const t0 = c.currentTime + at;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

const N = { C4: 261.63, E4: 329.63, G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880, B5: 987.77, C6: 1046.5, E6: 1318.5, G6: 1568 };

export const sfx = {
  // ---- host ----
  start() {
    [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => note(f, i * 0.09, 0.22, { type: 'triangle', gain: 0.28 }));
    note(N.C6, 0.36, 0.5, { type: 'sine', gain: 0.18 });
  },
  tick(last = false) {
    note(last ? 1320 : 990, 0, 0.07, { type: 'square', gain: last ? 0.12 : 0.08, attack: 0.002 });
  },
  reveal() {
    note(N.G5, 0, 0.18, { type: 'triangle', gain: 0.25 });
    note(N.C6, 0.12, 0.4, { type: 'triangle', gain: 0.25 });
    note(N.E6, 0.12, 0.4, { type: 'sine', gain: 0.1 });
  },
  join() {
    note(620, 0, 0.12, { type: 'sine', gain: 0.18, glideTo: 940 });
  },
  fanfare() {
    // A short celebratory phrase: pickup triplet, then a rising arpeggio and a held major chord.
    const seq = [
      [N.G4, 0.0, 0.12], [N.G4, 0.13, 0.12], [N.G4, 0.26, 0.12],
      [N.C5, 0.4, 0.35], [N.G4, 0.78, 0.14], [N.C5, 0.93, 0.14], [N.E5, 1.08, 0.14],
      [N.G5, 1.23, 0.35], [N.E5, 1.6, 0.14], [N.G5, 1.75, 0.14],
    ];
    seq.forEach(([f, at, d]) => note(f, at, d + 0.05, { type: 'triangle', gain: 0.26 }));
    [N.C5, N.E5, N.G5, N.C6].forEach((f) => note(f, 1.92, 1.4, { type: 'triangle', gain: 0.16, attack: 0.02 }));
    [N.C4, N.G4].forEach((f) => note(f, 1.92, 1.4, { type: 'sine', gain: 0.14, attack: 0.02 }));
    [N.E6, N.G6, N.C6 * 2].forEach((f, i) => note(f, 2.1 + i * 0.07, 0.25, { type: 'sine', gain: 0.06 }));
  },

  // ---- player ----
  tap() {
    note(520, 0, 0.06, { type: 'triangle', gain: 0.18, attack: 0.003 });
  },
  correct() {
    note(N.E5, 0, 0.12, { type: 'triangle', gain: 0.25 });
    note(N.A5, 0.09, 0.14, { type: 'triangle', gain: 0.25 });
    note(N.E6, 0.19, 0.3, { type: 'sine', gain: 0.14 });
  },
  wrong() {
    note(N.E4, 0, 0.22, { type: 'sine', gain: 0.2 });
    note(N.C4, 0.16, 0.34, { type: 'sine', gain: 0.18 });
  },
};

/** Wire a mute toggle button (expects .icon-on / .icon-off children). */
export function bindMuteButton(btn, t) {
  const render = () => {
    btn.classList.toggle('is-muted', muted);
    btn.setAttribute('aria-pressed', String(muted));
    const label = muted ? t('unmute') : t('mute');
    btn.setAttribute('aria-label', label);
    btn.title = label;
  };
  btn.addEventListener('click', () => {
    setMuted(!muted);
    render();
    if (!muted) sfx.tap();
  });
  window.addEventListener('langchange', render);
  render();
}
