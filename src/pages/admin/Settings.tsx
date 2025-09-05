import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function AdminSettings() {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({
    siteName: '화전',
    siteDescription: '도시 그 이상의 가능성',
    adminEmail: 'admin@hawjeon.com',
    maxUsers: 1000,
    maintenanceMode: false,
  });

  const handleSave = () => {
    // 실제로는 서버에 설정을 저장해야 함
    alert('설정이 저장되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">시스템 설정</h1>
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
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          {/* 기본 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>기본 설정</CardTitle>
              <CardDescription>
                사이트의 기본 정보를 설정합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">사이트 이름</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">관리자 이메일</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">사이트 설명</Label>
                <Input
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          {/* 시스템 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>시스템 설정</CardTitle>
              <CardDescription>
                시스템 운영과 관련된 설정을 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxUsers">최대 사용자 수</Label>
                <Input
                  id="maxUsers"
                  type="number"
                  value={settings.maxUsers}
                  onChange={(e) => setSettings({ ...settings, maxUsers: parseInt(e.target.value) })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="maintenanceMode">유지보수 모드</Label>
              </div>
            </CardContent>
          </Card>

          {/* 보안 설정 */}
          <Card>
            <CardHeader>
              <CardTitle>보안 설정</CardTitle>
              <CardDescription>
                시스템 보안과 관련된 설정을 관리합니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>비밀번호 정책</Label>
                <div className="text-sm text-gray-600">
                  최소 8자 이상, 대소문자, 숫자, 특수문자 포함
                </div>
              </div>
              <div className="space-y-2">
                <Label>세션 타임아웃</Label>
                <div className="text-sm text-gray-600">
                  현재: 24시간
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                  모든 세션 종료
                </Button>
                <div className="text-xs text-gray-500">
                  모든 사용자의 로그인 세션을 즉시 종료합니다
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 저장 버튼 */}
          <div className="flex justify-end">
            <Button onClick={handleSave} className="px-8">
              설정 저장
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
