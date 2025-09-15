import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import { useApi } from '@/hooks/useApi';
import { memberPostsApi } from '@/api/member';
import type { PostCategory } from '@/types/api';
import { type BoardItem, type BoardWrapperProps } from '@/types/components';

const BoardWrapper: React.FC<BoardWrapperProps> = ({
  title,
  boardType,
  itemsPerPage = 10,
  onItemClick,
  showAdminActions = false,
  onEdit,
  onDelete,
  onSettings,
  showTitle = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<BoardItem | null>(null);

  // boardType을 postType으로 매핑
  const getPostType = (boardType: string): PostCategory => {
    switch (boardType) {
      case 'announcements':
        return 'NOTICE';
      case 'archive':
        return 'ARCHIVE';
      case 'meeting':
        return 'MEETING';
      default:
        return 'NOTICE';
    }
  };

  // API 호출
  const getPostsApi = useApi(memberPostsApi.getPosts);
  const getPostDetailApi = useApi(memberPostsApi.getPostDetail);
  const postType = getPostType(boardType);

  // API 데이터를 BoardItem 형태로 변환
  const items: BoardItem[] =
    getPostsApi.data?.content.map((post: any) => ({
      id: post.postId,
      title: post.title,
      content: '', // PostSummary에는 content가 없음
      author: '', // PostSummary에는 author가 없음
      date: post.createdAt.split('T')[0], // 날짜만 추출 (YYYY-MM-DD)
      views: 0, // 기본값
    })) || [];

  // boardType이 변경될 때마다 API 호출
  useEffect(() => {
    getPostsApi.execute({ postType, page: currentPage - 1, size: itemsPerPage });
  }, [boardType, currentPage, itemsPerPage]);

  // URL 파라미터에서 아이템 ID와 페이지 확인 (탭별로 독립적)
  const itemId = searchParams.get(`${boardType}_id`);
  const page = searchParams.get(`${boardType}_page`);

  // URL 파라미터가 변경될 때 상태 업데이트
  useEffect(() => {
    if (itemId) {
      // 상세 조회 API 호출
      getPostDetailApi.execute({ postId: parseInt(itemId) });
    } else {
      setSelectedItem(null);
    }
  }, [itemId]);

  // 상세 조회 API 응답 처리
  useEffect(() => {
    if (getPostDetailApi.data && itemId) {
      const detailData = getPostDetailApi.data;
      const item: BoardItem = {
        id: parseInt(itemId),
        title: detailData.title,
        content: detailData.content,
        date: detailData.createAt.split('T')[0], // 날짜만 추출 (YYYY-MM-DD)
        files: detailData.fileUrls, // 파일 정보 추가
      };
      setSelectedItem(item);
    }
  }, [getPostDetailApi.data, itemId]);

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

  // 로딩 및 에러 상태 처리
  if (getPostsApi.loading) {
    return (
      <div className="w-full max-w-5xl mx-auto py-8">
        <div className="text-center">
          {showTitle && (
            <>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
              <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
            </>
          )}
          <div className="py-8">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (getPostsApi.error) {
    return (
      <div className="w-full max-w-5xl mx-auto py-8">
        <div className="text-center">
          {showTitle && (
            <>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
              <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
            </>
          )}
          <div className="py-8 text-red-500">
            데이터를 불러오는데 실패했습니다: {getPostsApi.error}
          </div>
        </div>
      </div>
    );
  }

  // 페이지네이션 계산 (API에서 받은 데이터 사용)
  const totalPages = getPostsApi.data?.totalPages || 1;
  const currentItems = items;

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

    // 상세 조회 로딩 중
    if (getPostDetailApi.loading) {
      return (
        <div className="w-full max-w-5xl mx-auto py-8">
          <div className="text-center">
            {showTitle && (
              <>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
                <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
              </>
            )}
            <div className="py-8">게시글을 불러오는 중...</div>
          </div>
        </div>
      );
    }

    // 상세 조회 에러
    if (getPostDetailApi.error) {
      return (
        <div className="w-full max-w-5xl mx-auto py-8">
          <div className="text-center">
            {showTitle && (
              <>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
                <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
              </>
            )}
            <div className="py-8 text-red-500">
              게시글을 불러오는데 실패했습니다: {getPostDetailApi.error}
            </div>
            <button
              onClick={handleBackToList}
              className="mt-4 px-6 py-3 rounded-lg text-base font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
            >
              목록으로 돌아가기
            </button>
          </div>
        </div>
      );
    }

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
      {showTitle && (
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
          <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        </div>
      )}

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
