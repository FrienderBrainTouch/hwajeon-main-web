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
  cards?: any[];
  storyImages?: any[];
  mainStoryImage?: any;
  className?: string;
}

/**
 * 카드 컴포넌트 Props
 */
export interface CardProps {
  title: string;
  description: string;
  type: 'gradient' | 'image' | 'gray';
  gradient?: string;
  image?: string;
  className?: string;
}

/**
 * 역사 컴포넌트 Props
 */
export interface HistoryProps {
  historyData?: HistoryItem[];
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

// 데이터 타입들

/**
 * 인사말 데이터 타입
 */
export interface GreetingData {
  title: string;
  image: {
    alt: string;
  };
  greeting: {
    line1: string;
    line2: string;
  };
  content: Array<{
    id: number;
    text: string;
  }>;
  signature: {
    title: string;
    name: string;
  };
}

/**
 * 역사 아이템 타입
 */
export interface HistoryItem {
  id: number;
  year: string;
  title: string;
  description: string;
}

/**
 * 미션/비전 데이터 타입
 */
export interface MissionVisionData {
  header: {
    title: string;
    subtitle: string;
    description: string;
  };
  mission: {
    title: string;
    subtitle: string;
    content: string;
  };
  vision: {
    title: string;
    subtitle: string;
    content: string;
  };
  values: {
    title: string;
    subtitle: string;
    items: Array<{
      id: number;
      title: string;
      description: string;
    }>;
  };
}

/**
 * 조직도 노드 타입
 */
export interface OrganizationNode {
  label: string;
  variant?: 'filled' | 'outline' | 'primary';
}

/**
 * 조직도 차트 데이터 타입
 */
export interface OrganizationChartData {
  top: OrganizationNode;
  second: [OrganizationNode, OrganizationNode, OrganizationNode];
  teams: [OrganizationNode, OrganizationNode, OrganizationNode, OrganizationNode];
}

/**
 * 이사진 멤버 타입
 */
export interface BoardMember {
  id: number;
  name: string;
  position: string;
  department: string;
}

/**
 * 팀 멤버 타입
 */
export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  duties: string;
}

/**
 * 팀 타입
 */
export interface Team {
  id: number;
  name: string;
  description: string;
  members: TeamMember[];
}

/**
 * 카드 타입
 */
export interface Card {
  id: number;
  type: 'gradient' | 'gray' | 'image';
  title: string;
  description?: string;
  image?: string;
  gradient?: string;
}

/**
 * 스토리 이미지 타입
 */
export interface StoryImage {
  id: number;
  src: string;
  alt: string;
}

/**
 * 조직도 노드 타입
 */
export type Node = {
  label: string;
  variant?: 'filled' | 'outline' | 'primary';
};

/**
 * 조직도 컴포넌트 Props
 */
export interface OrgChartProps {
  top: Node; // 조합장
  second: [Node, Node, Node]; // [이사회, 사무국, 감사]
  teams: [Node, Node, Node, Node]; // 하위 4팀
  className?: string;
}

/**
 * 타임라인 아이템 타입
 */
export type TimelineItem = {
  year: number;
  bullets?: string[];
};

/**
 * 타임라인 컴포넌트 Props
 */
export interface TimelineZigzagProps {
  items: TimelineItem[];
  className?: string;
  lineColor?: string;
  dotColor?: string;
  accentColor?: string;
}
