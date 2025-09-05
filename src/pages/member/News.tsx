import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import { BoardWrapper, GalleryWrapper } from '@/components/news';
import {
  noticeData,
  archiveData,
  newsData,
  galleryData,
  // calendarData,
} from '@/components/news/data';

function News() {
  const tabs: TabItem[] = [
    { id: 'announcements', label: '공지사항', value: 'announcements' },
    { id: 'news', label: '회전 소식', value: 'news' },
    { id: 'gallery', label: '활동 갤러리', value: 'gallery' },
    { id: 'calendar', label: '행사 캘린더', value: 'calendar' },
    { id: 'archive', label: '자료실', value: 'archive' },
  ];

  const { activeTab, handleTabChange } = useTabState(tabs, 'announcements');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'announcements':
        return (
          <div className="py-8">
            <BoardWrapper
              title="공지사항"
              items={noticeData.notices}
              boardType="announcements"
              itemsPerPage={10}
            />
          </div>
        );
      case 'news':
        return (
          <div className="py-8">
            <GalleryWrapper
              title="화전 소식"
              items={newsData.newsItems}
              boardType="news"
              itemsPerPage={9}
              type="news"
            />
          </div>
        );
      case 'gallery':
        return (
          <div className="py-8">
            <GalleryWrapper
              title="활동 갤러리"
              items={galleryData.galleryItems}
              boardType="gallery"
              itemsPerPage={9}
              type="gallery"
            />
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
            <BoardWrapper
              title="자료실"
              items={archiveData.archives}
              boardType="archive"
              itemsPerPage={10}
            />
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

export default News;
