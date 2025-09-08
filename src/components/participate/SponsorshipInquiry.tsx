import React from 'react';

const SponsorshipInquiry: React.FC = () => {
  return (
    <div className="mt-12 sm:mt-16">
      <div
        className="relative rounded-lg p-6 sm:p-8 lg:p-12 h-64 sm:h-80 lg:h-96 flex items-center justify-center"
        style={{
          backgroundImage: 'url(/src/assets/header.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

        {/* 텍스트 및 버튼 영역 */}
        <div className="relative z-10 text-center text-white">
          <div className="space-y-4 sm:space-y-6">
            <p className="text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed">
              오늘의 후원이 내일의 마을을 만듭니다.
            </p>
            <p className="text-base sm:text-lg leading-relaxed opacity-90">
              조용하지만 깊은 변화의 손길을 보태주세요.
            </p>
            <div className="pt-2">
              <button className="bg-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-800 transition-colors text-base sm:text-lg font-semibold">
                문의하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipInquiry;
