import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BoardList, { type BoardItem } from './BoardList';
import BoardDetail from './BoardDetail';

interface BoardWrapperProps {
  title: string;
  items: BoardItem[];
  boardType: string; // 'announcements' 또는 'archive'
  itemsPerPage?: number;
  onItemClick?: (item: BoardItem) => void;
  showAdminActions?: boolean;
  onEdit?: (item: BoardItem) => void;
  onDelete?: (item: BoardItem) => void;
  onSettings?: () => void;
}

const BoardWrapper: React.FC<BoardWrapperProps> = ({
  title,
  items,
  boardType,
  itemsPerPage = 10,
  onItemClick,
  showAdminActions = false,
  onEdit,
  onDelete,
  onSettings,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<BoardItem | null>(null);

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
  const handleItemClick = (item: BoardItem) => {
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

  // 상세 페이지가 선택된 경우
  if (selectedItem) {
    const currentIndex = getCurrentItemIndex();

    return (
      <div className="w-full max-w-5xl mx-auto py-8">
        <BoardDetail
          item={selectedItem}
          onBackToList={handleBackToList}
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentIndex > 0}
          hasNext={currentIndex < items.length - 1}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      {/* 제목 */}
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
      </div>

      {/* 게시판 목록 */}
      <BoardList
        items={currentItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onItemClick={handleItemClick}
        showAdminActions={showAdminActions}
        onEdit={onEdit}
        onDelete={onDelete}
        onSettings={onSettings}
      />
    </div>
  );
};

export default BoardWrapper;
