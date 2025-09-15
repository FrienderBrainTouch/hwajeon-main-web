// Auth 관련 컴포넌트 Props 타입

import type { ReactNode } from 'react';

/**
 * 보호된 라우트 컴포넌트 Props
 * @description 인증이 필요한 라우트를 보호하는 컴포넌트의 props
 */
export interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}
