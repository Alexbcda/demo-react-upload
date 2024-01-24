import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // nécessaire pour que la cartographie des ports du conteneur Docker fonctionne
    strictPort: true,
    port: 5173, // remplacez ce port par celui de votre choix
  },
});
