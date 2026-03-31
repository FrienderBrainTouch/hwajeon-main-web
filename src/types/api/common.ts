/**
 * 캘린더 활동 타입 열거형
 * @type {string}
 * @description 캘린더의 활동 분류를 나타내는 타입
 */
// 백엔드(ActivityType enum)와 반드시 일치해야 함
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
 * 링크 메타 정보 타입
 * @description OG 태그 파싱 결과를 나타내는 타입
 */
export type LinkMeta = {
  linkUrl?: string;
  linkTitle?: string;
  linkImage?: string;
  linkDescription?: string;
};

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
  linkMeta?: LinkMeta; // 링크 메타 정보
  displayNumber?: number; // 페이지 내 표시 번호 (내림차순)
};

/**
 * ActivityType을 한국어로 변환하는 함수
 * @param activityType - 활동 타입
 * @returns 한국어 표시명
 */
export const getActivityTypeLabel = (activityType: ActivityType): string => {
  switch (activityType) {
    case 'NONE':
      return '기타';
    case 'FESTIVAL':
      return '행사';
    case 'ONE_DAY_CLASS':
      return '교육';
    case 'CONFERENCE':
      return '회의';
    default:
      return '기타';
  }
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
  linkUrl?: string; // 링크 URL (OG 태그 파싱용)
  linkMeta?: LinkMeta; // 조회된 링크 메타 정보
};
