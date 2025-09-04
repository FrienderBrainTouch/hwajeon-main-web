import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import {
  Greeting,
  MissionVision,
  History,
  OrganizationChart,
  OrganizationDetails,
} from '@/components/combination';

function Combination() {
  const tabs: TabItem[] = [
    { id: 'greeting', label: '인사말', value: 'greeting' },
    { id: 'mission', label: '미션 & 비전', value: 'mission' },
    { id: 'history', label: '연혁', value: 'history' },
    { id: 'organization', label: '조직도', value: 'organization' },
    { id: 'story', label: '화전 이야기', value: 'story' },
  ];

  const { activeTab, handleTabChange } = useTabState(tabs, 'greeting');

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
        return <History />;
      case 'organization':
        return (
          <div className="max-w-5xl mx-auto space-y-8">
            <OrganizationChart
              top={{ label: '조합장' }}
              second={[{ label: '이사회' }, { label: '사무국' }, { label: '감사' }]}
              teams={[
                { label: '기획행정팀' },
                { label: '지역사회팀' },
                { label: '교육문화팀' },
                { label: '카페27b운영팀' },
              ]}
            />
            <OrganizationDetails />
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
            onValueChange={handleTabChange}
            className="mb-8"
          />
        </div>
      </div>
      {renderTabContent()}
    </div>
  );
}

export default Combination;
