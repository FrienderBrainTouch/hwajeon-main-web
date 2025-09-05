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

// 갤러리 아이템 타입
export interface GalleryItem {
  id: number;
  title: string;
  imageUrl: string;
  description?: string;
}

// 갤러리 데이터 타입
export interface GalleryData {
  galleryItems: GalleryItem[];
}

// 캘린더 이벤트 타입
export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  type: 'meeting' | 'festival' | 'education' | 'other';
  description?: string;
}

// 캘린더 데이터 타입
export interface CalendarData {
  events: CalendarEvent[];
}
