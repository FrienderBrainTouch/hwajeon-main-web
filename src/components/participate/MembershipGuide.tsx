import React from 'react';
import { FileText, Phone, DollarSign, Users } from 'lucide-react';
import FAQSection from './FAQSection';
import { membershipGuideData } from './data/membershipGuideData';

const MembershipGuide: React.FC = () => {
  const { faqData } = membershipGuideData;

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
          조합원이 되면 참여할 수 있는 일
        </h2>
        <p className="text-sm sm:text-base text-gray-600 text-left mb-8 max-w-3xl">
          다양한 마을 활동에 우선적으로 참여하고 함께 기획하고 실행할 수 있는 기회가 열려 있습니다.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#E8E4DB' }}>
            <h3 className="text-base sm:text-lg font-medium text-gray-900">
              마을 회의 및 의사결정 참여
            </h3>
          </div>

          <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#E8E4DB' }}>
            <h3 className="text-base sm:text-lg font-medium text-gray-900">
              프로젝트 및 행사 제안 및 실행
            </h3>
          </div>

          <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#E8E4DB' }}>
            <h3 className="text-base sm:text-lg font-medium text-gray-900">
              마을사업 우선 참여 (예: 클래스, 여행, 교육 등)
            </h3>
          </div>

          <div className="rounded-lg p-6 text-center" style={{ backgroundColor: '#E8E4DB' }}>
            <h3 className="text-base sm:text-lg font-medium text-gray-900">
              기타 조합원 전용 혜택 제공 (할인, 우선예약 등)
            </h3>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* 01단계 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">01</span>
            </div>
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-900" />
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-900">가입 신청서 작성</p>
          </div>

          {/* 02단계 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">02</span>
            </div>
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Phone className="w-8 h-8 text-gray-900" />
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-900">담당자 연락 및 확인</p>
          </div>

          {/* 03단계 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">03</span>
            </div>
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-gray-900" />
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-900">출자금 납부</p>
          </div>

          {/* 04단계 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">04</span>
            </div>
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-900" />
            </div>
            <p className="text-sm sm:text-base font-medium text-gray-900">조합 가입 완료</p>
          </div>
        </div>

        {/* 문의하기 버튼 */}
        <div className="text-center mt-8">
          <button className="bg-blue-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-800 transition-colors text-base sm:text-lg font-semibold">
            문의하기
          </button>
        </div>
      </div>

      {/* FAQ 섹션 */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-left">
          자주 묻는 질문
        </h2>
        <FAQSection faqData={faqData} />
      </div>
    </div>
  );
};

export default MembershipGuide;
