import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    VitePWA({
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'icon.svg',
        'icon-192.png',
        'icon-512.png',
        'icon-maskable-512.png',
        'screenshot-1.png',
        'screenshot-2.png',
        'screenshot-3.png',
      ],
      manifest: {
        short_name: 'BrewCalc',
        name: 'BrewCalc',
        description:
          'BrewCalc is a simple coffee ratio calculator. Calculate how much water you need for a given amount of coffee, or the other way around. BrewCalc also supports converting between common units and provides brewing instructions.',
        id: '/?source=pwa',
        start_url: '/?source=pwa',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#403020',
        background_color: '#fff8f0',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64',
            type: 'image/x-icon',
          },
          {
            src: 'icon.svg',
            type: 'image/svg+xml',
            sizes: 'any',
            purpose: 'any',
          },
          {
            src: 'icon-192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any',
          },
          {
            src: 'icon-512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any',
          },
          {
            src: 'icon-maskable-512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable',
          },
        ],
        screenshots: [
          {
            src: 'screenshot-1.png',
            type: 'image/png',
            sizes: '800x1600',
          },
          {
            src: 'screenshot-2.png',
            type: 'image/png',
            sizes: '800x1600',
          },
          {
            src: 'screenshot-3.png',
            type: 'image/png',
            sizes: '800x1600',
          },
        ],
      },
    }),
  ],
  server: {
    open: true,
    port: 3000,
  },
  define: {
    'import.meta.env.VITE_VERCEL_ANALYTICS_ID': JSON.stringify(process.env.VERCEL_ANALYTICS_ID),
  },
});
