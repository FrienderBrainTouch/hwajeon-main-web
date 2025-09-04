import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// 데모용 사용자 데이터
const demoUsers = [
  { id: 1, name: '김철수', email: 'kim@example.com', role: 'user', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: '이영희', email: 'lee@example.com', role: 'user', status: 'active', joinDate: '2024-01-20' },
  { id: 3, name: '박민수', email: 'park@example.com', role: 'admin', status: 'inactive', joinDate: '2024-01-10' },
  { id: 4, name: '정수진', email: 'jung@example.com', role: 'user', status: 'active', joinDate: '2024-02-01' },
];

export default function UserManagement() {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState(demoUsers);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">사용자 관리</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                안녕하세요, {user?.name}님
              </span>
              <Button variant="outline" onClick={logout}>
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <Card>
            <CardHeader>
              <CardTitle>사용자 목록</CardTitle>
              <CardDescription>
                등록된 사용자들을 관리하고 검색할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* 검색 및 필터 */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="사용자 이름 또는 이메일로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>새 사용자 추가</Button>
              </div>

              {/* 사용자 테이블 */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-gray-600">ID</th>
                      <th className="text-left p-3 font-medium text-gray-600">이름</th>
                      <th className="text-left p-3 font-medium text-gray-600">이메일</th>
                      <th className="text-left p-3 font-medium text-gray-600">역할</th>
                      <th className="text-left p-3 font-medium text-gray-600">상태</th>
                      <th className="text-left p-3 font-medium text-gray-600">가입일</th>
                      <th className="text-left p-3 font-medium text-gray-600">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{user.id}</td>
                        <td className="p-3 font-medium">{user.name}</td>
                        <td className="p-3 text-gray-600">{user.email}</td>
                        <td className="p-3">
                          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? '관리자' : '사용자'}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <Badge variant={user.status === 'active' ? 'default' : 'outline'}>
                            {user.status === 'active' ? '활성' : '비활성'}
                          </Badge>
                        </td>
                        <td className="p-3 text-gray-600">{user.joinDate}</td>
                        <td className="p-3">
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              편집
                            </Button>
                            <Button size="sm" variant="outline">
                              삭제
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  검색 결과가 없습니다.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
