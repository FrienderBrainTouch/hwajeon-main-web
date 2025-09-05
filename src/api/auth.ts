import { apiClient, type ApiResponse } from '../lib/api';
// 엔드포인트 직접 정의
const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  VERIFY: '/api/auth/verify',
  PROFILE: '/api/auth/profile',
  REFRESH: '/api/auth/refresh',
  CHANGE_PASSWORD: '/api/auth/change-password',
} as const;

// 인증 관련 타입 정의
export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: string;
    username: string;
    name: string;
    role: 'TEACHER' | 'USER';
  };
};

export type UserProfile = {
  id: string;
  username: string;
  name: string;
  role: 'TEACHER' | 'USER';
  createdAt: string;
  lastLoginAt?: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
};

// 인증 API 함수들
export const authApi = {
  // 로그인
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiClient.post<LoginResponse>(
        AUTH_ENDPOINTS.LOGIN,
        credentials
      );
      
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

  // 토큰 검증
  async verifyToken(): Promise<ApiResponse<UserProfile>> {
    try {
      return await apiClient.get<UserProfile>(AUTH_ENDPOINTS.VERIFY);
    } catch (error) {
      // 토큰이 유효하지 않으면 로컬 스토리지에서 제거
      localStorage.removeItem('admin_token');
      localStorage.removeItem('refresh_token');
      throw error;
    }
  },

  // 사용자 프로필 조회
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      return await apiClient.get<UserProfile>(AUTH_ENDPOINTS.PROFILE);
    } catch (error) {
      throw error;
    }
  },

  // 토큰 갱신
  async refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }

      const response = await apiClient.post<RefreshTokenResponse>(
        AUTH_ENDPOINTS.REFRESH,
        { refreshToken }
      );

      if (response.success && response.data) {
        // 새로운 토큰을 localStorage에 저장
        localStorage.setItem('admin_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }

      return response;
    } catch (error) {
      // 리프레시 토큰도 실패하면 모든 토큰 제거
      localStorage.removeItem('admin_token');
      localStorage.removeItem('refresh_token');
      throw error;
    }
  },

  // 비밀번호 변경
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post<void>('/auth/change-password', data);
    } catch (error) {
      throw error;
    }
  },
};
