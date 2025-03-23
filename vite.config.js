import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/pdf-splitter/', // <-- Change this to your GitHub repo name
  plugins: [react()],
})
