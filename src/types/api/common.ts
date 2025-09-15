/**
 * 캘린더 활동 타입 열거형
 * @type {string}
 * @description 캘린더의 활동 분류를 나타내는 타입
 */
export type ActivityType = 'NONE' | 'FESTIVAL' | 'ONE_DAY_CLASS' | 'CONFERENCE';

/**
 * 게시글 카테고리 타입
 * @type {string}
 * @description 게시글의 카테고리 분류를 나타내는 타입
 */
export type PostCategory = 'NOTICE' | 'ARCHIVE' | 'MEETING' | 'NEWS' | 'GALLERY' | 'CALENDAR';

/**
 * 뷰 타입
 * @type {string}
 * @description 게시글 목록 표시 방식을 나타내는 타입
 */
export type ViewType = 'LIST' | 'THUMBNAIL';

/**
 * 게시글 데이터 타입
 * @description 게시글의 기본 정보를 나타내는 타입
 */
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

/**
 * 게시글 폼 데이터 타입
 * @description 게시글 작성/수정 시 사용하는 폼 데이터 타입
 */
export type PostFormData = {
  title: string;
  content: string;
  postType: PostCategory;
  thumbnail?: File; // 썸네일 파일
  attachments?: File[]; // 첨부파일들
  eventDate?: string; // 행사 날짜
  activityType?: ActivityType; // 갤러리용 활동 타입
};
