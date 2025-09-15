import { useState } from 'react';
import { type Cafe27bProps } from '@/types/components';

const Cafe27b = ({
  mainImages = [],
  menuItems = [],
  productItems = [],
  cateringServices = [],
  mobileCafeServices = [],
}: Cafe27bProps) => {
  const [currentMenuPage, setCurrentMenuPage] = useState(0);
  const [currentProductPage, setCurrentProductPage] = useState(0);
  const [currentMainImage, setCurrentMainImage] = useState(0);

  const itemsPerPage = 3;
  const productItemsPerPage = 5;
  const totalMenuPages = Math.ceil(menuItems.length / itemsPerPage);
  const totalProductPages = Math.ceil(productItems.length / productItemsPerPage);

  const nextMainImage = () => {
    setCurrentMainImage((prev) => (prev + 1) % mainImages.length);
  };

  const prevMainImage = () => {
    setCurrentMainImage((prev) => (prev - 1 + mainImages.length) % mainImages.length);
  };

  const nextMenuPage = () => {
    setCurrentMenuPage((prev) => (prev + 1) % totalMenuPages);
  };

  const prevMenuPage = () => {
    setCurrentMenuPage((prev) => (prev - 1 + totalMenuPages) % totalMenuPages);
  };

  const nextProductPage = () => {
    setCurrentProductPage((prev) => (prev + 1) % totalProductPages);
  };

  const prevProductPage = () => {
    setCurrentProductPage((prev) => (prev - 1 + totalProductPages) % totalProductPages);
  };

  return (
    <div className="w-full py-8">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">카페27b</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto px-4">
          카페27b는 화전마음의 도시재생 거점공간이자, 우주·드론·항공대 콘셉트가 어우러진 특별한 마을
          카페입니다. 누구에게나 열린 이곳은 커피 한 잔 너머로 주민의 대화가 시작되고, 다양한 실험과
          협업이 이뤄지는 복합문화 공간이기도 합니다.
        </p>
      </div>

      {/* 메인 이미지 캐러셀 */}
      <div className="mb-16 max-w-5xl mx-auto">
        <div className="relative flex items-center">
          {/* 좌측 화살표 */}
          <button
            onClick={prevMainImage}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
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
          <div className="w-full bg-gray-200 rounded-lg h-64 sm:h-80 flex items-center justify-center">
            <span className="text-gray-500 text-lg">{mainImages[currentMainImage].name}</span>
          </div>

          {/* 우측 화살표 */}
          <button
            onClick={nextMainImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
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
          {mainImages.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentMainImage ? 'bg-blue-600' : 'bg-gray-400'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* 카페 메뉴 */}
      <div className="w-full mb-16 bg-[#E8E4DB80] p-8">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">카페 메뉴</h3>
          <h4 className="text-lg sm:text-xl text-gray-700 mb-8">카페메뉴</h4>

          <div className="relative">
            {/* 좌우 화살표 */}
            <button
              onClick={prevMenuPage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
            >
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={nextMenuPage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
            >
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* 메뉴 카드들 */}
            <div className="flex justify-center space-x-6 px-12">
              {menuItems
                .slice(currentMenuPage * itemsPerPage, (currentMenuPage + 1) * itemsPerPage)
                .map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-56">
                    <div className="bg-gray-200 rounded-lg h-56 flex items-center justify-center mb-3">
                      <span className="text-gray-500 text-lg">이미지</span>
                    </div>
                    <p className="text-center text-sm font-medium text-gray-900">{item.name}</p>
                  </div>
                ))}
            </div>

            {/* 페이지네이션 점 */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalMenuPages }, (_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentMenuPage ? 'bg-blue-600' : 'bg-gray-400'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 케이터링 서비스 안내 */}
      <div className="mb-16 max-w-5xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">케이터링 서비스 안내</h3>
        <h4 className="text-lg sm:text-xl text-gray-700 mb-8">케이터링 서비스 안내</h4>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          {cateringServices.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center mb-3">
                <span className="text-gray-500 text-sm">이미지</span>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900 mb-1">{service.title}</p>
                <p className="text-xs text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed text-center">
            조합의 행사, 회의, 주민모임 등을 위해 카페27b는 자체 케이터링 서비스를 운영하고
            있습니다. 로컬푸드, 제철 재료, 건강한 간식으로 구성된 메뉴는 사전 예약을 통해
            커스터마이징할 수 있습니다.
          </p>
        </div>
      </div>

      {/* 이동카페 서비스 안내 */}
      <div className="w-full mb-16 bg-[#E8E4DB80] p-8">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            이동카페 서비스 안내
          </h3>
          <h4 className="text-lg sm:text-xl text-gray-700 mb-8">이동 카페 서비스 안내</h4>

          <div className="grid grid-cols-2 gap-4 max-w-5xl mx-auto mb-6">
            {mobileCafeServices.map((service) => (
              <div
                key={service.id}
                className={`rounded-lg h-56 flex items-center justify-center ${
                  service.isTextCard ? 'bg-orange-100 p-6' : 'bg-gray-200'
                }`}
              >
                {service.isTextCard ? (
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 mb-2">{service.title}</p>
                    <p className="text-xs text-gray-600">{service.description}</p>
                  </div>
                ) : (
                  <span className="text-gray-500 text-lg">이미지</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 판매 상품 소개 */}
      <div className="mb-16 max-w-5xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">판매 상품 소개</h3>
        <h4 className="text-lg sm:text-xl text-gray-700 mb-8">판매상품 소개</h4>

        <div className="relative">
          {/* 좌우 화살표 */}
          <button
            onClick={prevProductPage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
          >
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={nextProductPage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white bg-opacity-50 rounded-full flex items-center justify-center hover:bg-opacity-70 z-10"
          >
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* 상품 카드들 */}
          <div className="flex justify-center space-x-4 px-12">
            {productItems
              .slice(
                currentProductPage * productItemsPerPage,
                (currentProductPage + 1) * productItemsPerPage
              )
              .map((item) => (
                <div key={item.id} className="flex-shrink-0 w-40">
                  <div className="bg-gray-200 rounded-lg h-40 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">이미지</span>
                  </div>
                </div>
              ))}
          </div>

          {/* 페이지네이션 점 */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalProductPages }, (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentProductPage ? 'bg-blue-600' : 'bg-gray-400'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cafe27b;
