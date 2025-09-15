// 사업 관련 컴포넌트 Props 타입

/**
 * 도시재생 허브 컴포넌트 Props
 */
export interface UrbanRegenerationHubProps {
  data?: any; // UrbanRegenerationData 타입
  className?: string;
}

/**
 * 지역활성화 컴포넌트 Props
 */
export interface LocalActivationProps {
  eventImages?: EventImage[];
  communityProjects?: CommunityProject[];
  educationMethods?: EducationMethod[];
  educationSummary?: string;
}

/**
 * 이벤트 이미지 타입
 */
export interface EventImage {
  id: number;
  name: string;
  src?: string;
  alt?: string;
}

/**
 * 커뮤니티 프로젝트 타입
 */
export interface CommunityProject {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

/**
 * 교육 방법 타입
 */
export interface EducationMethod {
  id: number;
  title: string;
  description: string;
}

/**
 * 행사/교육 컴포넌트 Props
 */
export interface EventsEducationProps {
  data?: any; // EventsEducationData 타입
  className?: string;
}

/**
 * 카페27b 컴포넌트 Props
 */
export interface Cafe27bProps {
  mainImages?: MainImage[];
  menuItems?: MenuItem[];
  productItems?: ProductItem[];
  cateringServices?: CateringService[];
  mobileCafeServices?: MobileCafeService[];
}

/**
 * 메인 이미지 타입
 */
export interface MainImage {
  id: number;
  name: string;
  src?: string;
  alt?: string;
}

/**
 * 메뉴 아이템 타입
 */
export interface MenuItem {
  id: number;
  name: string;
  price?: string;
  description?: string;
}

/**
 * 상품 아이템 타입
 */
export interface ProductItem {
  id: number;
  name: string;
  price?: string;
  description?: string;
}

/**
 * 케이터링 서비스 타입
 */
export interface CateringService {
  id: number;
  title: string;
  description: string;
  image?: string;
}

/**
 * 이동카페 서비스 타입
 */
export interface MobileCafeService {
  id: number;
  title: string;
  description: string;
  isTextCard?: boolean;
  image?: string;
}
