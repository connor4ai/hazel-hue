import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { prerenderPlugin } from './plugins/prerender';

export default defineConfig({
  plugins: [react(), prerenderPlugin()],
});
