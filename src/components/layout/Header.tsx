import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Bell } from 'lucide-react';
import logo from '@/assets/logo.svg';

interface HeaderProps {
  solid?: boolean; // true면 흰 배경 + 그림자
  variant?: 'overlay' | 'default';
}

export default function Header({ solid = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const location = useLocation();

  const navigationItems = [
    { label: '조합 소개', path: '/combination' },
    { label: '사업 안내', path: '/business' },
    { label: '소식과 자료', path: '/news' },
    { label: '참여하기', path: '/participate' },
    { label: '문의하기', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // 메인 페이지 여부 확인
  const isMainPage = location.pathname === '/';

  return (
    <header
      className={`sticky top-0 z-[9999] w-full ${
        isMainPage
          ? 'bg-white border-b border-gray-100 text-gray-900' // 메인 페이지: 흰색 배경
          : 'bg-white border-b border-gray-100 text-gray-900' // 기타 페이지: 흰색 배경
      }`}
    >
      {/* 직사각형 헤더 */}
      <div
        className={`mx-auto w-full px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 flex items-center justify-between ${
          isMainPage ? 'relative z-[9999] h-16 xs:h-18 sm:h-20' : 'h-16 xs:h-18 sm:h-20'
        }`}
      >
        {/* 로고 */}
        <Link to="/" className="flex items-center space-x-2">
          {isMainPage ? (
            // 메인 페이지: 로고 + 텍스트
            <>
              <img src={logo} alt="화전마을 로고" className="w-8 h-8 xs:w-10 xs:h-10" />
              <span className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
                화전마을
              </span>
            </>
          ) : (
            // 기타 페이지: 로고 + 텍스트
            <>
              <img src={logo} alt="화전마을 로고" className="w-8 h-8 xs:w-10 xs:h-10" />
              <span className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
                화전마을
              </span>
            </>
          )}
        </Link>

        {/* 네비게이션 메뉴 */}
        <nav className="flex items-center space-x-8">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                setSelectedCategory(item.label);
                setIsCategoryOpen(true);
              }}
              className={`text-sm font-medium transition-colors ${`hover:text-[#2B2A4C] ${
                isActive(item.path) ? 'text-[#2B2A4C] border-b-2 border-[#2B2A4C]' : 'text-gray-600'
              }`}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* 우측 영역 */}
        <div className="flex items-center space-x-4">
          {/* 모바일 메뉴 버튼 */}
          <button
            className={`p-2 rounded-lg transition-colors ${
              isMainPage ? 'hover:bg-white/10 text-white' : 'hover:bg-gray-100 text-gray-900'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={`w-6 h-6 ${isMainPage ? 'text-white' : 'text-gray-900'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isMainPage ? 'text-white' : 'text-gray-900'}`} />
            )}
          </button>
        </div>

        {/* 햄버거 메뉴 */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 border-t border-gray-100 bg-white">
            <nav className="py-4 space-y-2 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    setSelectedCategory(item.label);
                    setIsCategoryOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            {!isMainPage && (
              <div className="px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4 border-t border-gray-100 space-y-3">
                <Button variant="outline" className="w-full">
                  로그인
                </Button>
                <Button className="w-full bg-[#2B2A4C] hover:bg-[#262544]">회원가입</Button>
              </div>
            )}
          </div>
        )}

        {/* 카테고리 드롭다운 모달 */}
        {isCategoryOpen && selectedCategory && (
          <div
            className="fixed inset-0 z-[9998] bg-black/20"
            onClick={() => setIsCategoryOpen(false)}
          >
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl p-6 min-w-[300px] max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedCategory}</h3>
                <button
                  onClick={() => setIsCategoryOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="space-y-3">
                <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <h4 className="font-medium text-gray-900">협동조합 소식</h4>
                  <p className="text-sm text-gray-500">행사·모집·알림 등 최신 소식 모아보기</p>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <h4 className="font-medium text-gray-900">사업 안내</h4>
                  <p className="text-sm text-gray-500">화전마을의 주요 사업과 활동 소개</p>
                </div>
                <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <h4 className="font-medium text-gray-900">참여 방법</h4>
                  <p className="text-sm text-gray-500">회원가입 및 참여 방법 안내</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
