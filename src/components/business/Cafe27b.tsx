import { useState } from 'react';
import cafe27b_1 from '@/assets/cafe27b/cafe27b_1.jpg';
import cafe27b_2 from '@/assets/cafe27b/cafe27b_2.jpg';
import cafe27b_3 from '@/assets/cafe27b/cafe27b_3.jpg';
import cafe27b_4 from '@/assets/fix/cafe-menu/menu_ade.png';
import cafe27b_5 from '@/assets/fix/cafe-menu/menu_mango.png';
import cafe27b_6 from '@/assets/fix/cafe-menu/menu_sandwich.png';
import cafe27b_7 from '@/assets/fix/cafe-menu/menu_pasta.png';
import cafe27b_8 from '@/assets/cafe27b/cafe27b_8.jpg';
import cafe27b_9 from '@/assets/cafe27b/cafe27b_9.jpg';
import cafe27b_10 from '@/assets/cafe27b/cafe27b_10.jpg';
import cafe27b_11 from '@/assets/cafe27b/cafe27b_11.jpg';
import cafe27b_12 from '@/assets/fix/space-rental/space_terrace.png';
import cafe27b_13 from '@/assets/fix/space-rental/space_interior.png';
import cafe27b_14 from '@/assets/fix/space-rental/space_meeting.png';

const Cafe27b = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // 카페 27b 캐러셀 이미지 (1~3)
  const carouselImages = [cafe27b_1, cafe27b_2, cafe27b_3];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="w-full py-8">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">카페 27b</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto px-4">
          카페 27b는 화전마음의 도시재생 거점공간이자, 우주·드론·항공대 콘셉트가 어우러진 특별한
          마을 카페입니다. 누구에게나 열린 이곳은 커피 한 잔 너머로 주민의 대화가 시작되고, 다양한
          실험과 협업이 이뤄지는 복합문화 공간이기도 합니다.
        </p>
      </div>

      {/* 메인 이미지 캐러셀 */}
      <div className="mb-16 max-w-5xl mx-auto">
        <div className="relative flex items-center">
          {/* 좌측 화살표 */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 z-10 shadow-md"
          >
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* 이미지 */}
          <div className="w-full rounded-lg h-64 sm:h-80 overflow-hidden">
            <img
              src={carouselImages[currentImage]}
              alt={`카페 27b 이미지 ${currentImage + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 우측 화살표 */}
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 z-10 shadow-md"
          >
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* 페이지네이션 점 */}
        <div className="flex justify-center mt-4 space-x-2">
          {carouselImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImage ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            ></div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="w-full mb-16 bg-[#E8E4DB80] p-8 rounded-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                로컬브랜딩(Local Branding)
              </h4>
              <p className="text-sm text-gray-600">지역의 이야기와 감성을 담은 공간</p>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                소셜커넥션(Social Connection)
              </h4>
              <p className="text-sm text-gray-600">사람과 사람, 브랜드와 지역을 잇는 허브</p>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                지속가능성(Sustainability)
              </h4>
              <p className="text-sm text-gray-600">친환경, 공정, 지역 순환을 실천하는 카페</p>
            </div>
          </div>
        </div>
      </div>

      {/* 27b Signature & Menu */}
      <div className="mb-16 max-w-5xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">27b Signature & Menu</h3>
        <p className="text-base text-gray-600 mb-8 leading-relaxed">
          '로컬에서 만나는 스페이스 감성'을 주제로,
          <br />
          클래식 메뉴에 창의적 콘셉트를 더한 시그니처 메뉴 라인 제공
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          <div className="rounded-lg h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
            <img src={cafe27b_4} alt="시그니처 1" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
            <img src={cafe27b_5} alt="시그니처 2" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
            <img src={cafe27b_6} alt="시그니처 3" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
            <img src={cafe27b_7} alt="시그니처 4" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* The Store at 27b */}
      <div className="w-full mb-16 bg-[#E8E4DB80] p-8">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">The Store at 27b</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div>
              <div className="rounded-lg h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden mb-3 sm:mb-4">
                <img src={cafe27b_8} alt="생활용품 코너" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                생활용품 코너
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">어르신 제작 생활소품</p>
            </div>

            <div>
              <div className="rounded-lg h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden mb-3 sm:mb-4">
                <img src={cafe27b_9} alt="로컬 굿즈존" className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                로컬 굿즈존
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                지역 작가·주민이 만든 핸드메이드 제품
              </p>
            </div>

            <div>
              <div className="rounded-lg h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden mb-3 sm:mb-4">
                <img
                  src={cafe27b_10}
                  alt="27b 캐릭터 상품"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                27b 캐릭터 상품
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">
                드론캐릭터 드뿡이, 화전 캐릭터 화랑이 굿즈 상품
              </p>
            </div>

            <div>
              <div className="rounded-lg h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden mb-3 sm:mb-4">
                <img
                  src={cafe27b_11}
                  alt="우주항공 팬시류"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                우주항공 팬시류
              </h4>
              <p className="text-xs sm:text-sm text-gray-600">드론·항공 테마의 굿즈</p>
            </div>
          </div>
        </div>
      </div>

      {/* 공간 대관 서비스 */}
      <div className="mb-16 max-w-5xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">공간 대관 서비스</h3>
        <p className="text-base text-gray-600 mb-8 leading-relaxed">
          Café 27b는 교육·회의·전시·촬영 등 다양한 목적의 소규모 대관 제공
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6">
          <div className="rounded-lg aspect-square overflow-hidden">
            <img src={cafe27b_12} alt="공간 대관 이미지 1" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg aspect-square overflow-hidden">
            <img src={cafe27b_13} alt="공간 대관 이미지 2" className="w-full h-full object-cover" />
          </div>
          <div className="rounded-lg aspect-square overflow-hidden sm:col-span-2 lg:col-span-1">
            <img src={cafe27b_14} alt="공간 대관 이미지 3" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">대관 시간</h4>
          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              <span className="font-medium">주중:</span> 14:00–20:00
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">공휴일:</span> 08:00–20:00
            </p>
            <p className="text-sm text-gray-600 italic">(시간 협의 가능)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cafe27b;
