import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import {
  Greeting,
  MissionVision,
  History,
  OrganizationChart,
  OrganizationDetails,
  HwajeonStory,
} from '@/components/combination';
import {
  historyData,
  teams,
  cards,
  storyImages,
  mainStoryImage,
  missionVisionData,
  greetingData,
  organizationChartData,
} from '@/components/combination/data';

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
            <Greeting data={greetingData} />
          </div>
        );
      case 'mission':
        return <MissionVision data={missionVisionData} />;
      case 'history':
        return <History historyData={historyData} />;
      case 'organization':
        return (
          <div className="max-w-5xl mx-auto space-y-8">
            <OrganizationChart
              top={organizationChartData.top}
              second={organizationChartData.second}
              teams={organizationChartData.teams}
            />
            <OrganizationDetails teams={teams} />
          </div>
        );
      case 'story':
        return (
          <HwajeonStory cards={cards} storyImages={storyImages} mainStoryImage={mainStoryImage} />
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
