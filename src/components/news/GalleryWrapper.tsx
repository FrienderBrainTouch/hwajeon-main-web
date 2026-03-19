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
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [pagePosts, setPagePosts] = useState<any[]>([]);

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
  const getPostDetailApi = useApi(memberPostsApi.getPostDetail);

  // 게시글 목록 조회
  // 서버가 "오래된 글부터" 페이징하는 경우에도 UI는 "최신 글 9개를 1페이지"에 보여주기 위해
  // 필요한 서버 페이지(1~2개)를 가져와 최신순으로 재청킹한다.
  useEffect(() => {
    let cancelled = false;

    const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

    const fetchPage = async (page: number) => {
      const res = await memberPostsApi.getPosts({ postType, page, size: itemsPerPage });
      if (!res.success) throw new Error(res.message || 'API 요청에 실패했습니다.');
      return res.data!;
    };

    const run = async () => {
      setListLoading(true);
      setListError(null);
      try {
        // 메타 확보
        const meta = await fetchPage(0);
        const te = meta.totalElements || 0;
        const tp = meta.totalPages || 1;
        if (cancelled) return;
        setTotalPages(tp);

        if (te === 0) {
          setPagePosts([]);
          return;
        }

        // 최신순 UI 페이지 범위(최신 기준)
        const uiStartFromNewest = (currentPage - 1) * itemsPerPage;
        const uiEndFromNewest = uiStartFromNewest + itemsPerPage - 1;
        const maxIndex = te - 1; // oldest 기준

        const oldestIndexStart = clamp(maxIndex - uiEndFromNewest, 0, maxIndex);
        const oldestIndexEnd = clamp(maxIndex - uiStartFromNewest, 0, maxIndex);

        const serverPageStart = Math.floor(oldestIndexStart / itemsPerPage);
        const serverPageEnd = Math.floor(oldestIndexEnd / itemsPerPage);

        const pagesToFetch: number[] = [];
        for (let p = serverPageStart; p <= serverPageEnd; p++) pagesToFetch.push(p);

        const pageDatas = await Promise.all(pagesToFetch.map((p) => fetchPage(p)));
        if (cancelled) return;

        const collected: { globalIndex: number; post: any }[] = [];
        pageDatas.forEach((pd, i) => {
          const serverPage = pagesToFetch[i];
          pd.content.forEach((post: any, idx: number) => {
            const globalIndex = serverPage * itemsPerPage + idx;
            if (globalIndex >= oldestIndexStart && globalIndex <= oldestIndexEnd) {
              collected.push({ globalIndex, post });
            }
          });
        });

        collected.sort((a, b) => a.globalIndex - b.globalIndex);
        setPagePosts(collected.map((x) => x.post).reverse()); // newest-first
      } catch (e: any) {
        if (!cancelled) setListError(e?.message || '서버 오류가 발생했습니다.');
      } finally {
        if (!cancelled) setListLoading(false);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [postType, itemsPerPage, currentPage]);

  // API 데이터를 GalleryItemType으로 변환 (작성일 기준 최신순 정렬)
  const items: GalleryItemType[] =
    pagePosts
      .slice()
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((post: any, index: number) => {
        // 최신순 번호(1부터): UI 페이지 기준
        const displayNumber = (currentPage - 1) * itemsPerPage + index + 1;

        return {
          id: post.postId,
          title: post.title,
          content: post.content || '',
          author: post.author || '',
          date: post.createdAt.split('T')[0], // 날짜만 추출 (YYYY-MM-DD)
          imageUrl: post.thumbnailUrl || '',
          files: post.fileUrls || [],
          displayNumber,
        };
      }) || [];

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
      const rawLinkUrl = (detailData as any).linkUrl as string | undefined;
      const item: GalleryItem = {
        id: parseInt(itemId),
        title: detailData.title,
        content: detailData.content,
        author: (detailData as any).author || '',
        date: detailData.createAt.split('T')[0], // 날짜만 추출 (YYYY-MM-DD)
        imageUrl: (detailData as any).thumbnailUrl || '',
        files: detailData.fileUrls || [],
        linkMeta:
          detailData.linkMeta || (rawLinkUrl ? { linkUrl: rawLinkUrl } : undefined), // 링크 메타 정보 추가(원본 URL fallback)
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
  if (listLoading) {
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

  if (listError) {
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
            데이터를 불러오는데 실패했습니다: {listError}
          </div>
        </div>
      </div>
    );
  }

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
            {type === 'news'
              ? '화전마을관리사회적협동조합의 사업 추진, 운영 현황, 주요 결정 사항 등 조합의 공식 활동과 내부 소식을 전하는 공간입니다.'
              : '화전마을관리사회적협동조합의 사업과 지역 활동이 신문, 방송, 온라인 매체 등에 보도된 기사들을 정리한 공간입니다.'}
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
