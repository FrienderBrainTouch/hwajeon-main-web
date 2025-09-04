import { type ApiError } from '../lib/api';
import { ERROR_MESSAGES } from '../config/api';

// 에러 처리 유틸리티 함수들

// API 에러를 사용자 친화적인 메시지로 변환
export function formatApiError(error: ApiError): string {
  // 이미 포맷된 메시지가 있으면 그대로 반환
  if (error.message && !error.message.includes('API 요청에 실패했습니다')) {
    return error.message;
  }

  // HTTP 상태 코드에 따른 메시지
  switch (error.status) {
    case 400:
      return '잘못된 요청입니다. 입력값을 확인해주세요.';
    case 401:
      return '로그인이 필요합니다.';
    case 403:
      return '접근 권한이 없습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 409:
      return '이미 존재하는 데이터입니다.';
    case 422:
      return '입력값이 올바르지 않습니다.';
    case 429:
      return '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
    case 500:
      return '서버 오류가 발생했습니다. 관리자에게 문의해주세요.';
    case 502:
    case 503:
    case 504:
      return '서버가 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.';
    case 0:
      return ERROR_MESSAGES.NETWORK_ERROR;
    default:
      return error.message || ERROR_MESSAGES.SERVER_ERROR;
  }
}

// 에러 타입에 따른 분류
export function getErrorType(error: ApiError): 'network' | 'auth' | 'validation' | 'server' | 'unknown' {
  if (error.status === 0) return 'network';
  if (error.status === 401 || error.status === 403) return 'auth';
  if (error.status === 400 || error.status === 422) return 'validation';
  if (error.status >= 500) return 'server';
  return 'unknown';
}

// 에러 로깅 함수
export function logError(error: ApiError, context?: string) {
  const errorInfo = {
    message: error.message,
    status: error.status,
    code: error.code,
    context,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  // 개발 환경에서는 콘솔에 로그
  if (import.meta.env.DEV) {
    console.error('API Error:', errorInfo);
  }

  // 실제 환경에서는 에러 리포팅 서비스로 전송
  // 예: Sentry, LogRocket 등
  // errorReportingService.captureException(error, { extra: errorInfo });
}

// 재시도 가능한 에러인지 확인
export function isRetryableError(error: ApiError): boolean {
  const retryableStatuses = [0, 408, 429, 500, 502, 503, 504];
  return retryableStatuses.includes(error.status || 0);
}

// 에러에 따른 사용자 액션 제안
export function getSuggestedAction(error: ApiError): string | null {
  switch (getErrorType(error)) {
    case 'network':
      return '인터넷 연결을 확인하고 다시 시도해주세요.';
    case 'auth':
      return '로그인 페이지로 이동하시겠습니까?';
    case 'validation':
      return '입력값을 확인하고 다시 시도해주세요.';
    case 'server':
      return '잠시 후 다시 시도하거나 관리자에게 문의해주세요.';
    default:
      return null;
  }
}

// 에러 처리 데코레이터 (고차 함수)
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context?: string
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      const apiError = error as ApiError;
      logError(apiError, context);
      throw apiError;
    }
  };
}

// 에러 바운더리를 위한 에러 정보
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
}

// 글로벌 에러 핸들러
export function setupGlobalErrorHandler() {
  // 처리되지 않은 Promise rejection 처리
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    if (error && typeof error === 'object' && 'status' in error) {
      logError(error as ApiError, 'unhandled-promise-rejection');
    }
  });

  // 일반적인 JavaScript 에러 처리
  window.addEventListener('error', (event) => {
    const error = {
      message: event.message,
      status: 0,
      code: 'javascript-error',
    } as ApiError;
    
    logError(error, 'global-error');
  });
}
