const CACHE_NAME = 'ladosha-cache-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/menu.html',
  '/cart.html',
  '/checkout.html',
  '/explore.html',
  '/about.html',
  '/destinations.html',
  '/css/style.css',
  '/js/cart.js',
  '/js/menu.js',
  '/assets/images/ladoshalogo.png',
  '/assets/icons/facebook.png',
  '/assets/icons/instagram.png',
  '/assets/icons/x.png',
  '/assets/icons/youtube.png'
];

// Install: cache static assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: serve cached or fetch + cache dynamically
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then(cached => {
        if (cached) return cached;

        return fetch(e.request)
          .then(networkRes => {
            // Only cache GET requests for same-origin resources
            if (e.request.method === 'GET' && networkRes && networkRes.status === 200 && e.request.url.startsWith(self.location.origin)) {
              return caches.open(CACHE_NAME).then(cache => {
                cache.put(e.request, networkRes.clone());
                return networkRes;
              });
            } else {
              return networkRes;
            }
          })
          .catch(() => caches.match('/index.html')); // fallback offline
      })
  );
});
