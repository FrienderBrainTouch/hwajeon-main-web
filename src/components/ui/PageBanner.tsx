import React from 'react';

type PageBannerProps = {
  title: string;
  bullets?: string[];
  logoSrc: string;
  patternSrc?: string;
  bgClass?: string; // 예: 'bg-[#09B3C1]' 혹은 'bg-orange-500'
  heightClass?: string; // 예: 'h-[200px] sm:h-[240px] lg:h-[280px]'
  className?: string;
};

/**
 * 페이지 상단 배너 (좌: 텍스트, 우: 패턴 + 로고)
 * - 배경색은 bgClass로, 높이는 heightClass로 제어
 */
const PageBanner: React.FC<PageBannerProps> = ({
  title,
  bullets = [],
  logoSrc,
  patternSrc,
  bgClass = 'bg-[#09B3C1]',
  heightClass = 'h-[200px] sm:h-[240px] lg:h-[280px]',
  className = '',
}) => {
  return (
    <div
      className={[
        'relative rounded-[20px] w-full overflow-hidden text-white',
        bgClass,
        heightClass,
        className,
      ].join(' ')}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
        {/* 좌측 텍스트 */}
        <div className="flex items-center px-6 sm:px-10">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold drop-shadow">{title}</h2>
            {bullets.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm sm:text-base opacity-95">
                {bullets.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 우측 패턴 + 로고 */}
        <div className="relative">
          {patternSrc && (
            <img
              src={patternSrc}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
          )}
          <img
            src={logoSrc}
            alt="로고"
            className="absolute right-6 bottom-6 w-20 sm:w-28 lg:w-36 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
