import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { PostCategory } from '@/types/api/common';
import type { DashboardTableProps } from '@/types/components/admin';

export const DashboardTable = ({
  posts,
  loading,
  error,
  selectedCategory,
  searchTerm,
  totalCount,
  getCategoryLabel,
  getCategoryViewType,
  onEdit,
  onDelete,
  onPageChange,
  currentPage,
  totalPages,
  deleteLoading,
}: DashboardTableProps) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">게시글을 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">게시글을 불러오는데 실패했습니다: {error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 결과 정보 */}
      <div className="text-sm text-gray-600">
        총 {totalCount}개의 게시글
        {` (${getCategoryLabel(selectedCategory as PostCategory)} 카테고리)`}
        {searchTerm && ` - "${searchTerm}" 검색 결과`}
      </div>

      {/* 게시글 목록 */}
      {posts.map((post) => (
        <Card key={post.id} className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{getCategoryLabel(post.category as PostCategory)}</Badge>
                {getCategoryViewType(post.category as PostCategory) === 'THUMBNAIL' && (
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
                <span>작성일: {new Date(post.createdAt).toLocaleString()}</span>
                {post.updatedAt !== post.createdAt && (
                  <span>수정일: {new Date(post.updatedAt).toLocaleString()}</span>
                )}
              </div>
            </div>
            <div className="flex space-x-2 ml-4">
              <Button variant="outline" size="sm" onClick={() => onEdit(post)}>
                수정
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(post)}
                disabled={deleteLoading}
                className="text-red-600 hover:text-red-700"
              >
                {deleteLoading ? '삭제 중...' : '삭제'}
              </Button>
            </div>
          </div>
        </Card>
      ))}

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            이전
          </Button>
          <span className="text-sm text-gray-600">
            {currentPage + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};
