// vite.config.js — agrega el plugin
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), ViteImageOptimizer()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});