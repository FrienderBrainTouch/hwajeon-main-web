import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';
import { postsApi } from '@/api/admin/posts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Post, PostCategory } from './data';
import { categoryInfo } from './data';
import type { GetPostsParams } from '@/api/admin/types/posts';

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

  const handleCategoryChange = (category: PostCategory) => {
    setSelectedCategory(category);
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
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">화전 관리자 대시보드</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">안녕하세요, {user?.realName}님</span>
              <Button variant="outline" onClick={logout}>
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* 상단 액션 버튼 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">게시글 관리</h2>
            <Button onClick={handleCreatePost}>새 게시글 작성</Button>
          </div>

          {/* 필터 및 검색 */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* 검색 */}
              <div className="flex-1">
                <Input
                  placeholder="제목 또는 내용으로 검색..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>

              {/* 카테고리 필터 */}
              <div className="sm:w-48">
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categoryInfo).map(([key, info]) => (
                      <SelectItem key={key} value={key}>
                        {info.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 결과 정보 */}
            <div className="mt-4 text-sm text-gray-600">
              총 {filteredPosts.length}개의 게시글
              {` (${getCategoryLabel(selectedCategory)} 카테고리)`}
              {searchTerm && ` - "${searchTerm}" 검색 결과`}
            </div>
          </div>

          {/* 게시글 목록 */}
          {getPostsApi.loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">게시글을 불러오는 중...</p>
            </div>
          ) : getPostsApi.error ? (
            <div className="text-center py-8">
              <p className="text-red-500">게시글을 불러오는데 실패했습니다: {getPostsApi.error}</p>
            </div>
          ) : paginatedPosts.length > 0 ? (
            <div className="space-y-4">
              {paginatedPosts.map((post) => (
                <Card key={post.id} className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">{getCategoryLabel(post.category)}</Badge>
                        {getCategoryViewType(post.category) === 'THUMBNAIL' && (
                          <Badge variant="secondary">썸네일</Badge>
                        )}
                        {post.eventDate && <Badge variant="default">행사</Badge>}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                      {post.thumbnail && (
                        <div className="mb-3">
                          <img
                            src={post.thumbnail}
                            alt="썸네일"
                            className="w-24 h-24 object-cover rounded"
                          />
                        </div>
                      )}
                      <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                      {post.eventDate && (
                        <p className="text-sm text-blue-600 mb-2">
                          행사일: {new Date(post.eventDate).toLocaleString()}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>작성자: {post.author}</span>
                        <span>조회수: {post.views}</span>
                        <span>작성일: {new Date(post.createdAt).toLocaleDateString()}</span>
                        {post.updatedAt !== post.createdAt && (
                          <span>수정일: {new Date(post.updatedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                        수정
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePost(post)}
                        disabled={deletePostApi.loading}
                      >
                        {deletePostApi.loading ? '삭제 중...' : '삭제'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                {searchTerm ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}
              </div>
              <div className="text-gray-400 text-sm mt-2">
                {searchTerm ? '다른 검색어를 시도해보세요.' : '새 게시글을 작성해보세요.'}
              </div>
            </div>
          )}

          {/* 페이징 */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
              >
                이전
              </Button>

              <div className="flex space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page + 1}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
              >
                다음
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
