import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { DashboardStatsProps } from '@/types/components/admin';

export const DashboardStats = ({
  selectedCategory,
  searchTerm,
  categoryInfo,
  onCategoryChange,
  onSearchChange,
  onCreatePost,
}: DashboardStatsProps) => {
  return (
    <>
      {/* 상단 액션 버튼 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">게시글 관리</h2>
        <Button onClick={onCreatePost}>새 게시글 작성</Button>
      </div>

      {/* 필터 및 검색 */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* 검색 */}
          <div className="flex-1">
            <Input
              placeholder="제목 또는 내용으로 검색..."
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full"
            />
          </div>

          {/* 카테고리 필터 */}
          <div className="sm:w-48">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
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
      </div>
    </>
  );
};
