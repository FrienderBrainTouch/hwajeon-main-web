import { useState } from 'react';
import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { Greeting, MissionVision } from '@/components/combination';

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
          <div className="max-w-5xl mx-auto">
            <Greeting />
          </div>
        );
      case 'mission':
        return <MissionVision />;
      case 'history':
        return (
          <div className="max-w-5xl mx-auto">
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
          </div>
        );
      case 'organization':
        return (
          <div className="max-w-5xl mx-auto">
            <div className="py-8">
              <h2 className="text-2xl font-bold mb-4">조직도</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600">조직도 내용이 여기에 표시됩니다.</p>
              </div>
            </div>
          </div>
        );
      case 'story':
        return (
          <div className="max-w-5xl mx-auto">
            <div className="py-8">
              <h2 className="text-2xl font-bold mb-4">화전 이야기</h2>
              <p className="text-gray-600 leading-relaxed">
                화전의 역사와 이야기를 소개합니다. 지역의 전통과 현대가 만나는 특별한 공간, 화전의
                매력을 발견해보세요.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-8">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <TabNavigation
            tabs={tabs}
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-8"
          />
        </div>
      </div>
      {renderTabContent()}
    </div>
  );
}

export default Combination;
