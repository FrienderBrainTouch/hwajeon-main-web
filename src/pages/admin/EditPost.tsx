import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { postsApi } from '@/api/admin/posts';
import type { PostDetailResponse, CalendarPostDetailResponse, LinkMeta } from '@/types/api';
import { EditPostForm } from '@/components/admin';
import { Button } from '@/components/ui/button';
import type { PostFormData, PostCategory, Post, ActivityType } from '@/types/api/common';
import { categoryInfo } from '@/types/ui/admin';

export default function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    postType: (searchParams.get('postType') as PostCategory) || 'NOTICE',
    linkUrl: '',
  });
  const [originalPost, setOriginalPost] = useState<Post | null>(null);
  const [existingFileIds, setExistingFileIds] = useState<number[]>([]);
  const [selectedExistingFiles, setSelectedExistingFiles] = useState<number[]>([]);
  const [linkMeta, setLinkMeta] = useState<LinkMeta | undefined>(undefined);

  // API 훅들
  const getPostDetailApi = useApi(postsApi.getPostDetail);
  const getCalendarPostDetailApi = useApi(postsApi.getCalendarPostDetail);
  const updatePostApi = useApi(postsApi.updatePost);

  useEffect(() => {
    if (id) {
      // URL에서 postType 추출
      const postType = (searchParams.get('postType') as PostCategory) || 'NOTICE';
      setFormData((prev) => ({ ...prev, postType }));
      fetchPostDetail(id);
    }
  }, [id, searchParams]);

  const fetchPostDetail = async (postId: string) => {
    try {
      const postType = formData.postType;
      const isCalendar = postType === 'CALENDAR';

      // CALENDAR 타입이면 getCalendarPostDetail API 사용
      const result = isCalendar
        ? await getCalendarPostDetailApi.execute({ postId })
        : await getPostDetailApi.execute({ postId });

      if (result) {
        // result를 PostDetailResponse 또는 CalendarPostDetailResponse로 타입 단언
        const resultData = result as PostDetailResponse | CalendarPostDetailResponse;
        const calendarData = isCalendar ? (resultData as CalendarPostDetailResponse) : null;

        // fileUrls에서 fileId와 fileUrl 추출
        const fileIds = resultData.fileUrls.map((file: any) => file.fileId);
        const fileUrls = resultData.fileUrls.map((file: any) => file.fileUrl);

        const isNews = postType === 'NEWS';
        const linkMetaData = isNews ? resultData.linkMeta : undefined;

        const post: Post = {
          id: postId,
          title: resultData.title,
          content: resultData.content,
          category: postType,
          createdAt: resultData.createAt,
          updatedAt: resultData.modifiedAt,
          author: '', // 상세 조회에는 author가 없음
          views: 0,
          thumbnail: fileUrls.length > 0 ? fileUrls[0] : undefined,
          attachments: fileUrls,
          eventDate: calendarData?.eventDate,
          linkMeta: linkMetaData,
        };

        setOriginalPost(post);
        setLinkMeta(linkMetaData);
        setFormData({
          title: post.title,
          content: post.content,
          postType: post.category,
          eventDate: calendarData?.eventDate,
          activityType: calendarData?.activityType || (isCalendar ? 'FESTIVAL' : undefined),
          linkUrl: isNews ? linkMetaData?.linkUrl || '' : '',
          linkMeta: linkMetaData,
        });

        // 기존 파일 ID들을 설정
        setExistingFileIds(fileIds);
        setSelectedExistingFiles(fileIds); // 처음에는 모든 파일 선택
      }
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
      navigate('/admin/dashboard');
    }
  };

  const handleFileUpload = (files: FileList | null, type: 'thumbnail' | 'attachments') => {
    if (!files) return;

    if (type === 'thumbnail') {
      setFormData({ ...formData, thumbnail: files[0] });
    } else {
      setFormData({ ...formData, attachments: Array.from(files) });
    }
  };

  // 기존 파일 선택/해제 핸들러
  const handleExistingFileToggle = (fileId: number) => {
    if (fileId === undefined || fileId === null) {
      return;
    }

    setSelectedExistingFiles((prev) => {
      if (prev.includes(fileId)) {
        // 이미 선택된 파일이면 제거
        return prev.filter((id) => id !== fileId);
      } else {
        // 선택되지 않은 파일이면 추가
        return [...prev, fileId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      // UpdatePostRequest 형태로 변환
      const updateRequest = {
        title: formData.title,
        content: formData.content,
        eventDate: formData.postType === 'CALENDAR' ? formData.eventDate : undefined,
        activityType: formData.postType === 'CALENDAR' ? formData.activityType : undefined,
        existingFileIds: selectedExistingFiles, // 선택된 기존 파일들만
        newFiles: formData.attachments || [],
        linkUrl: formData.postType === 'NEWS' ? formData.linkUrl ?? '' : undefined,
      };

      const result = await updatePostApi.execute(id, {
        ...updateRequest,
        postType: formData.postType,
      });

      if (result !== null) {
        alert('게시글이 성공적으로 수정되었습니다.');
        // 마지막 선택한 카테고리로 이동
        const lastCategory = localStorage.getItem('admin_last_selected_category') || 'NOTICE';
        navigate(`/admin/dashboard?category=${lastCategory}`);
      } else {
        // API에서 에러가 발생한 경우
        alert(updatePostApi.error || '게시글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정 중 오류가 발생했습니다.');
    }
  };

  const handleCancel = () => {
    // 마지막 선택한 카테고리로 이동
    const lastCategory = localStorage.getItem('admin_last_selected_category') || 'NOTICE';
    navigate(`/admin/dashboard?category=${lastCategory}`);
  };

  if (getPostDetailApi.loading || getCalendarPostDetailApi.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">게시글을 불러오는 중...</h2>
        </div>
      </div>
    );
  }

  if (getPostDetailApi.error || getCalendarPostDetailApi.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">게시글을 불러오는데 실패했습니다</h2>
          <p className="text-red-500 mt-2">
            {getPostDetailApi.error || getCalendarPostDetailApi.error}
          </p>
          <Button onClick={handleCancel} className="mt-4">
            대시보드로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  if (!originalPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">게시글을 찾을 수 없습니다</h2>
          <Button onClick={handleCancel} className="mt-4">
            대시보드로 돌아가기
          </Button>
        </div>
      </div>
    );
  }

  return (
    <EditPostForm
      formData={formData}
      originalPost={originalPost}
      existingFileIds={existingFileIds}
      selectedExistingFiles={selectedExistingFiles}
      updateLoading={updatePostApi.loading}
      onTitleChange={(e) => setFormData({ ...formData, title: e.target.value })}
      onPostTypeChange={(value) => setFormData({ ...formData, postType: value as PostCategory })}
      onEventDateChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
      onActivityTypeChange={(value) =>
        setFormData({ ...formData, activityType: value as ActivityType })
      }
      onFileUpload={handleFileUpload}
      onExistingFileToggle={handleExistingFileToggle}
      onContentChange={(e) => setFormData({ ...formData, content: e.target.value })}
      onLinkUrlChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      categoryInfo={categoryInfo}
      linkMeta={linkMeta}
    />
  );
}
