import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 이미지 import
import cafe27b_1 from '@/assets/cafe27b/cafe27b_1.jpg';
import cafe27b_2 from '@/assets/cafe27b/cafe27b_2.jpg';
import business_1 from '@/assets/business/1_27b-business_1.png';
import business_2 from '@/assets/business/2_contents-business_1.jpg';
import business_3 from '@/assets/business/3_village-care_1.jpg';

function HeroCarousel() {
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const slides = [
    {
      src: cafe27b_1,
      title: '화전마을 사회적협동조합',
      desc: '주민이 함께 만들어가는 마을공동체',
      link: '/member/combination',
    },
    {
      src: cafe27b_2,
      title: '카페 27b',
      desc: '로컬브랜딩과 소셜커넥션의 공간',
      link: '/member/cafe27b',
    },
    {
      src: business_1,
      title: '27b 사업',
      desc: '지역사회와 함께하는 사업',
      link: '/member/business?tab=27b-business',
    },
    {
      src: business_2,
      title: '콘텐츠 사업',
      desc: '창의적 콘텐츠로 지역 활성화',
      link: '/member/business?tab=contents-business',
    },
    {
      src: business_3,
      title: '마을돌봄사업',
      desc: '지역사회 돌봄과 상생의 가치',
      link: '/member/business?tab=village-care',
    },
  ];

  // 자동 슬라이드 기능
  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prevIdx) => (prevIdx + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // 터치 스와이프 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setIdx((v) => (v + 1) % slides.length);
    } else if (isRightSwipe) {
      setIdx((v) => (v - 1 + slides.length) % slides.length);
    }
  };

  return (
    <section className="relative mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 bg-[#EEEAF4]">
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-5 xs:py-6 sm:py-7 md:py-8 lg:py-9 xl:py-10 2xl:py-11">
        <h3 className="text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-semibold text-gray-900">
          기업 소개
        </h3>
        <p className="mt-1 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-500">
          주민이 함께 만들어가는 마을공동체
        </p>

        <div className="relative mt-3 xs:mt-4 sm:mt-4 md:mt-4 lg:mt-5 xl:mt-6 2xl:mt-8">
          <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
            {/* 캐러셀 컨테이너 */}
            <div
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* 슬라이드 이미지 */}
              <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                <img
                  src={slides[idx].src}
                  alt={slides[idx].title}
                  className="h-full w-full object-cover transition-opacity duration-500"
                />

                {/* 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

                {/* 텍스트 콘텐츠 */}
                <div className="absolute left-4 sm:left-6 md:left-8 lg:left-12 xl:left-16 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-12 xl:bottom-16 text-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 sm:mb-3 leading-tight">
                    {slides[idx].title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mb-4 sm:mb-6 leading-relaxed">
                    {slides[idx].desc}
                  </p>
                  <Button
                    size="sm"
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-4 py-2 text-xs sm:text-sm"
                    onClick={() => navigate(slides[idx].link)}
                  >
                    자세히 보기
                  </Button>
                </div>
              </div>

              {/* 네비게이션 버튼 - 모바일에서는 숨김 */}
              <Button
                variant="outline"
                size="icon"
                className="hidden sm:flex absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 shadow-lg w-10 h-10"
                onClick={() => setIdx((v) => (v - 1 + slides.length) % slides.length)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="hidden sm:flex absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 shadow-lg w-10 h-10"
                onClick={() => setIdx((v) => (v + 1) % slides.length)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* 인디케이터 도트 */}
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
                {slides.map((_, slideIdx) => (
                  <button
                    key={slideIdx}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      slideIdx === idx ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
                    }`}
                    onClick={() => setIdx(slideIdx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
