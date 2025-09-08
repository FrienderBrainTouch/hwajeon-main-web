import React from 'react';
import CustomPagination from '@/components/ui/CustomPagination';
import { type GalleryItem, type NewsItem } from './data/types';

type GalleryItemType = GalleryItem | NewsItem;

interface GalleryListProps {
  items: GalleryItemType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onItemClick?: (item: GalleryItemType) => void;
  type?: 'news' | 'gallery'; // News는 카드 형태, Gallery는 이미지 위에 제목 오버레이
}

const GalleryList: React.FC<GalleryListProps> = ({
  items,
  currentPage,
  totalPages,
  onPageChange,
  onItemClick,
  type = 'news',
}) => {
  return (
    <div className="w-full">
      {/* 갤러리 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onItemClick?.(item)}
          >
            {type === 'news' ? (
              // News 타입: 카드 형태 (이미지 + 제목 + 본문 + 날짜)
              <>
                {/* 이미지 */}
                <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center">
                  {'imageUrl' in item && item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">이미지</span>
                  )}
                </div>

                {/* 내용 */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-1">{item.content}</p>
                  <p className="text-gray-500 text-xs">{item.date}</p>
                </div>
              </>
            ) : (
              // Gallery 타입: 이미지 위에 제목 오버레이
              <div className="aspect-[4/3] bg-gray-200 flex items-center justify-center relative">
                {'imageUrl' in item && item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">이미지</span>
                )}

                {/* 제목 오버레이 */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-lg font-semibold text-black line-clamp-2">{item.title}</h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default GalleryList;
