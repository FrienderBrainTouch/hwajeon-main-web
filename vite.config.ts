import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // ✅ .env 로드

  const isPreview = env.PREVIEW === 'true';
  const pr = env.PR_NUMBER;
  const base = isPreview && pr ? `/hwajeon-main-web/pr-${pr}/` : `/hwajeon-main-web/`;

  return {
    plugins: [react()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    base,
  };
});
