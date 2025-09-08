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
          className="px-4 py-3 rounded-lg text-base font-bold text-gray-800 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          className="px-4 py-3 rounded-lg text-base font-bold text-gray-800 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ backgroundColor: '#2C2E5A29' }}
        >
          ‹
        </button>
      </li>
    );

    // 페이지 번호들 (최대 10개 페이지 표시)
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`px-4 py-3 rounded-lg text-base transition-colors ${
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
          className="px-4 py-3 rounded-lg text-base font-bold text-gray-800 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          className="px-4 py-3 rounded-lg text-base font-bold text-gray-800 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{ backgroundColor: '#2C2E5A29' }}
        >
          »
        </button>
      </li>
    );

    return items;
  };

  return (
    <nav className="mx-auto flex w-full justify-center">
      <ul className="flex flex-row items-center gap-3">{renderPaginationItems()}</ul>
    </nav>
  );
};

export default CustomPagination;
