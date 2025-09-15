// 레이아웃 관련 컴포넌트 Props 타입

/**
 * 헤더 컴포넌트 Props
 */
export interface HeaderProps {
  variant?: 'overlay' | 'default';
}

/**
 * 헤더 드롭다운 컴포넌트 Props
 */
export interface HeaderDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  headerHeight: number;
  selectedCategory: string | null;
}

/**
 * 사이드바 컴포넌트 Props
 */
export interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}
