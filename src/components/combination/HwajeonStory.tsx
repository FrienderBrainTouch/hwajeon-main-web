import { useState, useEffect } from 'react';

// 상단 이미지들
import story1_1 from '@/assets/story/1_1.png';
import story1_2 from '@/assets/story/1_2.jpg';

// 슬라이드 이미지들
import story2_1 from '@/assets/story/2_1.jpg';
import story2_2 from '@/assets/story/2_2.jpg';
import story2_3 from '@/assets/story/2_3.jpg';
import story2_4 from '@/assets/story/2_4.jpg';
import story2_5 from '@/assets/story/2_5.jpg';
import story2_6 from '@/assets/story/2_6.jpg';
import story2_7 from '@/assets/story/2_7.jpg';
import story2_8 from '@/assets/story/2_8.jpg';
import story2_9 from '@/assets/story/2_9.jpg';
import story2_10 from '@/assets/story/2_10.jpg';
import story2_11 from '@/assets/story/2_11.jpg';
import story2_12 from '@/assets/story/2_12.jpg';
import story2_13 from '@/assets/story/2_13.jpg';
import story2_14 from '@/assets/story/2_14.jpg';
import story2_15 from '@/assets/story/2_15.jpg';
import story2_16 from '@/assets/story/2_16.jpg';

// 슬라이드 컴포넌트
function ImageSlider() {
  const slideImages = [
    story2_1,
    story2_2,
    story2_3,
    story2_4,
    story2_5,
    story2_6,
    story2_7,
    story2_8,
    story2_9,
    story2_10,
    story2_11,
    story2_12,
    story2_13,
    story2_14,
    story2_15,
    story2_16,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideImages.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + slideImages.length) % slideImages.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slideImages.length) % slideImages.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideImages.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <div
        className="relative overflow-hidden rounded-lg shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slideImages.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={image}
                alt={`화전 스토리 ${index + 1}`}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
              />
            </div>
          ))}
        </div>

        {/* 네비게이션 버튼 */}
        <button
          onClick={goToPrev}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors hidden sm:block"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors hidden sm:block"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center mt-4 space-x-1.5 sm:space-x-2">
        {slideImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function HwajeonStory() {
  return (
    <div className="mx-auto py-8">
      {/* 화전 도시재생 섹션 */}
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">화전 도시재생</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>

        {/* 상단 이미지 영역 */}
        <div className="max-w-6xl mx-auto mb-8 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={story1_1}
                alt="화전 도시재생 프로젝트 지도"
                className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src={story1_2}
                alt="주요 실행 사업 및 완료 여부"
                className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover"
              />
            </div>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          화전 도시재생뉴딜사업
        </h3>

        <div className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-5xl mx-auto px-4 space-y-3 sm:space-y-4">
          <p>
            화전 도시재생뉴딜사업은 2017년 국토교통부의 도시재생 선도지역으로 선정되어 2018년부터 약
            5년간 진행된 주민 주도형 도시재생 프로젝트입니다.
          </p>
          <p>
            낙후된 생활환경을 개선하고, 지역 공동체의 자생력과 경제활동을 강화하기 위해 다양한
            물리·사회·경제적 사업을 추진했습니다.
          </p>
          <p>
            주요 성과로는 드론센터 건립, 지하보도 문화공간 조성, 화전마을관리사회적협동조합 설립,
            주민역량 강화 프로그램 운영 등이 있으며, 이를 통해 '사람이 중심이 되는 지속가능한 마을',
            함께 배우고 일하며 성장하는 화전 공동체의 기반을 마련했습니다.
          </p>
          <p className="text-red-600 font-medium">
            다만 2022년 민선8기 출범 이후 시 정책 변경으로 사업이 사실상 중단되었습니다.
          </p>
        </div>
      </div>

      {/* 사업 개요 섹션 */}
      <div className="mb-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            사업 개요
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm border">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 text-sm sm:text-base">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-semibold text-gray-700 w-20 sm:w-24 flex-shrink-0">
                    사업명:
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    화전 도시재생 뉴딜사업 (일반근린형,그린재생형)
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-semibold text-gray-700 w-20 sm:w-24 flex-shrink-0">
                    사업기간:
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    2018년 12월 ~ 2022년 4월
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-semibold text-gray-700 w-20 sm:w-24 flex-shrink-0">
                    위치:
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    고양시 덕양구 화전동 일원 화랑로, 벌말지역
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-semibold text-gray-700 w-20 sm:w-24 flex-shrink-0">
                    면적:
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">88,176㎡</span>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-semibold text-gray-700 w-20 sm:w-24 flex-shrink-0">
                    총사업비:
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">약 194억 원</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-semibold text-gray-700 w-20 sm:w-24 flex-shrink-0">
                    사업비전:
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    화전지역 상생활주로 활·활·활 프로젝트
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                  <span className="font-semibold text-gray-700 w-20 sm:w-24 flex-shrink-0">
                    핵심목표:
                  </span>
                  <span className="text-gray-600 text-sm sm:text-base">
                    지역상권 활성화 및 공동체 기반 구축
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 실행 사업 섹션 */}
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          주요 실행 사업 및 완료 여부
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm lg:text-base">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 sm:px-3 py-2 text-left font-semibold">
                  사업명
                </th>
                <th className="border border-gray-300 px-2 sm:px-3 py-2 text-left font-semibold">
                  내용
                </th>
                <th className="border border-gray-300 px-2 sm:px-3 py-2 text-center font-semibold">
                  추진 여부
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2">드론센터 및 거점공간 조성</td>
                <td className="border border-gray-300 px-3 py-2">
                  드론센터 1층 주민 거점 공간 활용
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    완료
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">루프탑 카페 조성</td>
                <td className="border border-gray-300 px-3 py-2">사업종료로 무산</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">중단</span>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">주민협의체 구성 및 활동</td>
                <td className="border border-gray-300 px-3 py-2">
                  총회, 교육, 가드닝 등 다수 활동
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    완료
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">사회적협동조합 설립</td>
                <td className="border border-gray-300 px-3 py-2">
                  2021년 국토부 인가, 자율 운영 중
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    완료
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">화전지하보도 개선 사업</td>
                <td className="border border-gray-300 px-3 py-2">
                  방수 미흡으로 어르신들 공간으로는 활용하지 못함
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                    완료
                  </span>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">화전역 주민커뮤니티 공간 조성</td>
                <td className="border border-gray-300 px-3 py-2">운영비 부담으로 무산</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">중단</span>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">보행자 우선 도로 조성사업</td>
                <td className="border border-gray-300 px-3 py-2">
                  주민 반대, 행정 지연 등으로 무산
                </td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">무산</span>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">스마트 도시재생 사업</td>
                <td className="border border-gray-300 px-3 py-2">사업 종료로 중단</td>
                <td className="border border-gray-300 px-3 py-2 text-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">중단</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 슬라이드 이미지 영역 */}
        <div className="mt-8">
          <ImageSlider />
        </div>
      </div>
    </div>
  );
}
