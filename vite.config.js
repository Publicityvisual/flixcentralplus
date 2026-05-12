import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  base: '',
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
  },
  build: {
    outDir: 'docs',
    sourcemap: false,
  },
})
