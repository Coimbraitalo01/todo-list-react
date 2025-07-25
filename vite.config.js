import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'automatic' // Ativa a transformação JSX moderna
  })],
  server: {
    host: true,
    port: 5173
  }
})