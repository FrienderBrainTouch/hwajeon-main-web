// API 엔드포인트 및 설정 관리

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  TIMEOUT: 10000, // 10초
  RETRY_ATTEMPTS: 3,
};

// API 엔드포인트들
export const API_ENDPOINTS = {
  // 인증 관련
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    VERIFY: '/api/auth/verify',
    PROFILE: '/api/auth/profile',
  },
  
  // 사용자 관리
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    SEARCH: '/users/search',
  },
  
  // 대시보드
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ACTIVITIES: '/dashboard/activities',
    CHARTS: '/dashboard/charts',
  },
  
  // 설정
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
    SYSTEM: '/settings/system',
    SECURITY: '/settings/security',
  },
  
  // 파일 업로드
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
  },
} as const;

// HTTP 상태 코드
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  UNAUTHORIZED: '인증이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  SERVER_ERROR: '서버 오류가 발생했습니다.',
  VALIDATION_ERROR: '입력값을 확인해주세요.',
  TIMEOUT: '요청 시간이 초과되었습니다.',
} as const;
