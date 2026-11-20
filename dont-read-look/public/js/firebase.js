// Firebase bootstrap shared by host and player pages.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js';
import {
  initializeAuth, browserLocalPersistence, signInAnonymously, onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

export * from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-database.js';

// ?profile=NAME gives a separate identity in the same browser (for testing many players
// in one browser). Normal players never need it.
const params = new URLSearchParams(location.search);
export const PROFILE = (params.get('profile') || '').replace(/[^a-z0-9_-]/gi, '').slice(0, 24);

export const configured = Boolean(firebaseConfig.apiKey && firebaseConfig.databaseURL);

export const app = configured
  ? PROFILE ? initializeApp(firebaseConfig, `profile-${PROFILE}`) : initializeApp(firebaseConfig)
  : null;

// Identity is kept in localStorage so a player who closes the browser comes back as the same player.
export const auth = app ? initializeAuth(app, { persistence: browserLocalPersistence }) : null;
export const db = app ? getDatabase(app) : null;

/** Resolves with the signed-in (anonymous) user. */
export function signIn() {
  if (!auth) return Promise.reject(new Error('firebase-not-configured'));
  return new Promise((resolve, reject) => {
    const stop = onAuthStateChanged(auth, (user) => {
      if (user) {
        stop();
        resolve(user);
      }
    });
    if (!auth.currentUser) {
      signInAnonymously(auth).catch((err) => {
        stop();
        reject(err);
      });
    }
  });
}

// Server clock offset: serverNow() ≈ Firebase server time (display only; scores use server timestamps).
let offset = 0;
export function watchServerOffset() {
  if (!db) return;
  onValue(ref(db, '.info/serverTimeOffset'), (snap) => {
    offset = snap.val() || 0;
  });
}
export function serverNow() {
  return Date.now() + offset;
}

/** localStorage helpers, namespaced per profile, safe in private mode. */
const NS = `drl${PROFILE ? ':' + PROFILE : ''}:`;
export const store = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(NS + key);
      return v === null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(NS + key, JSON.stringify(value));
    } catch { /* ignore */ }
  },
  remove(key) {
    try {
      localStorage.removeItem(NS + key);
    } catch { /* ignore */ }
  },
};
