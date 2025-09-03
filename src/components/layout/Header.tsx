import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HeaderDropdown from './HeaderDropdown';
import SideBar from './SideBar';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.svg';
import logoText from '@/assets/logo_text.svg';
import { rafThrottle } from '@/utils/rafThrottle';

interface HeaderProps {
  variant?: 'overlay' | 'default';
}

const navigationItems = [
  { label: '조합 소개', path: '/combination' },
  { label: '사업 안내', path: '/business' },
  { label: '소식과 자료', path: '/news' },
  { label: '참여하기', path: '/participate' },
  { label: '문의하기', path: '/contact' },
];

export default function Header({}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  const location = useLocation();
  const isMainPage = location.pathname === '/';

  const headerRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);

  // 스크롤에 따른 헤더 숨김/표시
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const last = lastScrollYRef.current;

      if (isMainPage) {
        setIsVisible(current <= 10);
      } else {
        // 아래로 빠르게 내릴 때만 숨김
        if (current > last && current > 120) setIsVisible(false);
        else setIsVisible(true);
      }
      lastScrollYRef.current = current;
    };
    // passive로 성능 개선
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMainPage]);

  // 헤더 높이 측정 (ResizeObserver 1회 세팅)
  useEffect(() => {
    if (!headerRef.current) return;
    const el = headerRef.current;
    const ro = new ResizeObserver(() => {
      setHeaderHeight(el.offsetHeight);
    });
    ro.observe(el);
    // 초기값 보정
    setHeaderHeight(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // 페이지 변경 시 드롭다운 상태 초기화
  useEffect(() => {
    setIsCategoryOpen(false);
    setSelectedCategory(null);
  }, [location.pathname]);

  // hover 선택: 한 프레임에 1번만 반영
  const setSelectedThrottled = useRef(
    rafThrottle((label: string) => {
      setSelectedCategory((curr) => (curr === label ? curr : label));
    })
  ).current;

  // 열기/닫기 약간의 의도 지연
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  const openWithDelay = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (!isCategoryOpen) {
      openTimer.current = window.setTimeout(() => {
        setIsCategoryOpen(true);
      }, 100);
    }
  };

  // const closeWithDelay = () => {
  //   if (openTimer.current) {
  //     window.clearTimeout(openTimer.current);
  //     openTimer.current = null;
  //   }
  //   closeTimer.current = window.setTimeout(() => {
  //     setIsCategoryOpen(false);
  //     setSelectedCategory(null);
  //   }, 120);
  // };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 z-[1000] w-full transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        isMainPage
          ? `${
              isCategoryOpen || isMenuOpen ? 'bg-white text-gray-900' : 'bg-transparent text-white'
            } ${isCategoryOpen || isMenuOpen ? '' : 'border-b border-white/60'}`
          : `bg-white text-gray-900 ${isMenuOpen ? '' : 'border-b border-gray-100'}`
      }`}
    >
      <div className="mx-auto w-full px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 flex items-center justify-between h-15 xs:h-18 sm:h-20 md:h-20 lg:h-25 xl:h-25 2xl:h-25">
        {/* 로고 */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={isMainPage ? logo : logoText}
            alt="화전마을 로고"
            className={
              isMainPage
                ? 'w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-14 xl:h-14 2xl:w-14 2xl:h-14'
                : 'w-24 h-8 xs:w-24 xs:h-8 sm:w-28 sm:h-10 md:w-32 md:h-12 lg:w-33 lg:h-14 xl:w-42 xl:h-14 2xl:w-42 2xl:h-14'
            }
          />
        </Link>

        {/* 네비게이션 */}
        <nav className="hidden md:flex items-center space-x-16" onPointerEnter={openWithDelay}>
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              data-category={item.label}
              onPointerEnter={() => setSelectedThrottled(item.label)}
              className={`text-md font-medium transition-colors ${
                isMainPage ? (isCategoryOpen ? 'text-gray-900' : 'text-white') : 'text-gray-900'
              }                                                                 ${
                selectedCategory === item.label && isCategoryOpen
                  ? 'text-[#2B2A4C] border-b-2 border-[#2B2A4C]'
                  : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 우측 영역 */}
        <div className="flex items-center space-x-4">
          <button
            className={`p-2 rounded-lg transition-colors ${
              isMainPage
                ? isCategoryOpen
                  ? 'hover:bg-gray-100 text-gray-900'
                  : 'hover:bg-white/10 text-white'
                : 'hover:bg-gray-100 text-gray-900'
            }`}
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X
                className={`w-6 h-6 ${
                  isMainPage ? (isCategoryOpen ? 'text-gray-900' : 'text-white') : 'text-gray-900'
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 ${
                  isMainPage ? (isCategoryOpen ? 'text-gray-900' : 'text-white') : 'text-gray-900'
                }`}
              />
            )}
          </button>
        </div>
      </div>

      {/* 드롭다운: wrapper는 pointer-events-none로 헤더/링크 가리지 않기 */}
      <div
        className="pointer-events-none fixed left-0 right-0"
        style={{ top: headerHeight }}
        aria-hidden={!isCategoryOpen}
      >
        <HeaderDropdown
          isOpen={isCategoryOpen}
          onClose={() => setIsCategoryOpen(false)}
          headerHeight={headerHeight}
          selectedCategory={selectedCategory}
        />
      </div>

      {/* 사이드바 (모바일/작은 화면) */}
      {isMenuOpen && <SideBar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
}
