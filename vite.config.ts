import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '8443'),
    strictPort: true,
    // The site calls the API on its own origin; in development that is the live server.
    proxy: {
      '/api': {
        target: 'https://api.noorain.uz',
        changeOrigin: true,
        secure: true,
        // The gateway only accepts the site's own origin.
        configure: (proxy) => proxy.on('proxyReq', (req) => req.setHeader('origin', 'https://noorain.uz')),
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '8443'),
  },
})
