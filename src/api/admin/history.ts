import { apiClient } from '@/lib/api';
import type { ApiResponse } from '@/types/api/client';

export type CompanyHistoryItem = {
  id: number;
  year: string;
  title: string;
  description: string;
};

export type CompanyHistoryRequest = {
  year: string;
  title: string;
  description: string;
};

const ENDPOINTS = {
  LIST: '/homepage/histories',
  ADMIN: '/homepage/admin/histories',
} as const;

export const historyApi = {
  async list(): Promise<ApiResponse<CompanyHistoryItem[]>> {
    return apiClient.get<CompanyHistoryItem[]>(ENDPOINTS.LIST);
  },

  async create(request: CompanyHistoryRequest): Promise<ApiResponse<void>> {
    return apiClient.post<void>(ENDPOINTS.ADMIN, request);
  },

  async update(id: number, request: CompanyHistoryRequest): Promise<ApiResponse<number>> {
    return apiClient.patch<number>(`${ENDPOINTS.ADMIN}/${id}`, request);
  },

  async remove(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`${ENDPOINTS.ADMIN}/${id}`);
  },
};
