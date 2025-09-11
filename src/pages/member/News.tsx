import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';
import { useTabState } from '@/hooks/useTabState';
import { BoardWrapper, GalleryWrapper, EventCalendarTab, EventList } from '@/components/news';
import { newsData, galleryData, monthlyEventData, eventListData } from '@/components/news/data';

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
            <BoardWrapper title="공지사항" boardType="announcements" itemsPerPage={10} />
          </div>
        );
      case 'news':
        return (
          <div className="py-8">
            <GalleryWrapper
              title="화전 소식"
              items={newsData.newsItems}
              boardType="news"
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
              type="gallery"
            />
          </div>
        );
      case 'calendar':
        return (
          <div className="space-y-6">
            <EventCalendarTab events={monthlyEventData} />
            <EventList events={eventListData} itemsPerPage={4} />
          </div>
        );
      case 'archive':
        return (
          <div className="py-8">
            <BoardWrapper title="자료실" boardType="archive" itemsPerPage={10} />
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
