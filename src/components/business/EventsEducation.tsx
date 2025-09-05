import type { EventCard } from './data';
import { eventCards as defaultEventCards } from './data';

interface EventsEducationProps {
  eventCards?: EventCard[];
}

const EventsEducation = ({ eventCards = defaultEventCards }: EventsEducationProps) => {
  return (
    <div className="w-full py-8">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          행사 기획 및 교육 체험 사업
        </h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto px-4">
          주민들이 직접 아이디어를 제안하고 기획하여 실행하는 생활 밀착형 교육과 체험 프로그램을
          운영하고 있습니다.
        </p>
      </div>

      {/* 핵심 프로그램 소개 */}
      <div className="w-full mb-16 bg-[#2C2E5A1A] p-8">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
            핵심 프로그램 소개
          </h3>
          <h4 className="text-lg sm:text-xl text-gray-700 mb-8 text-center">핵심 프로그램 소개</h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventCards.map((card) => (
              <div
                key={card.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <div className="bg-gray-300 h-48 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">이미지</span>
                </div>
                <div className="p-4">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h5>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 운영 방식 소개 */}
      <div className="w-full mb-16 mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">
          운영 방식 소개
        </h3>
        <h4 className="text-lg sm:text-xl text-gray-700 mb-8 text-center">운영 방식 소개</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Box 01 */}
          <div className="bg-blue-900 text-white p-6 rounded-lg">
            <div className="text-2xl font-bold mb-4">01</div>
            <ul className="space-y-2">
              <li className="text-sm">연 2~3회 공모형/공개모집형 기획 가능</li>
              <li className="text-sm">연 2~3회 공모형/공개모집형 기획 가능</li>
              <li className="text-sm">연 2~3회 공모형/공개모집형 기획 가능</li>
            </ul>
          </div>

          {/* Box 02 */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <div className="text-2xl font-bold mb-4 text-gray-900">02</div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700">주민 아이디어 제안 → 실행까지 연결</li>
              <li className="text-sm text-gray-700">주민 아이디어 제안 → 실행까지 연결</li>
              <li className="text-sm text-gray-700">주민 아이디어 제안 → 실행까지 연결</li>
            </ul>
          </div>

          {/* Box 03 */}
          <div className="bg-white border border-gray-200 p-6 rounded-lg">
            <div className="text-2xl font-bold mb-4 text-gray-900">03</div>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700">주민 아이디어 제안 → 실행까지 연결</li>
              <li className="text-sm text-gray-700">주민 아이디어 제안 → 실행까지 연결</li>
              <li className="text-sm text-gray-700">주민 아이디어 제안 → 실행까지 연결</li>
            </ul>
          </div>

          {/* Box 04 */}
          <div className="bg-blue-900 text-white p-6 rounded-lg">
            <div className="text-2xl font-bold mb-4">04</div>
            <ul className="space-y-2">
              <li className="text-sm">연 2~3회 공모형/공개모집형 기획 가능</li>
              <li className="text-sm">연 2~3회 공모형/공개모집형 기획 가능</li>
              <li className="text-sm">연 2~3회 공모형/공개모집형 기획 가능</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsEducation;
