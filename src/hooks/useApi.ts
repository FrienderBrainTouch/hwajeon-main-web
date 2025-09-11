import { useState, useCallback } from 'react';
import { type ApiError } from '../lib/api';

// API 호출 상태 타입
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// API 훅 반환 타입
export interface UseApiReturn<T, TArgs extends unknown[] = unknown[]> extends ApiState<T> {
  execute: (...args: TArgs) => Promise<T | null>;
  reset: () => void;
}

// API 호출을 위한 커스텀 훅
export function useApi<T, TArgs extends unknown[] = unknown[]>(
  apiFunction: (...args: TArgs) => Promise<{ success: boolean; data?: T; message?: string }>
): UseApiReturn<T, TArgs> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: TArgs): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await apiFunction(...args);

        if (response.success) {
          setState({
            data: response.data || null,
            loading: false,
            error: null,
          });
          return response.data || null;
        } else {
          // 백엔드에서 제공하는 에러 메시지 사용
          throw new Error(response.message || 'API 요청에 실패했습니다.');
        }
      } catch (error) {
        const errorMessage = getErrorMessage(error as ApiError);
        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// 에러 메시지 추출 함수 - 백엔드 응답 우선 사용
export function getErrorMessage(error: ApiError): string {
  // 백엔드에서 제공하는 에러 메시지가 있으면 우선 사용
  if (error.message) {
    return error.message;
  }

  // 백엔드 메시지가 없을 때만 기본 메시지 사용
  switch (error.status) {
    case 401:
      return '인증이 필요합니다.';
    case 403:
      return '접근 권한이 없습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 500:
      return '서버 오류가 발생했습니다.';
    case 0:
      return '네트워크 연결을 확인해주세요.';
    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
}

// 여러 API 호출을 관리하는 훅
export function useMultipleApi<
  T extends Record<
    string,
    (...args: unknown[]) => Promise<{ success: boolean; data?: unknown; message?: string }>
  >
>(
  apiFunctions: T
): {
  [K in keyof T]: UseApiReturn<Awaited<ReturnType<T[K]>>['data'], Parameters<T[K]>>;
} {
  const result = {} as {
    [K in keyof T]: UseApiReturn<Awaited<ReturnType<T[K]>>['data'], Parameters<T[K]>>;
  };

  for (const key in apiFunctions) {
    result[key] = useApi(apiFunctions[key]);
  }

  return result;
}
