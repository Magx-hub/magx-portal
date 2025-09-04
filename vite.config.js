import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
// import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/magx-portal/',
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      strategies: 'generateSW', // Changed from 'injectManifest' to 'generateSW' for easier setup
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // Enable in dev for testing
      },
      pwaAssets: {
        disabled: false,
        config: true,
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'MagX Portal',
        short_name: 'MagX Portal',
        description: 'A school management app for MagMax Educational Centre',
        theme_color: '#1f2937', // Using a proper color from your gray-900 theme
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/magx-portal/',
        start_url: '/magx-portal/',
        lang: 'en',
        dir: 'ltr',
        categories: ['productivity', 'education', 'utilities'],
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
        runtimeCaching: [
          // Firebase caching
          {
            urlPattern: /^https:\/\/.*\.firebaseio\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'firebase-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          },
          // Google Fonts caching
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          // Google Fonts static resources
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-static-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ],
      },
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          router: ['react-router-dom']
        }
      }
    }
  },
  server: {
    port: 3000,
    host: true,
    historyApiFallback: true
  }
})