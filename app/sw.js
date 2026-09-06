// Amsterdam Adventure — offline service worker
// The whole app is one self-contained HTML file, so caching it plus the
// Google Fonts stylesheet is enough to run the entire app with no signal.
const CACHE = 'ams-adventure-v2';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Drop old caches when the app updates
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      // Serve from cache first — kids are often on a school trip with no data
      if (cached) return cached;
      return fetch(e.request)
        .then((res) => {
          // Cache successful same-origin responses and fonts for next time
          if (res.ok && (e.request.url.startsWith(self.location.origin)
              || e.request.url.includes('fonts.g'))) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
