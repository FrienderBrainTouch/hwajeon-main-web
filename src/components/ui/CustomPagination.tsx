import React from 'react';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 10,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPaginationItems = () => {
    const items = [];

    // 첫 페이지 버튼 (<<)
    items.push(
      <li key="first">
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base font-bold text-gray-800 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ backgroundColor: '#2C2E5A29' }}
        >
          «
        </button>
      </li>
    );

    // 이전 페이지 버튼 (<)
    items.push(
      <li key="prev">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base font-bold text-gray-800 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ backgroundColor: '#2C2E5A29' }}
        >
          ‹
        </button>
      </li>
    );

    // 페이지 번호들 (화면 크기에 따라 표시 개수 조정)
    const getVisiblePages = () => {
      if (window.innerWidth < 640) return 3; // 모바일: 3개
      if (window.innerWidth < 768) return 5; // sm: 5개
      if (window.innerWidth < 1024) return 7; // md: 7개
      return 10; // lg 이상: 10개
    };

    const visiblePages = getVisiblePages();
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base transition-colors ${
              i === currentPage
                ? 'text-gray-900 font-bold border-b-2 border-gray-900'
                : 'text-gray-800 font-normal hover:text-gray-900'
            }`}
          >
            {i}
          </button>
        </li>
      );
    }

    // 다음 페이지 버튼 (>)
    items.push(
      <li key="next">
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base font-bold text-gray-800 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ backgroundColor: '#2C2E5A29' }}
        >
          ›
        </button>
      </li>
    );

    // 마지막 페이지 버튼 (>>)
    items.push(
      <li key="last">
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm md:text-base font-bold text-gray-800 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ backgroundColor: '#2C2E5A29' }}
        >
          »
        </button>
      </li>
    );

    return items;
  };

  return (
    <nav className="mx-auto flex w-full justify-center px-2 sm:px-4">
      <ul className="flex flex-row items-center gap-1 sm:gap-2 md:gap-3 flex-wrap justify-center">
        {renderPaginationItems()}
      </ul>
    </nav>
  );
};

export default CustomPagination;
