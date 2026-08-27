import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { type DashboardHeaderProps } from '@/types/components';

export const DashboardHeader = ({ user, onLogout }: DashboardHeaderProps) => {
  const { pathname } = useLocation();
  const onHistory = pathname.startsWith('/admin/history');

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <h1 className="text-xl font-semibold text-gray-900 truncate">화전 관리자 대시보드</h1>
            <nav className="hidden sm:flex items-center gap-2 text-sm">
              <Link
                to="/admin/dashboard"
                className={
                  !onHistory
                    ? 'font-medium text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }
              >
                게시글
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                to="/admin/history"
                className={
                  onHistory
                    ? 'font-medium text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }
              >
                연혁
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4 shrink-0">
            <span className="hidden sm:inline text-sm text-gray-600">
              안녕하세요, {user?.realName}님
            </span>
            <Button variant="outline" onClick={onLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
