// 캘린더 UI 설정 타입

/**
 * 이벤트 카테고리 타입
 */
export type EventCategory = 'none' | 'festival' | 'class' | 'meeting' | 'etc';

/**
 * 카테고리 필터 타입
 */
export type CategoryFilter = 'all' | EventCategory;

/**
 * 카테고리 설정 타입
 */
export interface CategoryConfig {
  name: string;
  color: string;
}

/**
 * 캘린더용 카테고리 설정 (범례용, all 제외)
 */
export const CALENDAR_CATEGORY_CONFIG: Record<EventCategory, CategoryConfig> = {
  none: { name: '없음', color: '#9CA3AF' },
  festival: { name: '행사', color: '#2C2E5A' },
  class: { name: '원데이클래스', color: '#A692D1' },
  meeting: { name: '회의', color: '#FFA484' },
  etc: { name: '기타', color: '#6B7280' },
};

/**
 * 리스트용 카테고리 설정 (필터링용, all 포함)
 */
export const LIST_CATEGORY_CONFIG: Record<CategoryFilter, CategoryConfig> = {
  all: { name: '전체', color: '#2C2E5A' },
  none: { name: '없음', color: '#9CA3AF' },
  festival: { name: '행사', color: '#2C2E5A' },
  class: { name: '원데이클래스', color: '#A692D1' },
  meeting: { name: '회의', color: '#FFA484' },
  etc: { name: '기타', color: '#6B7280' },
};

/**
 * ActivityType을 EventCategory로 변환하는 함수
 */
export const mapActivityTypeToEventCategory = (activityType: string): EventCategory => {
  switch (activityType) {
    case 'NONE':
      return 'none';
    case 'FESTIVAL':
      return 'festival';
    case 'ONE_DAY_CLASS':
      return 'class';
    case 'CONFERENCE':
      return 'meeting';
    case 'ETC':
      return 'etc';
    default:
      return 'none'; // 기본값
  }
};
