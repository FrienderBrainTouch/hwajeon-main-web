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

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  views: number;
  thumbnail?: string;
  attachments?: string[];
  eventDate?: string;
  activityType?: string;
}

interface EditPostFormProps {
  formData: {
    title: string;
    content: string;
    postType: string;
    eventDate?: string;
    activityType?: string;
    thumbnail?: File;
    attachments?: File[];
  };
  originalPost: Post | null;
  existingFileIds: number[];
  selectedExistingFiles: number[];
  updateLoading: boolean;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPostTypeChange: (value: string) => void;
  onEventDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileUpload: (files: FileList | null, type: 'thumbnail' | 'attachments') => void;
  onExistingFileToggle: (fileId: number) => void;
  onContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  categoryInfo: Record<string, { name: string; viewType: string; hasThumbnail: boolean }>;
}

export const EditPostForm = ({
  formData,
  originalPost,
  existingFileIds,
  selectedExistingFiles,
  updateLoading,
  onTitleChange,
  onPostTypeChange,
  onEventDateChange,
  onFileUpload,
  onExistingFileToggle,
  onContentChange,
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
                    {originalPost.attachments.map((file, index) => {
                      const fileId =
                        existingFileIds && existingFileIds.length > index
                          ? existingFileIds[index]
                          : undefined;
                      const isSelected =
                        fileId !== undefined && selectedExistingFiles.includes(fileId);
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
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isSelected
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {fileId === undefined ? 'ID 없음' : isSelected ? '유지됨' : '제거됨'}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

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
