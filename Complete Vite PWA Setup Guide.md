# Complete Vite PWA Setup Guide

## 1. Customizing the Web App Manifest

### Basic Manifest Configuration

Your `vite.config.js` with a complete manifest setup:

```javascript
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'My Awesome PWA',
        short_name: 'MyPWA',
        description: 'An amazing Progressive Web App built with Vite',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
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
      }
    })
  ]
})
```

### Required HTML Head Elements

Your `index.html` must include these in the `<head>`:

```html
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>My Awesome PWA</title>
  <meta name="description" content="An amazing Progressive Web App built with Vite">
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
  <link rel="mask-icon" href="/mask-icon.svg" color="#FFFFFF">
  <meta name="theme-color" content="#ffffff">
</head>
```

### Icon Requirements

Place these icons in your `public/` folder:
- `favicon.ico` - Browser favicon
- `apple-touch-icon.png` - iOS home screen icon (180x180)
- `mask-icon.svg` - Safari pinned tab icon
- `pwa-192x192.png` - Android chrome icon (192x192)
- `pwa-512x512.png` - Large app icon (512x512)

**Pro Tip**: Use the [PWA Assets Generator](https://vite-pwa-org.netlify.app/assets-generator/) to automatically generate all required icons from a single source image.

### Additional Manifest Options

```javascript
manifest: {
  name: 'My Awesome PWA',
  short_name: 'MyPWA',
  description: 'An amazing Progressive Web App built with Vite',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  display: 'standalone', // or 'fullscreen', 'minimal-ui', 'browser'
  orientation: 'portrait', // or 'landscape', 'any'
  scope: '/',
  start_url: '/?source=pwa',
  lang: 'en',
  dir: 'ltr', // or 'rtl'
  categories: ['productivity', 'utilities'],
  screenshots: [
    {
      src: '/screenshot-wide.png',
      sizes: '1280x720',
      type: 'image/png',
      form_factor: 'wide'
    },
    {
      src: '/screenshot-mobile.png',
      sizes: '720x1280',
      type: 'image/png',
      form_factor: 'narrow'
    }
  ]
}
```

---

## 2. Configuring Offline Strategies

### Strategy 1: generateSW (Automatic - Recommended for most cases)

```javascript
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Cache all static assets
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        
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
        ]
      }
    })
  ]
})
```

### Strategy 2: injectManifest (Custom Service Worker)

First, create a custom service worker `src/sw.js`:

```javascript
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
```

Then configure the plugin:

```javascript
export default defineConfig({
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate'
    })
  ]
})
```

### Caching Strategies Explained

- **CacheFirst**: Check cache first, fallback to network
- **NetworkFirst**: Try network first, fallback to cache
- **StaleWhileRevalidate**: Serve from cache, update in background
- **NetworkOnly**: Always use network
- **CacheOnly**: Always use cache

### Firebase Integration for Offline

```javascript
// For Firebase/Firestore offline support
workbox: {
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/firestore\.googleapis\.com\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'firestore-cache',
        networkTimeoutSeconds: 3,
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 // 24 hours
        }
      }
    }
  ]
}
```

---

## 3. GitHub Pages + Firebase Integration

### Project Structure
```
my-pwa/
├── public/
│   ├── favicon.ico
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── apple-touch-icon.png
│   ├── mask-icon.svg
│   └── robots.txt
├── src/
│   ├── main.js
│   └── firebase.js
├── vite.config.js
├── package.json
└── .github/
    └── workflows/
        └── deploy.yml
```

### Firebase Setup

`src/firebase.js`:
```javascript
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  // Your Firebase config
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
```

### Complete Vite Config for GitHub Pages

`vite.config.js`:
```javascript
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/your-repo-name/', // Important for GitHub Pages
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // Enable in dev for testing
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'My GitHub Pages PWA',
        short_name: 'GitHubPWA',
        description: 'PWA hosted on GitHub Pages with Firebase',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/your-repo-name/',
        start_url: '/your-repo-name/',
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
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          // Cache Firebase API calls
          {
            urlPattern: /^https:\/\/.*\.googleapis\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'google-apis-cache',
              networkTimeoutSeconds: 3,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          }
        ]
      }
    })
  ]
})
```

### GitHub Actions Deployment

`.github/workflows/deploy.yml`:
```yaml
name: Deploy PWA to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: yarn install
      
    - name: Build
      run: yarn build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Required Files

`public/robots.txt`:
```
User-agent: *
Allow: /
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "preview-https": "vite preview --https"
  }
}
```

### Testing Your PWA

1. **Development**: `yarn dev` - PWA features work with `devOptions.enabled: true`
2. **Local HTTPS**: `yarn preview-https` - Test installability
3. **Lighthouse**: Run audit on deployed version
4. **Install test**: Try installing the PWA on mobile/desktop

### Firebase + PWA Best Practices

- Use Firebase's offline persistence for Firestore
- Implement proper error handling for offline scenarios
- Cache Firebase Auth state
- Consider using Firebase Analytics to track PWA usage

This setup gives you a fully functional PWA with offline capabilities, proper caching strategies, and seamless deployment to GitHub Pages with Firebase backend integration!