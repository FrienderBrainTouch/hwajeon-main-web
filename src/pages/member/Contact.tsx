import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import { InquiryForm, LocationInfo } from '@/components/contact';

function Contact() {
  const tabs: TabItem[] = [
    { id: 'inquiry', label: '간편 문의', value: 'inquiry' },
    { id: 'location', label: '오시는 길', value: 'location' },
  ];

  const { activeTab, handleTabChange } = useTabState(tabs, 'inquiry');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inquiry':
        return (
          <div>
            <InquiryForm />
          </div>
        );
      case 'location':
        return <LocationInfo />;
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

export default Contact;
