import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function CTABanner() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
      <section className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 mb-10 xs:mb-12 sm:mb-14 md:mb-16 lg:mb-18 xl:mb-20 2xl:mb-24">
        <div
          className="relative rounded-[20px] w-full h-[200px] overflow-hidden flex items-center px-16 xs:px-18 sm:px-20 md:px-22 lg:px-24 xl:px-26 2xl:px-28"
          style={{
            background:
              'linear-gradient(132deg, rgba(30, 34, 53, 1) 0%, rgba(90, 76, 147, 1) 50%, rgba(212, 198, 241, 1) 100%)',
          }}
        >
          {/* 별가루 배경 이미지 (선택사항) */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent rounded-[20px]"></div>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            {/* 왼쪽: 메인 텍스트 */}
            <div className="flex-1 max-w-2xl">
              <h2 className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-white leading-tight whitespace-nowrap">
                화전마을의 일원이 되어 함께하고 싶다면?
              </h2>
            </div>

            {/* 오른쪽: 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-3.5">
              {/* 참여하기 버튼 */}
              <Button
                onClick={() => navigate('/member/participate')}
                size="lg"
                className="w-[120px] h-[40px] bg-[#2C2E5A] text-white hover:bg-[#262544] rounded-[150px] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal border-2 border-transparent hover:border-white/20 transition-all duration-300 overflow-hidden"
                style={{
                  borderRadius: '150px',
                  borderImage: 'none',
                  background:
                    'linear-gradient(90deg, rgba(44, 46, 90, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                  backgroundClip: 'padding-box',
                  position: 'relative',
                }}
              >
                <div className="absolute inset-0 rounded-[150px] bg-[#2C2E5A] m-0.5"></div>
                <span className="relative z-10 text-lg">참여하기</span>
              </Button>

              {/* 후원/기부 버튼 */}
              <Button
                onClick={() => navigate('/member/participate?tab=donation')}
                size="lg"
                className="w-[120px] h-[40px] bg-[#2C2E5A] text-white hover:bg-[#262544] rounded-[150px] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal border-2 border-transparent hover:border-white/20 transition-all duration-300 overflow-hidden"
                style={{
                  borderRadius: '150px',
                  borderImage: 'none',
                  background:
                    'linear-gradient(90deg, rgba(44, 46, 90, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                  backgroundClip: 'padding-box',
                  position: 'relative',
                }}
              >
                <div className="absolute inset-0 rounded-[150px] bg-[#2C2E5A] m-0.5"></div>
                <span className="relative z-10 text-lg">후원/기부</span>
              </Button>

              {/* 문의하기 버튼 */}
              <Button
                onClick={() => navigate('/member/contact')}
                size="lg"
                className="w-[120px] h-[40px] bg-[#2C2E5A] text-white hover:bg-[#262544] rounded-[150px] text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal border-2 border-transparent hover:border-white/20 transition-all duration-300 overflow-hidden"
                style={{
                  borderRadius: '150px',
                  borderImage: 'none',
                  background:
                    'linear-gradient(90deg, rgba(44, 46, 90, 1) 0%, rgba(255, 255, 255, 1) 100%)',
                  backgroundClip: 'padding-box',
                  position: 'relative',
                }}
              >
                <div className="absolute inset-0 rounded-[150px] bg-[#2C2E5A] m-0.5"></div>
                <span className="relative z-10 text-lg">문의하기</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
