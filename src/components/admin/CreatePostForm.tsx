import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CreatePostFormProps } from '@/types/components/admin';

export const CreatePostForm = ({
  title,
  content,
  postType,
  eventDate,
  activityType,
  thumbnail,
  attachments,
  isLoading,
  categoryInfo,
  onTitleChange,
  onContentChange,
  onPostTypeChange,
  onEventDateChange,
  onActivityTypeChange,
  onThumbnailChange,
  onAttachmentsChange,
  onSubmit,
  onCancel,
}: CreatePostFormProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle>새 게시글 작성</CardTitle>
            <CardDescription>게시글을 작성하고 게시하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
              {/* 제목 */}
              <div className="space-y-2">
                <Label htmlFor="title">제목 *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => onTitleChange(e.target.value)}
                  placeholder="게시글 제목을 입력하세요"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* 카테고리 */}
              <div className="space-y-2">
                <Label htmlFor="postType">카테고리 *</Label>
                <Select value={postType} onValueChange={onPostTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NOTICE">공지사항</SelectItem>
                    <SelectItem value="ARCHIVE">자료실</SelectItem>
                    <SelectItem value="MEETING">정기회의</SelectItem>
                    <SelectItem value="NEWS">화전 소식</SelectItem>
                    <SelectItem value="GALLERY">활동 갤러리</SelectItem>
                    <SelectItem value="CALENDAR">행사 캘린더</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 행사 날짜 (CALENDAR 카테고리일 때만) */}
              {postType === 'CALENDAR' && (
                <div className="space-y-2">
                  <Label htmlFor="eventDate">행사 날짜 *</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => onEventDateChange(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              )}

              {/* 활동 유형 (GALLERY 또는 CALENDAR 카테고리일 때만) */}
              {(postType === 'GALLERY' || postType === 'CALENDAR') && (
                <div className="space-y-2">
                  <Label htmlFor="activityType">활동 유형</Label>
                  <Select value={activityType} onValueChange={onActivityTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="활동 유형을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NONE">없음</SelectItem>
                      <SelectItem value="FESTIVAL">축제</SelectItem>
                      <SelectItem value="ONE_DAY_CLASS">원데이클래스</SelectItem>
                      <SelectItem value="CONFERENCE">회의</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* 썸네일 (THUMBNAIL 뷰타입만) */}
              {categoryInfo[postType]?.hasThumbnail && (
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">썸네일 이미지</Label>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => onThumbnailChange(e.target.files?.[0] || null)}
                    disabled={isLoading}
                  />
                  {thumbnail && (
                    <p className="text-sm text-gray-600">선택된 파일: {thumbnail.name}</p>
                  )}
                </div>
              )}

              {/* 첨부 파일 */}
              <div className="space-y-2">
                <Label htmlFor="attachments">첨부 파일</Label>
                <Input
                  id="attachments"
                  type="file"
                  multiple
                  onChange={(e) => onAttachmentsChange(Array.from(e.target.files || []))}
                  disabled={isLoading}
                />
                {attachments.length > 0 && (
                  <div className="text-sm text-gray-600">
                    선택된 파일: {attachments.map((f) => f.name).join(', ')}
                  </div>
                )}
              </div>

              {/* 내용 */}
              <div className="space-y-2">
                <Label htmlFor="content">내용 *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => onContentChange(e.target.value)}
                  placeholder="게시글 내용을 입력하세요"
                  rows={10}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* 버튼 */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                  취소
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? '작성 중...' : '게시글 작성'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
