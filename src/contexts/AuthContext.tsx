import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi, type LoginRequest } from '../api/auth';
import { useApi } from '../hooks/useApi';
import { useToast } from '../components/ui/toast';

interface User {
  id: string;
  username: string;
  name: string;
  role: 'TEACHER' | 'USER';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshToken: () => Promise<boolean>;
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
  const verifyApi = useApi(authApi.verifyToken);
  const refreshApi = useApi(authApi.refreshToken);

  // JWT 토큰에서 사용자 정보 추출
  const decodeToken = (token: string, username?: string): User | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = {
        id: payload.sub,
        username: username || 'admin',
        name: payload.realName || '관리자',
        role: payload.role || 'TEACHER',
      };
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
          const result = await verifyApi.execute();
          if (result) {
            setToken(storedToken);
            setUser(result);
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

  const refreshToken = async (): Promise<boolean> => {
    try {
      const result = await refreshApi.execute();
      if (result) {
        setToken(result.token);
        return true;
      }
      return false;
    } catch (error) {
      // 리프레시 실패 시 로그아웃
      await logout();
      return false;
    }
  };

  // 전체 로딩 상태는 개별 API 로딩 상태를 고려
  const isLoading = loginApi.loading || logoutApi.loading || verifyApi.loading || refreshApi.loading;

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};