import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomPagination from '@/components/ui/CustomPagination';
import Detail from './Detail';
import { type EventData, type EventListProps } from '@/types/components';
import { type CategoryFilter, LIST_CATEGORY_CONFIG } from '@/types/ui';
import { useApi } from '../../hooks/useApi';
import { memberPostsApi } from '../../api/member';

function EventList({ events, itemsPerPage = 4 }: EventListProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // API 호출 (상세 조회용)
  const getPostDetailApi = useApi(memberPostsApi.getPostDetail);

  // URL에서 이벤트 ID 확인
  const eventId = searchParams.get('event_id');

  // URL 파라미터에 따른 상세 보기 처리
  useEffect(() => {
    if (eventId && events.length > 0) {
      const event = events.find((e) => e.postId.toString() === eventId);
      if (event) {
        setSelectedEvent(event);
      }
    } else {
      setSelectedEvent(null);
    }
  }, [eventId, events]);

  // 이벤트 상세 조회
  useEffect(() => {
    if (selectedEvent) {
      const fetchEventDetail = async () => {
        try {
          const response = await getPostDetailApi.execute({
            postId: selectedEvent.postId,
          });

          if (response) {
            // 상세 데이터로 이벤트 정보 업데이트
            const updatedEvent: EventData = {
              ...selectedEvent,
              content: response.content || selectedEvent.content,
              author: (response as any).author || '',
              files:
                (response as any).fileUrls?.map((url: string, index: number) => ({
                  fileId: index + 1,
                  fileUrl: url,
                })) || [],
            };
            setSelectedEvent(updatedEvent);
          }
        } catch (error) {
          console.error('이벤트 상세 정보를 가져오는 중 오류 발생:', error);
        }
      };

      fetchEventDetail();
    }
  }, [selectedEvent?.id]);

  // 이벤트 클릭 핸들러
  const handleEventClick = (event: EventData) => {
    setSearchParams({ event_id: event.postId.toString() });
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    setSearchParams({});
  };

  // 이전/다음 이벤트
  const handlePrevious = () => {
    if (selectedEvent) {
      const currentIndex = filteredEvents.findIndex((e) => e.postId === selectedEvent.postId);
      if (currentIndex > 0) {
        setSearchParams({ event_id: filteredEvents[currentIndex - 1].postId.toString() });
      }
    }
  };

  const handleNext = () => {
    if (selectedEvent) {
      const currentIndex = filteredEvents.findIndex((e) => e.postId === selectedEvent.postId);
      if (currentIndex < filteredEvents.length - 1) {
        setSearchParams({ event_id: filteredEvents[currentIndex + 1].postId.toString() });
      }
    }
  };

  // 카테고리별 필터링
  const filteredEvents =
    selectedCategory === 'all'
      ? events
      : events.filter((event) => event.category === selectedCategory);

  // 페이지네이션
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: CategoryFilter) => {
    setSelectedCategory(category);
    setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 상세 보기 상태
  if (selectedEvent) {
    // EventData를 BaseItem 형태로 변환
    const baseItem = {
      id: selectedEvent.id,
      title: selectedEvent.title,
      date: selectedEvent.activityDate,
      content: selectedEvent.content,
      author: selectedEvent.author,
      files: selectedEvent.files,
    };

    return (
      <Detail
        item={baseItem}
        onBackToList={handleBackToList}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={filteredEvents.findIndex((e) => e.postId === selectedEvent.postId) > 0}
        hasNext={
          filteredEvents.findIndex((e) => e.postId === selectedEvent.postId) <
          filteredEvents.length - 1
        }
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-lg p-6">
        {/* 카테고리 탭 */}
        <div className="flex gap-2 mb-6">
          {Object.entries(LIST_CATEGORY_CONFIG).map(([key, config]) => (
            <button
              key={key}
              onClick={() => handleCategoryChange(key as CategoryFilter)}
              className={`px-4 py-2 rounded-lg text-md font-semibold transition-colors ${
                selectedCategory === key
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {config.name}
            </button>
          ))}
        </div>

        {/* 이벤트 리스트 */}
        <div className="space-y-4">
          {paginatedEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* 이미지 영역 */}
              <div className="flex-shrink-0 w-full sm:w-32 h-32 sm:h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                {event.thumbnailUrl ? (
                  <img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">이미지</span>
                )}
              </div>

              {/* 이벤트 정보 */}
              <div className="flex-1">
                {/* 카테고리 태그 */}
                <div className="mb-2">
                  <span
                    className="inline-block px-2 py-1 text-xs font-medium text-white rounded"
                    style={{ backgroundColor: LIST_CATEGORY_CONFIG[event.category].color }}
                  >
                    {LIST_CATEGORY_CONFIG[event.category].name}
                  </span>
                </div>

                {/* 제목 */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{event.title}</h3>

                {/* 내용 */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.content}</p>

                {/* 이벤트 정보 */}
                <div className="space-y-1">
                  {/* 날짜 */}
                  <div className="text-sm text-gray-500">{event.activityDate}</div>

                  {/* 시간 */}
                  {event.time && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">시간:</span> {event.time}
                    </div>
                  )}

                  {/* 장소 */}
                  {event.location && (
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">장소:</span> {event.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 0 && (
          <div className="flex items-center justify-center mt-6">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default EventList;
