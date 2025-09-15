import { apiClient } from '@/lib/api';
import type { ApiResponse } from '@/types/api/client';
import type {
  PostSummaryResponse,
  PostDetailResponse,
  CalendarPostDetailResponse,
  GetPostsParams,
  GetPostDetailParams,
} from '@/types/api';

// 게시글 관련 엔드포인트 (Member용 - 토큰 없이 접근)
const POST_ENDPOINTS = {
  POST_LIST: '/homepage/category',
  POST_DETAIL: '/homepage/:postId',
  POST_CALENDAR_DETAIL: '/homepage/calendar/:postId',
} as const;

// Member용 게시글 API 함수들 (토큰 없이 호출)
export const memberPostsApi = {
  // 게시글 목록 조회 (공개 API)
  async getPosts(params: GetPostsParams = {}): Promise<ApiResponse<PostSummaryResponse>> {
    try {
      const queryParams: Record<string, any> = {};

      if (params.postType) {
        queryParams.postType = params.postType;
      }
      if (params.page !== undefined) {
        queryParams.page = params.page;
      }
      if (params.size !== undefined) {
        queryParams.size = params.size;
      }

      return await apiClient.get<PostSummaryResponse>(POST_ENDPOINTS.POST_LIST, queryParams);
    } catch (error) {
      throw error;
    }
  },

  // 게시글 상세 조회 (공개 API)
  async getPostDetail(params: GetPostDetailParams): Promise<ApiResponse<PostDetailResponse>> {
    try {
      // postId가 이미 숫자인지 확인
      let postId: number;
      if (typeof params.postId === 'number') {
        postId = params.postId;
      } else {
        postId = parseInt(params.postId, 10);
      }

      if (isNaN(postId) || postId <= 0) {
        throw new Error(`Invalid post ID: ${params.postId}`);
      }
      return await apiClient.get<PostDetailResponse>(
        POST_ENDPOINTS.POST_DETAIL.replace(':postId', postId.toString())
      );
    } catch (error) {
      console.error('getPostDetail error:', error);
      throw error;
    }
  },

  // 캘린더 게시글 상세 조회 (공개 API)
  async getCalendarPostDetail(
    params: GetPostDetailParams
  ): Promise<ApiResponse<CalendarPostDetailResponse>> {
    try {
      // postId가 이미 숫자인지 확인
      let postId: number;
      if (typeof params.postId === 'number') {
        postId = params.postId;
      } else {
        postId = parseInt(params.postId, 10);
      }

      if (isNaN(postId) || postId <= 0) {
        throw new Error(`Invalid post ID: ${params.postId}`);
      }
      return await apiClient.get<CalendarPostDetailResponse>(
        POST_ENDPOINTS.POST_CALENDAR_DETAIL.replace(':postId', postId.toString())
      );
    } catch (error) {
      console.error('getCalendarPostDetail error:', error);
      throw error;
    }
  },
};
