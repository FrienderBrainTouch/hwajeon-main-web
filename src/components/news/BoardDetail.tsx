import React from 'react';
import { type BoardItem } from './data/types';

interface BoardDetailProps {
  item: BoardItem;
  onBackToList: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const BoardDetail: React.FC<BoardDetailProps> = ({
  item,
  onBackToList,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      {/* 상단 정보 섹션 */}
      <div className="bg-white border-b border-gray-200 pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500 font-medium">제목</span>
              <p className="text-lg text-gray-900 font-semibold mt-1">{item.title}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500 font-medium">작성일</span>
              <p className="text-base text-gray-700 mt-1">{item.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 중앙 내용 섹션 */}
      <div className="bg-white min-h-[400px] py-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">내용</h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {item.content ||
                '게시물 내용이 여기에 표시됩니다. 실제 구현 시에는 BoardItem 타입에 content 필드를 추가하여 상세 내용을 저장할 수 있습니다.'}
            </p>
          </div>
        </div>
      </div>

      {/* 하단 네비게이션 버튼 */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`px-6 py-3 rounded-lg text-base font-medium transition-colors ${
            hasPrevious
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          이전
        </button>

        <button
          onClick={onBackToList}
          className="px-6 py-3 rounded-lg text-base font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
        >
          목록
        </button>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`px-6 py-3 rounded-lg text-base font-medium transition-colors ${
            hasNext
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default BoardDetail;
