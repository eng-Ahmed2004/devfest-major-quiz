// ============================================================================
//  إعدادات Firebase للتطبيق — Firebase web app config
//
//  هذه القيم تأتي من: firebase apps:sdkconfig WEB <APP_ID> --project dont-read-look
//  (أو من Firebase Console → Project settings → Your apps → SDK setup and configuration → Config)
//  لنقل اللعبة إلى مشروع آخر: استبدل القيم أدناه بقيم مشروعك، وتأكد أن databaseURL
//  هو رابط قاعدة Realtime Database الصحيح (يظهر في Console → Realtime Database).
//
//  هذه القيم ليست سرية؛ الحماية الحقيقية في database.rules.json.
// ============================================================================

export const firebaseConfig = {
  apiKey: 'AIzaSyAIxZ65HpLGgLUAbIYwYohBiJ8tr0Z8ez0',
  authDomain: 'dont-read-look.firebaseapp.com',
  databaseURL: 'https://dont-read-look-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'dont-read-look',
  storageBucket: 'dont-read-look.firebasestorage.app',
  messagingSenderId: '78318246297',
  appId: '1:78318246297:web:a96f8a48c4aab00d5d5b08',
};
