import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LocationSection() {
  return (
    <section
      className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 bg-[#F6F5FA] -mx-4 xs:-mx-5 sm:-mx-6 md:-mx-8 lg:-mx-10 xl:-mx-12 2xl:-mx-16 px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-10 xs:py-12 sm:py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24"
      style={{ borderRadius: '0px 200px 0px 0px' }}
    >
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 text-center">
          오시는 길
        </h2>
        <p className="mt-1 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-500 text-center">
          아래의 위치 정보를 참고하여 방문해주시기 바랍니다.
        </p>

        <div className="mt-6 xs:mt-7 sm:mt-8 md:mt-8 lg:mt-9 xl:mt-10 2xl:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 max-w-4xl mx-auto">
          {/* 왼쪽: 지도 */}
          <div className="bg-gray-200 rounded-xl aspect-[16/9] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-lg font-medium mb-2">지도</div>
              <div className="text-sm">1920 × 1106</div>
            </div>
          </div>

          {/* 오른쪽: 연락처 정보 */}
          <div className="bg-white rounded-xl p-6 xs:p-7 sm:p-8 shadow-sm border border-gray-100">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900">경기 고양시 덕양구 화랑로 31층</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900">02-3158-3001</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900">hhh@aaa.com</span>
              </div>
            </div>
            <Button className="w-full mt-6 bg-[#2B2A4C] hover:bg-[#262544]">자세히 보기</Button>
          </div>
        </div>
      </div>

      {/* 우측 플로팅 버튼들 */}
      <div className="fixed right-4 bottom-4 flex flex-col gap-3 z-50">
        <button className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors">
          ↑
        </button>
        <button className="w-12 h-12 bg-[#2B2A4C] rounded-full flex flex-col items-center justify-center text-white hover:bg-[#262544] transition-colors text-xs">
          <span className="text-lg">🌐</span>
          <span>문의하기</span>
        </button>
      </div>
    </section>
  );
}
