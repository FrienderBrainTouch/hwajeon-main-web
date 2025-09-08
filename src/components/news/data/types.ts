// 게시판 아이템 타입
export interface BoardItem {
  id: number;
  title: string;
  date: string;
  content?: string;
}

// 공지사항 데이터 타입
export interface NoticeData {
  notices: BoardItem[];
}

// 자료실 데이터 타입
export interface ArchiveData {
  archives: BoardItem[];
}

// 회전 소식 아이템 타입
export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

// 회전 소식 데이터 타입
export interface NewsData {
  newsItems: NewsItem[];
}

// 갤러리 아이템 타입 (화전 소식용)
export interface GalleryItem {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

// 갤러리 데이터 타입
export interface GalleryData {
  galleryItems: GalleryItem[];
}

// 이벤트 카테고리 타입
export type EventCategory = 'festival' | 'class' | 'meeting';

// 이벤트 데이터 타입 (통합)
export interface EventData {
  id: number;
  date: number;
  month: number; // 월 정보 추가
  category: EventCategory;
  title: string;
  description: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  time?: string;
  location?: string;
}

// 캘린더용 이벤트 데이터 타입 (간소화)
export interface EventDataForCalendar {
  id: number;
  date: number;
  category: EventCategory;
  title: string;
  description: string;
  time?: string;
  location?: string;
}

// 월별 이벤트 데이터 타입
export interface MonthlyEventData {
  year: number;
  month: number;
  events: EventDataForCalendar[];
}

// 카테고리 필터 타입
export type CategoryFilter = 'all' | EventCategory;

// 카테고리 설정 타입
export interface CategoryConfig {
  name: string;
  color: string;
}

// 캘린더용 카테고리 설정 (범례용, all 제외)
export const CALENDAR_CATEGORY_CONFIG: Record<EventCategory, CategoryConfig> = {
  festival: { name: '마을 축제', color: '#2C2E5A' },
  class: { name: '원데이 클래스', color: '#A692D1' },
  meeting: { name: '회의 일정', color: '#FFA484' },
};

// 리스트용 카테고리 설정 (필터링용, all 포함)
export const LIST_CATEGORY_CONFIG: Record<CategoryFilter, CategoryConfig> = {
  all: { name: '전체', color: '#2C2E5A' },
  festival: { name: '마을 축제', color: '#2C2E5A' },
  class: { name: '원데이 클래스', color: '#A692D1' },
  meeting: { name: '회의 일정', color: '#FFA484' },
};

// 캘린더 이벤트 타입 (기존 호환성용)
export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'meeting' | 'festival' | 'education' | 'other';
  description?: string;
}

// 캘린더 데이터 타입 (기존 호환성용)
export interface CalendarData {
  events: CalendarEvent[];
}
