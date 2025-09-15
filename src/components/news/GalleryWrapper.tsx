import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import GalleryList from './GalleryList';
import GalleryDetail from './GalleryDetail';
import { useApi } from '@/hooks/useApi';
import { memberPostsApi } from '@/api/member';
import type { PostCategory } from '@/types/api';
import {
  type GalleryItem,
  type GalleryItemType,
  type GalleryWrapperProps,
} from '@/types/components';

const GalleryWrapper: React.FC<GalleryWrapperProps> = ({
  title,
  boardType,
  itemsPerPage: propItemsPerPage,
  onItemClick,
  type = 'news',
  showTitle = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [responsiveItemsPerPage, setResponsiveItemsPerPage] = useState(9);

  // boardType을 postType으로 매핑
  const getPostType = (boardType: string): PostCategory => {
    switch (boardType) {
      case 'news':
        return 'NEWS';
      case 'gallery':
        return 'GALLERY';
      default:
        return 'NEWS';
    }
  };

  const postType = getPostType(boardType);
  const itemsPerPage = propItemsPerPage || responsiveItemsPerPage;

  // API 호출
  const getPostsApi = useApi(memberPostsApi.getPosts);
  const getPostDetailApi = useApi(memberPostsApi.getPostDetail);

  // 게시글 목록 조회
  useEffect(() => {
    getPostsApi.execute({
      postType,
      page: currentPage - 1, // API는 0부터 시작
      size: itemsPerPage,
    });
  }, [boardType, currentPage, itemsPerPage, postType]);

  // API 데이터를 GalleryItemType으로 변환
  const items: GalleryItemType[] =
    getPostsApi.data?.content.map((post: any) => ({
      id: post.postId,
      title: post.title,
      content: post.content || '',
      author: post.author || '',
      date: post.createdAt.split('T')[0], // 날짜만 추출 (YYYY-MM-DD)
      imageUrl: post.thumbnailUrl || '',
      files: post.fileUrls || [],
    })) || [];

  // URL 파라미터에서 아이템 ID 확인
  const itemId = searchParams.get(`${boardType}_id`);

  // itemId가 있을 때 상세 조회
  useEffect(() => {
    if (itemId) {
      getPostDetailApi.execute({ postId: parseInt(itemId) });
    }
  }, [itemId]);

  // 상세 조회 데이터를 selectedItem으로 설정
  useEffect(() => {
    if (getPostDetailApi.data && itemId) {
      const detailData = getPostDetailApi.data;
      const item: GalleryItem = {
        id: parseInt(itemId),
        title: detailData.title,
        content: detailData.content,
        author: (detailData as any).author || '',
        date: detailData.createAt.split('T')[0], // 날짜만 추출 (YYYY-MM-DD)
        imageUrl: (detailData as any).thumbnailUrl || '',
        files: detailData.fileUrls || [],
      };
      setSelectedItem(item);
    }
  }, [getPostDetailApi.data, itemId]);

  // URL 변경 감지 (브라우저 뒤로 가기 포함)
  useEffect(() => {
    const currentItemId = searchParams.get(`${boardType}_id`);
    if (!currentItemId) {
      setSelectedItem(null);
    }
  }, [location.search, searchParams, boardType]);

  // 반응형 itemsPerPage 설정
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setResponsiveItemsPerPage(9); // lg: 3x3
      } else if (width >= 768) {
        setResponsiveItemsPerPage(6); // md: 2x3
      } else if (width >= 640) {
        setResponsiveItemsPerPage(5); // sm: 1x5
      } else {
        setResponsiveItemsPerPage(4); // 모바일: 1x4
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // URL 파라미터에서 페이지 확인
  const page = searchParams.get(`${boardType}_page`);

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
      <GalleryDetail
        item={selectedItem}
        onBackToList={handleBackToList}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < items.length - 1}
        type={type}
      />
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      {/* 제목 및 설명 */}
      {showTitle && (
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
          <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            화전마을의 이야기가 다양한 언론과 미디어를 통해 전해지고 있습니다. 아래는 조합의 주요
            보도자료와 뉴스 기사들을 모은 공간입니다.
          </p>
        </div>
      )}

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
