import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';
import { postsApi } from '@/api/admin/posts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import type { PostFormData, PostCategory, ActivityType } from './data';
import { categoryInfo } from './data';

export default function CreatePost() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    postType: 'NOTICE',
  });

  // API 훅들
  const createPostApi = useApi(postsApi.createPost);
  const createCalendarApi = useApi(postsApi.createCalendarPost);

  const handleFileUpload = (files: FileList | null, type: 'thumbnail' | 'attachments') => {
    if (!files) return;

    if (type === 'thumbnail') {
      setFormData({ ...formData, thumbnail: files[0] });
    } else {
      setFormData({ ...formData, attachments: Array.from(files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('전송할 formData:', formData);
    console.log('postType:', formData.postType);

    try {
      let result;

      if (formData.postType === 'CALENDAR') {
        // 캘린더 게시글 생성 (활동 타입 포함)
        if (!formData.activityType) {
          alert('캘린더 게시글은 활동 타입을 선택해야 합니다.');
          return;
        }

        const calendarData = {
          ...formData,
          activityType: formData.activityType,
        };
        console.log('캘린더 데이터:', calendarData);

        result = await createCalendarApi.execute(calendarData);
      } else {
        // 일반 게시글 생성
        console.log('일반 게시글 데이터:', formData);
        result = await createPostApi.execute(formData);
      }

      // result가 null이어도 성공으로 처리 (201 Created 응답의 경우)
      console.log('게시글 생성 성공:', result);
      alert('게시글이 성공적으로 생성되었습니다.');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('게시글 생성 실패:', error);
      alert('게시글 생성 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">새 게시글 작성</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">안녕하세요, {user?.name}님</span>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 제목 */}
            <div>
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="게시글 제목을 입력하세요"
                required
                className="mt-1"
              />
            </div>

            {/* 카테고리 */}
            <div>
              <Label htmlFor="postType">카테고리 *</Label>
              <Select
                value={formData.postType}
                onValueChange={(value: PostCategory) =>
                  setFormData({ ...formData, postType: value })
                }
              >
                <SelectTrigger className="mt-1">
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
            </div>

            {/* 행사 날짜 (CALENDAR 카테고리만) */}
            {formData.postType === 'CALENDAR' && (
              <div>
                <Label htmlFor="eventDate">행사 날짜 *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.eventDate ? formData.eventDate.split('T')[0] : ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, eventDate: e.target.value })
                  }
                  required
                  className="mt-1"
                />
              </div>
            )}

            {/* 활동 타입 (CALENDAR 카테고리만) */}
            {formData.postType === 'CALENDAR' && (
              <div>
                <Label htmlFor="activityType">활동 타입 *</Label>
                <Select
                  value={formData.activityType}
                  onValueChange={(value: ActivityType) =>
                    setFormData({ ...formData, activityType: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="활동 타입을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NONE">없음</SelectItem>
                    <SelectItem value="FESTIVAL">축제</SelectItem>
                    <SelectItem value="ONE_DAY_CLASS">원데이 클래스</SelectItem>
                    <SelectItem value="CONFERENCE">컨퍼런스</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* 썸네일 업로드 (THUMBNAIL 뷰타입만) */}
            {categoryInfo[formData.postType].hasThumbnail && (
              <div>
                <Label htmlFor="thumbnail">썸네일 이미지</Label>
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/png,image/jpg,image/jpeg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFileUpload(e.target.files, 'thumbnail')
                  }
                  className="mt-1"
                />
                {formData.thumbnail && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">썸네일 미리보기:</p>
                    <img
                      src={URL.createObjectURL(formData.thumbnail)}
                      alt="썸네일 미리보기"
                      className="w-48 h-48 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            )}

            {/* 첨부파일 업로드 */}
            <div>
              <Label htmlFor="attachments">첨부파일</Label>
              <Input
                id="attachments"
                type="file"
                multiple
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFileUpload(e.target.files, 'attachments')
                }
                className="mt-1"
              />
              {formData.attachments && formData.attachments.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">선택된 파일:</p>
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
            </div>

            {/* 내용 */}
            <div>
              <Label htmlFor="content">내용 *</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="게시글 내용을 입력하세요"
                rows={12}
                required
                className="mt-1"
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={createPostApi.loading || createCalendarApi.loading}
              >
                취소
              </Button>
              <Button type="submit" disabled={createPostApi.loading || createCalendarApi.loading}>
                {createPostApi.loading || createCalendarApi.loading ? '작성 중...' : '게시글 작성'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
