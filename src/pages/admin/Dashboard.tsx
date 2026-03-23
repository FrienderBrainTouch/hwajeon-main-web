import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';
import { postsApi } from '@/api/admin/posts';
import { DashboardHeader, DashboardStats, DashboardTable } from '@/components/admin';
import type { Post, PostCategory } from '@/types/api/common';
import { categoryInfo } from '@/types/ui/admin';
import type { GetPostsParams } from '@/types/api';

const LAST_SELECTED_CATEGORY_KEY = 'admin_last_selected_category';
const LAST_SELECTED_SORT_KEY = 'admin_last_selected_sort';
const DEFAULT_SORT = 'createdDate,desc';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  // localStorage와 URL 파라미터에서 마지막 선택한 카테고리 불러오기
  const [selectedCategory, setSelectedCategory] = useState<PostCategory>(() => {
    // URL 파라미터 우선 확인
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category') as PostCategory | null;
    if (categoryParam && categoryInfo[categoryParam]) {
      localStorage.setItem(LAST_SELECTED_CATEGORY_KEY, categoryParam);
      return categoryParam;
    }
    // URL 파라미터가 없으면 localStorage에서 불러오기
    const saved = localStorage.getItem(LAST_SELECTED_CATEGORY_KEY);
    return (saved as PostCategory) || 'NOTICE';
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState<string>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sortParam = urlParams.get('sort');
    if (sortParam) {
      localStorage.setItem(LAST_SELECTED_SORT_KEY, sortParam);
      return sortParam;
    }
    return localStorage.getItem(LAST_SELECTED_SORT_KEY) || DEFAULT_SORT;
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 10;

  // API 훅들
  const getPostsApi = useApi(postsApi.getPosts);
  const deletePostApi = useApi(postsApi.deletePost);

  // 게시글 조회 함수
  const fetchPosts = async (category: PostCategory, page: number = 0) => {
    try {
      const params: GetPostsParams = {
        postType: category,
        page: page,
        size: postsPerPage,
        sort: selectedSort,
      };

      const result = await getPostsApi.execute(params);
      if (result) {
        const totalElements = result.totalElements || 0;
        const pageNumber = result.pageNumber || 0;

        // PostSummary를 Post 타입으로 변환
        const mappedPosts: Post[] = result.content.map((post, index) => {
          // 내림차순 번호 계산: totalElements - (pageNumber × postsPerPage) - index
          const displayNumber = totalElements - pageNumber * postsPerPage - index;

          return {
            id: post.postId.toString(),
            title: post.title,
            content: '', // PostSummary에는 content가 없음
            category: result.postType as PostCategory,
            createdAt: post.createdAt,
            updatedAt: post.createdAt, // updatedAt이 없으므로 createdAt 사용
            author: '', // PostSummary에는 author가 없음
            views: 0, // 기본값
            thumbnail: post.thumbnailUrl,
            attachments: [], // PostSummary에는 attachments가 없음
            eventDate: undefined, // PostSummary에는 eventDate가 없음
            displayNumber,
          };
        });

        setPosts(mappedPosts);
        setTotalPages(result.totalPages);
      }
    } catch (error) {
      console.error('게시글 조회 실패:', error);
    }
  };

  // 초기 로드 및 카테고리 변경 시 게시글 조회
  useEffect(() => {
    fetchPosts(selectedCategory, currentPage);
  }, [selectedCategory, currentPage, selectedSort]);

  // 검색 필터링된 게시글 계산
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [posts, searchTerm]);

  // 현재 페이지의 게시글 (API에서 이미 페이지네이션된 데이터)
  const paginatedPosts = filteredPosts;

  const handleCreatePost = () => {
    navigate('/admin/create');
  };

  const handleEditPost = (post: Post) => {
    navigate(`/admin/edit/${post.id}?postType=${post.category}`);
  };

  const handleDeletePost = async (post: Post) => {
    if (!window.confirm(`"${post.title}" 게시글을 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await deletePostApi.execute(post.id);
      alert('게시글이 성공적으로 삭제되었습니다.');
      // 삭제 후 현재 페이지의 게시글 목록 다시 조회
      fetchPosts(selectedCategory, currentPage);
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleCategoryChange = (category: string) => {
    const newCategory = category as PostCategory;
    setSelectedCategory(newCategory);
    setCurrentPage(0); // 카테고리 변경 시 첫 페이지로 (0부터 시작)
    // localStorage에 마지막 선택한 카테고리 저장
    localStorage.setItem(LAST_SELECTED_CATEGORY_KEY, newCategory);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // 검색은 클라이언트 사이드에서 필터링하므로 페이지 변경 불필요
  };

  const handleSortChange = (sortValue: string) => {
    setSelectedSort(sortValue);
    setCurrentPage(0);
    localStorage.setItem(LAST_SELECTED_SORT_KEY, sortValue);
  };

  const getCategoryLabel = (category: PostCategory) => {
    return categoryInfo[category]?.name || category;
  };

  const getCategoryViewType = (category: PostCategory) => {
    return categoryInfo[category]?.viewType || 'LIST';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} onLogout={logout} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <DashboardStats
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            selectedSort={selectedSort}
            categoryInfo={categoryInfo}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
            onCreatePost={handleCreatePost}
          />

          <DashboardTable
            posts={paginatedPosts}
            loading={getPostsApi.loading}
            error={getPostsApi.error}
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            totalCount={filteredPosts.length}
            getCategoryLabel={getCategoryLabel}
            getCategoryViewType={getCategoryViewType}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
            deleteLoading={deletePostApi.loading}
          />
        </div>
      </main>
    </div>
  );
}
