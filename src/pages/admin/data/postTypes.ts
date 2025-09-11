export type PostCategory = 'NOTICE' | 'ARCHIVE' | 'MEETING' | 'NEWS' | 'GALLERY' | 'CALENDAR';

export type ActivityType = 'NONE' | 'FESTIVAL' | 'ONE_DAY_CLASS' | 'CONFERENCE';

export type ViewType = 'LIST' | 'THUMBNAIL';

export type Post = {
  id: string;
  title: string;
  content: string;
  category: PostCategory;
  createdAt: string;
  updatedAt: string;
  author: string;
  views: number;
  thumbnail?: string; // 썸네일 이미지 URL
  attachments?: string[]; // 첨부파일 목록
  eventDate?: string; // 행사 날짜 (CALENDAR 카테고리용)
};

export type PostFormData = {
  title: string;
  content: string;
  postType: PostCategory;
  thumbnail?: File; // 썸네일 파일
  attachments?: File[]; // 첨부파일들
  eventDate?: string; // 행사 날짜
  activityType?: ActivityType; // 갤러리용 활동 타입
};

export const samplePosts: Post[] = [
  {
    id: '1',
    title: '화전 소식 - 2024년 1월 정기모임 안내',
    content: '안녕하세요. 화전입니다. 2024년 1월 정기모임을 안내드립니다...',
    category: 'NEWS',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    author: '관리자',
    views: 156,
    thumbnail: '/images/meeting-thumb.jpg'
  },
  {
    id: '2',
    title: '시스템 점검 안내',
    content: '시스템 점검으로 인한 서비스 일시 중단 안내입니다...',
    category: 'NOTICE',
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    author: '관리자',
    views: 89
  },
  {
    id: '3',
    title: '2024년 화전 문화축제 개최',
    content: '2024년 화전 문화축제가 개최됩니다. 많은 참여 부탁드립니다...',
    category: 'CALENDAR',
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-12T09:15:00Z',
    author: '관리자',
    views: 0,
    eventDate: '2024-02-15T14:00:00Z',
    thumbnail: '/images/festival-thumb.jpg'
  }
];

export const categoryInfo = {
  NOTICE: { name: '공지사항', viewType: 'LIST' as ViewType, hasThumbnail: false },
  ARCHIVE: { name: '자료실', viewType: 'LIST' as ViewType, hasThumbnail: false },
  MEETING: { name: '정기회의', viewType: 'LIST' as ViewType, hasThumbnail: false },
  NEWS: { name: '화전 소식', viewType: 'THUMBNAIL' as ViewType, hasThumbnail: true },
  GALLERY: { name: '활동 갤러리', viewType: 'THUMBNAIL' as ViewType, hasThumbnail: true },
  CALENDAR: { name: '행사 캘린더', viewType: 'THUMBNAIL' as ViewType, hasThumbnail: true, hasEventDate: true }
};
