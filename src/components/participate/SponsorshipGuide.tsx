import React from 'react';
import { sponsorshipUsageData, sponsorshipMethodData } from './data/sponsorshipGuideData';

const SponsorshipGuide: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      {/* 헤더 섹션 */}
      <div className="mb-12 sm:mb-16 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">후원 & 기부 안내</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
          화전마을의 변화는 탄탄한 일상의 기반 위에서 일어납니다. 즉각적인 이익보다는 지속가능한
          공동체를 만드는 것에 집중하며, 후원은 그 일상을 지속적으로 돌볼 수 있게 해주는 소중한 힘이
          됩니다.
        </p>
      </div>

      {/* 후원금 사용처 섹션 */}
      <div className="mb-12 sm:mb-16">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-left">
          후원금은 이렇게 사용됩니다
        </h3>
        <p className="text-sm sm:text-base text-gray-600 text-left mb-8">
          투명하고 책임 있게 운영되는 후원금은 다음과 같은 마을 활동에 사용됩니다:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {sponsorshipUsageData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-orange-50 border border-orange-100 rounded-lg p-4 sm:p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-orange-500" />
                </div>
                <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 후원 방법 섹션 */}
      <div>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-left">
          후원 방법
        </h3>
        <p className="text-sm sm:text-base text-gray-600 text-left mb-8">
          작은 나눔으로 큰 변화를 만들 수 있습니다
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {sponsorshipMethodData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-orange-50 border border-orange-100 rounded-lg p-4 sm:p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-orange-500" />
                </div>
                <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SponsorshipGuide;
