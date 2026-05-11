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

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Background message:", payload);

  const title =
    payload.notification?.title || "StudyNaija";
  const options = {
    body:
      payload.notification?.body ||
      "Time to study! 📚",
    icon: "/android-chrome-192x192.png",
    badge: "/android-chrome-192x192.png",
    vibrate: [200, 100, 200],
    actions: [
      {
        action: "open",
        title: "Study Now 📚",
      },
      {
        action: "dismiss",
        title: "Later",
      },
    ],
  };

  self.registration.showNotification(title, options);
});

// Handle notification click
self.addEventListener(
  "notificationclick",
  (event) => {
    event.notification.close();
    if (event.action === "dismiss") return;
    event.waitUntil(
      clients
        .matchAll({ type: "window" })
        .then((clientList) => {
          for (const client of clientList) {
            if (
              client.url === "/" &&
              "focus" in client
            ) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow("/");
          }
        })
    );
  }
);
