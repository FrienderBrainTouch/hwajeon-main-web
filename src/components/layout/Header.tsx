import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bell } from 'lucide-react';
import logo from '@/assets/logo.svg';

interface HeaderProps {
  variant?: 'light' | 'dark';
}

export default function Header({ variant = 'light' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: '조합 소개', path: '/combination' },
    { label: '사업 안내', path: '/business' },
    { label: '소식과 자료', path: '/news' },
    { label: '참여하기', path: '/participate' },
    { label: '문의하기', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 ${
        variant === 'dark'
          ? 'bg-gradient-to-b from-blue-900 via-purple-900 to-blue-950 text-white'
          : 'bg-white shadow-sm border-b border-gray-100 text-gray-900'
      }`}
    >
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-16 xs:h-18 sm:h-20">
          {/* 로고 */}
          <Link to="/" className="flex items-center space-x-2">
            {variant === 'dark' ? (
              <>
                <img src={logo} alt="화전마을 로고" className="w-8 h-8 xs:w-10 xs:h-10" />
                <div className="flex flex-col">
                  <span className="text-lg xs:text-xl sm:text-2xl font-bold text-white">
                    화전마을
                  </span>
                  <span className="text-xs xs:text-sm text-blue-200">관리 사회적협동조합</span>
                </div>
              </>
            ) : (
              <>
                <img src={logo} alt="화전마을 로고" className="w-8 h-8 xs:w-10 xs:h-10" />
                <span className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
                  화전마을
                </span>
              </>
            )}
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  variant === 'dark'
                    ? `hover:text-blue-300 ${
                        isActive(item.path)
                          ? 'text-blue-300 border-b-2 border-blue-300'
                          : 'text-white'
                      }`
                    : `hover:text-[#2B2A4C] ${
                        isActive(item.path)
                          ? 'text-[#2B2A4C] border-b-2 border-[#2B2A4C]'
                          : 'text-gray-600'
                      }`
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 데스크톱 CTA 버튼 */}
          <div className="hidden md:flex items-center space-x-4">
            {variant === 'dark' ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
                >
                  로그인
                </Button>
                <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                  회원가입
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm">
                  로그인
                </Button>
                <Button size="sm" className="bg-[#2B2A4C] hover:bg-[#262544]">
                  회원가입
                </Button>
              </>
            )}
          </div>

          {/* 우측 영역 */}
          <div className="flex items-center space-x-4">
            {/* 알림 아이콘 (다크 테마에서만)
            {variant === 'dark' && (
              <div className="relative">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  1
                </div>
              </div>
            )} */}

            {/* 모바일 메뉴 버튼 */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                variant === 'dark'
                  ? 'hover:bg-white/10 text-white'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* 하단 구분선 (다크 테마에서만) */}
        {variant === 'dark' && (
          <div className="h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
        )}

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <nav className="py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'text-[#2B2A4C] bg-[#2B2A4C]/10'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="px-4 py-4 border-t border-gray-100 space-y-3">
              <Button variant="outline" className="w-full">
                로그인
              </Button>
              <Button className="w-full bg-[#2B2A4C] hover:bg-[#262544]">회원가입</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
