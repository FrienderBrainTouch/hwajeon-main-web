import { type BaseItem, type DetailProps } from '@/types/components';

const Detail = <T extends BaseItem>({
  item,
  onBackToList,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
  showDate = true,
}: DetailProps<T>) => {
  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-8 px-4 sm:px-0">
      {/* 상단 정보 섹션 */}
      <div className="bg-white border-b border-gray-200 pb-4 sm:pb-6 mb-4 sm:mb-6">
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-500 font-medium">제목</span>
            <p className="text-base sm:text-lg text-gray-900 font-semibold mt-1 break-words">
              {item.title}
            </p>
          </div>
          {showDate && (
            <div>
              <span className="text-sm text-gray-500 font-medium">작성일</span>
              <p className="text-sm sm:text-base text-gray-700 mt-1">{item.date}</p>
            </div>
          )}
          {item.author && (
            <div>
              <span className="text-sm text-gray-500 font-medium">작성자</span>
              <p className="text-sm sm:text-base text-gray-700 mt-1">{item.author}</p>
            </div>
          )}
        </div>
      </div>

      {/* 중앙 내용 섹션 */}
      <div className="bg-white min-h-[300px] sm:min-h-[400px] py-4 sm:py-8">
        <div className="prose prose-gray max-w-none">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
            {item.content ||
              '게시물 내용이 여기에 표시됩니다. 실제 구현 시에는 content 필드를 추가하여 상세 내용을 저장할 수 있습니다.'}
          </p>
        </div>
      </div>

      {/* 첨부파일 섹션 */}
      {item.files && item.files.length > 0 && (
        <div className="bg-white py-4 sm:py-8">
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">첨부파일</h3>
            <div className="space-y-2">
              {item.files.map((file, index) => {
                // URL에서 파일명 추출
                const getFileName = (url: string) => {
                  try {
                    const urlObj = new URL(url);
                    const pathname = urlObj.pathname;
                    const fileName = pathname.split('/').pop() || '';

                    // 파일명이 있으면 디코딩, 없으면 기본값
                    if (fileName) {
                      return decodeURIComponent(fileName);
                    }
                    return `첨부파일_${index + 1}`;
                  } catch {
                    return `첨부파일_${index + 1}`;
                  }
                };

                const fileName = getFileName(file.fileUrl);

                return (
                  <div
                    key={file.fileId}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700 font-medium">{fileName}</span>
                        <span className="text-xs text-gray-500">첨부파일 {index + 1}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(file.fileUrl, '_blank')}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      다운로드
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 버튼 */}
      <div className="flex flex-col sm:flex-row justify-center mt-6 sm:mt-8 space-y-2 sm:space-y-0 sm:space-x-4">
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

export default Detail;
