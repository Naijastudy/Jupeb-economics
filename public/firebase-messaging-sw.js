importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCl4-QWw8-_BgzxTD6fi9-CxsC78U7wywU",
  authDomain: "studynaija-8c01a.firebaseapp.com",
  projectId: "studynaija-8c01a",
  storageBucket: "studynaija-8c01a.firebasestorage.app",
  messagingSenderId: "668447124421",
  appId: "1:668447124421:web:c040358d19e6aab3edf9ac",
});

const messaging = firebase.messaging();

const NOTIFICATION_CONTENT = {
  daily: [
    { title: "StudyNaija 📚", body: "Time to study! Keep your streak alive 🔥" },
    { title: "StudyNaija 🎯", body: "Your JUPEB exam won't pass itself. Let's go!" },
    { title: "StudyNaija 💡", body: "10 minutes of study is better than zero. Start now!" },
    { title: "StudyNaija 🏆", body: "Champions study every day. Are you a champion?" },
    { title: "StudyNaija 📝", body: "New day, new questions. Keep the momentum going!" },
    { title: "StudyNaija ⚡", body: "Your future self will thank you for studying today." },
  ],
  streak: [
    { title: "StudyNaija 🔥", body: "Don't break your streak! Study something today." },
    { title: "StudyNaija ⚡", body: "Your streak is at risk! Come study now." },
    { title: "StudyNaija 💪", body: "Keep it going! One question can save your streak." },
  ],
  welcome: [
    { title: "StudyNaija 🎉", body: "Notifications enabled! We'll remind you to study daily." },
  ],
};

function getRandomContent(type) {
  const list = NOTIFICATION_CONTENT[type] || NOTIFICATION_CONTENT.daily;
  return list[Math.floor(Math.random() * list.length)];
}

// ── BACKGROUND MESSAGE HANDLER ────────────────────────────────────────────────
// ✅ Fires when app is CLOSED or in background
// Firebase sends the push → this SW catches it → shows notification
messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background FCM message received:", payload);

  // Get content from payload or use random fallback
  const type    = payload.data?.type || "daily";
  const content = getRandomContent(type);

  const title   = payload.notification?.title || content.title;
  const body    = payload.notification?.body  || content.body;
  const url     = payload.data?.url           || "/";

  const options = {
    body,
    icon:     "/android-chrome-192x192.png",
    badge:    "/android-chrome-192x192.png",
    vibrate:  [200, 100, 200],
    tag:      `${type}-reminder`,
    renotify: true, // ✅ shows even if same tag exists
    data:     { url, type },
    actions: [
      { action: "open",    title: "Study Now 📚" },
      { action: "dismiss", title: "Later" },
    ],
  };

  // ✅ event.waitUntil not available here — return the promise instead
  return self.registration.showNotification(title, options);
});


// ── NOTIFICATION CLICK ────────────────────────────────────────────────────────
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // User tapped Later — do nothing
  if (event.action === "dismiss") return;

  const urlToOpen = event.notification.data?.url || "/";

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        // If app already open — focus it
        for (const client of clientList) {
          if (
            client.url.includes(self.location.origin) &&
            "focus" in client
          ) {
            return client.focus();
          }
        }
        // Otherwise open new window
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});


// ── NOTIFICATION CLOSE ────────────────────────────────────────────────────────
self.addEventListener("notificationclose", (event) => {
  const type = event.notification.data?.type || "unknown";
  console.log(`[SW] Notification dismissed without tapping: ${type}`);
});

