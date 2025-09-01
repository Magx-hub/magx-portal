
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'

// Precache all assets
precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// Cache API responses
registerRoute(
  ({ url }) => url.origin === 'https://api.example.com',
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
  })
)

// Cache images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-cache',
  })
)