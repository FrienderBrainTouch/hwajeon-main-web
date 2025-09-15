// 조합 관련 컴포넌트 Props 타입

/**
 * 인사말 컴포넌트 Props
 */
export interface GreetingProps {
  data?: any; // GreetingData 타입
  className?: string;
}

/**
 * 미션/비전 컴포넌트 Props
 */
export interface MissionVisionProps {
  data?: any; // MissionVisionData 타입
  className?: string;
}

/**
 * 화전 스토리 컴포넌트 Props
 */
export interface HwajeonStoryProps {
  data?: any; // StoryData 타입
  className?: string;
}

/**
 * 카드 컴포넌트 Props
 */
export interface CardProps {
  title: string;
  content: string;
  image?: string;
  className?: string;
}

/**
 * 역사 컴포넌트 Props
 */
export interface HistoryProps {
  data?: any; // HistoryData 타입
  className?: string;
}

/**
 * 조직도 상세 컴포넌트 Props
 */
export interface OrganizationDetailsProps {
  team?: any; // Team 타입
  teams?: any[]; // Team[] 타입
  className?: string;
}

/**
 * 조직도 컴포넌트 Props
 */
export interface OrgChartProps {
  data?: any; // OrganizationData 타입
  className?: string;
}

/**
 * 타임라인 지그재그 컴포넌트 Props
 */
export interface Props {
  data?: any; // TimelineData 타입
  className?: string;
}
