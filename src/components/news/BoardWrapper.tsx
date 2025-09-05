import React, { useState } from 'react';
import BoardList, { type BoardItem } from './BoardList';

interface BoardWrapperProps {
  title: string;
  items: BoardItem[];
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
  itemsPerPage = 10,
  onItemClick,
  showAdminActions = false,
  onEdit,
  onDelete,
  onSettings,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 페이지네이션 계산 (최신 게시물이 위에 오도록)
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex).reverse();

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        totalItems={items.length}
        onPageChange={handlePageChange}
        onItemClick={onItemClick}
        showAdminActions={showAdminActions}
        onEdit={onEdit}
        onDelete={onDelete}
        onSettings={onSettings}
      />
    </div>
  );
};

export default BoardWrapper;
