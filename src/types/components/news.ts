/**
 * 이벤트 카테고리 타입
 */
export type EventCategory = 'festival' | 'class' | 'meeting';

/**
 * 이벤트 데이터 타입
 */
export interface EventData {
  id: number;
  postId: number;
  date: number;
  month: number;
  category: EventCategory;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  createdAt: string;
  activityDate: string; // 실제 행사 날짜
  time?: string;
  location?: string;
  author?: string;
  files?: Array<{
    fileId: number;
    fileUrl: string;
  }>;
}

/**
 * 캘린더용 이벤트 데이터 타입
 */
export interface EventDataForCalendar {
  id: number;
  date: number;
  category: EventCategory;
  title: string;
  description: string;
  time?: string;
  location?: string;
}

/**
 * 월별 이벤트 데이터 타입
 */
export interface MonthlyEventData {
  year: number;
  month: number;
  events: EventDataForCalendar[];
}

/**
 * 게시판 아이템 타입
 */
export interface BoardItem {
  id: number;
  title: string;
  date: string;
  content?: string;
  author?: string;
  files?: Array<{
    fileId: number;
    fileUrl: string;
  }>;
}

/**
 * 갤러리 아이템 타입
 */
export interface GalleryItem {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  author?: string;
  files?: Array<{
    fileId: number;
    fileUrl: string;
  }>;
}

/**
 * 뉴스 아이템 타입
 */
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
  imageUrl?: string;
  author?: string;
  files?: Array<{
    fileId: number;
    fileUrl: string;
  }>;
}

/**
 * 공통 아이템 타입 (BoardItem과 GalleryItem의 공통 필드)
 */
export interface BaseItem {
  id: number;
  title: string;
  date: string;
  content?: string;
  author?: string;
  files?: Array<{
    fileId: number;
    fileUrl: string;
  }>;
}

/**
 * 게시판 래퍼 컴포넌트 Props
 */
export interface BoardWrapperProps {
  title: string;
  boardType: string; // 'announcements', 'archive', 'meeting'
  itemsPerPage?: number;
  onItemClick?: (item: BoardItem) => void;
  showAdminActions?: boolean;
  onEdit?: (item: BoardItem) => void;
  onDelete?: (item: BoardItem) => void;
  onSettings?: () => void;
  showTitle?: boolean; // 제목 표시 여부
}

/**
 * 상세 보기 컴포넌트 Props
 */
export interface DetailProps<T extends BaseItem> {
  item: T;
  onBackToList: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  showDate?: boolean; // 작성일 표시 여부
}

/**
 * 게시판 리스트 컴포넌트 Props
 */
export interface BoardListProps {
  items: BoardItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onItemClick?: (item: BoardItem) => void;
  showAdminActions?: boolean;
  onEdit?: (item: BoardItem) => void;
  onDelete?: (item: BoardItem) => void;
  onSettings?: () => void;
}

/**
 * 게시판 상세 컴포넌트 Props
 */
export interface BoardDetailProps {
  item: BoardItem;
  onBackToList: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  onEdit?: (item: BoardItem) => void;
  onDelete?: (item: BoardItem) => void;
  showAdminActions?: boolean;
}

/**
 * 갤러리 아이템 타입 (GalleryItem | NewsItem)
 */
export type GalleryItemType = GalleryItem | NewsItem;

/**
 * 갤러리 래퍼 컴포넌트 Props
 */
export interface GalleryWrapperProps {
  title: string;
  boardType: string; // 'news' 또는 다른 갤러리 타입
  itemsPerPage?: number;
  onItemClick?: (item: GalleryItemType) => void;
  type?: 'news' | 'gallery'; // News는 카드 형태, Gallery는 이미지 위에 제목 오버레이
  showTitle?: boolean; // 제목 표시 여부
}

/**
 * 갤러리 리스트 컴포넌트 Props
 */
export interface GalleryListProps {
  items: GalleryItemType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onItemClick?: (item: GalleryItemType) => void;
  type?: 'news' | 'gallery'; // News는 카드 형태, Gallery는 이미지 위에 제목 오버레이
}

/**
 * 갤러리 상세 컴포넌트 Props
 */
export interface GalleryDetailProps {
  item: GalleryItem;
  onBackToList: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  type?: 'news' | 'gallery';
}

/**
 * 이벤트 래퍼 컴포넌트 Props
 */
export interface EventWrapperProps {
  itemsPerPage?: number;
}

/**
 * 이벤트 리스트 컴포넌트 Props
 */
export interface EventListProps {
  events: EventData[];
  itemsPerPage?: number;
}

/**
 * 이벤트 캘린더 컴포넌트 Props
 */
export interface EventCalendarProps {
  events?: MonthlyEventData | Record<number, EventDataForCalendar[]>;
  onDateClick?: (date: number, events: EventDataForCalendar[]) => void;
  showCategoryLegend?: boolean;
  className?: string;
  currentDate?: Date;
  onDateChange?: (date: Date) => void;
}
