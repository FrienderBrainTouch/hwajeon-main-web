// API 공통 타입 정의

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
