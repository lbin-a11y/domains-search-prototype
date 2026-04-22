import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  define: { __DEV__: JSON.stringify(true) },
  plugins: [react()],
  resolve: { dedupe: ['react', 'react-dom'] },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3001,
    strictPort: false,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.message.includes('@react-aria')) return
        warn(warning)
      }
    }
  }
})
