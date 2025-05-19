import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "short_name": "Rini Dawr",
        "name":"Rini Tea Stall",
        "icons": [
            {
                "src": "/icons/icon-small.png",
                "type": "image/png",
                "sizes": "192x192"
            },
            {
                "src": "/icons/icon-large.png",
                "type": "image/png",
                "sizes": "512x512"
            }
        ],
        "start_url": ".",
        "display": "standalone",
        "theme_color": "#ffffff",
        "background_color": "#ffffff",
        "orientation": "natural"
    }
    })
  ],
})
