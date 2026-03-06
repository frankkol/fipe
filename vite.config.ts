import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Importação correta

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Certifique-se dos parênteses ()
  ],
})