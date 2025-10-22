import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CTABanner() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
      <section className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 mb-10 xs:mb-12 sm:mb-14 md:mb-16 lg:mb-18 xl:mb-20 2xl:mb-24">
        <div
          className="relative rounded-[20px] w-full h-[200px] sm:h-[180px] md:h-[200px] overflow-hidden flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24"
          style={{
            background:
              'linear-gradient(132deg, rgba(30, 34, 53, 1) 0%, rgba(90, 76, 147, 1) 50%, rgba(212, 198, 241, 1) 100%)',
          }}
        >
          {/* 별가루 배경 이미지 (선택사항) */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-[20px]"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center gap-4 sm:gap-6 w-full">
            {/* 메인 텍스트 */}
            <div className="text-center">
              <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-white leading-tight">
                화전마을의 일원이 되어 함께하고 싶다면?
              </h2>
            </div>

            {/* 버튼들 */}
            <div className="flex flex-col justify-center items-center sm:flex-row gap-2 sm:gap-3 w-full max-w-sm sm:max-w-none">
              {/* 참여하기 버튼 */}
              <Button
                onClick={() => navigate('/member/participate')}
                size="sm"
                className="w-full sm:w-[100px] md:w-[120px] h-[36px] sm:h-[40px] bg-[#2C2E5A] text-white hover:bg-[#262544] rounded-[150px] text-sm font-medium border-2 border-transparent hover:border-white/20 transition-all duration-300"
              >
                참여하기
              </Button>

              {/* 후원/기부 버튼 */}
              <Button
                onClick={() => navigate('/member/participate?tab=donation')}
                size="sm"
                className="w-full sm:w-[100px] md:w-[120px] h-[36px] sm:h-[40px] bg-[#2C2E5A] text-white hover:bg-[#262544] rounded-[150px] text-sm font-medium border-2 border-transparent hover:border-white/20 transition-all duration-300"
              >
                후원/기부
              </Button>

              {/* 문의하기 버튼 */}
              <Button
                onClick={() => navigate('/member/contact')}
                size="sm"
                className="w-full sm:w-[100px] md:w-[120px] h-[36px] sm:h-[40px] bg-[#2C2E5A] text-white hover:bg-[#262544] rounded-[150px] text-sm font-medium border-2 border-transparent hover:border-white/20 transition-all duration-300"
              >
                문의하기
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
