import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base must match the GitHub Pages repo path: https://<user>.github.io/iba-prep/
export default defineConfig({
  base: '/iba-prep/',
  plugins: [react(), tailwindcss()],
})
