import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', 
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    allowedHosts: [
      'ff60-2401-4900-1c97-a217-9815-9838-f1fc-135b.ngrok-free.app'
    ]
  }
})