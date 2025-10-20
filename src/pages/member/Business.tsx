import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import { UrbanRegenerationHub, EventsEducation, LocalActivation } from '@/components/business';
import {
  eventImages,
  communityProjects,
  educationMethods,
  educationSummary,
  academyCards,
  educationCards,
  eventCards,
} from '@/components/business/data';

function Business() {
  const tabs: TabItem[] = [
    { id: 'urban-regeneration', label: '도시재생 거점공간 운영 사업', value: 'urban-regeneration' },
    { id: 'events-education', label: '행사 기획 및 교육 체험 사업', value: 'events-education' },
    { id: 'local-activation', label: '지역 활성화 사업', value: 'local-activation' },
  ];

  const { activeTab, handleTabChange } = useTabState(tabs, 'urban-regeneration');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'urban-regeneration':
        return <UrbanRegenerationHub academyCards={academyCards} educationCards={educationCards} />;
      case 'events-education':
        return <EventsEducation eventCards={eventCards} />;
      case 'local-activation':
        return (
          <LocalActivation
            eventImages={eventImages}
            communityProjects={communityProjects}
            educationMethods={educationMethods}
            educationSummary={educationSummary}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full py-8">
      <div className="max-w-6xl mx-auto px-4">
        <TabNavigation
          tabs={tabs}
          value={activeTab}
          onValueChange={handleTabChange}
          className="mb-8"
        />
      </div>
      {renderTabContent()}
    </div>
  );
}

export default Business;
