import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';
import { postsApi } from '@/api/admin/posts';
import { DashboardHeader, DashboardStats, DashboardTable } from '@/components/admin';
import type { Post, PostCategory } from '@/types/api/common';
import { categoryInfo } from '@/types/ui/admin';
import type { GetPostsParams } from '@/types/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PostCategory>('NOTICE');
  const [searchTerm, setSearchTerm] = useState('');
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
      };

      console.log('게시글 조회 요청 파라미터:', params);
      console.log('요청 카테고리:', category);

      const result = await getPostsApi.execute(params);
      if (result) {
        console.log('API 응답 데이터:', result);

        // PostSummary를 Post 타입으로 변환
        const mappedPosts: Post[] = result.content.map((post) => {
          console.log('게시글 데이터:', post);
          console.log('postType:', result.postType);

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
          };
        });

        console.log('매핑된 게시글:', mappedPosts);
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
  }, [selectedCategory, currentPage]);

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
    setSelectedCategory(category as PostCategory);
    setCurrentPage(0); // 카테고리 변경 시 첫 페이지로 (0부터 시작)
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // 검색은 클라이언트 사이드에서 필터링하므로 페이지 변경 불필요
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
            categoryInfo={categoryInfo}
            onCategoryChange={handleCategoryChange}
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
