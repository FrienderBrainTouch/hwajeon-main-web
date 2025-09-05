import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import { VolunteerApplication } from '@/components/participate';

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
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">조합원 가입 안내</h2>
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-900">조합원 가입 혜택</h3>
                <ul className="space-y-2 text-blue-800">
                  <li>• 화전 조합의 모든 사업에 참여할 수 있는 권리</li>
                  <li>• 정기총회 및 각종 회의 참석 권한</li>
                  <li>• 조합 시설 이용 우선권</li>
                  <li>• 교육 및 문화 프로그램 참여 혜택</li>
                  <li>• 지역사회 발전에 기여하는 자부심</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">가입 자격</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 화전 지역 거주자 또는 사업자</li>
                    <li>• 조합의 목적에 동의하는 자</li>
                    <li>• 만 18세 이상</li>
                    <li>• 조합원 2명 이상의 추천</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">가입 절차</h3>
                  <ol className="space-y-2 text-gray-600">
                    <li>1. 가입 신청서 작성</li>
                    <li>2. 추천인 확보</li>
                    <li>3. 서류 제출</li>
                    <li>4. 심사 및 승인</li>
                    <li>5. 가입비 납부</li>
                  </ol>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
                  가입 신청하기
                </button>
              </div>
            </div>
          </div>
        );
      case 'volunteer':
        return <VolunteerApplication />;
      case 'meeting':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">정기회의 자료</h2>
            <div className="space-y-6">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-900">회의 일정</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white p-3 rounded border">
                    <div>
                      <h4 className="font-semibold">2024년 1분기 정기총회</h4>
                      <p className="text-sm text-gray-600">2024년 3월 15일 (금) 오후 2시</p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      예정
                    </span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-3 rounded border">
                    <div>
                      <h4 className="font-semibold">2023년 4분기 정기총회</h4>
                      <p className="text-sm text-gray-600">2023년 12월 20일 (수) 오후 2시</p>
                    </div>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                      완료
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">회의 자료 다운로드</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">2023년 4분기 회의록</span>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        다운로드
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">사업보고서 2023</span>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        다운로드
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">예산안 2024</span>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                        다운로드
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">회의 참석 안내</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 회의 30분 전까지 도착</li>
                    <li>• 회의 자료 미리 검토</li>
                    <li>• 의견서 사전 제출 가능</li>
                    <li>• 온라인 참석 옵션 제공</li>
                    <li>• 회의록 확인 및 의견 제시</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'donation':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">후원 & 기부 안내</h2>
            <div className="space-y-6">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-yellow-900">후원 분야</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-yellow-800 mb-2">교육 지원</h4>
                    <p className="text-sm text-yellow-700">지역 교육 프로그램 및 장학금 지원</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-yellow-800 mb-2">환경 보전</h4>
                    <p className="text-sm text-yellow-700">지역 환경 개선 및 보전 사업</p>
                  </div>
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-yellow-800 mb-2">문화 사업</h4>
                    <p className="text-sm text-yellow-700">문화시설 운영 및 프로그램 지원</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">기부 방법</h3>
                  <div className="space-y-3">
                    <div className="border border-gray-200 p-3 rounded">
                      <h4 className="font-semibold mb-1">계좌이체</h4>
                      <p className="text-sm text-gray-600">화전조합 123-456-789012</p>
                    </div>
                    <div className="border border-gray-200 p-3 rounded">
                      <h4 className="font-semibold mb-1">현금 기부</h4>
                      <p className="text-sm text-gray-600">조합 사무실 직접 방문</p>
                    </div>
                    <div className="border border-gray-200 p-3 rounded">
                      <h4 className="font-semibold mb-1">물품 기부</h4>
                      <p className="text-sm text-gray-600">사전 문의 후 기부</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">기부 혜택</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 기부금 영수증 발급 (세액공제)</li>
                    <li>• 기부자 명단 게시 (희망시)</li>
                    <li>• 조합 시설 이용 혜택</li>
                    <li>• 기부금 사용 내역 공개</li>
                    <li>• 감사 인사장 발급</li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition-colors text-lg font-semibold">
                  기부하기
                </button>
              </div>
            </div>
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
          onValueChange={handleTabChange}
          className="mb-8"
        />
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Participate;
