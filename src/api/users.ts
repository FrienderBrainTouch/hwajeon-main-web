import { apiClient, type ApiResponse } from '../lib/api';
import { API_ENDPOINTS } from '../config/api';

// 사용자 관련 타입 정의
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  profile?: {
    phone?: string;
    address?: string;
    avatar?: string;
  };
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: 'admin' | 'user';
  profile?: {
    phone?: string;
    address?: string;
  };
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: 'admin' | 'user';
  status?: 'active' | 'inactive' | 'pending';
  profile?: {
    phone?: string;
    address?: string;
    avatar?: string;
  };
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserSearchParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: 'admin' | 'user';
  status?: 'active' | 'inactive' | 'pending';
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLoginAt';
  sortOrder?: 'asc' | 'desc';
}

// 사용자 관리 API 함수들
export const usersApi = {
  // 사용자 목록 조회
  async getUsers(params?: UserSearchParams): Promise<ApiResponse<UserListResponse>> {
    try {
      return await apiClient.get<UserListResponse>(
        API_ENDPOINTS.USERS.LIST,
        params
      );
    } catch (error) {
      throw error;
    }
  },

  // 사용자 상세 조회
  async getUser(id: string): Promise<ApiResponse<User>> {
    try {
      return await apiClient.get<User>(API_ENDPOINTS.USERS.GET(id));
    } catch (error) {
      throw error;
    }
  },

  // 사용자 생성
  async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    try {
      return await apiClient.post<User>(API_ENDPOINTS.USERS.CREATE, userData);
    } catch (error) {
      throw error;
    }
  },

  // 사용자 정보 수정
  async updateUser(id: string, userData: UpdateUserRequest): Promise<ApiResponse<User>> {
    try {
      return await apiClient.put<User>(API_ENDPOINTS.USERS.UPDATE(id), userData);
    } catch (error) {
      throw error;
    }
  },

  // 사용자 삭제
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    try {
      return await apiClient.delete<void>(API_ENDPOINTS.USERS.DELETE(id));
    } catch (error) {
      throw error;
    }
  },

  // 사용자 검색
  async searchUsers(params: UserSearchParams): Promise<ApiResponse<UserListResponse>> {
    try {
      return await apiClient.get<UserListResponse>(
        API_ENDPOINTS.USERS.SEARCH,
        params
      );
    } catch (error) {
      throw error;
    }
  },

  // 사용자 상태 변경
  async updateUserStatus(id: string, status: 'active' | 'inactive' | 'pending'): Promise<ApiResponse<User>> {
    try {
      return await apiClient.patch<User>(`${API_ENDPOINTS.USERS.UPDATE(id)}/status`, { status });
    } catch (error) {
      throw error;
    }
  },

  // 사용자 역할 변경
  async updateUserRole(id: string, role: 'admin' | 'user'): Promise<ApiResponse<User>> {
    try {
      return await apiClient.patch<User>(`${API_ENDPOINTS.USERS.UPDATE(id)}/role`, { role });
    } catch (error) {
      throw error;
    }
  },

  // 사용자 비밀번호 초기화
  async resetUserPassword(id: string): Promise<ApiResponse<{ temporaryPassword: string }>> {
    try {
      return await apiClient.post<{ temporaryPassword: string }>(
        `${API_ENDPOINTS.USERS.UPDATE(id)}/reset-password`
      );
    } catch (error) {
      throw error;
    }
  },

  // 사용자 아바타 업로드
  async uploadUserAvatar(id: string, file: File): Promise<ApiResponse<{ avatarUrl: string }>> {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      return await apiClient.post<{ avatarUrl: string }>(
        `${API_ENDPOINTS.USERS.UPDATE(id)}/avatar`,
        formData
      );
    } catch (error) {
      throw error;
    }
  },

  // 사용자 통계
  async getUserStats(): Promise<ApiResponse<{
    total: number;
    active: number;
    inactive: number;
    pending: number;
    admins: number;
    users: number;
    newThisMonth: number;
  }>> {
    try {
      return await apiClient.get(`${API_ENDPOINTS.USERS.LIST}/stats`);
    } catch (error) {
      throw error;
    }
  },
};
