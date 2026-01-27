import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    host:true,
    port:5173,
    allowedHosts: [
      'promoting-vital-gate-fiscal.trycloudflare.com'
    ]
  }
})

// import { defineConfig } from 'vite'

