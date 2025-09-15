import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { postsApi } from '@/api/admin/posts';
import { CreatePostForm } from '@/components/admin';
import type { PostFormData, PostCategory, ActivityType } from '@/types/api/common';
import { categoryInfo } from '@/types/ui/admin';

export default function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    postType: 'NOTICE',
  });

  // API 훅들
  const createPostApi = useApi(postsApi.createPost);
  const createCalendarApi = useApi(postsApi.createCalendarPost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (formData.postType === 'CALENDAR') {
        // 캘린더 게시글 생성 (활동 타입 포함)
        if (!formData.activityType || formData.activityType === 'NONE') {
          alert('캘린더 게시글은 활동 타입을 선택해야 합니다.');
          return;
        }

        const calendarData = {
          ...formData,
          activityType: formData.activityType,
        };

        await createCalendarApi.execute(calendarData);
      } else {
        // 일반 게시글 생성
        await createPostApi.execute(formData);
      }

      // result가 null이어도 성공으로 처리 (201 Created 응답의 경우)
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
    <CreatePostForm
      title={formData.title}
      content={formData.content}
      postType={formData.postType}
      eventDate={formData.eventDate || ''}
      activityType={formData.activityType || 'NONE'}
      thumbnail={formData.thumbnail || null}
      attachments={formData.attachments || []}
      isLoading={createPostApi.loading || createCalendarApi.loading}
      categoryInfo={categoryInfo}
      onTitleChange={(value) => setFormData({ ...formData, title: value })}
      onContentChange={(value) => setFormData({ ...formData, content: value })}
      onPostTypeChange={(value) => setFormData({ ...formData, postType: value as PostCategory })}
      onEventDateChange={(value) => setFormData({ ...formData, eventDate: value })}
      onActivityTypeChange={(value) =>
        setFormData({ ...formData, activityType: value as ActivityType })
      }
      onThumbnailChange={(file) => setFormData({ ...formData, thumbnail: file || undefined })}
      onAttachmentsChange={(files) => setFormData({ ...formData, attachments: files })}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
