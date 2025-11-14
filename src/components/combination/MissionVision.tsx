import React from 'react';
import type { MissionVisionProps } from '@/types/components/combination';
import { missionVisionData as defaultData } from './data';
import missionVision1 from '@/assets/fix/core-value/see.png';
import missionVision2 from '@/assets/fix/core-value/share.png';
import missionVision3 from '@/assets/fix/core-value/soar.png';

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
      <div className="max-w-5xl mx-auto mt-16 px-4">
        <div className="mb-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">{data.values.title}</h3>
          <p className="text-base sm:text-lg text-gray-500">{data.values.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
          {data.values.items.map((item: any, index: number) => {
            const images = [missionVision1, missionVision2, missionVision3];
            const imageSrc = images[index] || images[0];

            return (
              <div
                key={item.id}
                className="bg-gray-100 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl mx-auto mb-6 overflow-hidden bg-white flex items-center justify-center">
                  <img
                    src={imageSrc}
                    alt={item.title}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <p className="text-lg sm:text-xl text-gray-900 font-bold mb-3">{item.title}</p>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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

export default MissionVision;
