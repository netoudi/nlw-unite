import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

function app_path() {
  return new URL('src', import.meta.url).pathname;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': app_path(),
    },
  },
});
