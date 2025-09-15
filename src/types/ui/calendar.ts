// 캘린더 UI 설정 타입

/**
 * 이벤트 카테고리 타입
 */
type EventCategory = 'festival' | 'class' | 'meeting';

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
  festival: { name: '마을 축제', color: '#2C2E5A' },
  class: { name: '원데이 클래스', color: '#A692D1' },
  meeting: { name: '회의 일정', color: '#FFA484' },
};

/**
 * 리스트용 카테고리 설정 (필터링용, all 포함)
 */
export const LIST_CATEGORY_CONFIG: Record<CategoryFilter, CategoryConfig> = {
  all: { name: '전체', color: '#2C2E5A' },
  festival: { name: '마을 축제', color: '#2C2E5A' },
  class: { name: '원데이 클래스', color: '#A692D1' },
  meeting: { name: '회의 일정', color: '#FFA484' },
};

/**
 * ActivityType을 EventCategory로 변환하는 함수
 */
export const mapActivityTypeToEventCategory = (activityType: string): EventCategory => {
  switch (activityType) {
    case 'FESTIVAL':
      return 'festival';
    case 'ONE_DAY_CLASS':
      return 'class';
    case 'CONFERENCE':
      return 'meeting';
    case 'NONE':
    default:
      return 'meeting'; // 기본값
  }
};
