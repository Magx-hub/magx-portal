// Mobile-specific service worker fixes
const CACHE_NAME = 'magx-portal-v1';
const FALLBACK_URL = '/index.html';

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/main.jsx',
        '/manifest.json'
      ]);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - handle navigation requests for mobile
self.addEventListener('fetch', (event) => {
  // Only handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If we get a valid response, return it
          if (response && response.status === 200) {
            return response;
          }
          // If response is not ok, fall back to index.html
          return caches.match(FALLBACK_URL);
        })
        .catch(() => {
          // If fetch fails (offline), serve from cache
          return caches.match(FALLBACK_URL);
        })
    );
  }
  
  // For non-navigation requests, try cache first, then network
  else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
