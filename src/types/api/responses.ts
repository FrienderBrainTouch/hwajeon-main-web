// API 응답 타입 정의

import type { PostCategory, ActivityType, LinkMeta } from './common';

/**
 * 게시글 요약 정보 타입
 * @interface PostSummary
 * @property {number} postId - 게시글 ID
 * @property {string} title - 게시글 제목
 * @property {string} [thumbnailUrl] - 썸네일 이미지 URL (선택적)
 * @property {string} createdAt - 생성일시
 */
export type PostSummary = {
  postId: number;
  title: string;
  thumbnailUrl?: string;
  createdAt: string;
};

/**
 * 게시글 목록 응답 데이터 타입
 * @interface PostSummaryResponse
 * @property {PostCategory} postType - 게시글 카테고리
 * @property {number} totalElements - 전체 게시글 수
 * @property {number} totalPages - 전체 페이지 수
 * @property {number} pageNumber - 현재 페이지 번호
 * @property {boolean} isLast - 마지막 페이지 여부
 * @property {PostSummary[]} content - 게시글 목록
 */
export type PostSummaryResponse = {
  postType: PostCategory;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  isLast: boolean;
  content: PostSummary[];
};

/**
 * 게시글 상세 정보 타입
 * @interface PostDetailResponse
 * @property {string} title - 게시글 제목
 * @property {string} content - 게시글 내용
 * @property {string} createAt - 생성일시
 * @property {string} modifiedAt - 수정일시
 * @property {Array<{fileId: number, fileUrl: string}>} fileUrls - 파일 정보 목록
 * @property {LinkMeta} [linkMeta] - 링크 메타 정보 (OG 태그 파싱 결과)
 */
export type PostDetailResponse = {
  title: string;
  content: string;
  createAt: string;
  modifiedAt: string;
  fileUrls: Array<{
    fileId: number;
    fileUrl: string;
  }>;
  linkMeta?: LinkMeta;
};

/**
 * 캘린더 게시글 상세 정보 타입
 * @interface CalendarPostDetailResponse
 * @property {string} title - 게시글 제목
 * @property {string} content - 게시글 내용
 * @property {string} createAt - 생성일시
 * @property {string} modifiedAt - 수정일시
 * @property {Array<{fileId: number, fileUrl: string}>} fileUrls - 파일 정보 목록
 * @property {string} eventDate - 행사 날짜
 * @property {ActivityType} activityType - 활동 타입
 * @property {LinkMeta} [linkMeta] - 링크 메타 정보 (OG 태그 파싱 결과)
 */
export type CalendarPostDetailResponse = {
  title: string;
  content: string;
  createAt: string;
  modifiedAt: string;
  fileUrls: Array<{
    fileId: number;
    fileUrl: string;
  }>;
  eventDate: string;
  activityType: ActivityType;
  linkMeta?: LinkMeta;
};
