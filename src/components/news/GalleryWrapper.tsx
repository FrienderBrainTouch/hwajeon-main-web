import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import GalleryList from './GalleryList';
import GalleryDetail from './GalleryDetail';
import { type GalleryItem, type NewsItem } from './data/types';

type GalleryItemType = GalleryItem | NewsItem;

interface GalleryWrapperProps {
  title: string;
  items: GalleryItemType[];
  boardType: string; // 'news' 또는 다른 갤러리 타입
  itemsPerPage?: number;
  onItemClick?: (item: GalleryItemType) => void;
  type?: 'news' | 'gallery'; // News는 카드 형태, Gallery는 이미지 위에 제목 오버레이
}

const GalleryWrapper: React.FC<GalleryWrapperProps> = ({
  title,
  items,
  boardType,
  itemsPerPage = 9, // 갤러리는 3x3 그리드로 9개씩
  onItemClick,
  type = 'news',
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // URL 파라미터에서 아이템 ID와 페이지 확인 (탭별로 독립적)
  const itemId = searchParams.get(`${boardType}_id`);
  const page = searchParams.get(`${boardType}_page`);

  // URL 파라미터가 변경될 때 상태 업데이트
  useEffect(() => {
    if (itemId) {
      const item = items.find((item) => item.id === parseInt(itemId));
      if (item) {
        setSelectedItem(item);
      }
    } else {
      setSelectedItem(null);
    }
  }, [itemId, items]);

  // 페이지 파라미터가 변경될 때 상태 업데이트
  useEffect(() => {
    if (page) {
      const pageNum = parseInt(page);
      if (pageNum > 0) {
        setCurrentPage(pageNum);
      }
    } else {
      setCurrentPage(1); // 페이지 파라미터가 없으면 1페이지로 초기화
    }
  }, [page]);

  // 페이지네이션 계산 (최신 게시물이 위에 오도록)
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex).reverse();

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(`${boardType}_page`, page.toString());
    newSearchParams.delete(`${boardType}_id`); // 페이지 변경 시 상세 페이지에서 나가기
    setSearchParams(newSearchParams);
  };

  // 아이템 클릭 핸들러
  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(`${boardType}_id`, item.id.toString());
    setSearchParams(newSearchParams);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  // 목록으로 돌아가기
  const handleBackToList = () => {
    setSelectedItem(null);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(`${boardType}_id`);
    setSearchParams(newSearchParams);
  };

  // 이전/다음 아이템 핸들러
  const getCurrentItemIndex = () => {
    if (!selectedItem) return -1;
    return items.findIndex((item) => item.id === selectedItem.id);
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentItemIndex();
    if (currentIndex > 0) {
      const prevItem = items[currentIndex - 1];
      setSelectedItem(prevItem);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(`${boardType}_id`, prevItem.id.toString());
      setSearchParams(newSearchParams);
    }
  };

  const handleNext = () => {
    const currentIndex = getCurrentItemIndex();
    if (currentIndex < items.length - 1) {
      const nextItem = items[currentIndex + 1];
      setSelectedItem(nextItem);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(`${boardType}_id`, nextItem.id.toString());
      setSearchParams(newSearchParams);
    }
  };

  // 상세 페이지가 선택된 경우 GalleryDetail 컴포넌트 사용
  if (selectedItem) {
    const currentIndex = getCurrentItemIndex();

    return (
      <GalleryDetail
        item={selectedItem}
        onBackToList={handleBackToList}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < items.length - 1}
      />
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      {/* 제목 및 설명 */}
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          화전마을의 이야기가 다양한 언론과 미디어를 통해 전해지고 있습니다. 아래는 조합의 주요
          보도자료와 뉴스 기사들을 모은 공간입니다.
        </p>
      </div>

      {/* 갤러리 목록 */}
      <GalleryList
        items={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onItemClick={handleItemClick}
        type={type}
      />
    </div>
  );
};

export default GalleryWrapper;
