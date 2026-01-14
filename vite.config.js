// Cod Node.js comentat pentru a evita eroarea în StackBlitz
// Acest cod funcționează doar în medii server (ex: Node.js), nu în StackBlitz/browser

// process.on("uncaughtException", (err) => {
//   console.error("🔥 uncaughtException:", err?.stack || err);
// });

// process.on("unhandledRejection", (err) => {
//   console.error("🔥 unhandledRejection:", err?.stack || err);
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Config minim și sigur. Evităm importul de "path" ca să nu dea fail pe ESM/CJS.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',   // index
        notFound: '404.html', // fallback SPA
      },
    },
  },
})
