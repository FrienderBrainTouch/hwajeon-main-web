import { useState } from 'react';
import CustomPagination from '@/components/ui/CustomPagination';
import { type EventData, type CategoryFilter, LIST_CATEGORY_CONFIG } from './data/types';

interface EventListProps {
  events: EventData[];
  itemsPerPage?: number;
}

function EventList({ events, itemsPerPage = 4 }: EventListProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);

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
              className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              {/* 이미지 영역 */}
              <div className="flex-shrink-0 w-full sm:w-32 h-32 sm:h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">이미지</span>
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

                {/* 날짜 */}
                <div className="text-sm text-gray-500">{event.createdAt}</div>
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
