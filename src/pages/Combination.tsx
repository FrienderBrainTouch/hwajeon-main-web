import { useState } from 'react';
import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';

function Combination() {
  const [activeTab, setActiveTab] = useState('greeting');

  const tabs: TabItem[] = [
    { id: 'greeting', label: '인사말', value: 'greeting' },
    { id: 'mission', label: '미션 & 비전', value: 'mission' },
    { id: 'history', label: '연혁', value: 'history' },
    { id: 'organization', label: '조직도', value: 'organization' },
    { id: 'story', label: '화전 이야기', value: 'story' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'greeting':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">인사말</h2>
            <p className="text-gray-600 leading-relaxed">
              화전 조합에 오신 것을 환영합니다. 우리는 지역사회의 발전과 구성원들의 복지를 위해 함께
              노력하고 있습니다.
            </p>
          </div>
        );
      case 'mission':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">미션 & 비전</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">미션</h3>
                <p className="text-gray-600">지역사회 발전과 구성원 복지 향상</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">비전</h3>
                <p className="text-gray-600">지속가능하고 번영하는 지역공동체 건설</p>
              </div>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">연혁</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="font-semibold">2024년</p>
                <p className="text-gray-600">화전 조합 설립</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <p className="font-semibold">2023년</p>
                <p className="text-gray-600">조합 설립 준비</p>
              </div>
            </div>
          </div>
        );
      case 'organization':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">조직도</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600">조직도 내용이 여기에 표시됩니다.</p>
            </div>
          </div>
        );
      case 'story':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-4">화전 이야기</h2>
            <p className="text-gray-600 leading-relaxed">
              화전의 역사와 이야기를 소개합니다. 지역의 전통과 현대가 만나는 특별한 공간, 화전의
              매력을 발견해보세요.
            </p>
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

export default Combination;
