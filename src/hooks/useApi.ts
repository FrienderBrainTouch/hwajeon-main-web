import { useState, useCallback } from 'react';
import { type ApiError } from '../lib/api';
import { ERROR_MESSAGES } from '../config/api';

// API 호출 상태 타입
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// API 훅 반환 타입
export interface UseApiReturn<T> extends ApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

// API 호출을 위한 커스텀 훅
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<{ success: boolean; data?: T; message?: string }>
): UseApiReturn<T> {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (...args: any[]): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await apiFunction(...args);
      
      if (response.success && response.data) {
        setState({
          data: response.data,
          loading: false,
          error: null,
        });
        return response.data;
      } else {
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
  }, [apiFunction]);

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

// 에러 메시지 추출 함수
export function getErrorMessage(error: ApiError): string {
  if (error.message) {
    return error.message;
  }

  switch (error.status) {
    case 401:
      return ERROR_MESSAGES.UNAUTHORIZED;
    case 403:
      return ERROR_MESSAGES.FORBIDDEN;
    case 404:
      return ERROR_MESSAGES.NOT_FOUND;
    case 500:
      return ERROR_MESSAGES.SERVER_ERROR;
    case 0:
      return ERROR_MESSAGES.NETWORK_ERROR;
    default:
      return ERROR_MESSAGES.SERVER_ERROR;
  }
}

// 여러 API 호출을 관리하는 훅
export function useMultipleApi<T extends Record<string, any>>(
  apiFunctions: T
): {
  [K in keyof T]: UseApiReturn<Awaited<ReturnType<T[K]>>['data']>;
} {
  const result = {} as any;

  for (const key in apiFunctions) {
    result[key] = useApi(apiFunctions[key]);
  }

  return result;
}
