/**
 * 사용자 타입
 */
export interface User {
  id: string;
  username: string;
  name: string;
  realName: string;
  role: 'TEACHER' | 'USER';
}

/**
 * 대시보드 헤더 컴포넌트 Props
 */
export interface DashboardHeaderProps {
  user: User | null;
  onLogout: () => void;
}

/**
 * 대시보드 통계 컴포넌트 Props
 */
export interface DashboardStatsProps {
  selectedCategory: string;
  searchTerm: string;
  categoryInfo: Record<string, { name: string; viewType: string; hasThumbnail: boolean }>;
  onCategoryChange: (value: string) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreatePost: () => void;
}

/**
 * 대시보드 테이블 컴포넌트 Props
 */
export interface DashboardTableProps {
  posts: any[]; // Post 타입 배열
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchTerm: string;
  totalCount: number;
  getCategoryLabel: (category: any) => string;
  getCategoryViewType: (category: any) => string;
  onEdit: (post: any) => void;
  onDelete: (post: any) => Promise<void>;
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  deleteLoading: boolean;
}

/**
 * 로그인 폼 컴포넌트 Props
 */
export interface LoginFormProps {
  username: string;
  password: string;
  error: string;
  isLoading: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

/**
 * 게시글 생성 폼 컴포넌트 Props
 */
export interface CreatePostFormProps {
  title: string;
  content: string;
  postType: string;
  eventDate: string;
  activityType: string;
  thumbnail: File | null;
  attachments: File[];
  isLoading: boolean;
  categoryInfo: Record<string, { name: string; viewType: string; hasThumbnail: boolean }>;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onPostTypeChange: (value: string) => void;
  onEventDateChange: (value: string) => void;
  onActivityTypeChange: (value: string) => void;
  onThumbnailChange: (file: File | null) => void;
  onAttachmentsChange: (files: File[]) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

/**
 * 게시글 수정 폼 컴포넌트 Props
 */
export interface EditPostFormProps {
  formData: {
    title: string;
    content: string;
    postType: string;
    eventDate?: string;
    activityType?: string;
    thumbnail?: File;
    attachments?: File[];
  };
  originalPost: any | null; // Post 타입
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
