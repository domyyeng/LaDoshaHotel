const CACHE_NAME = "ladosha-cache-v1";
const urlsToCache = [
  "/",                // root
  "/index.html",
  "/menu.html",
  "/about.html",
  "/contact.html",
  "/explore.html",
  "/destinations.html",
  "/cart.html",
  "/game.html",
  "/css/style.css",
  "/js/cart.js",
  "/assets/images/ladoshalogo.png",
  // add more assets here if needed
];

// Install service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate and clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

// Fetch requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Optional: offline fallback page
        if (event.request.mode === "navigate") {
          return caches.match("/index.html");
        }
      });
    })
  );
});

