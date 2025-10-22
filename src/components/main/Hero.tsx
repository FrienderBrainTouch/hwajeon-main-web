import type { HeroProps } from '@/types/components/main';

export default function Hero({
  refEl,
  src,
  title,
  subtitle,
  heightVh = 40,
  progress = 0,
}: HeroProps) {
  // 진행도 기반 효과
  const translateY = progress * 30; // 아래로 0~30px
  const opacity = 1 - progress * 0.6; // 1 → 0.4

  return (
    <header ref={refEl} className="relative w-full">
      <div className="relative overflow-hidden rounded-b-[50px] sm:rounded-b-[75px] md:rounded-b-[100px] lg:rounded-b-[125px] xl:rounded-b-[150px]">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `translateY(${translateY}px)`, opacity }}
        >
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover"
            style={{ height: `${heightVh}vh` }}
          />
        </div>

        {/* 카피/버튼 영역 */}
        <div
          className="relative z-10 flex items-end justify-center sm:justify-start px-2 sm:pl-8 md:pl-16 lg:pl-32 pb-4 sm:pb-10"
          style={{ height: `${heightVh}vh` }}
        >
          <div className="pb-4 sm:pb-10 text-white drop-shadow text-center sm:text-left max-w-xs sm:max-w-none">
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 sm:mt-3 text-xs sm:text-base md:text-lg opacity-90">{subtitle}</p>
            )}
            <button className="mt-2 sm:mt-3 text-xs sm:text-base md:text-lg bg-white text-black px-2 sm:px-4 py-1.5 sm:py-2 w-24 sm:w-40 md:w-48 rounded-full">
              자세히 보기
            </button>
          </div>
        </div>

        {/* 왼쪽 화살표 버튼 */}
        <button className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 z-20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* 오른쪽 화살표 버튼 */}
        <button className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 z-20">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </header>
  );
}
