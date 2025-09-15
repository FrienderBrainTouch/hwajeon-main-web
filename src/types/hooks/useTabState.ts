/**
 * 탭 아이템 타입
 * @interface TabItem
 * @property {string} value - 탭의 값
 */
export interface TabItem {
  value: string;
}

/**
 * useTabState 훅 반환 타입
 * @interface UseTabStateReturn
 * @property {string} activeTab - 현재 활성화된 탭
 * @property {(newTab: string) => void} handleTabChange - 탭 변경 핸들러
 */
export interface UseTabStateReturn {
  activeTab: string;
  handleTabChange: (newTab: string) => void;
}
