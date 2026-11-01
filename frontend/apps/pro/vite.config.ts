import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// Servie sous /pro/, sur le même domaine que l'application citoyen (frontend-context.md, « Déploiement »).
export default defineConfig({
  base: '/pro/',
  server: { port: 5174 },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.svg'],
      manifest: {
        name: 'GovLocate Pro',
        short_name: 'GovLocate Pro',
        description: 'Guichet et console des communes.',
        lang: 'fr',
        start_url: '/pro/',
        scope: '/pro/',
        display: 'standalone',
        theme_color: '#14181F',
        background_color: '#F3F5F4',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
});
