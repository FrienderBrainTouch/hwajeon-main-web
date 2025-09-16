import type { ReactNode } from 'react';
import type { LoginRequest } from '@/types/api/admin';

/**
 * 사용자 정보 타입
 * @description 인증된 사용자의 정보를 나타내는 타입
 */
export interface User {
  id: string;
  username: string;
  name: string;
  realName: string;
  role: 'TEACHER' | 'USER';
}

/**
 * 인증 컨텍스트 타입
 * @description AuthContext에서 제공하는 인증 관련 상태와 함수들
 */
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * AuthProvider 컴포넌트 Props
 * @description AuthProvider 컴포넌트의 props
 */
export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 보호된 라우트 컴포넌트 Props
 * @description 인증이 필요한 라우트를 보호하는 컴포넌트의 props
 */
export interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}
