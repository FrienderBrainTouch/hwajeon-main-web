import { useState } from 'react';
import { PartyPopper, Sparkles, Gift, Heart, Users } from 'lucide-react';
import VolunteerApplicationModal from './VolunteerApplicationModal';

const VolunteerApplication = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      {/* 헤더 섹션 */}
      <div className="mb-8 sm:mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">자원봉사 신청</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-sm sm:text-base text-gray-600 text-left leading-relaxed">
          화전마을사회적협동조합은 조합원뿐 아니라 지역 주민 누구나 자원봉사로 함께할 수 있습니다.
          마을 안의 다양한 활동에 손을 보태며 함께 돌보고, 함께 성장하는 마을을 만들어갑니다.
        </p>
      </div>

      {/* 활동 영역 소개 */}
      <div className="mb-12 sm:mb-16">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-left">
          활동 영역 소개
        </h3>
        <p className="text-sm sm:text-base text-gray-600 text-left mb-8">
          이런 자원봉사를 함께할 수 있어요
        </p>

        {/* 활동 카드들 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {[
            {
              icon: PartyPopper,
              title: '행사 지원',
              description: '마을 행사 운영 보조, 안내, 정리 등',
            },
            {
              icon: Sparkles,
              title: '환경 보전',
              description: '거리 정리, 공원 가꾸기, 재활용 캠페인',
            },
            {
              icon: Gift,
              title: '교육 지원',
              description: '학습 멘토링, 문화 프로그램 보조',
            },
            {
              icon: Heart,
              title: '사회 복지',
              description: '어르신 돌봄, 취약계층 지원',
            },
            {
              icon: Users,
              title: '시설 운영',
              description: '도서관 운영, 시설 관리 지원',
            },
          ].map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 mx-auto mb-4 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-gray-900" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-2">
                  {activity.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 참여 방법 및 신청 절차 */}
      <div className="mb-12 sm:mb-16">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-left">
          참여 방법 및 신청 절차
        </h3>
        <p className="text-sm sm:text-base text-gray-600 text-left mb-8">참여 방법 및 신청 절차</p>

        {/* 3단계 프로세스 */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-8">
          {[
            {
              step: '1단계',
              title: '신청서 작성 및 제출',
            },
            {
              step: '2단계',
              title: '담당자 확인 및 연락',
            },
            {
              step: '3단계',
              title: '일정 조율 및 참여',
            },
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center mb-3"
                  style={{ backgroundColor: '#F5F5DC' }}
                >
                  <span className="text-lg sm:text-xl font-bold text-gray-900">{item.step}</span>
                  <span className="text-sm sm:text-base text-gray-900">{item.title}</span>
                </div>
              </div>
              {/* 점선 연결 - 데스크톱에서만 표시 */}
              {index < 2 && (
                <div className="hidden sm:block w-8 h-0.5 border-t-2 border-dotted border-gray-300 mx-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* 격려 메시지 */}
        <div className="text-center mb-8">
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            특별한 준비가 없어도 괜찮습니다.
            <br />
            마을을 조금 더 살갑고 따뜻하게 만드는 건 누군가의 한 걸음, 가벼운 참여에서 시작됩니다.
          </p>
        </div>
      </div>

      {/* 신청 버튼 */}
      <div className="text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-gray-900 px-8 sm:px-12 py-3 sm:py-4 rounded-lg hover:bg-gray-50 transition-colors text-base sm:text-lg font-semibold"
          style={{ border: '1px solid #374151' }}
        >
          자원봉사 신청하기
        </button>
      </div>

      {/* 모달 */}
      <VolunteerApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default VolunteerApplication;
