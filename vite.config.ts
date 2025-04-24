import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({

  // prevent vite from obscuring rust errors
  clearScreen: false,

  // Tauri expects a fixed port, fail if that port is not available
  server: {
    strictPort: true,
  },

  // to make use of 'TAURI_PLATFORM', 'TAURI_ARCH', 'TAURI_FAMILY',`
  // 'TAURI_PLATFORM_VERSION', 'TAURI_PLATFORM_TYPE' and 'TAURI_DEBUG'
  // environment variables
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: [
      "es2022",          // Latest ECMAScript standard supported
      "chrome123",       // Latest stable Chrome
      "firefox119",      // Latest stable Firefox
      "safari17",        // Latest stable Safari
      "edge123",         // Latest stable Edge
      "electron28",      // Latest Electron used by Tauri/WebView2
      "opera104",        // Latest stable Opera
      "opragx101"        // Latest Opera GX
    ],

    //don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    
    //produce source maps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
  },

  plugins: [
    react(),
    tailwindcss(),
  ],
})
