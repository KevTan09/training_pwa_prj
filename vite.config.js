import { defineConfig } from 'vite'
import {VitePWA} from "vite-plugin-pwa";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^http:\/\/localhost:3000\/auth\/user$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'auth-user-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 3 // <== 3 second for dev only
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
        ],
      },
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      devOptions: {
        enabled: true
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'My Awesome App',
        short_name: 'MyApp',
        description: 'My Awesome App description',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    }),
  ],
})
