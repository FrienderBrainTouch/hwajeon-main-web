# API 설정 가이드

이 문서는 백엔드 API와 연결하기 위한 설정 방법을 설명합니다.

## 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# API 설정 (필수)
VITE_API_BASE_URL=your-api-server-url

# 개발 환경 설정
VITE_NODE_ENV=development

# JWT 설정 (선택사항)
VITE_JWT_SECRET=your-jwt-secret-key

# 기타 설정
VITE_APP_NAME=화전 관리자
VITE_APP_VERSION=1.0.0
```

## 백엔드 API 엔드포인트

### 인증 관련 API

```
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/verify
GET  /api/auth/profile
POST /api/auth/change-password
```

### 사용자 관리 API

```
GET    /api/users
POST   /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/users/search
PATCH  /api/users/:id/status
PATCH  /api/users/:id/role
POST   /api/users/:id/reset-password
POST   /api/users/:id/avatar
GET    /api/users/stats
```

### 대시보드 API

```
GET /api/dashboard/stats
GET /api/dashboard/activities
GET /api/dashboard/charts
```

### 설정 API

```
GET  /api/settings
PUT  /api/settings
GET  /api/settings/system
PUT  /api/settings/system
GET  /api/settings/security
PUT  /api/settings/security
POST /api/settings/maintenance/toggle
POST /api/settings/security/terminate-sessions
POST /api/settings/backup/create
GET  /api/settings/backup/list
DELETE /api/settings/backup/:id
GET  /api/settings/logs
GET  /api/settings/status
```

## API 응답 형식

모든 API는 다음 형식으로 응답해야 합니다:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

### 성공 응답 예시

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "1",
      "username": "admin",
      "name": "관리자",
      "role": "admin"
    }
  },
  "message": "로그인 성공"
}
```

### 에러 응답 예시

```json
{
  "success": false,
  "error": "Invalid credentials",
  "message": "아이디 또는 비밀번호가 올바르지 않습니다."
}
```

## 인증 헤더

인증이 필요한 API 요청에는 다음 헤더를 포함해야 합니다:

```
Authorization: Bearer <JWT_TOKEN>
```

## 에러 처리

API 클라이언트는 다음 HTTP 상태 코드를 처리합니다:

- `200`: 성공
- `201`: 생성 성공
- `400`: 잘못된 요청
- `401`: 인증 필요
- `403`: 접근 권한 없음
- `404`: 리소스 없음
- `422`: 유효성 검사 실패
- `429`: 요청 한도 초과
- `500`: 서버 오류

## 개발 모드에서 테스트

개발 중에는 실제 백엔드 서버가 없어도 데모 데이터로 테스트할 수 있습니다. 로그인 페이지에서 데모 계정을 사용할 수 있습니다:

- 아이디: `admin`
- 비밀번호: `admin123`

## 프로덕션 배포

프로덕션 환경에서는 반드시 실제 백엔드 API 서버와 연결하고, 환경 변수를 적절히 설정해야 합니다.

```env
VITE_API_BASE_URL=https://your-api-domain.com/api
VITE_NODE_ENV=production
```

**중요**: `VITE_API_BASE_URL` 환경변수는 필수입니다. 이 값이 설정되지 않으면 API 호출이 실패합니다.
