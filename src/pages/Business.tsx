import { useState } from 'react';
import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';

function Business() {
  const [activeTab, setActiveTab] = useState('urban-regeneration');

  const tabs: TabItem[] = [
    { id: 'urban-regeneration', label: '도시재생 거점공간 운영 사업', value: 'urban-regeneration' },
    { id: 'events-education', label: '행사 기획 및 교육 체험 사업', value: 'events-education' },
    { id: 'cafe27b', label: '카페27b', value: 'cafe27b' },
    { id: 'local-activation', label: '지역 활성화 사업', value: 'local-activation' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'urban-regeneration':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">도시재생 거점공간 운영 사업</h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                화전 지역의 도시재생을 위한 거점공간을 운영하여 지역주민들의 소통과 협력을 도모하고,
                지속가능한 도시발전의 기반을 마련합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">주요 사업</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 거점공간 시설 운영</li>
                    <li>• 지역주민 모임 지원</li>
                    <li>• 도시재생 프로그램 기획</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">기대효과</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 지역 커뮤니티 활성화</li>
                    <li>• 도시재생 참여 확대</li>
                    <li>• 지역경제 활성화</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'events-education':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">행사 기획 및 교육 체험 사업</h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                다양한 문화행사와 교육 프로그램을 통해 지역주민들의 문화적 경험을 풍부하게 하고,
                학습과 성장의 기회를 제공합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">행사 프로그램</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 문화축제 및 공연</li>
                    <li>• 전시회 및 체험전</li>
                    <li>• 지역 특색 행사</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">교육 프로그램</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 평생교육 과정</li>
                    <li>• 직업훈련 프로그램</li>
                    <li>• 문화예술 교육</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'cafe27b':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">카페27b</h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                화전 지역의 대표적인 커뮤니티 카페로, 지역주민들의 만남의 공간이자 다양한 문화활동의
                중심지 역할을 하고 있습니다.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">운영 정보</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 운영시간: 평일 09:00-22:00</li>
                    <li>• 휴무일: 매주 월요일</li>
                    <li>• 위치: 화전 중앙로 27번길</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">서비스</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 커피 및 음료 서비스</li>
                    <li>• 간단한 식사 메뉴</li>
                    <li>• 모임 공간 대여</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'local-activation':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">지역 활성화 사업</h2>
            <div className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                화전 지역의 경제적, 사회적, 문화적 활성화를 위한 다양한 사업을 추진하여 지역발전과
                주민복지 향상에 기여합니다.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">경제 활성화</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 상권 활성화 지원</li>
                    <li>• 창업 지원 프로그램</li>
                    <li>• 지역 특산품 개발</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">사회 활성화</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 주민 참여 프로그램</li>
                    <li>• 자원봉사 활동</li>
                    <li>• 지역 네트워크 구축</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <TabNavigation
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        />
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Business;
