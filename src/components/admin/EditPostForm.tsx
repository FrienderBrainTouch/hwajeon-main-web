import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { EditPostFormProps } from '@/types/components/admin';

export const EditPostForm = ({
  formData,
  originalPost,
  existingFileIds,
  selectedExistingFiles,
  updateLoading,
  linkMeta,
  onTitleChange,
  onPostTypeChange,
  onEventDateChange,
  onActivityTypeChange,
  onFileUpload,
  onExistingFileToggle,
  onContentChange,
  onLinkUrlChange,
  onSubmit,
  onCancel,
  categoryInfo,
}: EditPostFormProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">게시글 수정</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">안녕하세요, 관리자님</span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* 제목 */}
            <div>
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={onTitleChange}
                placeholder="게시글 제목을 입력하세요"
                required
                className="mt-1"
              />
            </div>

            {/* 카테고리 */}
            <div>
              <Label htmlFor="postType">카테고리 *</Label>
              <Select value={formData.postType} onValueChange={onPostTypeChange} disabled={true}>
                <SelectTrigger className="mt-1 bg-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryInfo).map(([key, info]) => (
                    <SelectItem key={key} value={key}>
                      {info.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500 mt-1">게시글 유형은 수정할 수 없습니다.</p>
            </div>

            {/* 행사 날짜 (CALENDAR 카테고리만) */}
            {formData.postType === 'CALENDAR' && (
              <div>
                <Label htmlFor="eventDate">행사 날짜 *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate ? formData.eventDate.split('T')[0] : ''}
                  onChange={onEventDateChange}
                  required
                  className="mt-1"
                />
              </div>
            )}

            {/* 활동 유형 (CALENDAR 카테고리일 때만) */}
            {formData.postType === 'CALENDAR' && onActivityTypeChange && (
                <div>
                  <Label htmlFor="activityType">활동 유형</Label>
                  <Select
                    value={formData.activityType || 'FESTIVAL'}
                    onValueChange={onActivityTypeChange}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="활동 유형을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="FESTIVAL">행사</SelectItem>
                      <SelectItem value="EDUCATION">교육</SelectItem>
                      <SelectItem value="CONFERENCE">회의</SelectItem>
                      <SelectItem value="ETC">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

            {/* 썸네일 업로드 (THUMBNAIL 뷰타입만) */}
            {formData.postType && categoryInfo[formData.postType]?.hasThumbnail && (
              <div>
                <Label htmlFor="thumbnail">썸네일 이미지</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onFileUpload(e.target.files, 'thumbnail')
                  }
                  className="mt-1"
                />
                {formData.thumbnail && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">새 썸네일 미리보기:</p>
                    <img
                      src={URL.createObjectURL(formData.thumbnail)}
                      alt="썸네일 미리보기"
                      className="w-48 h-48 object-cover rounded border"
                    />
                    <div className="mt-2">
                      <a
                        href={URL.createObjectURL(formData.thumbnail)}
                        download={formData.thumbnail.name}
                        className="inline-flex text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        다운로드
                      </a>
                    </div>
                  </div>
                )}
                {originalPost?.thumbnail && !formData.thumbnail && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">현재 썸네일:</p>
                    <img
                      src={originalPost.thumbnail}
                      alt="현재 썸네일"
                      className="w-48 h-48 object-cover rounded border"
                    />
                    <div className="mt-2">
                      <a
                        href={originalPost.thumbnail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                      >
                        다운로드
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 첨부파일 업로드 */}
            <div>
              <Label htmlFor="attachments">새 첨부파일 추가</Label>
              <Input
                id="attachments"
                type="file"
                multiple
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onFileUpload(e.target.files, 'attachments')
                }
                className="mt-1"
              />
              {formData.attachments && formData.attachments.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">새로 선택된 파일:</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {formData.attachments.map((file, index) => (
                      <li key={index} className="flex items-center">
                        <span className="mr-2">📎</span>
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {originalPost?.attachments && originalPost.attachments.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">
                    기존 첨부파일 (유지할 파일을 선택하세요):
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    {originalPost.attachments.map((file: any, index: number) => {
                      // 썸네일은 첨부파일 목록에 포함되어 있어도 여기서는 제외(썸네일 섹션에서만 관리)
                      if (originalPost.thumbnail && typeof file === 'string' && file === originalPost.thumbnail) {
                        return null;
                      }
                      const fileId =
                        existingFileIds && existingFileIds.length > index
                          ? existingFileIds[index]
                          : undefined;
                      const isSelected =
                        fileId !== undefined && selectedExistingFiles.includes(fileId);
                      const fileUrl = typeof file === 'string' ? file : '';
                      return (
                        <li
                          key={index}
                          className="flex items-center justify-between p-2 border rounded-md"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => fileId !== undefined && onExistingFileToggle(fileId)}
                              disabled={fileId === undefined}
                              className="mr-3"
                            />
                            <span className="mr-2">📎</span>
                            <span className={isSelected ? 'text-gray-900' : 'text-gray-400'}>
                              {typeof file === 'string' ? file.split('/').pop() : String(file)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {fileUrl && (
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                다운로드
                              </a>
                            )}
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                isSelected
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {fileId === undefined ? 'ID 없음' : isSelected ? '유지됨' : '제거됨'}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            {/* 링크 URL (기업소식·언론보도) */}
            {(formData.postType === 'NEWS' || formData.postType === 'GALLERY') && (
              <div>
                <Label htmlFor="linkUrl">링크 URL</Label>
                <Input
                  id="linkUrl"
                  type="url"
                  value={formData.linkUrl || ''}
                  onChange={onLinkUrlChange}
                  placeholder="https://example.com (OG 태그를 자동으로 파싱합니다)"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  기업소식·언론보도 게시글에서 링크를 추가하거나 변경할 수 있습니다.
                </p>

                {linkMeta?.linkUrl && (
                  <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
                    <a
                      href={linkMeta.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col sm:flex-row hover:bg-gray-50 transition-colors"
                    >
                      {linkMeta.linkImage && (
                        <div className="w-full sm:w-56 h-40 sm:h-auto flex-shrink-0">
                          <img
                            src={linkMeta.linkImage}
                            alt={linkMeta.linkTitle || '링크 미리보기'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 p-4">
                        {linkMeta.linkTitle && (
                          <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                            {linkMeta.linkTitle}
                          </h3>
                        )}
                        {linkMeta.linkDescription && (
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {linkMeta.linkDescription}
                          </p>
                        )}
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="truncate">
                            {(() => {
                              try {
                                const url = new URL(linkMeta.linkUrl!);
                                return url.hostname;
                              } catch {
                                return linkMeta.linkUrl;
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
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* 내용 */}
            <div>
              <Label htmlFor="content">내용 *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={onContentChange}
                placeholder="게시글 내용을 입력하세요"
                rows={12}
                required
                className="mt-1"
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel} disabled={updateLoading}>
                취소
              </Button>
              <Button type="submit" disabled={updateLoading}>
                {updateLoading ? '수정 중...' : '게시글 수정'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
