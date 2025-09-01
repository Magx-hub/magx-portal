import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), 
    VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.js',
    registerType: 'autoUpdate',
    // injectRegister: false,
    devOptions: {
      enabled: true // Enable in dev for testing
    },
    pwaAssets: {
      disabled: false,
      config: true,
    },
      
    includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
    manifest: {
      name: 'magx-portal',
      short_name: 'magx-portal',
      description: 'A school management app for MagMax Educational Centre',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/your-repo-name/',
      start_url: '/your-repo-name/',
      lang: 'en',
      dir: 'ltr',
      categories: ['productivity', 'utilities'],
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
          // Runtime caching for API calls
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\.example\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
          },
          cacheKeyWillBeUsed: async ({ request }) => {
            return `${request.url}?version=1`
          }
        }
      },
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365
          }
        }
      }
    ],
    },

    // devOptions: {
    //   enabled: false,
    //   navigateFallback: 'index.html',
    //   suppressWarnings: true,
    //   type: 'module',
    // },
  })],
})