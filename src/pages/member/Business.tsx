import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import { Business27b, ContentsBusiness, VillageCare } from '@/components/business';

function Business() {
  const tabs: TabItem[] = [
    { id: '27b-business', label: '27b 사업', value: '27b-business' },
    { id: 'contents-business', label: '콘텐츠 사업', value: 'contents-business' },
    { id: 'village-care', label: '마을돌봄 사업', value: 'village-care' },
  ];

  const { activeTab, handleTabChange } = useTabState(tabs, '27b-business');

  const renderTabContent = () => {
    switch (activeTab) {
      case '27b-business':
        return <Business27b />;
      case 'contents-business':
        return <ContentsBusiness />;
      case 'village-care':
        return <VillageCare />;
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
