// Amsterdam Adventure — offline service worker
//
// The app is one self-contained HTML file, so caching it is enough to run
// everything with no signal. But the page must be fetched network-first:
// a cache-first document never updates, and players sit on an old build
// forever without knowing it. Network-first keeps them current when they
// have signal, and the cache still carries them when they do not.
const CACHE = 'ams-adventure-v3';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Is this a request for the app page itself?
function isPage(req) {
  return req.mode === 'navigate'
      || (req.destination === 'document')
      || req.url.endsWith('/')
      || req.url.endsWith('/index.html');
}

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  if (isPage(e.request)) {
    // Network first: always try for the latest build, fall back when offline
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put('./index.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Everything else (fonts, icons) can come from cache first
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request)
        .then((res) => {
          if (res.ok && (e.request.url.startsWith(self.location.origin)
              || e.request.url.includes('fonts.g'))) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
