import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // pages | nginx
  const target = env.DEPLOY_TARGET || 'pages';
  const isPreview = env.PREVIEW === 'true';
  const pr = env.PR_NUMBER;

  // 기본은 Nginx(도메인 루트)라고 생각하면 실수 줄어듦
  let base = '/';

  // GitHub Pages일 때만 서브경로 사용 (개발 환경에서는 루트 사용)
  if (target === 'pages' && mode === 'production') {
    base = isPreview && pr ? `/hwajeon-main-web/pr-${pr}/` : `/hwajeon-main-web/`;
  }

  return {
    plugins: [react()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    base,
  };
});
