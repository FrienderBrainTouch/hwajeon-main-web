import React from 'react';
import { useNavigate } from 'react-router-dom';
import FAQSection from './FAQSection';
import { membershipGuideData } from './data/membershipGuideData';

const MembershipGuide: React.FC = () => {
  const { faqData } = membershipGuideData;
  const navigate = useNavigate();

  return (
    <div className="py-4 sm:py-6 md:py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 헤더 섹션 */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">조합원 가입 안내</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
          화전마을사회적협동조합은 주민이 스스로 마을을 기획하고 운영해 나가는 자치 기반의
          플랫폼입니다. 조합원이 된다는 것은 단순한 가입을 넘어, 마을의 일원으로 함께 결정하고 함께
          실천하는 첫걸음입니다.
        </p>
      </div>

      {/* 조합원 혜택 섹션 */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-left">
          조합원이 되면 함께 할 수 있는 일
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {/* 회의 및 의사결정 참여 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              회의 및 의사결정 참여
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              정기총회, 조합원회의, 기획회의 등에 참여하여 마을의 중요한 의사결정 참여
            </p>
          </div>

          {/* 프로젝트 및 행사 제안·실행 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              프로젝트 및 행사 제안·실행
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              축제, 전시, 교육, 체험 프로그램 등 아이디어 제안과 실행 가능
            </p>
          </div>

          {/* 마을사업 우선 참여 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              마을사업 우선 참여
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              클래스·여행·교육·워크숍 등 조합이 운영하는 프로그램에 우선적으로 참여
            </p>
          </div>

          {/* 조합원 전용 혜택 제공 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              조합원 전용 혜택 제공
            </h3>
            <div className="text-sm sm:text-base text-gray-600 leading-relaxed space-y-1">
              <p>• 카페27b 포인트 적립 및 생일 쿠폰 제공</p>
              <p>• 카페27b 공간 우선예약 (소모임, 회의, 워크숍 등)</p>
            </div>
          </div>
        </div>
      </div>

      {/* 가입 절차 섹션 */}
      <div className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-left">
          가입 절차 안내
        </h2>
        <p className="text-sm sm:text-base text-gray-600 text-left mb-8">
          가입은 간단하고 투명하게 진행됩니다.
        </p>

        <div className="space-y-4 sm:space-y-6">
          {/* 가입절차 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              가입절차
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600">
              <p>1. 가입신청서와 가입회비 제출</p>
              <p>2. 자격 심사</p>
              <p>3. 승인 통보</p>
              <p>4. 출자금 납부</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-3">
                승인 후 2주 이내에 출자금을 납부하면 조합원 자격이 확정됩니다.
              </p>
            </div>
          </div>

          {/* 문의하기 버튼 */}
          <div className="text-center">
            <button
              onClick={() => navigate('/member/contact')}
              className="bg-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-800 transition-colors text-base sm:text-lg font-semibold"
            >
              문의하기
            </button>
          </div>
        </div>
      </div>

      {/* FAQ 섹션 */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-left">
          조합원 자주 묻는 질문(FAQ)
        </h2>
        <FAQSection faqData={faqData} />
      </div>
    </div>
  );
};

export default MembershipGuide;
