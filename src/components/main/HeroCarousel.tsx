import { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

function HeroCarousel() {
  const [idx, setIdx] = useState(0);

  const slides = [
    {
      src: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1600&auto=format&fit=crop',
      title: '마을카페 소개',
      desc: '화전동 주민이 함께 운영하는 커뮤니티 카페',
    },
    {
      src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1600&auto=format&fit=crop',
      title: '협동조합 소식',
      desc: '행사·모집·알림 등 최신 소식 모아보기',
    },
    {
      src: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1600&auto=format&fit=crop',
      title: '마을카페 소개',
      desc: '화전동 주민이 함께 운영하는 커뮤니티 카페',
    },
    {
      src: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1600&auto=format&fit=crop',
      title: '협동조합 소식',
      desc: '행사·모집·알림 등 최신 소식 모아보기',
    },
  ];

  return (
    <section className="relative mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 bg-[#EEEAF4] p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 2xl:p-10 -mx-4 xs:-mx-5 sm:-mx-6 md:-mx-8 lg:-mx-10 xl:-mx-12 2xl:-mx-16">
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <h3 className="text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-semibold text-gray-900">
          제목 -
        </h3>
        <p className="mt-1 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-500">
          화전동 주민이 만드는 마을의 힘
        </p>

        <div className="relative mt-3 xs:mt-4 sm:mt-4 md:mt-4 lg:mt-5 xl:mt-6 2xl:mt-8">
          <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
            {/* 캐러셀 컨테이너 */}
            <div className="relative flex items-center justify-center">
              {/* 이전 이미지 (왼쪽에 살짝 보임) */}
              <div className="absolute left-0 z-10 w-1/2 opacity-40">
                <div className="aspect-[16/6] w-full overflow-hidden rounded-xl">
                  <img
                    src={slides[(idx - 1 + slides.length) % slides.length].src}
                    alt="이전 슬라이드"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* 현재 이미지 (메인) */}
              <div className="relative z-20 w-full max-w-4xl">
                <div className="aspect-[16/6] w-full overflow-hidden rounded-xl">
                  <img
                    src={slides[idx].src}
                    alt="현재 슬라이드"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* 다음 이미지 (오른쪽에 살짝 보임) */}
              <div className="absolute right-0 z-10 w-1/2 opacity-40">
                <div className="aspect-[16/6] w-full overflow-hidden rounded-xl">
                  <img
                    src={slides[(idx + 1) % slides.length].src}
                    alt="다음 슬라이드"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* 좌우 이동 버튼 */}
              <div className="absolute bottom-3 right-3 flex gap-2 z-30">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIdx((v) => (v - 1 + slides.length) % slides.length)}
                >
                  ←
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIdx((v) => (v + 1) % slides.length)}
                >
                  →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 오버레이 카드 - 이미지 위에 표시 */}
      <div
        className="absolute left-1/3 bottom-3 transform -translate-x-1/2 w-80 bg-white p-6 shadow-lg z-50"
        style={{ borderRadius: '4px 48px 4px 48px' }}
      >
        <div className="text-lg font-semibold text-gray-900">{slides[idx].title}</div>
        <p className="mt-2 text-sm text-gray-600">{slides[idx].desc}</p>
        <div className="mt-6 flex justify-end">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-3xl hover:text-gray-500 transition-colors">
            →
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCarousel;
