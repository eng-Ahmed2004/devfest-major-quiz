// Helpers for the Node test scripts: one Firebase client per anonymous identity.
import { initializeApp, deleteApp, setLogLevel } from '@firebase/app';
import { initializeAuth, inMemoryPersistence, signInAnonymously } from '@firebase/auth';
import { getDatabase, goOffline } from '@firebase/database';
import { firebaseConfig } from '../public/js/firebase-config.js';

setLogLevel('error'); // hide expected permission_denied warnings
let counter = 0;

export async function client(label) {
  const app = initializeApp(firebaseConfig, `${label}-${counter++}-${Date.now()}`);
  const auth = initializeAuth(app, { persistence: inMemoryPersistence });
  const { user } = await signInAnonymously(auth);
  const db = getDatabase(app);
  return {
    label,
    app,
    db,
    uid: user.uid,
    async close() {
      goOffline(db);
      await deleteApp(app);
    },
  };
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
