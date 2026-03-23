# hwajeon-main-web

화전마을관리 사회적협동조합 공식 웹사이트 프론트엔드 프로젝트입니다.  
회원용 페이지와 관리자 페이지를 하나의 SPA로 운영합니다.

## 1. 기술 스택

- React 19
- TypeScript 5
- Vite 7
- Tailwind CSS 3
- React Router
- Radix UI + shadcn/ui
- EmailJS (문의/신청 메일 전송)

## 2. 주요 기능

- 회원 페이지
  - 조합 소개, 사업 안내, 카페 27b, 소식/자료, 참여, 문의
- 관리자 페이지
  - 로그인, 게시글 목록/작성/수정/삭제
  - 뉴스/갤러리 링크 URL 입력 및 상세 하단 링크 카드 표시
- API 연동
  - `VITE_API_BASE_URL` 기반으로 백엔드 API 호출
  - 토큰 기반 관리자 인증

## 3. 빠른 시작

### 요구사항

- Node.js 18+
- npm 9+

### 실행

```bash
npm install
npm run dev
```

### 빌드

```bash
npm run build
npm run preview
```

## 4. 환경 변수

주요 변수는 아래와 같습니다.

- `VITE_API_BASE_URL` : 백엔드 API 주소
- `VITE_KAKAO_API` : 카카오 지도 키
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_TO_EMAIL`

실제 운영 값은 저장소에 직접 커밋하지 말고 배포 파이프라인/시크릿으로 관리해야 합니다.

## 5. 디렉터리 구조

```text
src/
  api/            # API 모듈 (admin/member)
  components/     # UI/도메인 컴포넌트
  contexts/       # AuthContext 등 전역 상태
  hooks/          # useApi 등 커스텀 훅
  lib/            # API 클라이언트/유틸
  pages/          # 라우트 페이지
  routes/         # 레이아웃 라우트
  types/          # 타입 정의
```

## 6. 라우팅 요약

- 회원: `/`, `/member/*`
- 관리자: `/admin/login`, `/admin/dashboard`, `/admin/create`, `/admin/edit/:id`

## 7. 배포

- 프런트 배포는 GitHub Actions 워크플로를 사용합니다.
- `prod` 브랜치 기준 빌드/배포가 구성되어 있습니다.
- PR 미리보기는 GitHub Pages preview job으로 확인합니다.

## 8. 최근 이슈 메모 (운영 참고)

- `https://hi27b.com` ↔ `https://api.100youth.kr` 구간에서 CORS 차단 이슈가 발생했으며, 백엔드 `allowedOrigins`에 `hi27b.com`/`www.hi27b.com` 추가로 해결했습니다.
- 프런트에서 `ERR_FAILED`, `No 'Access-Control-Allow-Origin'`가 보이면 프런트 코드보다 백엔드 CORS/배포 태그를 먼저 확인하세요.

## 9. 관련 문서

- `인수인계 문서.md` : 운영/장애 대응 인수인계
- `Github_Acitons.md` : CI/CD 참고 문서
