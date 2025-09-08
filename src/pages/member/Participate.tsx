import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import {
  VolunteerApplication,
  MembershipGuide,
  MeetingMaterials,
  SponsorshipGuide,
  SponsorshipInquiry,
} from '@/components/participate';

function Participate() {
  const tabs: TabItem[] = [
    { id: 'membership', label: '조합원 가입 안내', value: 'membership' },
    { id: 'volunteer', label: '자원봉사 신청', value: 'volunteer' },
    { id: 'meeting', label: '정기회의 자료', value: 'meeting' },
    { id: 'donation', label: '후원 & 기부 안내', value: 'donation' },
  ];

  const { activeTab, handleTabChange } = useTabState(tabs, 'membership');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'membership':
        return <MembershipGuide />;
      case 'volunteer':
        return <VolunteerApplication />;
      case 'meeting':
        return <MeetingMaterials />;
      case 'donation':
        return (
          <>
            <SponsorshipGuide />
            <SponsorshipInquiry />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full pt-8">
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

export default Participate;
