import React, { useState, useEffect } from 'react';
import BoardList, { type BoardItem } from '@/components/news/BoardList';
import BoardDetail from '@/components/news/BoardDetail';
import { meetingMaterialsData } from './data/meetingMaterialsData';

const MeetingMaterials: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<BoardItem | null>(null);
  const totalPages = 3;

  // 정기회의 자료 데이터
  const meetingMaterials = meetingMaterialsData;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemClick = (item: BoardItem) => {
    setSelectedItem(item);
    // 브라우저 히스토리에 상세 페이지 상태 추가
    window.history.pushState({ detail: true, itemId: item.id }, '', `?detail=${item.id}`);
  };

  const handleBackToList = () => {
    setSelectedItem(null);
    // 브라우저 히스토리에서 상세 페이지 상태 제거
    window.history.pushState({ detail: false }, '', window.location.pathname);
  };

  // 브라우저 뒤로 가기 버튼 처리
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.detail === false || !event.state?.detail) {
        setSelectedItem(null);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handlePrevious = () => {
    const currentIndex = meetingMaterials.findIndex((item) => item.id === selectedItem?.id);
    if (currentIndex > 0) {
      const prevItem = meetingMaterials[currentIndex - 1];
      setSelectedItem(prevItem);
      window.history.pushState({ detail: true, itemId: prevItem.id }, '', `?detail=${prevItem.id}`);
    }
  };

  const handleNext = () => {
    const currentIndex = meetingMaterials.findIndex((item) => item.id === selectedItem?.id);
    if (currentIndex < meetingMaterials.length - 1) {
      const nextItem = meetingMaterials[currentIndex + 1];
      setSelectedItem(nextItem);
      window.history.pushState({ detail: true, itemId: nextItem.id }, '', `?detail=${nextItem.id}`);
    }
  };

  const currentIndex = selectedItem
    ? meetingMaterials.findIndex((item) => item.id === selectedItem.id)
    : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < meetingMaterials.length - 1;

  // 상세 페이지가 선택된 경우
  if (selectedItem) {
    return (
      <BoardDetail
        item={selectedItem}
        onBackToList={handleBackToList}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      {/* 헤더 섹션 */}
      <div className="mb-8 sm:mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">정기회의 자료</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          조합의 투명한 운영과 정보 공유를 위해 정기회의 자료와 주요 회의 자료를 정리하여
          공개합니다. <br />
          필요한 자료를 자유롭게 열람하고 다운로드하실 수 있습니다.
        </p>
      </div>

      {/* 정기회의 자료 목록 */}
      <BoardList
        items={meetingMaterials}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onItemClick={handleItemClick}
        showAdminActions={false}
      />
    </div>
  );
};

export default MeetingMaterials;
