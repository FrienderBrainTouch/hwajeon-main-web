# hwajeon-main-web

화전마을관리 사회적협동조합 공식 웹사이트 **프론트엔드**입니다.  
회원용 페이지와 관리자 페이지를 하나의 SPA(Vite + React)로 운영합니다.

**백엔드 API**는 별도 저장소 `hawjeon`(Spring Boot)를 사용합니다.

---

## 1. 기술 스택

| 구분 | 사용 |
|------|------|
| 런타임 | React 19, TypeScript 5 |
| 빌드 | Vite 7 |
| 스타일 | Tailwind CSS 3, `tailwindcss-animate` |
| 라우팅 | React Router 7 |
| UI | Radix UI, shadcn/ui 패턴 (`src/components/ui`) |
| 기타 | EmailJS(문의/신청), react-helmet-async(SEO) |

`package.json`의 `name` 필드는 `hawjeon-main-page` 로 되어 있습니다(히스토리상 이름).

---

## 2. 주요 기능

- **회원(공개)**: 조합 소개, 사업·카페 27b, 소식/자료, 참여, 문의, 지도(카카오)
- **관리자**: 로그인, 게시글 목록/작성/수정/삭제, 뉴스·갤러리 외부 링크(OG 카드)
- **API**: `VITE_API_BASE_URL` 기준 REST 호출, 관리자 JWT는 `localStorage`(`admin_token` 등)

---

## 3. 빠른 시작

**요구사항**: Node.js 20 권장( CI와 동일 ), npm 9+

```bash
npm install
cp .env.example .env   # 값 채운 뒤 사용
npm run dev
```

```bash
npm run build
npm run preview
```

---

## 4. 환경 변수 (민감정보)

- **`.env`, `.env.local`은 `.gitignore`에 포함**되어 있어 저장소에 올라가지 않습니다.
- **퍼블릭 저장소**에는 실제 키를 절대 커밋하지 마세요. 팀 내 공유는 1Password 등으로 하고, 배포는 **GitHub Secrets**를 사용합니다.
- 로컬 개발용 템플릿: **`.env.example`** (값 없음/플레이스홀더만).

실제 코드에서 참조하는 변수:

| 변수 | 용도 |
|------|------|
| `VITE_API_BASE_URL` | `src/lib/api.ts` API 클라이언트 베이스 URL |
| `VITE_KAKAO_API` | `LocationMap` 등 카카오 지도 |
| `VITE_EMAILJS_*` | 문의·자원봉사 폼 (`InquiryForm`, `VolunteerApplicationModal`) |

`VITE_EMAILJS_TEMPLATE_ID_VOLUNTEER`는 자원봉사용 템플릿이 필요할 때 사용합니다.

> `.github/workflows/deploy.yml`에 `VITE_JWT_SECRET`이 들어 있으나, **현재 `src/`에서는 사용하지 않습니다.** 백엔드 시크릿을 프론트에 둘 필요는 없으며, 워크플로 정리 시 제거 가능합니다.

---

## 5. 디렉터리 구조

```text
src/
  api/            # admin / member API 모듈
  components/     # UI·도메인 컴포넌트 (layout, news, admin …)
  contexts/       # AuthContext 등
  hooks/          # useApi 등
  lib/            # apiClient, utils
  pages/          # member / admin 페이지
  routes/         # MemberLayout, AdminLayout
  types/          # 타입 정의
public/           # 정적 파일 (빌드 시 그대로 dist 루트로 복사)
  robots.txt, sitemap.xml, rss.xml, favicon.ico …
```

---

## 6. 라우팅 요약

- 회원: `/`, `/member/*`
- 관리자: `/admin/login`, `/admin/dashboard`, `/admin/create`, `/admin/edit/:id`

상세는 `인수인계 문서.md` 참고.

---

## 7. 배포

- **브랜치**: `prod`에 push 시 GitHub Actions로 빌드 → 아티팩트 → SCP로 서버 `/var/www/hwajeon_main_page` 배포
- **PR**: `prod` 대상 PR에 대해 GitHub Pages 미리보기 (`pr-<번호>/`)
- `netlify.toml`: SPA 폴백용(예비); 주 배포는 Actions + nginx

Secrets 예: `VITE_*`, `SERVER_IP`, `SERVER_USERNAME`, `SSH_PRIVATE_KEY` 등

### 7.1 API 서버: Docker로 백엔드 컨테이너 교체할 때 (순서)

프론트 정적 파일은 위 **GitHub Actions + SCP**로 배포합니다. 아래는 **백엔드 Spring 앱**이 Docker(ECR)로 올라가 있는 **운영 서버**에 SSH 했을 때, API 컨테이너만 새 이미지로 바꿀 때의 순서입니다. **상세·주의사항은 백엔드 저장소 `hawjeon`의 README §5.1**을 기준으로 합니다.

| 순서 | 내용 |
|------|------|
| 1 | `docker ps` — 현재 앱·DB 컨테이너 상태 확인 |
| 2 | 기존 앱 컨테이너 설정 백업 (`docker inspect hwajeon-app-container` 등) |
| 3 | ECR 로그인 → `docker pull` (배포할 **Git 커밋 SHA** = ECR 이미지 태그; GitHub 커밋 페이지·`git rev-parse HEAD`·ECR 콘솔로 확인) |
| 4 | `docker stop` / `docker rm` (앱 컨테이너만; DB는 유지) |
| 5 | `docker compose up -d` 또는 기존과 동일한 `docker run`으로 기동 |
| 6 | `docker ps` — IMAGE 태그가 새 SHA인지 확인, 필요 시 `docker logs` |

**프론트만 다시 배포했는데 CORS·503·로그인 오류가 그대로인 경우**, 원인이 백엔드/게이트웨이 쪽일 수 있습니다. `SecurityConfig` 변경·버그 수정은 **새 백엔드 이미지가 서버에 실제로 올라왔는지**(`docker ps`의 IMAGE 태그), **ECR에 해당 커밋 태그가 있는지**, **앱 로그에 DB·기동 오류가 없는지**를 위 순서로 확인하세요.

---

## 8. 운영 시 참고

- **CORS**: API 도메인(`api.100youth.kr` 등)은 백엔드 `SecurityConfig`의 `allowedOrigins`에 프론트 Origin이 등록되어 있어야 합니다. 증상이 나오면 **브라우저 강력 새로고침** 후에도 동일하면 백엔드/배포 태그를 확인하세요.
- **관리자 대시보드 검색**: 현재는 **서버 페이지네이션으로 받은 “현재 페이지” 글만** 클라이언트에서 필터링합니다. 전체 검색이 필요하면 백엔드에 검색 파라미터를 두는 방식이 맞습니다.

---

## 9. 관련 문서

- `인수인계 문서.md` — 인수인계·보안·CI 상세
- `Github_Acitons.md` — Actions 참고

---

## 10. 연관 저장소

- **백엔드**: `hawjeon` (Spring Boot, `/homepage/**`, `/api/**`)
