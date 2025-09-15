import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi } from '../api/admin/auth';
import type { LoginRequest } from '@/types/api';
import { useApi } from '../hooks/useApi';
import { useToast } from '../components/ui/toast';

interface User {
  id: string;
  username: string;
  name: string;
  realName: string;
  role: 'TEACHER' | 'USER';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  // refreshToken: () => Promise<boolean>; // 사용되지 않음
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { addToast } = useToast();

  // useApi 훅들 사용 - 에러 처리는 useApi에서 자동으로 됨
  const loginApi = useApi(authApi.login);
  const logoutApi = useApi(authApi.logout);
  // verifyToken과 refreshToken은 주석 처리되어 있으므로 사용하지 않음
  // const verifyApi = useApi(authApi.verifyToken);
  // const refreshApi = useApi(authApi.refreshToken);

  // JWT 토큰에서 사용자 정보 추출
  const decodeToken = (token: string, username?: string): User | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('JWT Payload:', payload); // 디버깅용
      console.log('realName from JWT:', payload.realName); // 디버깅용

      // 한글이 깨진 경우를 감지하고 fallback 사용
      const isKoreanCorrupted = (str: string) => {
        return (/[^\x00-\x7F]/.test(str) && str.includes('ê')) || str.includes('ì');
      };

      const realName =
        payload.realName && !isKoreanCorrupted(payload.realName) ? payload.realName : '관리자';

      const user = {
        id: payload.sub,
        username: username || payload.username || 'admin',
        name: realName,
        role: payload.role || 'TEACHER',
        realName: realName,
      };
      console.log('Decoded user:', user); // 디버깅용
      return user;
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  };

  // 초기 인증 확인
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('admin_token');
      if (storedToken) {
        try {
          // 토큰이 있으면 디코드해서 사용자 정보 설정
          const userFromToken = decodeToken(storedToken);
          if (userFromToken) {
            setToken(storedToken);
            setUser(userFromToken);
          } else {
            localStorage.removeItem('admin_token');
            localStorage.removeItem('refresh_token');
          }
        } catch (error) {
          localStorage.removeItem('admin_token');
          localStorage.removeItem('refresh_token');
        }
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      const result = await loginApi.execute(credentials);
      if (result) {
        setToken(result.accessToken);

        if (result.user) {
          setUser(result.user);
          addToast({
            type: 'success',
            title: '로그인 성공',
            message: `${result.user.name}님, 환영합니다!`,
          });
        } else {
          const userFromToken = decodeToken(result.accessToken, credentials.username);
          if (userFromToken) {
            setUser(userFromToken);
            addToast({
              type: 'success',
              title: '로그인 성공',
              message: `${userFromToken.name}님, 환영합니다!`,
            });
          }
        }
        return true;
      }
      return false;
    } catch (error) {
      // useApi에서 이미 에러 처리가 되었으므로, 여기서는 토스트만 표시
      if (loginApi.error) {
        addToast({
          type: 'error',
          title: '로그인 실패',
          message: loginApi.error, // useApi에서 처리된 에러 메시지 사용
        });
      }
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutApi.execute();
    } catch (error) {
      // 로그아웃 API 실패해도 로컬 상태는 정리
      console.error('Logout API error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('admin_token');
      localStorage.removeItem('refresh_token');

      addToast({
        type: 'info',
        title: '로그아웃',
        message: '성공적으로 로그아웃되었습니다.',
      });
    }
  };

  // const refreshToken = async (): Promise<boolean> => {
  //   // refreshApi가 주석 처리되어 있으므로 항상 false 반환
  //   // 필요시 로그아웃 처리
  //   await logout();
  //   return false;
  // };

  // 전체 로딩 상태는 개별 API 로딩 상태를 고려
  const isLoading = loginApi.loading || logoutApi.loading;

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
    // refreshToken, // 사용되지 않음
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
