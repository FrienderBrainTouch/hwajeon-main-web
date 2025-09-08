import React from 'react';
import CustomPagination from '@/components/ui/CustomPagination';
import { Button } from '@/components/ui/button';
import { Settings, Edit, Trash2 } from 'lucide-react';

export interface BoardItem {
  id: number;
  title: string;
  date: string;
}

interface BoardListProps {
  items: BoardItem[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onItemClick?: (item: BoardItem) => void;
  showAdminActions?: boolean;
  onEdit?: (item: BoardItem) => void;
  onDelete?: (item: BoardItem) => void;
  onSettings?: () => void;
}

const BoardList: React.FC<BoardListProps> = ({
  items,
  currentPage,
  totalPages,
  onPageChange,
  onItemClick,
  showAdminActions = false,
  onEdit,
  onDelete,
  onSettings,
}) => {
  return (
    <div className="w-full">
      {/* 게시판 목록 테이블 */}
      <div className="bg-white overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-base font-bold text-gray-700 uppercase tracking-wider w-20">
                번호
              </th>
              <th className="px-6 py-4 text-center text-base font-bold text-gray-700 uppercase tracking-wider">
                제목
              </th>
              <th className="px-6 py-4 text-right text-base font-bold text-gray-700 uppercase tracking-wider w-32">
                작성일
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onItemClick?.(item)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex-1 flex justify-center">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>

        {/* 관리자 액션 버튼들 */}
        {showAdminActions && (
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="sm" onClick={onSettings} className="p-2">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onEdit?.(items[0])} className="p-2">
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete?.(items[0])}
              className="p-2 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardList;
