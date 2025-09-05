import { useState } from 'react';
import VolunteerApplicationModal from './VolunteerApplicationModal';

const VolunteerApplication = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">자원봉사 신청</h2>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
          화전마을사회적협동조합은 조합원뿐 아니라 지역 주민 누구나 자원봉사로 함께할 수 있습니다.
          마을 안의 다양한 활동에 손을 보태며 함께 돌보고, 함께 성장하는 마을을 만들어갑니다.
        </p>
      </div>

      {/* 활동 영역 소개 */}
      <div className="mb-12">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">활동 영역 소개</h3>
        <p className="text-gray-600 text-sm sm:text-base mb-8">이런 자원봉사를 함께할 수 있어요</p>

        {/* 활동 카드들 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {[
            {
              icon: '🎪',
              title: '행사 지원',
              description: '마을 행사 운영 보조, 안내, 정리 등',
            },
            {
              icon: '🌱',
              title: '환경 보전',
              description: '거리 정리, 공원 가꾸기, 재활용 캠페인',
            },
            {
              icon: '📚',
              title: '교육 지원',
              description: '학습 멘토링, 문화 프로그램 보조',
            },
            { icon: '👥', title: '사회 복지', description: '어르신 돌봄, 취약계층 지원' },
            { icon: '🏛️', title: '시설 운영', description: '도서관 운영, 시설 관리 지원' },
          ].map((activity, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 sm:p-6 rounded-lg text-center hover:bg-gray-100 transition-colors"
            >
              <div className="text-2xl sm:text-3xl mb-3">{activity.icon}</div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-2">
                {activity.title}
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {activity.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 참여 방법 및 신청 절차 */}
      <div className="mb-12">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">참여 방법 및 신청 절차</h3>

        {/* 3단계 프로세스 */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
          {[
            {
              step: '1단계',
              title: '신청서 작성 및 제출',
              description: '온라인 또는 오프라인으로 신청서 작성',
            },
            {
              step: '2단계',
              title: '담당자 확인 및 연락',
              description: '신청서 검토 후 개별 연락',
            },
            {
              step: '3단계',
              title: '일정 조율 및 참여',
              description: '활동 일정 조율 후 봉사 참여',
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 border-2 border-gray-300 rounded-full flex items-center justify-center mb-3 relative z-10">
                <span className="text-lg sm:text-xl font-bold text-gray-700">{index + 1}</span>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">{item.description}</p>
              </div>
              {/* 연결선 - 데스크톱에서만 표시 */}
              {index < 2 && (
                <div className="hidden sm:block absolute top-8 left-full w-8 h-0.5 bg-gray-300 -translate-x-4"></div>
              )}
            </div>
          ))}
        </div>

        {/* 격려 메시지 */}
        <div className="text-center">
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            특별한 준비가 없어도 괜찮습니다. 마을을 조금 더 살갑고 따뜻하게 만드는 건 누군가의 한
            걸음, 가벼운 참여에서 시작됩니다.
          </p>
        </div>
      </div>

      {/* 신청 버튼 */}
      <div className="text-center">
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg font-semibold"
        >
          자원봉사 신청하기
        </button>
      </div>

      {/* 모달 */}
      <VolunteerApplicationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default VolunteerApplication;
