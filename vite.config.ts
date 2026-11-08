import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: false, // probar la PWA en dev
      },
      manifest: {
        name: 'VI — O bairro acontece aqui',
        short_name: 'VI',
        description: 'O marketplace e guia hiperlocal do seu bairro.',
        lang: 'pt-BR',
        id: '/',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#0F172A',
        background_color: '#0F172A',
        categories: ['shopping', 'lifestyle', 'navigation'],
        icons: [
          { src: '/favicon.ico', sizes: '16x16 24x24 32x32 48x48 64x64', type: 'image/x-icon' },
          { src: '/icon-192-any.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512-any.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-192-maskable.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{html,css,js,ico,png,svg,webp,woff2}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})