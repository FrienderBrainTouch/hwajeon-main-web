import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import { InquiryForm } from '@/components/contact';

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
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">오시는 길</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">화전 조합 사무실</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">주소</h4>
                    <p className="text-gray-600 mb-4">
                      서울특별시 강서구 화전동 123-45
                      <br />
                      화전 조합 사무실 2층
                    </p>

                    <h4 className="font-semibold mb-2">대중교통</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 지하철 5호선 화전역 2번 출구 도보 5분</li>
                      <li>• 버스: 123, 456, 789번 화전조합 정류장 하차</li>
                      <li>• 마을버스: 강서01, 강서02번</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">주차 안내</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 지하 주차장 이용 가능 (2시간 무료)</li>
                      <li>• 주차 공간이 제한적이니 대중교통 이용 권장</li>
                      <li>• 주말 및 공휴일 주차 가능</li>
                    </ul>

                    <h4 className="font-semibold mb-2 mt-4">운영시간</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 평일: 09:00 - 18:00</li>
                      <li>• 토요일: 09:00 - 13:00</li>
                      <li>• 일요일 및 공휴일: 휴무</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-semibold mb-2">지도</p>
                  <p className="text-sm">실제 지도가 여기에 표시됩니다</p>
                  <p className="text-xs mt-2">(구글 맵 또는 카카오맵 연동)</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-blue-900">주변 시설</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• 화전역 (지하철 5호선)</li>
                    <li>• 화전시장</li>
                    <li>• 화전공원</li>
                    <li>• 화전도서관</li>
                    <li>• 화전보건소</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-green-900">찾아오시는 길</h3>
                  <ol className="space-y-2 text-green-800 text-sm">
                    <li>1. 지하철 5호선 화전역 2번 출구</li>
                    <li>2. 출구에서 직진 200m</li>
                    <li>3. 화전시장 방향으로 우회전</li>
                    <li>4. 화전조합 건물 2층</li>
                  </ol>
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
