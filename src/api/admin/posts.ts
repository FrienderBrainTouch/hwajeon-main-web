import { apiClient, type ApiResponse } from '../../lib/api';

import type {
  ActivityType,
  PostSummaryResponse,
  PostDetailResponse,
  CalendarPostDetailResponse,
  GetPostsParams,
  GetPostDetailParams,
} from '@/types/api';
import type { CreatePostRequest, CreatePostResponse, UpdatePostRequest } from '@/types/api';

// 게시글 관련 엔드포인트
const POST_ENDPOINTS = {
  POST_CREATE: '/homepage/admin',
  POST_CALENDAR_CREATE: '/homepage/admin/calendar',
  POST_LIST: '/homepage/category',
  POST_DETAIL: '/homepage/:postId',
  POST_CALENDAR_DETAIL: '/homepage/calendar/:postId',
  POST_UPDATE: '/homepage/admin/:postId',
  POST_DELETE: '/homepage/admin/:postId',
} as const;

// 게시글 API 함수들
export const postsApi = {
  // 게시글 생성 (일반)
  async createPost(request: CreatePostRequest): Promise<ApiResponse<CreatePostResponse>> {
    try {
      const formData = new FormData();
      formData.append('title', request.title);
      formData.append('content', request.content);
      formData.append('postType', request.postType);

      if (request.eventDate) {
        formData.append('activeDate', request.eventDate);
      }

      // 썸네일이 있으면 files의 맨 앞에 추가
      if (request.thumbnail) {
        formData.append('files', request.thumbnail);
      }

      // 첨부파일들 추가
      if (request.attachments && request.attachments.length > 0) {
        request.attachments.forEach((file) => {
          formData.append('files', file);
        });
      }

      return await apiClient.post<CreatePostResponse>(POST_ENDPOINTS.POST_CREATE, formData);
    } catch (error) {
      throw error;
    }
  },

  // 캘린더 게시글 생성
  async createCalendarPost(
    request: CreatePostRequest & { activityType: ActivityType }
  ): Promise<ApiResponse<CreatePostResponse>> {
    try {
      const formData = new FormData();
      formData.append('title', request.title);
      formData.append('content', request.content);
      formData.append('postType', request.postType);
      formData.append('activityType', request.activityType);

      if (request.eventDate) {
        formData.append('activeDate', request.eventDate);
      }

      // 썸네일이 있으면 files의 맨 앞에 추가
      if (request.thumbnail) {
        formData.append('files', request.thumbnail);
      }

      // 첨부파일들 추가
      if (request.attachments && request.attachments.length > 0) {
        request.attachments.forEach((file) => {
          formData.append('files', file);
        });
      }

      return await apiClient.post<CreatePostResponse>(
        POST_ENDPOINTS.POST_CALENDAR_CREATE,
        formData
      );
    } catch (error) {
      throw error;
    }
  },

  // 게시글 목록 조회
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

  // 게시글 상세 조회
  async getPostDetail(params: GetPostDetailParams): Promise<ApiResponse<PostDetailResponse>> {
    try {
      console.log('getPostDetail params:', params);
      console.log('postId type:', typeof params.postId);
      console.log('postId value:', params.postId);

      // postId가 이미 숫자인지 확인
      let postId: number;
      if (typeof params.postId === 'number') {
        postId = params.postId;
      } else {
        postId = parseInt(params.postId, 10);
      }

      console.log('final postId:', postId);

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

  // 캘린더 게시글 상세 조회
  async getCalendarPostDetail(
    params: GetPostDetailParams
  ): Promise<ApiResponse<CalendarPostDetailResponse>> {
    try {
      console.log('getCalendarPostDetail params:', params);
      console.log('postId type:', typeof params.postId);
      console.log('postId value:', params.postId);

      // postId가 이미 숫자인지 확인
      let postId: number;
      if (typeof params.postId === 'number') {
        postId = params.postId;
      } else {
        postId = parseInt(params.postId, 10);
      }

      console.log('final postId:', postId);

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

  // 게시글 수정
  async updatePost(
    postId: string,
    request: UpdatePostRequest
  ): Promise<ApiResponse<CreatePostResponse>> {
    try {
      // postId를 숫자로 변환하여 전송
      const id = parseInt(postId, 10);
      if (isNaN(id)) {
        throw new Error('Invalid post ID');
      }

      const formData = new FormData();
      formData.append('title', request.title);
      formData.append('content', request.content);

      if (request.activityType) {
        formData.append('activityType', request.activityType);
      }

      // 기존 파일 IDs 추가
      if (request.existingFileIds && request.existingFileIds.length > 0) {
        request.existingFileIds.forEach((fileId, index) => {
          formData.append(`existingFileIds[${index}]`, fileId.toString());
        });
      }

      // 새 파일들 추가
      if (request.newFiles && request.newFiles.length > 0) {
        request.newFiles.forEach((file) => {
          formData.append('newFiles', file);
        });
      }

      return await apiClient.patch<CreatePostResponse>(
        POST_ENDPOINTS.POST_UPDATE.replace(':postId', id.toString()),
        formData
      );
    } catch (error) {
      throw error;
    }
  },

  // 게시글 삭제
  async deletePost(postId: string): Promise<ApiResponse<void>> {
    try {
      // postId를 숫자로 변환하여 전송
      const id = parseInt(postId, 10);
      if (isNaN(id)) {
        throw new Error('Invalid post ID');
      }

      return await apiClient.delete<void>(
        POST_ENDPOINTS.POST_DELETE.replace(':postId', id.toString())
      );
    } catch (error) {
      throw error;
    }
  },
};
