import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const isPreview = process.env.PREVIEW === 'true';
const prNumber = process.env.PR_NUMBER;
const base = isPreview
  ? `/hwajeon-main-web/pr-${prNumber}/` // 🔥 PR 프리뷰 전용 경로
  : '/hwajeon-main-web/'; // 정식 배포 경로

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  base,
});
