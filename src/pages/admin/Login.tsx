import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/admin';

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
    <LoginForm
      username={username}
      password={password}
      error={error}
      isLoading={isLoading}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  );
}
