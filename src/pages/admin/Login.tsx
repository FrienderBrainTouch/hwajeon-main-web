import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, isAuthenticated, isLoading } = useAuth(); // AuthContext의 isLoading 사용
  const navigate = useNavigate();
  const location = useLocation();

  // 이미 인증된 사용자는 대시보드로 리다이렉트
  if (isAuthenticated) {
    const from =
      (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login({ username, password });
      if (success) {
        const from =
          (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
        navigate(from, { replace: true });
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">관리자 로그인</h2>
          <p className="mt-2 text-sm text-gray-600">화전 관리자 페이지에 로그인하세요</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>로그인</CardTitle>
            <CardDescription>관리자 계정으로 로그인하여 시스템에 접근하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">아이디</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="관리자 아이디를 입력하세요"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? '로그인 중...' : '로그인'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-2">데모 계정</h4>
              <p className="text-xs text-blue-600">
                아이디: admin
                <br />
                비밀번호: admin
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
