import { useState } from 'react';
import { type LocalActivationProps } from '@/types/components';

const LocalActivation = ({
  eventImages = [],
  communityProjects = [],
  educationMethods = [],
  educationSummary = '',
}: LocalActivationProps) => {
  const [currentEventImage, setCurrentEventImage] = useState(0);

  const nextEventImage = () => {
    setCurrentEventImage((prev) => (prev + 1) % eventImages.length);
  };

  const prevEventImage = () => {
    setCurrentEventImage((prev) => (prev - 1 + eventImages.length) % eventImages.length);
  };

  return (
    <div className="w-full py-8">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">지역 활성화 사업</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
      </div>

      {/* 지역 공동체 행사 */}
      <div className="mb-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              지역 공동체 행사
            </h3>
            <p className="text-sm sm:text-base text-gray-600">지역 공동체 행사</p>
          </div>
          <div className="relative">
            {/* 좌측 화살표 */}
            <button
              onClick={prevEventImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-8 h-8 rounded-full flex items-center justify-center z-10"
              style={{ backgroundColor: '#1e3a8a' }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* 메인 이미지 */}
            <div className="relative w-full bg-gray-200 rounded-lg h-64 sm:h-80 flex items-center justify-center">
              <span className="text-gray-500 text-lg">{eventImages[currentEventImage].name}</span>
            </div>

            {/* 오버레이 텍스트 */}
            <div className="absolute -bottom-6 sm:-bottom-8 lg:-bottom-10 -right-1 sm:-right-2 lg:-right-3 bg-white rounded-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-lg w-64 sm:w-80 md:w-96 lg:w-[448px] xl:w-[512px] h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40">
              <div className="flex items-center justify-center h-full">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-gray-800">
                  지역 공동체 행사
                </span>
              </div>
            </div>

            {/* 우측 화살표 */}
            <button
              onClick={nextEventImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-8 h-8 rounded-full flex items-center justify-center z-10"
              style={{ backgroundColor: '#1e3a8a' }}
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 지역과 함께하는 사업 */}
      <div className="mb-16" style={{ backgroundColor: '#A692D11A' }}>
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              지역과 함께하는 사업
            </h3>
            <p className="text-sm sm:text-base text-gray-600">지역과 함께 하는 사업</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg p-8 flex items-center space-x-6"
                style={{ backgroundColor: '#2C2E5A80' }}
              >
                <div className="w-20 h-20 bg-gray-300 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-sm text-gray-600">아이콘</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-medium text-gray-800 mb-2">{project.title}</h4>
                  <p className="text-base text-gray-600 mb-1">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 주민 역량 강화 교육 */}
      <div className="mb-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              주민 역량 강화 교육
            </h3>
            <p className="text-sm sm:text-base text-gray-600">주민 역량 강화 교육</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 이미지 영역 */}
            <div className="bg-gray-200 rounded-lg h-64 sm:h-80 flex items-center justify-center">
              <span className="text-gray-500 text-lg">이미지</span>
            </div>

            {/* 텍스트 영역 */}
            <div className="flex flex-col justify-between h-64 sm:h-80">
              {educationMethods.map((method, index) => (
                <div key={method.id} className={index < educationMethods.length - 1 ? 'mb-4' : ''}>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{method.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{method.description}</p>
                </div>
              ))}

              {educationSummary && (
                <div>
                  <p className="text-sm text-gray-600 leading-relaxed">{educationSummary}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalActivation;
