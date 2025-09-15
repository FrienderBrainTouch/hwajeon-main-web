// Admin 관련 컴포넌트 Props 타입

/**
 * 로그인 폼 컴포넌트 Props
 */
export interface LoginFormProps {
  onSubmit: (credentials: { username: string; password: string }) => void;
  loading?: boolean;
  error?: string;
}

/**
 * 사용자 타입
 */
export interface User {
  id: string;
  username: string;
  name: string;
  realName: string;
  role: 'TEACHER' | 'USER';
}

/**
 * 대시보드 헤더 컴포넌트 Props
 */
export interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

/**
 * 대시보드 통계 컴포넌트 Props
 */
export interface DashboardStatsProps {
  stats: Array<{
    label: string;
    value: number;
    change?: number;
    changeType?: 'increase' | 'decrease';
  }>;
  className?: string;
}

/**
 * 대시보드 테이블 컴포넌트 Props
 */
export interface DashboardTableProps {
  data: any[]; // Post 타입 배열
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
  loading?: boolean;
  className?: string;
}

/**
 * 게시글 생성 폼 컴포넌트 Props
 */
export interface CreatePostFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string;
}

/**
 * 게시글 수정 폼 컴포넌트 Props
 */
export interface EditPostFormProps {
  initialData: any; // Post 타입
  onSubmit: (data: any) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string;
}
