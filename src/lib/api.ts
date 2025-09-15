// API 기본 설정 및 HTTP 클라이언트

import type { ApiResponse, ApiError } from '@/types/api/client';

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };

    // 디버깅을 위한 로그
    console.log('API Client initialized with baseURL:', this.baseURL);
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    // 인증이 필요한 엔드포인트인지 확인 (로그인, 리프레시 등은 제외)
    const publicEndpoints = ['/api/auth/login', '/api/auth/refresh'];
    const isAuthEndpoint = publicEndpoints.includes(endpoint);

    // 토큰이 있고 인증이 필요한 엔드포인트인 경우에만 Authorization 헤더에 추가
    const token = localStorage.getItem('admin_token');

    // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 multipart/form-data로 설정)
    const isFormData = options.body instanceof FormData;
    const headers = {
      ...(isFormData ? {} : this.defaultHeaders), // FormData가 아닌 경우에만 기본 헤더 사용
      ...options.headers,
      ...(token && !isAuthEndpoint && { Authorization: `Bearer ${token}` }),
    };

    // 디버깅을 위한 로그
    console.log('API Request:', {
      url,
      method: options.method || 'GET',
      headers,
      body: options.body,
      isAuthEndpoint,
      hasToken: !!token,
    });

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log('API Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'API 요청에 실패했습니다.' };
        }
        throw {
          message: errorData.message || 'API 요청에 실패했습니다.',
          status: response.status,
          code: errorData.code,
        } as ApiError;
      }

      // 응답 본문이 있는 경우에만 JSON 파싱 시도
      let data = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (error) {
          console.warn('JSON 파싱 실패:', error);
        }
      }

      return {
        success: true,
        data: data?.data || data,
        message: data?.message,
      };
    } catch (error) {
      if (error instanceof TypeError) {
        // 네트워크 오류
        throw {
          message: '네트워크 연결을 확인해주세요.',
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return this.request<T>(url.pathname + url.search, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? (data instanceof FormData ? data : JSON.stringify(data)) : undefined,
    });
  }
}

export const apiClient = new ApiClient();
