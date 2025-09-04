import React from 'react';

const MissionVision: React.FC = () => {
  return (
    <div className="py-8 px-4">
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">미션 & 비전</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
      </div>
      {/* 헤더 섹션 */}
      <div className="text-center mb-12 max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-xl font-normal mb-1">화전마을사회적협동조합은</h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl mx-auto">
          지역 주민이 주체가 되어 마을의 삶을 스스로 기획하고 실현하는 플랫폼을 구축하기 위해,
          <br />
          자립적인 공동체 기반 조성과 지속가능한 지역 순환 생태계를 만들어가고 있습니다.
        </p>
      </div>

      {/* 미션 섹션 */}
      <div className="mb-16 max-w-5xl mx-auto">
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-2">미션</h3>
          <p className="text-sm sm:text-base text-gray-500">소제목</p>
        </div>
        <div className="bg-gray-100 p-6 sm:p-8 rounded-lg">
          <p className="text-sm sm:text-base text-gray-700 font-medium">
            모든 사용자가 디지털 환경에서 평등한 기회를 누릴 수 있도록 지원
          </p>
        </div>
      </div>

      {/* 비전 섹션 */}
      <div className="w-full bg-[#E8E4DB4D] py-12 sm:py-16">
        <div className="px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-2">비전</h3>
              <p className="text-sm sm:text-base text-gray-500">소제목</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-xs sm:text-sm">아이콘</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">비전1</p>
              </div>
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-xs sm:text-sm">아이콘</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">비전2</p>
              </div>
              <div className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center sm:col-span-2 lg:col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-gray-500 text-xs sm:text-sm">아이콘</span>
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">비전3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 핵심가치 섹션 */}
      <div className="max-w-5xl mx-auto mt-16">
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-bold mb-2">핵심가치</h3>
          <p className="text-sm sm:text-base text-gray-500">소제목</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500 text-xs sm:text-sm">이미지</span>
            </div>
            <p className="text-sm sm:text-base text-gray-700 font-medium mb-2">키워드</p>
            <p className="text-xs sm:text-sm text-gray-600">설명글</p>
          </div>
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500 text-xs sm:text-sm">이미지</span>
            </div>
            <p className="text-sm sm:text-base text-gray-700 font-medium mb-2">키워드</p>
            <p className="text-xs sm:text-sm text-gray-600">설명글</p>
          </div>
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500 text-xs sm:text-sm">이미지</span>
            </div>
            <p className="text-sm sm:text-base text-gray-700 font-medium mb-2">키워드</p>
            <p className="text-xs sm:text-sm text-gray-600">설명글</p>
          </div>
          <div className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
              <span className="text-gray-500 text-xs sm:text-sm">이미지</span>
            </div>
            <p className="text-sm sm:text-base text-gray-700 font-medium mb-2">키워드</p>
            <p className="text-xs sm:text-sm text-gray-600">설명글</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
