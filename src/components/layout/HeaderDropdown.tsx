// import { useState } from 'react';
import { Link } from 'react-router-dom';
import IntroIcon from '@/assets/intro_icon.svg';
import BusinessIcon from '@/assets/business_icon.svg';
import NewsIcon from '@/assets/news_icon.svg';
import JoinIcon from '@/assets/join_icon.svg';
import ContactIcon from '@/assets/contact_icon.svg';

interface HeaderDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  headerHeight: number;
  selectedCategory: string | null;
}

// 메뉴 데이터
const menuData = [
  {
    title: '조합 소개',
    path: '/member/combination',
    description: '다양한 생각이 하나로 모이는 우리 조합의 이야기',
    items: [
      { label: '인사말', path: '/member/combination?tab=greeting' },
      { label: '미션 &비전', path: '/member/combination?tab=mission' },
      { label: '연혁', path: '/member/combination?tab=history' },
      { label: '조직도', path: '/member/combination?tab=organization' },
      { label: '화전 이야기', path: '/member/combination?tab=story' },
    ],
    hasImage: true,
    image: IntroIcon,
    rightPanelWidth: 'w-[200px]',
  },
  {
    title: '사업 안내',
    path: '/member/business',
    description: '지역의 공간, 사람, 문화를 연결하는 실천 사업을 운영합니다',
    items: [
      { label: '도시재생 거점공간 운영 사업', path: '/member/business?tab=urban-regeneration' },
      { label: '행사 기획 및 교육 체험 사업', path: '/member/business?tab=events-education' },
      { label: '카페27b', path: '/member/business?tab=cafe27b' },
      { label: '지역 활성화 사업', path: '/member/business?tab=local-activation' },
    ],
    hasImage: true,
    image: BusinessIcon,
    rightPanelWidth: 'w-[300px]',
  },
  {
    title: '소식과 자료',
    path: '/member/news?tab=news',
    description: '화전마을의 최신 소식과 유용한 자료를 확인하세요',
    items: [
      { label: '공지사항', path: '/member/news?tab=notice' },
      { label: '화전 소식', path: '/member/news?tab=news' },
      { label: '활동 갤러리', path: '/member/news?tab=gallery' },
      { label: '행사 캘린더', path: '/member/news?tab=calendar' },
      { label: '자료실', path: '/member/news?tab=archive' },
    ],
    hasImage: true,
    image: NewsIcon,
    rightPanelWidth: 'w-[280px]',
  },
  {
    title: '참여하기',
    path: '/member/participate?tab=membership',
    description: '화전마을과 함께 성장할 수 있는 다양한 방법을 알아보세요',
    items: [
      { label: '조합원 가입 안내', path: '/member/participate?tab=membership' },
      { label: '자원봉사 신청', path: '/member/participate?tab=volunteer' },
      { label: '정기회의 자료', path: '/member/participate?tab=meeting' },
      { label: '후원 & 기부 안내', path: '/member/participate?tab=donation' },
    ],
    hasImage: true,
    image: JoinIcon,
    rightPanelWidth: 'w-[250px]',
  },
  {
    title: '문의하기',
    path: '/member/contact',
    description: '궁금한 점이 있으시면 언제든 문의해 주세요',
    items: [
      { label: '간편 문의', path: '/member/contact?tab=inquiry' },
      { label: '오시는 길', path: '/member/contact?tab=location' },
    ],
    hasImage: true,
    image: ContactIcon,
    rightPanelWidth: 'w-[200px]',
  },
];

// 왼쪽 패널 컴포넌트
const LeftPanel = ({ section, onClose }: { section: any; onClose: () => void }) => (
  <>
    {/* 1024px 이상: 기존 보라색 패널 */}
    <div className="hidden lg:block w-[400px] xl:w-[350px] bg-purple-100 px-8 py-12 xl:px-6 xl:py-10">
      <div className="flex flex-col h-full">
        {/* 텍스트 영역 - 왼쪽 상단 */}
        <div className="mb-8 xl:mb-6">
          <Link to={section.path} onClick={onClose}>
            <h2 className="text-2xl xl:text-xl font-bold text-gray-900 mb-3 xl:mb-2 hover:text-[#2B2A4C] transition-colors cursor-pointer">
              {section.title}
            </h2>
          </Link>
          <p className="text-base xl:text-sm text-gray-600 leading-relaxed">
            {section.description}
          </p>
        </div>

        {/* 이미지 영역 - 오른쪽 하단 */}
        {section.hasImage && section.image && (
          <div className="flex justify-end mt-auto">
            <div className="w-32 h-32 xl:w-28 xl:h-28">
              <img
                src={section.image}
                alt={`${section.title} 아이콘`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>

    {/* 1024px 미만: 세로 네비게이션 */}
    <div className="lg:hidden w-[200px] bg-white px-6 py-8 border-r border-gray-200 flex flex-col items-center">
      <div className="space-y-3 text-center">
        {section.items.map((item: any, index: number) => (
          <Link
            key={index}
            to={item.path}
            onClick={onClose}
            className="block text-base text-gray-700 hover:text-[#2B2A4C] transition-colors py-2"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  </>
);

// 오른쪽 패널 컴포넌트
const RightPanel = ({ section, onClose }: { section: any; onClose: () => void }) => (
  <>
    {/* 1024px 이상: 기존 오른쪽 패널 */}
    <div
      className={`hidden lg:block ${section.rightPanelWidth} bg-white px-8 py-12 xl:px-6 xl:py-10 border-r border-gray-200`}
    >
      <div className="space-y-4 xl:space-y-3">
        {section.items.map((item: any, index: number) => (
          <Link
            key={index}
            to={item.path}
            onClick={onClose}
            className="block text-lg xl:text-base text-gray-700 hover:text-[#2B2A4C] transition-colors py-2 xl:py-1"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>

    {/* 1024px 미만: 메인 콘텐츠 */}
    <div className="lg:hidden flex-1 bg-white px-8 py-8 flex flex-col items-center justify-center">
      <div className="flex flex-col h-full items-center text-center">
        <div className="mb-6">
          <Link to={section.path} onClick={onClose}>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-[#2B2A4C] transition-colors cursor-pointer">
              {section.title}
            </h2>
          </Link>
          <p className="text-base text-gray-600 leading-relaxed">{section.description}</p>
        </div>

        {section.hasImage && section.image && (
          <div className="flex justify-center mt-auto">
            <div className="w-24 h-24">
              <img
                src={section.image}
                alt={`${section.title} 아이콘`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);

export default function HeaderDropdown({
  isOpen,
  onClose,
  headerHeight,
  selectedCategory,
}: HeaderDropdownProps) {
  // const [_activeSection, _setActiveSection] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-[1001]">
      <div
        className="pointer-events-auto absolute left-0 right-0 bg-white shadow-2xl animate-in slide-in-from-top-2 duration-300 header-dropdown"
        style={{
          top: `${headerHeight - 1}px`,
          borderBottomLeftRadius: '50px',
          borderBottomRightRadius: '50px',
        }}
        onMouseEnter={() => {
          // 드롭다운 영역에 마우스가 들어오면 유지
        }}
        onMouseLeave={() => {
          // 드롭다운 영역에서 마우스가 벗어나면 닫기
          setTimeout(() => {
            onClose();
          }, 100);
        }}
      >
        <div className="relative rounded-bl-[50px] rounded-br-[50px] overflow-hidden">
          {selectedCategory &&
            menuData
              .filter((section) => section.title === selectedCategory)
              .map((section) => (
                <div key={section.path} className="flex">
                  <LeftPanel section={section} onClose={onClose} />
                  <RightPanel section={section} onClose={onClose} />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
