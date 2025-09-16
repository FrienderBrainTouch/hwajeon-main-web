import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';
import CharacterImg from '@/assets/header_character.svg';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { SideBarProps } from '@/types/components/layout';

// 공통 컴포넌트
const MenuLink = ({
  to,
  children,
  isTitle = false,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  isTitle?: boolean;
  onClick: () => void;
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block hover:text-gray-700 transition-colors ${
      isTitle
        ? 'text-[20px] xl:text-[25px] font-semibold text-gray-900'
        : 'text-[18px] xl:text-[22px] text-gray-900'
    }`}
  >
    {children}
  </Link>
);

// 메뉴 데이터
const menuData = [
  {
    title: '조합 소개',
    path: '/member/combination',
    width: 'w-[100px] xl:w-[120px]',
    items: [
      { label: '인사말', path: '/member/combination?tab=greeting' },
      { label: '미션 &비전', path: '/member/combination?tab=mission' },
      { label: '연혁', path: '/member/combination?tab=history' },
      { label: '조직도', path: '/member/combination?tab=organization' },
      { label: '화전 이야기', path: '/member/combination?tab=story' },
    ],
  },
  {
    title: '사업 안내',
    path: '/member/business',
    width: 'w-[240px] xl:w-[288px]',
    hasBorder: true,
    items: [
      { label: '도시재생 거점공간 운영 사업', path: '/member/business?tab=urban-regeneration' },
      { label: '행사 기획 및 교육 체험 사업', path: '/member/business?tab=events-education' },
      { label: '카페27b', path: '/member/business?tab=cafe27b' },
      { label: '지역 활성화 사업', path: '/member/business?tab=local-activation' },
    ],
  },
  {
    title: '소식과 자료',
    path: '/member/news?tab=news',
    width: 'w-[140px] xl:w-[168px]',
    hasBorder: true,
    items: [
      { label: '공지사항', path: '/member/news?tab=notice' },
      { label: '화전 소식', path: '/member/news?tab=news' },
      { label: '활동 갤러리', path: '/member/news?tab=gallery' },
      { label: '행사 캘린더', path: '/member/news?tab=calendar' },
      { label: '자료실', path: '/member/news?tab=archive' },
    ],
  },
  {
    title: '참여하기',
    path: '/member/participate?tab=membership',
    width: 'w-[160px] xl:w-[196px]',
    hasBorder: true,
    items: [
      { label: '조합원 가입 안내', path: '/member/participate?tab=membership' },
      { label: '자원봉사 신청', path: '/member/participate?tab=volunteer' },
      { label: '정기회의 자료', path: '/member/participate?tab=meeting' },
      { label: '후원 & 기부 안내', path: '/member/participate?tab=donation' },
    ],
  },
  {
    title: '문의하기',
    path: '/member/contact',
    width: 'w-[120px] xl:w-[140px]',
    hasBorder: true,
    items: [
      { label: '간편 문의', path: '/member/contact?tab=inquiry' },
      { label: '오시는 길', path: '/member/contact?tab=location' },
    ],
  },
];

// 1024px 이하용 세로 메뉴 데이터
// const verticalMenuData = [
//   { title: '조합 소개', path: '/combination' },
//   { title: '사업 안내', path: '/business' },
//   { title: '소식과 자료', path: '/news' },
//   { title: '참여하기', path: '/participate' },
//   { title: '문의하기', path: '/contact' },
// ];

// 세로 네비게이션 컴포넌트 (Portal 사용)
const VerticalNavigation = ({ isOpen, onClose }: SideBarProps) => {
  const [navWidth, setNavWidth] = useState('w-80'); // 기본값
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updateNavWidth = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setNavWidth('w-[512px]');
      } else if (width >= 768) {
        setNavWidth('w-[430px]');
      } else if (width >= 575) {
        setNavWidth('w-[575px]');
      } else if (width >= 375) {
        setNavWidth('w-[375px]');
      } else {
        setNavWidth('w-full'); // 375px 미만에서는 전체 너비
      }
    };

    updateNavWidth();
    window.addEventListener('resize', updateNavWidth);
    return () => window.removeEventListener('resize', updateNavWidth);
  }, []);

  const toggleSection = (sectionPath: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionPath)) {
        newSet.delete(sectionPath);
      } else {
        newSet.add(sectionPath);
      }
      return newSet;
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 bg-black/85 z-[1001] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* 네비게이션 메뉴 */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-2xl z-[1002] transition-all duration-300 ease-in-out translate-x-0 ${navWidth}`}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-900" />
        </button>

        {/* 메뉴 컨텐츠 */}
        <div className="flex flex-col h-full px-8 py-16 overflow-y-auto">
          {menuData.map((section) => {
            const isExpanded = expandedSections.has(section.path);

            return (
              <div key={section.path} className="mb-6">
                {/* 대분류 (클릭 가능) */}
                <button
                  onClick={() => toggleSection(section.path)}
                  className="w-full text-left flex items-center justify-between py-3 hover:text-gray-700 transition-colors"
                >
                  <span className="text-[18px] font-semibold text-gray-900">{section.title}</span>
                  <span
                    className={`text-gray-500 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* 소분류 (아코디언) */}
                {isExpanded && (
                  <div className="ml-4 mt-2 space-y-3 animate-in slide-in-from-top-2 duration-200">
                    {section.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <MenuLink to={item.path} onClick={onClose}>
                          <span className="text-[16px] text-gray-700 hover:text-gray-900 transition-colors">
                            {item.label}
                          </span>
                        </MenuLink>
                      </div>
                    ))}
                  </div>
                )}

                {/* 구분선 (마지막 항목 제외) */}
                {section.path !== menuData[menuData.length - 1].path && (
                  <div className="w-full h-px bg-gray-200 mt-6" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>,
    document.body
  );
};

// 가로 모달 컴포넌트
const HorizontalModal = ({ isOpen, onClose }: SideBarProps) => (
  <Dialog open={isOpen} onOpenChange={(v) => (v ? undefined : onClose())}>
    <DialogOverlay className="fixed top-0 left-0 right-0 bottom-0 bg-black/85 z-[1001]" />
    <DialogContent
      className="max-w-[1200px] xl:max-w-[1300px] h-[400px] xl:h-[500px] rounded-[30px] p-0 border-0 shadow-2xl bg-white mx-auto mt-8"
      hideCloseButton
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-3 right-4 w-12 h-12 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors z-10"
      >
        <X className="w-6 h-6 text-gray-900" />
      </button>

      {/* 메뉴 컨텐츠 */}
      <div className="h-full pl-16 pr-20 xl:pl-20 xl:pr-24">
        <div className="flex h-full justify-start gap-8 xl:gap-12">
          {menuData.map((section) => (
            <div
              key={section.path}
              className={`flex flex-col items-center ${
                section.hasBorder ? 'border-l border-gray-200' : ''
              } ${section.width} ${
                section.path === '/contact' ? 'justify-between' : 'justify-start'
              } pt-6 xl:pt-8 ${section.hasBorder ? 'pl-8 xl:pl-10' : 'pr-3 xl:pr-4'}`}
            >
              <div className="flex flex-col items-center">
                <MenuLink to={section.path} isTitle onClick={onClose}>
                  {section.title}
                </MenuLink>
                <div className="text-center pt-6 xl:pt-8 space-y-4 xl:space-y-5">
                  {section.items.map((item, itemIndex) => (
                    <MenuLink key={itemIndex} to={item.path} onClick={onClose}>
                      {item.label}
                    </MenuLink>
                  ))}
                </div>
              </div>

              {/* 문의하기 섹션에만 이미지 추가 */}
              {section.path === '/member/contact' && (
                <div className="mb-6 xl:mb-8 ml-12 xl:ml-16 w-[160px] h-[160px] xl:w-[200px] xl:h-[200px] bg-transparent rounded-lg">
                  <img src={CharacterImg} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const [isVerticalLayout, setIsVerticalLayout] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsVerticalLayout(window.innerWidth < 1024); // lg: 1024px
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isVerticalLayout ? (
        <VerticalNavigation isOpen={isOpen} onClose={onClose} />
      ) : (
        <HorizontalModal isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
}
