# CLAUDE.md — hwajeon-main-web (화전마을 홈페이지 + 관리자, Vite/React/TS)

전체 구성·계정·배포 기준 문서는 `통합_운영_문서.md`(4개 저장소 동일 사본). 비밀번호·키 원문은 저장소에 쓰지 않는다.

## 작업 후 사용자에게 반드시 안내할 것
- **`prod` 브랜치에 push하면 바로 운영(`https://hi27b.com`)에 자동 배포된다.** push 전에 이 점을 사용자에게 알리고 확인받는다.
- 코드를 수정해 push했다면 답변 마지막에 아래 확인 절차를 안내한다:
  1. GitHub `hwajeon-main-web` → Actions가 초록색인지 (3~5분)
  2. PuTTY → `118.219.233.155` (root, 호스트명 `hwajeon6755`)에서
     `ls -la --time-style=+"%F %T" /var/www/hwajeon_main_page | head -5` → 파일 시각이 방금 시각
  3. `curl -s -o /dev/null -w "%{http_code}\n" https://hi27b.com/` → 200
  4. 브라우저 강력 새로고침(Ctrl+F5)으로 화면 확인
- 백엔드 API를 함께 바꿨다면 `hawjeon`의 `./deploy.sh` 절차도 같이 안내한다 (`hawjeon/CLAUDE.md`).

## 알아둘 것
- API 주소는 `VITE_API_BASE_URL` (운영 `https://api.100youth.kr`). 관리자 화면은 `/admin`.
- 로컬 `.env`는 프론트 키가 아니라 백엔드 운영 `.env` 사본이 들어 있던 파일이다. 커밋 금지.
- 수정(PATCH) 요청에서 같은 파일·ID를 중복 전송하는 문제가 있다(multipart 파트 수 초과 원인). 관련 작업 시 정리 권장.
- `통합_운영_문서.md`를 고치면 `hawjeon`, `bublle-wrap-build`, `hwajeon-front`의 사본도 같이 고친다.
