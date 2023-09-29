import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "My Awesome App",
        short_name: "MyApp",
        description: "My Awesome App description",
        theme_color: "#ffffff",
        display: "standalone",
        scope: '/',
        start_url: "/",
        orientation: 'portrait',
        icons: [{
          src: '/public/eccilg.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/public/eccibig.png',
          sizes: '512x512',
          type: 'image/png',
        }
        ],
      },
    }),
  ],
});
