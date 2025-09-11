// 공통 게시글 관련 타입 정의

/**
 * 활동 타입 열거형
 * @type {string}
 * @description 게시글의 활동 분류를 나타내는 타입
 */
export type ActivityType = 'NONE' | 'FESTIVAL' | 'ONE_DAY_CLASS' | 'CONFERENCE';

/**
 * 게시글 카테고리 타입
 * @type {string}
 * @description 게시글의 카테고리 분류를 나타내는 타입
 */
export type PostCategory = 'NOTICE' | 'ARCHIVE' | 'MEETING' | 'NEWS' | 'GALLERY' | 'CALENDAR';

/**
 * 게시글 요약 정보 타입
 * @interface PostSummary
 * @property {number} postId - 게시글 ID
 * @property {string} title - 게시글 제목
 * @property {string} [thumbnailUrl] - 썸네일 이미지 URL (선택적)
 * @property {string} createdAt - 생성일시
 */
export type PostSummary = {
  postId: number;
  title: string;
  thumbnailUrl?: string;
  createdAt: string;
};

/**
 * 게시글 목록 응답 데이터 타입
 * @interface PostSummaryResponse
 * @property {PostCategory} postType - 게시글 카테고리
 * @property {number} totalElements - 전체 게시글 수
 * @property {number} totalPages - 전체 페이지 수
 * @property {number} pageNumber - 현재 페이지 번호
 * @property {boolean} isLast - 마지막 페이지 여부
 * @property {PostSummary[]} content - 게시글 목록
 */
export type PostSummaryResponse = {
  postType: PostCategory;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  isLast: boolean;
  content: PostSummary[];
};

/**
 * 게시글 상세 정보 타입
 * @interface PostDetailResponse
 * @property {string} title - 게시글 제목
 * @property {string} content - 게시글 내용
 * @property {string} createAt - 생성일시
 * @property {string} modifiedAt - 수정일시
 * @property {Array<{fileId: number, fileUrl: string}>} fileUrls - 파일 정보 목록
 */
export type PostDetailResponse = {
  title: string;
  content: string;
  createAt: string;
  modifiedAt: string;
  fileUrls: Array<{
    fileId: number;
    fileUrl: string;
  }>;
};

/**
 * 게시글 목록 조회 파라미터 타입
 * @interface GetPostsParams
 * @property {PostCategory} [postType] - 게시글 카테고리 필터 (선택적)
 * @property {number} [page] - 페이지 번호 (선택적)
 * @property {number} [size] - 페이지 크기 (선택적)
 */
export type GetPostsParams = {
  postType?: PostCategory;
  page?: number;
  size?: number;
};

/**
 * 게시글 상세 조회 파라미터 타입
 * @interface GetPostDetailParams
 * @property {string | number} postId - 게시글 ID
 */
export type GetPostDetailParams = {
  postId: string | number;
};
