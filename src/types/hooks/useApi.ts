import type { ApiError } from '@/types/api/client';

/**
 * API 호출 상태 타입
 * @interface ApiState
 * @property {T | null} data - API 응답 데이터
 * @property {boolean} loading - 로딩 상태
 * @property {string | null} error - 에러 메시지
 */
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * API 훅 반환 타입
 * @interface UseApiReturn
 * @property {T | null} data - API 응답 데이터
 * @property {boolean} loading - 로딩 상태
 * @property {string | null} error - 에러 메시지
 * @property {(...args: TArgs) => Promise<T | null>} execute - API 실행 함수
 * @property {() => void} reset - 상태 초기화 함수
 */
export interface UseApiReturn<T, TArgs extends unknown[] = unknown[]> extends ApiState<T> {
  execute: (...args: TArgs) => Promise<T | null>;
  reset: () => void;
}

/**
 * 에러 메시지 추출 함수 타입
 * @type GetErrorMessageFunction
 * @param {ApiError} error - API 에러 객체
 * @returns {string} 사용자에게 표시할 에러 메시지
 */
export type GetErrorMessageFunction = (error: ApiError) => string;
