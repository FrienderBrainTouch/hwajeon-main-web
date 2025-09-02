type Props = {
  refEl?: React.RefObject<HTMLDivElement>;
  src: string;
  title: string;
  subtitle?: string;
  heightVh?: number; // 히어로 높이 (vh)
  progress?: number; // 0~1 (스크롤 진행도)
};

export default function Hero({ refEl, src, title, subtitle, heightVh = 40, progress = 0 }: Props) {
  // 진행도 기반 효과
  const translateY = progress * 30; // 아래로 0~30px
  const opacity = 1 - progress * 0.6; // 1 → 0.4

  return (
    <header ref={refEl} className="relative w-full">
      <div className="relative overflow-hidden rounded-b-[150px]">
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
          className="relative z-10 flex items-end pl-32 pb-10"
          style={{ height: `${heightVh}vh` }}
        >
          <div className="pb-10 text-white drop-shadow">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">{title}</h1>
            {subtitle && <p className="mt-3 text-base md:text-lg opacity-90">{subtitle}</p>}
            <button className="mt-3 text-base md:text-lg bg-white text-black px-4 py-2 w-48 rounded-full">
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
