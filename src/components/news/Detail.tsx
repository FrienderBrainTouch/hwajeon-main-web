import { useState } from 'react';
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

      {/* 중앙 내용 섹션 - 줄바꿈(문단) 반영 */}
      <div className="bg-white min-h-[300px] sm:min-h-[400px] py-4 sm:py-8">
        <div className="prose prose-gray max-w-none">
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed break-words whitespace-pre-line">
            {item.content ||
              '게시물 내용이 여기에 표시됩니다. 실제 구현 시에는 content 필드를 추가하여 상세 내용을 저장할 수 있습니다.'}
          </div>
        </div>
      </div>

      {/* 링크 메타 카드뉴스 섹션 */}
      {item.linkMeta && item.linkMeta.linkUrl && (
        <div className="bg-white py-4 sm:py-8">
          <a
            href={item.linkMeta.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col sm:flex-row">
              {/* 이미지 영역 */}
              {item.linkMeta.linkImage && (
                <div className="w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
                  <img
                    src={item.linkMeta.linkImage}
                    alt={item.linkMeta.linkTitle || '링크 미리보기'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 이미지 로드 실패 시 숨김
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              {/* 텍스트 영역 */}
              <div className="flex-1 p-4 sm:p-6">
                {item.linkMeta.linkTitle && (
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.linkMeta.linkTitle}
                  </h3>
                )}
                {item.linkMeta.linkDescription && (
                  <p className="text-sm sm:text-base text-gray-600 mb-2 line-clamp-2">
                    {item.linkMeta.linkDescription}
                  </p>
                )}
                <div className="flex items-center mt-2">
                  <span className="text-xs sm:text-sm text-gray-500 truncate">
                    {(() => {
                      try {
                        const url = new URL(item.linkMeta.linkUrl!);
                        return url.hostname;
                      } catch {
                        return item.linkMeta.linkUrl;
                      }
                    })()}
                  </span>
                  <svg
                    className="w-4 h-4 ml-2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* 첨부파일 섹션 */}
      {((item.fileUrls && item.fileUrls.length > 0) || (item.files && item.files.length > 0)) && (
        <div className="bg-white py-4 sm:py-8">
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">첨부파일</h3>
            {(() => {
              const allFiles = item.fileUrls || item.files || [];

              // 이미지 파일과 문서 파일 분리
              const imageFiles: Array<{
                fileId: number;
                fileUrl: string;
                originalFileName?: string;
                fileName: string;
              }> = [];
              const documentFiles: Array<{
                fileId: number;
                fileUrl: string;
                originalFileName?: string;
                fileName: string;
              }> = [];

              allFiles.forEach(
                (
                  file: { fileId: number; fileUrl: string; originalFileName?: string },
                  index: number
                ) => {
                  const fileName =
                    file.originalFileName ||
                    (() => {
                      try {
                        const urlObj = new URL(file.fileUrl);
                        const pathname = urlObj.pathname;
                        const fileName = pathname.split('/').pop() || '';
                        return fileName ? decodeURIComponent(fileName) : `첨부파일_${index + 1}`;
                      } catch {
                        return `첨부파일_${index + 1}`;
                      }
                    })();

                  const extension = fileName.split('.').pop()?.toLowerCase() || '';
                  const isImageFile = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(
                    extension
                  );

                  if (isImageFile) {
                    imageFiles.push({ ...file, fileName });
                  } else {
                    documentFiles.push({ ...file, fileName });
                  }
                }
              );

              const [currentImageIndex, setCurrentImageIndex] = useState(0);

              return (
                <div className="space-y-4">
                  {/* 이미지 슬라이더 */}
                  {imageFiles.length > 0 && (
                    <div className="space-y-3">
                      <div className="relative">
                        {/* 메인 이미지 */}
                        <div className="w-full max-w-2xl mx-auto">
                          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                            <img
                              src={imageFiles[currentImageIndex].fileUrl}
                              alt={imageFiles[currentImageIndex].fileName}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                        </div>

                        {/* 이전/다음 버튼 */}
                        {imageFiles.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setCurrentImageIndex((prev) =>
                                  prev > 0 ? prev - 1 : imageFiles.length - 1
                                )
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                              aria-label="이전 이미지"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 19l-7-7 7-7"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() =>
                                setCurrentImageIndex((prev) =>
                                  prev < imageFiles.length - 1 ? prev + 1 : 0
                                )
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                              aria-label="다음 이미지"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </>
                        )}

                        {/* 이미지 인디케이터 */}
                        {imageFiles.length > 1 && (
                          <div className="flex justify-center gap-2 mt-3">
                            {imageFiles.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`h-2 rounded-full transition-all ${
                                  index === currentImageIndex
                                    ? 'w-8 bg-blue-600'
                                    : 'w-2 bg-gray-300'
                                }`}
                                aria-label={`이미지 ${index + 1}`}
                              />
                            ))}
                          </div>
                        )}

                        {/* 현재 이미지 정보 및 다운로드 */}
                        <div className="flex items-center justify-between mt-3 p-3 bg-gray-50 rounded-lg">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-700 font-medium">
                              {imageFiles[currentImageIndex].fileName}
                            </span>
                            <span className="text-xs text-gray-500">
                              이미지 {currentImageIndex + 1} / {imageFiles.length}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              window.open(imageFiles[currentImageIndex].fileUrl, '_blank')
                            }
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            다운로드
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 문서 파일 목록 */}
                  {documentFiles.length > 0 && (
                    <div className="space-y-2">
                      {documentFiles.map((file, index) => (
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
                              <span className="text-sm text-gray-700 font-medium">
                                {file.fileName}
                              </span>
                              <span className="text-xs text-gray-500">
                                첨부파일 {imageFiles.length + index + 1}
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => window.open(file.fileUrl, '_blank')}
                            className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            다운로드
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
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
