# ⚙️ Vite + Nginx CI/CD & GitHub Pages Preview 설정 가이드

이 문서는 **Vite 기반 프론트엔드** 프로젝트에서

- `prod` 브랜치 **push → 서버 실배포 (Nginx)**
- `prod` 브랜치 대상 **PR → GitHub Pages 미리보기 (Preview)**  
  를 자동화하기 위한 GitHub Actions 설정 방법을 정리합니다.

---

## 🧩 목표

- PR 생성 시: **개별 PR 미리보기 URL 제공**
  - 예시: `https://<org>.github.io/<repo>/pr-<번호>/`
- `prod` 브랜치 push 시: **자동 배포 (CD)**
- Vite의 **base 설정**, `.env` 시크릿 주입, SPA 404 문제를 모두 해결

---

## 📦 사전 준비

### 1. GitHub Pages 설정

- **Settings → Pages**
  - **Source:** “Deploy from a branch”
  - **Branch:** `gh-pages / (root)`
  - HTTPS 활성화

---

### 2. Actions 권한 설정

- **Settings → Actions → General → Workflow permissions**
  - ✅ `Read and write permissions` 선택

---

### 3. 시크릿 등록

**Settings → Secrets and variables → Actions → New repository secret**

필요한 시크릿 키 목록:

| Key                        | 설명                |
| -------------------------- | ------------------- |
| `VITE_KAKAO_API`           | Kakao SDK key       |
| `VITE_EMAILJS_SERVICE_ID`  | EmailJS Service ID  |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS Template ID |
| `VITE_EMAILJS_PUBLIC_KEY`  | EmailJS Public Key  |
| `VITE_EMAILJS_TO_EMAIL`    | 수신 이메일 주소    |
| `VITE_API_BASE_URL`        | API 서버 주소       |
| `SERVER_IP`                | 배포 서버 IP        |
| `SERVER_USERNAME`          | SSH 사용자명        |
| `SSH_PRIVATE_KEY`          | SSH 개인키 (CD용)   |

> ⚠️ Vite는 **`VITE_`로 시작하는 변수만 클라이언트에 노출**됩니다.

---

## 🧠 Vite 프로젝트 수정

### 1. `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const isPreview = process.env.PREVIEW === 'true';
const pr = process.env.PR_NUMBER;

// 프리뷰일 때는 pr-번호 디렉토리, 아닐 땐 루트
const base = isPreview && pr ? `/hwajeon-main-web/pr-${pr}/` : `/hwajeon-main-web/`;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  base,
});
```

### 2. `src/main.tsx`

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@/index.css';
import App from '@/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

> 🔍 BrowserRouter의 basename을 import.meta.env.BASE_URL로 설정하면 프리뷰(pr-번호)와 정식 배포(/hwajeon-main-web/) 둘 다 정상 라우팅됩니다.

### `3. index.html`

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>화전앞</title>

    <!-- ✅ HTML에서는 %VITE_XXX% 형태로만 치환됨 -->
    <script
      defer
      src="https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=%VITE_KAKAO_API%"
    ></script>

    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## 🚀 GitHub Actions 설정

### `.github/workflows/frontend.yml`

```yaml
name: Frontend CI/CD + Preview

on:
  pull_request:
    branches: [prod]
  push:
    branches: [prod]

concurrency:
  group: frontend-${{ github.ref }}
  cancel-in-progress: true

jobs:
  # ---------------------------
  # 1) PR 미리보기 (GitHub Pages)
  # ---------------------------
  preview:
    if: ${{ github.event_name == 'pull_request' }}
    runs-on: ubuntu-latest
    permissions:
      contents: write
      deployments: write
      pull-requests: write

    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 1 }

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install deps
        run: npm ci || npm i

      - name: Create .env (for preview)
        run: |
          echo "VITE_KAKAO_API=${{ secrets.VITE_KAKAO_API }}" >> .env
          echo "VITE_EMAILJS_SERVICE_ID=${{ secrets.VITE_EMAILJS_SERVICE_ID }}" >> .env
          echo "VITE_EMAILJS_TEMPLATE_ID=${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}" >> .env
          echo "VITE_EMAILJS_PUBLIC_KEY=${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}" >> .env
          echo "VITE_EMAILJS_TO_EMAIL=${{ secrets.VITE_EMAILJS_TO_EMAIL }}" >> .env
          echo "VITE_API_BASE_URL=${{ secrets.VITE_API_BASE_URL }}" >> .env

      - name: Build preview
        env:
          NODE_ENV: production
          PREVIEW: 'true'
          PR_NUMBER: ${{ github.event.number }}
          VITE_KAKAO_API: ${{ secrets.VITE_KAKAO_API }}
          VITE_EMAILJS_SERVICE_ID: ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
          VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}
          VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}
          VITE_EMAILJS_TO_EMAIL: ${{ secrets.VITE_EMAILJS_TO_EMAIL }}
          VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
        run: npm run build

      - name: SPA 404 fallback
        run: cp dist/index.html dist/404.html || true

      - name: Add .nojekyll
        run: echo > dist/.nojekyll

      - name: Publish to gh-pages/pr-<num>
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: gh-pages
          publish_dir: dist
          destination_dir: pr-${{ github.event.number }}
          keep_files: true

      - name: Start deployment
        id: start_deploy
        uses: bobheadxi/deployments@v1
        with:
          step: start
          token: ${{ secrets.GITHUB_TOKEN }}
          env: preview/pr-${{ github.event.number }}
          ref: ${{ github.head_ref || github.ref }}
          transient: true
          auto_inactive: true

      - name: Finish deployment (success)
        if: success()
        uses: bobheadxi/deployments@v1
        with:
          step: finish
          token: ${{ secrets.GITHUB_TOKEN }}
          deployment_id: ${{ steps.start_deploy.outputs.deployment_id }}
          env: preview/pr-${{ github.event.number }}
          status: success
          env_url: https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/pr-${{ github.event.number }}/

      - name: Comment preview URL
        if: success()
        uses: actions/github-script@v7
        with:
          script: |
            const url = `https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/pr-${{ github.event.number }}/`
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `🔍 **Preview ready:** [${url}](${url})`
            })

  # ---------------------------
  # 2) prod push → Build & Deploy
  # ---------------------------
  package:
    if: ${{ github.event_name == 'push' && github.ref == 'refs/heads/prod' }}
    name: Package – Build artifact (prod)
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 1 }

      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install deps
        run: npm ci || npm i

      - name: Create .env (prod)
        run: |
          echo "VITE_KAKAO_API=${{ secrets.VITE_KAKAO_API }}" >> .env
          echo "VITE_EMAILJS_SERVICE_ID=${{ secrets.VITE_EMAILJS_SERVICE_ID }}" >> .env
          echo "VITE_EMAILJS_TEMPLATE_ID=${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}" >> .env
          echo "VITE_EMAILJS_PUBLIC_KEY=${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}" >> .env
          echo "VITE_EMAILJS_TO_EMAIL=${{ secrets.VITE_EMAILJS_TO_EMAIL }}" >> .env
          echo "VITE_API_BASE_URL=${{ secrets.VITE_API_BASE_URL }}" >> .env
          echo "VITE_JWT_SECRET=${{ secrets.VITE_JWT_SECRET }}" >> .env

      - name: Build (prod artifact)
        run: npm run build

      - name: Upload dist artifact
        uses: actions/upload-artifact@v4
        with:
          name: dist-${{ github.sha }}
          path: dist
          if-no-files-found: error
          retention-days: 3

  deploy:
    needs: package
    if: ${{ github.event_name == 'push' && github.ref == 'refs/heads/prod' }}
    name: CD – Deploy from artifact
    runs-on: ubuntu-latest

    steps:
      - name: Download dist artifact
        uses: actions/download-artifact@v4
        with:
          name: dist-${{ github.sha }}
          path: dist

      - name: Deploy to Server
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          source: 'dist/*'
          target: '/var/www/hwajeon_main_page'
          strip_components: 1
```

## ✅ 실행 순서

### 1. prod 브랜치에 머지

- .yml, vite.config.ts, main.tsx, index.html 반영됨
- 다음 PR부터 새 워크플로우 사용

### 2. 새 브랜치에서 PR 생성

```bash
git switch -c fix/preview-test
echo "# test" >> README.md
git add .
git commit -m "chore: trigger preview"
git push -u origin fix/preview-test
```

→ GitHub Actions 탭에서 Preview – PR build & deploy to Pages 실행

### 3. PR 코멘트 또는 상단 ‘View deployment’ 버튼으로 미리보기 확인

### 4. prod push 시 Nginx 서버 자동 배포

## 🧾 참고

- Vite는 HTML에서 %VITE_XXX%, JS/TS에서는 import.meta.env.VITE_XXX를 사용해야 함.
- .nojekyll 파일은 GitHub Pages에서 \_로 시작하는 경로가 무시되는 문제 방지용.
- cancel-in-progress: true 옵션은 중복 실행 방지.
