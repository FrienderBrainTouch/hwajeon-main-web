// Admin UI 설정 타입

import type { PostCategory, ViewType } from '@/types/api/common';

/**
 * 카테고리 정보 타입
 * @description 각 카테고리의 표시 정보를 나타내는 타입
 */
export type CategoryInfo = {
  name: string;
  viewType: ViewType;
  hasThumbnail: boolean;
  hasEventDate?: boolean;
};

/**
 * 카테고리 정보 설정
 * @description 각 게시글 카테고리의 UI 설정 정보
 */
export const categoryInfo: Record<PostCategory, CategoryInfo> = {
  NOTICE: { name: '공지사항', viewType: 'LIST', hasThumbnail: false },
  ARCHIVE: { name: '자료실', viewType: 'LIST', hasThumbnail: false },
  MEETING: { name: '정기회의', viewType: 'LIST', hasThumbnail: false },
  NEWS: { name: '화전 소식', viewType: 'THUMBNAIL', hasThumbnail: true },
  GALLERY: { name: '활동 갤러리', viewType: 'THUMBNAIL', hasThumbnail: true },
  CALENDAR: { name: '행사 캘린더', viewType: 'THUMBNAIL', hasThumbnail: true, hasEventDate: true },
};
