// import type { HeroProps } from '@/types/components/main';

// export default function Hero({
//   refEl,
//   src,
//   title,
//   subtitle,
//   heightVh = 40,
//   progress = 0,
// }: HeroProps) {
//   // 진행도 기반 효과
//   const translateY = progress * 30; // 아래로 0~30px
//   const opacity = 1 - progress * 0.6; // 1 → 0.4

//   return (
//     <header ref={refEl} className="relative w-full">
//       <div className="relative overflow-hidden rounded-b-[50px] sm:rounded-b-[75px] md:rounded-b-[100px] lg:rounded-b-[125px] xl:rounded-b-[150px]">
//         {/* 배경 이미지 */}
//         <div
//           className="absolute inset-0 will-change-transform"
//           style={{ transform: `translateY(${translateY}px)`, opacity }}
//         >
//           <img
//             src={src}
//             alt={title}
//             className="w-full h-full object-cover"
//             style={{ height: `${heightVh}vh` }}
//           />
//         </div>

//         {/* 카피/버튼 영역 */}
//         <div
//           className="relative z-10 flex items-end justify-center sm:justify-start px-2 sm:pl-8 md:pl-16 lg:pl-32 pb-4 sm:pb-10"
//           style={{ height: `${heightVh}vh` }}
//         >
//           <div className="pb-4 sm:pb-10 text-white drop-shadow text-center sm:text-left max-w-xs sm:max-w-none">
//             <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
//               {title}
//             </h1>
//             {subtitle && (
//               <p className="mt-2 sm:mt-3 text-xs sm:text-base md:text-lg opacity-90">{subtitle}</p>
//             )}
//             <button className="mt-2 sm:mt-3 text-xs sm:text-base md:text-lg bg-white text-black px-2 sm:px-4 py-1.5 sm:py-2 w-24 sm:w-40 md:w-48 rounded-full">
//               자세히 보기
//             </button>
//           </div>
//         </div>

//         {/* 왼쪽 화살표 버튼 */}
//         <button className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 z-20">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//         </button>

//         {/* 오른쪽 화살표 버튼 */}
//         <button className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 z-20">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>
//     </header>
//   );
// }

import logo from '@/assets/logo.svg';
import logoSpring from '@/assets/logo-spring.svg';
import logoFall from '@/assets/logo-fall.svg';
import logoWinter from '@/assets/logo-winter.svg';

type HeroProps = {
  title?: string;
  subtitle?: string;
  route?: string;
};

export default function Hero({ title, subtitle, route }: HeroProps = {} as HeroProps) {
  // route에 따른 로고와 배경색 선택
  const getLogoAndBgColor = () => {
    const currentRoute = route?.split('?')[0]; // query string 제거

    // 조합소개(기업 소개), 소식과 자료: spring 로고 + 핑크 레드 배경
    if (currentRoute === '/member/combination' || currentRoute === '/member/news') {
      return { logo: logoSpring, bgColor: '#F3716D' };
    }
    // 사업안내, 참여하기: fall 로고 + 주황 배경
    if (currentRoute === '/member/business' || currentRoute === '/member/participate') {
      return { logo: logoFall, bgColor: '#DF6D27' };
    }
    // 카페27b, 문의하기: winter 로고 + 회색 배경
    if (currentRoute === '/member/cafe27b' || currentRoute === '/member/contact') {
      return { logo: logoWinter, bgColor: '#717795' };
    }
    // 기본: 기본 로고 + 청록색 배경
    return { logo: logo, bgColor: '#00ACCD' };
  };

  const { logo: selectedLogo, bgColor } = getLogoAndBgColor();

  return (
    <div className="mt-15 xs:mt-18 sm:mt-20 md:mt-20 lg:mt-25 xl:mt-25 2xl:mt-25">
      {/* Header 높이만큼 상단 공백을 가진 Hero 컴포넌트 */}
      <div className="flex w-full overflow-hidden rounded-br-[50px] rounded-bl-[50px] sm:rounded-br-[75px] sm:rounded-bl-[75px] md:rounded-br-[100px] md:rounded-bl-[100px] lg:rounded-br-[125px] lg:rounded-bl-[125px] xl:rounded-br-[150px] xl:rounded-bl-[150px]">
        {/* 왼쪽 4/5: 단색 div + 텍스트 */}
        <div
          className="w-4/5 h-[200px] sm:h-[240px] lg:h-[280px] flex items-center px-6 sm:px-8 md:px-12 lg:px-16"
          style={{ backgroundColor: bgColor }}
        >
          <div className="text-white">
            {title && (
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight drop-shadow">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg lg:text-xl opacity-90">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* 오른쪽 1/5: 하얀색 배경 위에 로고 */}
        <div className="w-1/5 h-[200px] sm:h-[240px] lg:h-[280px] bg-white overflow-hidden">
          <img src={selectedLogo} alt="화전마을 로고" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
