// API 요청 타입 정의

import type { PostCategory } from './common';

/**
 * 게시글 목록 조회 파라미터 타입
 * @interface GetPostsParams
 * @property {PostCategory} [postType] - 게시글 카테고리 필터 (선택적)
 * @property {number} [page] - 페이지 번호 (선택적)
 * @property {number} [size] - 페이지 크기 (선택적)
 */
export type GetPostsParams = {
  postType?: PostCategory;
  page?: number;
  size?: number;
};

/**
 * 게시글 상세 조회 파라미터 타입
 * @interface GetPostDetailParams
 * @property {string | number} postId - 게시글 ID
 */
export type GetPostDetailParams = {
  postId: string | number;
};
