import { useState } from 'react';
import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';

function News() {
  const [activeTab, setActiveTab] = useState('announcements');

  const tabs: TabItem[] = [
    { id: 'announcements', label: '공지사항', value: 'announcements' },
    { id: 'news', label: '회전 소식', value: 'news' },
    { id: 'gallery', label: '활동 갤러리', value: 'gallery' },
    { id: 'calendar', label: '행사 캘린더', value: 'calendar' },
    { id: 'archive', label: '자료실', value: 'archive' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'announcements':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">공지사항</h2>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    화전 조합 정기총회 개최 안내
                  </h3>
                  <span className="text-sm text-gray-500">2024.01.15</span>
                </div>
                <p className="text-gray-600">
                  2024년 정기총회가 2월 15일 오후 2시에 화전 조합 회의실에서 개최됩니다...
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">도시재생 사업 설명회 개최</h3>
                  <span className="text-sm text-gray-500">2024.01.10</span>
                </div>
                <p className="text-gray-600">
                  화전 지역 도시재생 사업에 대한 설명회가 1월 25일 개최됩니다...
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    카페27b 운영시간 변경 안내
                  </h3>
                  <span className="text-sm text-gray-500">2024.01.05</span>
                </div>
                <p className="text-gray-600">
                  카페27b의 운영시간이 변경되었습니다. 자세한 내용은 공지사항을 확인해주세요...
                </p>
              </div>
            </div>
          </div>
        );
      case 'news':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">회전 소식</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    화전 지역 상권 활성화 프로젝트 성과
                  </h3>
                  <span className="text-sm text-gray-500">2024.01.20</span>
                </div>
                <p className="text-gray-600 mb-4">
                  화전 지역 상권 활성화를 위한 다양한 프로그램들이 성공적으로 진행되고 있습니다.
                  지역 상인들과의 협력을 통해 새로운 상권 문화를 만들어가고 있습니다.
                </p>
                <div className="flex space-x-4 text-sm text-blue-600">
                  <span>#상권활성화</span>
                  <span>#지역경제</span>
                  <span>#협력프로그램</span>
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">화전 문화축제 성공적 개최</h3>
                  <span className="text-sm text-gray-500">2024.01.18</span>
                </div>
                <p className="text-gray-600 mb-4">
                  지난 주말 화전 문화축제가 대성공을 거두었습니다. 지역주민들의 적극적인 참여와
                  다양한 문화 프로그램으로 화전의 매력을 널리 알렸습니다.
                </p>
                <div className="flex space-x-4 text-sm text-blue-600">
                  <span>#문화축제</span>
                  <span>#지역주민</span>
                  <span>#성공개최</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">활동 갤러리</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">갤러리 이미지 1</span>
              </div>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">갤러리 이미지 2</span>
              </div>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">갤러리 이미지 3</span>
              </div>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">갤러리 이미지 4</span>
              </div>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">갤러리 이미지 5</span>
              </div>
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">갤러리 이미지 6</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                더보기
              </button>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">행사 캘린더</h2>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-7 gap-2 mb-4">
                <div className="text-center font-semibold text-gray-600 py-2">일</div>
                <div className="text-center font-semibold text-gray-600 py-2">월</div>
                <div className="text-center font-semibold text-gray-600 py-2">화</div>
                <div className="text-center font-semibold text-gray-600 py-2">수</div>
                <div className="text-center font-semibold text-gray-600 py-2">목</div>
                <div className="text-center font-semibold text-gray-600 py-2">금</div>
                <div className="text-center font-semibold text-gray-600 py-2">토</div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }, (_, i) => (
                  <div
                    key={i}
                    className="h-12 border border-gray-100 rounded flex items-center justify-center text-sm"
                  >
                    {i > 6 && i < 32 ? (
                      <span
                        className={
                          i === 15
                            ? 'bg-blue-100 text-blue-600 font-semibold px-2 py-1 rounded'
                            : ''
                        }
                      >
                        {i - 6}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span className="text-sm">2월 15일 - 정기총회</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">2월 20일 - 문화축제</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-purple-500 rounded"></div>
                <span className="text-sm">2월 25일 - 교육 프로그램</span>
              </div>
            </div>
          </div>
        );
      case 'archive':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">자료실</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">화전 조합 정관</h3>
                    <p className="text-sm text-gray-600">PDF 파일 • 2.3MB</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    다운로드
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">도시재생 사업 계획서</h3>
                    <p className="text-sm text-gray-600">PDF 파일 • 5.1MB</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    다운로드
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">회의록 모음 (2023년)</h3>
                    <p className="text-sm text-gray-600">ZIP 파일 • 8.7MB</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    다운로드
                  </button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-900">사업보고서 2023</h3>
                    <p className="text-sm text-gray-600">PDF 파일 • 3.2MB</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                    다운로드
                  </button>
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <TabNavigation
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        />
        {renderTabContent()}
      </div>
    </div>
  );
}

export default News;
