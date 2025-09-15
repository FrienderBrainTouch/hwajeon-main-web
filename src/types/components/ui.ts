// UI 컴포넌트 Props 타입

/**
 * 플로팅 버튼 컴포넌트 Props
 */
export interface FloatingButtonsProps {
  onInquiry?: () => void;
  onScrollToTop?: () => void;
}

/**
 * 커스텀 페이지네이션 컴포넌트 Props
 */
export interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * 탭 네비게이션 컴포넌트 Props
 */
export interface TabNavigationProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

/**
 * 버튼 컴포넌트 Props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

/**
 * 배지 컴포넌트 Props
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

/**
 * 텍스트에어리어 컴포넌트 Props
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
