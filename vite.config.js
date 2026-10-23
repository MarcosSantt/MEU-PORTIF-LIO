import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // No GitHub Pages o site fica em /MEU-PORTIF-LIO/; na Vercel e no Docker, na raiz
  base: process.env.GITHUB_PAGES ? '/MEU-PORTIF-LIO/' : '/',
})
