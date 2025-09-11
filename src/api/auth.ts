import { apiClient, type ApiResponse } from '../lib/api';
// 엔드포인트 직접 정의
const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  VERIFY: '/api/auth/verify',
  PROFILE: '/api/auth/profile',
  REFRESH: '/api/auth/refresh',
  CHANGE_PASSWORD: '/api/auth/change-password',
} as const;

// 인증 관련 타입 정의
export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: string;
    username: string;
    name: string;
    realName: string;
    role: 'TEACHER' | 'USER';
  };
};

export type UserProfile = {
  id: string;
  username: string;
  name: string;
  realName: string;
  role: 'TEACHER' | 'USER';
  createdAt: string;
  lastLoginAt?: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

// 게시글 관련 타입들
export type ActivityType = 'NONE' | 'FESTIVAL' | 'ONE_DAY_CLASS' | 'CONFERENCE';

export type PostCategory = 'NOTICE' | 'ARCHIVE' | 'MEETING' | 'NEWS' | 'GALLERY' | 'CALENDAR';

export type CreatePostRequest = {
  title: string;
  content: string;
  postType: PostCategory;
  eventDate?: string; // CALENDAR 카테고리용
  activityType?: ActivityType; // GALLERY 카테고리용
  thumbnail?: File;
  attachments?: File[];
};

export type PostSummary = {
  postId: number;
  title: string;
  thumbnailUrl?: string;
  createdAt: string;
};

export type PostSummaryResponse = {
  postType: PostCategory;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  isLast: boolean;
  content: PostSummary[];
};

export type CreatePostResponse = {
  title: string;
  content: string;
  createAt: string;
  modifiedAt: string;
  fileUrls: string[];
};

export type PostDetailResponse = {
  title: string;
  content: string;
  createAt: string;
  modifiedAt: string;
  fileUrls: Array<{
    fileId: number;
    fileUrl: string;
  }>;
};

export type GetPostsParams = {
  postType?: PostCategory;
  page?: number;
  size?: number;
};

export type GetPostDetailParams = {
  postId: string | number;
};

export type UpdatePostRequest = {
  title: string;
  content: string;
  activityType?: ActivityType;
  existingFileIds?: number[];
  newFiles?: File[];
};

export type RefreshTokenResponse = {
  token: string;
  refreshToken: string;
};

// 인증 API 함수들
export const authApi = {
  // 로그인
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await apiClient.post<LoginResponse>(
        AUTH_ENDPOINTS.LOGIN,
        credentials
      );
      
      if (response.success && response.data) {
        // 토큰을 localStorage에 저장
        localStorage.setItem('admin_token', response.data.accessToken);
        if (response.data.refreshToken) {
          localStorage.setItem('refresh_token', response.data.refreshToken);
        }
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // 로그아웃
  async logout(): Promise<ApiResponse<void>> {
    try {
      const response = await apiClient.post<void>(AUTH_ENDPOINTS.LOGOUT);
      
      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem('admin_token');
      localStorage.removeItem('refresh_token');
      
      return response;
    } catch (error) {
      // 에러가 발생해도 로컬 토큰은 제거
      localStorage.removeItem('admin_token');
      localStorage.removeItem('refresh_token');
      throw error;
    }
  },

  // 토큰 검증
  async verifyToken(): Promise<ApiResponse<UserProfile>> {
    try {
      return await apiClient.get<UserProfile>(AUTH_ENDPOINTS.VERIFY);
    } catch (error) {
      // 토큰이 유효하지 않으면 로컬 스토리지에서 제거
      localStorage.removeItem('admin_token');
      localStorage.removeItem('refresh_token');
      throw error;
    }
  },

  // 사용자 프로필 조회
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    try {
      return await apiClient.get<UserProfile>(AUTH_ENDPOINTS.PROFILE);
    } catch (error) {
      throw error;
    }
  },

  // 토큰 갱신
  async refreshToken(): Promise<ApiResponse<RefreshTokenResponse>> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('Refresh token not found');
      }

      const response = await apiClient.post<RefreshTokenResponse>(
        AUTH_ENDPOINTS.REFRESH,
        { refreshToken }
      );

      if (response.success && response.data) {
        // 새로운 토큰을 localStorage에 저장
        localStorage.setItem('admin_token', response.data.token);
        localStorage.setItem('refresh_token', response.data.refreshToken);
      }

      return response;
    } catch (error) {
      // 리프레시 토큰도 실패하면 모든 토큰 제거
      localStorage.removeItem('admin_token');
      localStorage.removeItem('refresh_token');
      throw error;
    }
  },

  // 비밀번호 변경
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post<void>('/auth/change-password', data);
    } catch (error) {
      throw error;
    }
  },

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

      return await apiClient.post<CreatePostResponse>('/homepage/admin', formData);
    } catch (error) {
      throw error;
    }
  },

  // 캘린더 게시글 생성
  async createCalendarPost(request: CreatePostRequest & { activityType: ActivityType }): Promise<ApiResponse<CreatePostResponse>> {
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

      return await apiClient.post<CreatePostResponse>('/homepage/admin/calendar', formData);
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

      return await apiClient.get<PostSummaryResponse>('/homepage/category', queryParams);
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
      return await apiClient.get<PostDetailResponse>(`/homepage/${postId}`);
    } catch (error) {
      console.error('getPostDetail error:', error);
      throw error;
    }
  },

  // 게시글 수정
  async updatePost(postId: string, request: UpdatePostRequest): Promise<ApiResponse<CreatePostResponse>> {
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

      return await apiClient.patch<CreatePostResponse>(`/homepage/admin/${id}`, formData);
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

      return await apiClient.delete<void>(`/homepage/admin/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
