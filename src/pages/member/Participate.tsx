import { Navigate, useSearchParams } from 'react-router-dom';
import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import {
  // VolunteerApplication,
  MembershipGuide,
  MeetingMaterials,
} from '@/components/participate';

function Participate() {
  const [searchParams] = useSearchParams();
  const tabs: TabItem[] = [
    { id: 'membership', label: '조합원 가입 안내', value: 'membership' },
    // { id: 'volunteer', label: '자원봉사 신청', value: 'volunteer' },
    { id: 'meeting', label: '정기회의 자료', value: 'meeting' },
  ];

  const { activeTab, handleTabChange } = useTabState(tabs, 'membership');

  // 기존 후원 탭 URL → 독립 메뉴로 이동
  if (searchParams.get('tab') === 'donation') {
    return <Navigate to="/member/donate" replace />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'membership':
        return <MembershipGuide />;
      // case 'volunteer':
      //   return <VolunteerApplication />;
      case 'meeting':
        return <MeetingMaterials />;
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
