import { apiClient, type ApiResponse } from '../lib/api';
import { API_ENDPOINTS } from '../config/api';

// 설정 관련 타입 정의
export interface SystemSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  adminEmail: string;
  maxUsers: number;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export interface SecuritySettings {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  sessionTimeout: number; // 분 단위
  maxLoginAttempts: number;
  lockoutDuration: number; // 분 단위
  twoFactorAuth: boolean;
  ipWhitelist: string[];
}

export interface NotificationSettings {
  email: {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPassword: string;
    fromEmail: string;
    fromName: string;
  };
  sms: {
    provider: string;
    apiKey: string;
    fromNumber: string;
  };
}

export interface BackupSettings {
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  backupTime: string; // HH:MM 형식
  retentionDays: number;
  backupLocation: string;
}

export interface AllSettings {
  system: SystemSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
  backup: BackupSettings;
}

export interface UpdateSettingsRequest {
  system?: Partial<SystemSettings>;
  security?: Partial<SecuritySettings>;
  notifications?: Partial<NotificationSettings>;
  backup?: Partial<BackupSettings>;
}

// 설정 API 함수들
export const settingsApi = {
  // 모든 설정 조회
  async getAllSettings(): Promise<ApiResponse<AllSettings>> {
    try {
      return await apiClient.get<AllSettings>(API_ENDPOINTS.SETTINGS.GET);
    } catch (error) {
      throw error;
    }
  },

  // 시스템 설정 조회
  async getSystemSettings(): Promise<ApiResponse<SystemSettings>> {
    try {
      return await apiClient.get<SystemSettings>(API_ENDPOINTS.SETTINGS.SYSTEM);
    } catch (error) {
      throw error;
    }
  },

  // 보안 설정 조회
  async getSecuritySettings(): Promise<ApiResponse<SecuritySettings>> {
    try {
      return await apiClient.get<SecuritySettings>(API_ENDPOINTS.SETTINGS.SECURITY);
    } catch (error) {
      throw error;
    }
  },

  // 설정 업데이트
  async updateSettings(settings: UpdateSettingsRequest): Promise<ApiResponse<AllSettings>> {
    try {
      return await apiClient.put<AllSettings>(API_ENDPOINTS.SETTINGS.UPDATE, settings);
    } catch (error) {
      throw error;
    }
  },

  // 시스템 설정 업데이트
  async updateSystemSettings(settings: Partial<SystemSettings>): Promise<ApiResponse<SystemSettings>> {
    try {
      return await apiClient.put<SystemSettings>(API_ENDPOINTS.SETTINGS.SYSTEM, settings);
    } catch (error) {
      throw error;
    }
  },

  // 보안 설정 업데이트
  async updateSecuritySettings(settings: Partial<SecuritySettings>): Promise<ApiResponse<SecuritySettings>> {
    try {
      return await apiClient.put<SecuritySettings>(API_ENDPOINTS.SETTINGS.SECURITY, settings);
    } catch (error) {
      throw error;
    }
  },

  // 유지보수 모드 토글
  async toggleMaintenanceMode(): Promise<ApiResponse<{ maintenanceMode: boolean }>> {
    try {
      return await apiClient.post<{ maintenanceMode: boolean }>('/settings/maintenance/toggle');
    } catch (error) {
      throw error;
    }
  },

  // 모든 세션 종료
  async terminateAllSessions(): Promise<ApiResponse<void>> {
    try {
      return await apiClient.post<void>('/settings/security/terminate-sessions');
    } catch (error) {
      throw error;
    }
  },

  // 시스템 백업 실행
  async createBackup(): Promise<ApiResponse<{ backupId: string; downloadUrl: string }>> {
    try {
      return await apiClient.post<{ backupId: string; downloadUrl: string }>('/settings/backup/create');
    } catch (error) {
      throw error;
    }
  },

  // 백업 목록 조회
  async getBackups(): Promise<ApiResponse<Array<{
    id: string;
    createdAt: string;
    size: number;
    status: 'completed' | 'failed' | 'in-progress';
    downloadUrl?: string;
  }>>> {
    try {
      return await apiClient.get('/settings/backup/list');
    } catch (error) {
      throw error;
    }
  },

  // 백업 삭제
  async deleteBackup(backupId: string): Promise<ApiResponse<void>> {
    try {
      return await apiClient.delete(`/settings/backup/${backupId}`);
    } catch (error) {
      throw error;
    }
  },

  // 시스템 로그 조회
  async getSystemLogs(params?: {
    level?: 'error' | 'warn' | 'info' | 'debug';
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): Promise<ApiResponse<Array<{
    id: string;
    level: string;
    message: string;
    timestamp: string;
    source: string;
  }>>> {
    try {
      return await apiClient.get('/settings/logs', params);
    } catch (error) {
      throw error;
    }
  },

  // 시스템 상태 확인
  async getSystemStatus(): Promise<ApiResponse<{
    status: 'healthy' | 'warning' | 'error';
    uptime: number;
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
    disk: {
      used: number;
      total: number;
      percentage: number;
    };
    database: {
      status: 'connected' | 'disconnected';
      responseTime: number;
    };
    services: Array<{
      name: string;
      status: 'running' | 'stopped' | 'error';
      uptime: number;
    }>;
  }>> {
    try {
      return await apiClient.get('/settings/status');
    } catch (error) {
      throw error;
    }
  },
};
