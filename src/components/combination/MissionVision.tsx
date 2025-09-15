import React from 'react';
import type { MissionVisionProps } from '@/types/components/combination';
import { missionVisionData as defaultData } from './data';

const MissionVision: React.FC<MissionVisionProps> = ({ data = defaultData }) => {
  return (
    <div className="py-8 px-4">
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{data.header.title}</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
      </div>
      {/* 헤더 섹션 */}
      <div className="text-center mb-12 max-w-5xl mx-auto">
        <h2 className="text-lg sm:text-xl font-normal mb-1">{data.header.subtitle}</h2>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl mx-auto">
          {data.header.description}
        </p>
      </div>

      {/* 미션 섹션 */}
      <div className="mb-16 max-w-5xl mx-auto">
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-2">{data.mission.title}</h3>
          <p className="text-sm sm:text-base text-gray-500">{data.mission.subtitle}</p>
        </div>
        <div className="bg-gray-100 p-6 sm:p-8 rounded-lg">
          <p className="text-sm sm:text-base text-gray-700 font-medium">{data.mission.content}</p>
        </div>
      </div>

      {/* 비전 섹션 */}
      <div className="w-full bg-[#E8E4DB4D] py-12 sm:py-16">
        <div className="px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold mb-2">{data.vision.title}</h3>
              <p className="text-sm sm:text-base text-gray-500">{data.vision.subtitle}</p>
            </div>
            <div className="bg-gray-100 p-6 sm:p-8 rounded-lg">
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                {data.vision.content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 핵심가치 섹션 */}
      <div className="max-w-5xl mx-auto mt-16">
        <div className="mb-8">
          <h3 className="text-lg sm:text-xl font-bold mb-2">{data.values.title}</h3>
          <p className="text-sm sm:text-base text-gray-500">{data.values.subtitle}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {data.values.items.map((item: any) => (
            <div key={item.id} className="bg-gray-100 p-4 sm:p-6 rounded-lg text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-500 text-xs sm:text-sm">이미지</span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 font-medium mb-2">{item.title}</p>
              <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionVision;
