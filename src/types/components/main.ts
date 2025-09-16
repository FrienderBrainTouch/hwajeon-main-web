/**
 * 히어로 컴포넌트 Props
 */
export interface HeroProps {
  refEl?: React.RefObject<HTMLDivElement>;
  src: string;
  title: string;
  subtitle?: string;
  heightVh?: number; // 히어로 높이 (vh)
  progress?: number; // 0~1 (스크롤 진행도)
}
