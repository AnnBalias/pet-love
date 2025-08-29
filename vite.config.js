import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'https://petlove.b.goit.study',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    port: 3000,
    host: true,
  },
});
