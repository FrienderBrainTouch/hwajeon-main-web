import { Button } from '@/components/ui/button';

interface User {
  id: string;
  username: string;
  name: string;
  realName: string;
  role: 'TEACHER' | 'USER';
}

interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

export const DashboardHeader = ({ user, onLogout }: DashboardHeaderProps) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">화전 관리자 대시보드</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">안녕하세요, {user?.realName}님</span>
            <Button variant="outline" onClick={onLogout}>
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
