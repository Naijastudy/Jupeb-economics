const CACHE_NAME = "studynaija-v1.1";
const STATIC_CACHE = "studynaija-static-v1.1";
const DYNAMIC_CACHE = "studynaija-dynamic-v1.1";

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/android-chrome-192x192.png",
  "/android-chrome-512x512.png",
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch — Network first, fall back to cache
self.addEventListener("fetch", event => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip cross-origin requests
  if (!request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(request)
      .then(networkResponse => {
        // Cache a copy of the response
        const responseClone = networkResponse.clone();
        caches.open(DYNAMIC_CACHE).then(cache => {
          cache.put(request, responseClone);
        });
        return networkResponse;
      })
      .catch(() => {
        // Network failed — try cache
        return caches.match(request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          // For navigation requests return index.html
          if (request.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
      })
  );
});

// Background sync — notify users of new content
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
