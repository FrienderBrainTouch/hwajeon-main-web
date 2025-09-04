import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authApi, type LoginRequest } from '../api/auth';
import { useToast } from '../components/ui/toast';
import { formatApiError } from '../utils/errorHandler';

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
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useToast();

  // JWT 토큰에서 사용자 정보 추출
  const decodeToken = (token: string, username?: string): User | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);
      
      const user = {
        id: payload.sub, // subject는 userId
        username: username || 'admin',
        name: payload.realName || '관리자',
        role: payload.role || 'TEACHER',
      };
      
      console.log('Decoded user:', user);
      return user;
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  };

  // 토큰이 있는지 확인하고 유효성을 검증
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('admin_token');
      if (storedToken) {
        try {
          // 서버에서 토큰 검증 및 사용자 정보 가져오기
          const response = await authApi.verifyToken();
          if (response.success && response.data) {
            setToken(storedToken);
            setUser(response.data);
          } else {
            // 토큰이 유효하지 않으면 제거
            localStorage.removeItem('admin_token');
            localStorage.removeItem('refresh_token');
          }
        } catch (error) {
          // 토큰 검증 실패 시 제거
          localStorage.removeItem('admin_token');
          localStorage.removeItem('refresh_token');
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);


  const login = async (credentials: LoginRequest): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      console.log('Login attempt with credentials:', credentials);
      const response = await authApi.login(credentials);
      console.log('Login response:', response);
      
      if (response.success && response.data) {
        setToken(response.data.accessToken);
        
        // 서버에서 user 정보가 없으면 토큰에서 추출하거나 기본값 사용
        if (response.data.user) {
          setUser(response.data.user);
          addToast({
            type: 'success',
            title: '로그인 성공',
            message: `${response.data.user.name}님, 환영합니다!`,
          });
        } else {
          // 토큰에서 사용자 정보 추출
          const userFromToken = decodeToken(response.data.accessToken, credentials.username);
          if (userFromToken) {
            setUser(userFromToken);
            addToast({
              type: 'success',
              title: '로그인 성공',
              message: `${userFromToken.name}님, 환영합니다!`,
            });
          } else {
            // 토큰 디코딩 실패 시 기본값 사용
            const defaultUser = {
              id: 'unknown',
              username: credentials.username,
              name: '관리자',
              role: 'TEACHER' as const,
            };
            setUser(defaultUser);
            addToast({
              type: 'success',
              title: '로그인 성공',
              message: `${defaultUser.name}님, 환영합니다!`,
            });
          }
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = formatApiError(error as any);
      addToast({
        type: 'error',
        title: '로그인 실패',
        message: errorMessage,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };


  const logout = async (): Promise<void> => {
    try {
      await authApi.logout();
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
      const response = await authApi.refreshToken();
      if (response.success && response.data) {
        setToken(response.data.token);
        return true;
      }
      return false;
    } catch (error) {
      // 리프레시 실패 시 로그아웃
      await logout();
      return false;
    }
  };

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
