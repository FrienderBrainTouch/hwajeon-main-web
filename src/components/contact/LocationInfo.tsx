import React from 'react';
import { LocationMap } from '@/components/contact';

const LocationInfo: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* 지도 섹션 */}
        <div>
          <LocationMap className="h-[300px] sm:h-[400px] lg:h-full" />
        </div>

        {/* 정보 섹션 */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">화전마을 사회적협동조합</h3>

            {/* 이미지 플레이스홀더 */}
            <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center mb-6">
              <span className="text-gray-500">이미지</span>
            </div>

            {/* 연락처 정보 */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">경기 고양시 덕양구 화랑로 31층</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">02-3158-3001</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 mt-0.5">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">09:00 ~ 18:00</p>
                </div>
              </div>
            </div>

            {/* 대중교통 안내 */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">한국항공대역 1번 출구 도보 5분 거리</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInfo;
