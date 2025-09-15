// API 클라이언트 관련 타입 정의

/**
 * API 응답 타입
 * @interface ApiResponse
 * @property {boolean} success - 요청 성공 여부
 * @property {T} [data] - 응답 데이터 (선택적)
 * @property {string} [message] - 응답 메시지 (선택적)
 * @property {string} [error] - 에러 메시지 (선택적)
 */
export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

/**
 * API 에러 타입
 * @interface ApiError
 * @property {string} message - 에러 메시지
 * @property {number} [status] - HTTP 상태 코드 (선택적)
 * @property {string} [code] - 에러 코드 (선택적)
 */
export type ApiError = {
  message: string;
  status?: number;
  code?: string;
};
