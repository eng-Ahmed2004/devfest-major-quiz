// Small UI helpers: shape icons, colour chips, screens, toast, confetti.
import { BRAND } from './game-config.js';

function polygon(n, r, rot = -90, cx = 50, cy = 50) {
  const pts = [];
  for (let k = 0; k < n; k++) {
    const a = ((rot + (360 / n) * k) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

function star(points = 5, R = 47, r = 20) {
  const pts = [];
  for (let k = 0; k < points * 2; k++) {
    const rad = k % 2 ? r : R;
    const a = ((-90 + (180 / points) * k) * Math.PI) / 180;
    pts.push(`${(50 + rad * Math.cos(a)).toFixed(2)},${(52 + rad * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
}

const SHAPES = {
  circle: '<circle cx="50" cy="50" r="40"/>',
  triangle: '<polygon points="50,10 92,84 8,84"/>',
  square: '<rect x="14" y="14" width="72" height="72" rx="4"/>',
  diamond: '<polygon points="50,5 93,50 50,95 7,50"/>',
  star: `<polygon points="${star()}"/>`,
  heart: '<path d="M50 88C22 68 7 52 7 33 7 19 18 9 31 9c8 0 15 4 19 11 4-7 11-11 19-11 13 0 24 10 24 24 0 19-15 35-43 55z"/>',
  hexagon: `<polygon points="${polygon(6, 44, 0)}"/>`,
  arrow: '<polygon points="50,6 90,46 64,46 64,93 36,93 36,46 10,46"/>',
};

export function shapeSvg(shape, color = 'currentColor') {
  const body = SHAPES[shape] || SHAPES.circle;
  return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g fill="${color}" stroke="${color}" stroke-width="5" stroke-linejoin="round">${body}</g></svg>`;
}

/** Build a colour option element (button for players, div for the host screen). */
export function colorOption(c, { tag = 'button', label = '', showName = false } = {}) {
  const el = document.createElement(tag);
  el.className = 'opt';
  el.dataset.color = c.id;
  el.style.setProperty('--c', c.hex);
  el.style.setProperty('--fg', c.fg);
  if (tag === 'button') el.type = 'button';
  el.innerHTML = `<span class="opt-shape">${shapeSvg(c.shape)}</span><span class="opt-name"></span><span class="opt-count"></span>`;
  el.querySelector('.opt-name').textContent = label;
  el.classList.toggle('show-name', showName);
  el.setAttribute('aria-label', label);
  return el;
}

export function $(sel, root = document) {
  return root.querySelector(sel);
}

/** Show one `.screen` and hide the others. */
export function showScreen(id) {
  document.querySelectorAll('.screen').forEach((s) => {
    const on = s.id === id;
    s.hidden = !on;
    s.classList.toggle('is-active', on);
  });
  document.body.dataset.screen = id;
}

let toastTimer = null;
export function toast(msg, ms = 2600) {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), ms);
}

/** Restart a CSS animation on an element. */
export function replay(el, cls) {
  el.classList.remove(cls);
  void el.offsetWidth;
  el.classList.add(cls);
}

// ---------------- confetti (Google colours) ----------------
let confettiRaf = 0;
export function confetti({ duration = 5000, density = 1 } = {}) {
  let canvas = document.getElementById('confetti');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti';
    canvas.className = 'confetti';
    document.body.appendChild(canvas);
  }
  const g = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
  };
  resize();
  const colors = Object.values(BRAND);
  const parts = [];
  const spawn = (count, fromX) => {
    for (let k = 0; k < count; k++) {
      parts.push({
        x: (fromX ?? Math.random()) * innerWidth,
        y: fromX === undefined ? -20 - Math.random() * innerHeight * 0.3 : innerHeight * 0.7,
        vx: fromX === undefined ? (Math.random() - 0.5) * 2 : (fromX < 0.5 ? 1 : -1) * (3 + Math.random() * 7),
        vy: fromX === undefined ? 2 + Math.random() * 3 : -(10 + Math.random() * 9),
        w: 8 + Math.random() * 8,
        h: 5 + Math.random() * 6,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        color: colors[(Math.random() * colors.length) | 0],
        round: Math.random() < 0.3,
      });
    }
  };
  const n = Math.round(Math.min(innerWidth, 1600) / 6 * density);
  spawn(n);
  spawn(n / 3, 0.02);
  spawn(n / 3, 0.98);
  const t0 = performance.now();
  let lastBurst = t0;
  cancelAnimationFrame(confettiRaf);
  const frame = (now) => {
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, innerWidth, innerHeight);
    if (now - t0 < duration - 1500 && now - lastBurst > 900) {
      spawn(n / 4);
      lastBurst = now;
    }
    for (const p of parts) {
      p.vy += 0.18;
      p.vx *= 0.99;
      p.vy = Math.min(p.vy, 7);
      p.x += p.vx + Math.sin((now + p.w * 100) / 400) * 0.6;
      p.y += p.vy;
      p.rot += p.vr;
      g.save();
      g.translate(p.x, p.y);
      g.rotate(p.rot);
      g.fillStyle = p.color;
      if (p.round) {
        g.beginPath();
        g.arc(0, 0, p.h / 1.6, 0, Math.PI * 2);
        g.fill();
      } else {
        g.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.rot * 2)) + 1);
      }
      g.restore();
    }
    for (let k = parts.length - 1; k >= 0; k--) if (parts[k].y > innerHeight + 40) parts.splice(k, 1);
    if (now - t0 < duration || parts.length) confettiRaf = requestAnimationFrame(frame);
    else g.clearRect(0, 0, innerWidth, innerHeight);
  };
  confettiRaf = requestAnimationFrame(frame);
}

export function stopConfetti() {
  cancelAnimationFrame(confettiRaf);
  const canvas = document.getElementById('confetti');
  if (canvas) canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
}

/** Watches .info/connected and toggles an offline banner. */
export function connectionBanner(onValue, ref, db, t) {
  const el = document.createElement('div');
  el.className = 'offline-banner';
  el.hidden = true;
  document.body.appendChild(el);
  let first = true;
  onValue(ref(db, '.info/connected'), (snap) => {
    const on = snap.val() === true;
    if (on) first = false;
    el.textContent = t('offline');
    el.hidden = on || first;
  });
  window.addEventListener('langchange', () => (el.textContent = t('offline')));
}
