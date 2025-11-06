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
