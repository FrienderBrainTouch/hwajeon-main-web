import React from 'react';
import { greetingData as defaultData } from './data';
import { type GreetingProps } from '@/types/components';

const Greeting: React.FC<GreetingProps> = ({ data = defaultData }) => {
  return (
    <div className="py-8 px-4">
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{data.title}</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* 이미지 영역 */}
          <div className="bg-white rounded-lg flex flex-col justify-start p-6">
            <img
              src={data.image.src}
              alt={data.image.alt}
              className="w-full h-auto object-contain mb-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
            />
            <div className="mt-auto">
              <p className="text-sm text-gray-600 leading-relaxed">
                사각형의 틀은 마을을 이루고 있는 터를 상징하며 그 내부에는 꽃과 자연물을 위치시켜
                화전의 네이밍적 표현을 디자인했다.
              </p>
            </div>
          </div>

          {/* 텍스트 영역 */}
          <div className="flex flex-col justify-center space-y-8 sm:space-y-12">
            <div className="space-y-1">
              <p className="text-lg sm:text-xl">{data.greeting.line1}</p>
              <p className="text-lg sm:text-xl">{data.greeting.line2}</p>
            </div>

            <div className="space-y-6 sm:space-y-8 text-sm sm:text-base text-gray-700 leading-relaxed">
              {data.content.map((paragraph: any) => (
                <p key={paragraph.id}>{paragraph.text}</p>
              ))}
            </div>

            {/* 서명 영역 */}
            <div className="flex items-center space-x-4 mt-8 sm:mt-12">
              <span className="text-gray-600 font-semibold text-lg sm:text-xl">
                {data.signature.title}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-800 font-semibold text-lg sm:text-xl">
                  {data.signature.name}
                </span>
                {/* <div className="w-6 h-6 bg-red-500 rounded-sm"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
