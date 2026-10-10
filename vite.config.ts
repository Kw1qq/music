import { devtools } from '@tanstack/devtools-vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    viteReact(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      includeAssets: ['favicon.ico'],

      manifest: {
        name: 'Music',
        short_name: 'Music',
        description: 'Музыкальный плеер и библиотека треков, альбомов и плейлистов',
        theme_color: '#1a1b1e',
        background_color: '#1a1b1e',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ],
        screenshots: [
          {
            src: '/screenshot-wide.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Главный экран'
          }
        ]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
        navigateFallback: '/index.html',

        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.endsWith('/api/tracks/events'),
            handler: 'NetworkOnly'
          },
          {
            urlPattern: ({ url }) => /\/api\/tracks\/[^/]+\/(?:stream|video)$/.test(url.pathname),
            handler: 'CacheFirst',
            options: {
              cacheName: 'media-cache',
              rangeRequests: true,
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 14
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: ({ request, url }) =>
              request.destination === 'image' && url.pathname.startsWith('/api/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'covers-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: ({ request, url }) =>
              request.method === 'GET' &&
              url.pathname.startsWith('/api/') &&
              !url.pathname.endsWith('/api/tracks/events') &&
              !url.pathname.startsWith('/api/auth/') &&
              !url.pathname.endsWith('/stream-token'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 4,
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24
              },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },

      devOptions: {
        enabled: false
      }
    })
  ]
})

export default config
