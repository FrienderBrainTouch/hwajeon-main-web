import { useEffect, useRef } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 카카오맵 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}

export default function LocationSection() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return; // container가 없으면 리턴

    const kakao = window.kakao;
    const container = mapRef.current;

    const options = {
      center: new kakao.maps.LatLng(37.6584, 126.832), // 경기 고양시 덕양구 화랑로 31층
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    // 마커 생성
    const markerPosition = new kakao.maps.LatLng(37.6584, 126.832);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      // title: '화전마을', // 마커에 마우스 올리면 표시되는 제목
    });

    // 마커를 지도에 표시
    marker.setMap(map);
  }, []);

  return (
    <section
      className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 bg-[#F6F5FA] px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-10 xs:py-12 sm:py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24"
      style={{ borderRadius: '0px 200px 0px 0px' }}
    >
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900 text-center">
          오시는 길
        </h2>
        <p className="mt-1 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-500 text-center">
          아래의 위치 정보를 참고하여 방문해 주시기 바랍니다.
        </p>

        <div className="mt-6 xs:mt-7 sm:mt-8 md:mt-8 lg:mt-9 xl:mt-10 2xl:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
          {/* 왼쪽: 지도 */}
          <div className="rounded-xl h-[264px] xs:h-[284px] sm:h-[364px] md:h-[398px] lg:aspect-[4/3] flex items-center justify-center overflow-hidden border border-gray-200 relative">
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} className="rounded-xl" />
          </div>

          {/* 오른쪽: 연락처 정보 */}
          <div className="bg-white rounded-xl p-6 xs:p-7 sm:p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <div className="space-y-4 text-center">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-black" />
                <span className="text-sm text-black">경기 고양시 덕양구 화랑로 3 1층</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-black" />
                <span className="text-sm text-black">02-3158-3001</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-black" />
                <span className="text-sm text-black">hhh@aaa.com</span>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button className="px-8 py-2 bg-[#2B2A4C] hover:bg-[#262544] text-white rounded-lg">
                자세히 보기
              </Button>
            </div>
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
