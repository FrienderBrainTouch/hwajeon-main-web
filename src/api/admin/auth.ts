import { apiClient, type ApiResponse } from '../../lib/api';
import type { LoginRequest, LoginResponse } from '@/types/api';

// 엔드포인트 직접 정의
const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
} as const;

// 인증 API 함수들
export const authApi = {
  // 로그인
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiClient.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials);

      if (response.success && response.data) {
        // 토큰을 localStorage에 저장
        localStorage.setItem('admin_token', response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem('refresh_token', response.data.refreshToken);
        }
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  // 로그아웃
  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<void>(AUTH_ENDPOINTS.LOGOUT);

      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem('admin_token');
      localStorage.removeItem('refresh_token');

      return response;
    } catch (error) {
      // 에러가 발생해도 로컬 토큰은 제거
      localStorage.removeItem('admin_token');
      localStorage.removeItem('refresh_token');
      throw error;
    }
  },
};
