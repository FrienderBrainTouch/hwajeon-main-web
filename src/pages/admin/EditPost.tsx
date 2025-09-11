import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';
import { authApi } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import type { PostFormData, PostCategory, Post } from './data';
import { categoryInfo } from './data';

export default function EditPost() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    content: '',
    postType: (searchParams.get('postType') as PostCategory) || 'NOTICE'
  });
  const [originalPost, setOriginalPost] = useState<Post | null>(null);
  const [existingFileIds, setExistingFileIds] = useState<number[]>([]);
  const [selectedExistingFiles, setSelectedExistingFiles] = useState<number[]>([]);

  // API 훅들
  const getPostDetailApi = useApi(authApi.getPostDetail);
  const updatePostApi = useApi(authApi.updatePost);

  useEffect(() => {
    if (id) {
      // URL에서 postType 추출
      const postType = searchParams.get('postType') as PostCategory || 'NOTICE';
      setFormData(prev => ({ ...prev, postType }));
      fetchPostDetail(id);
    }
  }, [id, searchParams]);

  const fetchPostDetail = async (postId: string) => {
    try {
      console.log('fetchPostDetail called with postId:', postId);
      console.log('postId type:', typeof postId);
      
      const result = await getPostDetailApi.execute({ postId });
      if (result) {
        console.log('게시글 상세 데이터:', result);
        
        // PostDetailResponse를 Post 타입으로 변환
        // postType은 URL에서 추출된 값 사용
        const postType = formData.postType;
        
        
        // fileUrls에서 fileId와 fileUrl 추출
        const fileIds = result.fileUrls.map(file => file.fileId);
        const fileUrls = result.fileUrls.map(file => file.fileUrl);
        
        const post: Post = {
          id: postId,
          title: result.title,
          content: result.content,
          category: postType,
          createdAt: result.createAt,
          updatedAt: result.modifiedAt,
          author: '', // 상세 조회에는 author가 없음
          views: 0,
          thumbnail: fileUrls.length > 0 ? fileUrls[0] : undefined,
          attachments: fileUrls,
          eventDate: undefined // 상세 조회에는 eventDate가 없음
        };
        
        setOriginalPost(post);
        setFormData({
          title: post.title,
          content: post.content,
          postType: post.category,
          eventDate: post.eventDate,
          activityType: undefined // 상세 조회에는 activityType이 없음
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
      console.warn('Invalid fileId:', fileId);
      return;
    }
    
    setSelectedExistingFiles(prev => {
      if (prev.includes(fileId)) {
        // 이미 선택된 파일이면 제거
        return prev.filter(id => id !== fileId);
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
        activityType: formData.activityType,
        existingFileIds: selectedExistingFiles, // 선택된 기존 파일들만
        newFiles: formData.attachments || []
      };
      
      const result = await updatePostApi.execute(id, updateRequest);
      
      if (result !== null) {
        console.log('게시글 수정 성공:', result);
        alert('게시글이 성공적으로 수정되었습니다.');
        navigate('/admin/dashboard');
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
    navigate('/admin/dashboard');
  };

  if (getPostDetailApi.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">게시글을 불러오는 중...</h2>
        </div>
      </div>
    );
  }

  if (getPostDetailApi.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">게시글을 불러오는데 실패했습니다</h2>
          <p className="text-red-500 mt-2">{getPostDetailApi.error}</p>
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
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">게시글 수정</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                안녕하세요, {user?.name}님
              </span>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, title: e.target.value })}
                placeholder="게시글 제목을 입력하세요"
                required
                className="mt-1"
              />
            </div>

            {/* 카테고리 */}
            <div>
              <Label htmlFor="postType">카테고리 *</Label>
              <Select value={formData.postType} onValueChange={(value: PostCategory) => setFormData({ ...formData, postType: value })} disabled={true}>
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, eventDate: e.target.value })}
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e.target.files, 'thumbnail')}
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
                {originalPost.thumbnail && !formData.thumbnail && (
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e.target.files, 'attachments')}
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
              {originalPost.attachments && originalPost.attachments.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">기존 첨부파일 (유지할 파일을 선택하세요):</p>
                  <ul className="text-sm text-gray-500 space-y-2">
                    {originalPost.attachments.map((file, index) => {
                      const fileId = existingFileIds && existingFileIds.length > index ? existingFileIds[index] : undefined;
                      const isSelected = fileId !== undefined && selectedExistingFiles.includes(fileId);
                      return (
                        <li key={index} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => fileId !== undefined && handleExistingFileToggle(fileId)}
                              disabled={fileId === undefined}
                              className="mr-3"
                            />
                            <span className="mr-2">📎</span>
                            <span className={isSelected ? 'text-gray-900' : 'text-gray-400'}>
                              {typeof file === 'string' ? file.split('/').pop() : String(file)}
                            </span>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            isSelected 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-500'
                          }`}>
                            {fileId === undefined ? 'ID 없음' : (isSelected ? '유지됨' : '제거됨')}
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
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, content: e.target.value })}
                placeholder="게시글 내용을 입력하세요"
                rows={12}
                required
                className="mt-1"
              />
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={updatePostApi.loading}>
                취소
              </Button>
              <Button type="submit" disabled={updatePostApi.loading}>
                {updatePostApi.loading ? '수정 중...' : '게시글 수정'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
