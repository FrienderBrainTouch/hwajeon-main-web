export { default as BoardList } from './BoardList';
export { default as BoardWrapper } from './BoardWrapper';
export { default as BoardDetail } from './BoardDetail';
export { default as EventCalendar } from './EventCalendar';
export { default as EventList } from './EventList';
export { default as EventWrapper } from './EventWrapper';
export { default as GalleryList } from './GalleryList';
export { default as GalleryWrapper } from './GalleryWrapper';
export { default as GalleryDetail } from './GalleryDetail';
export { default as Detail } from './Detail';

export type {
  BoardItem,
  EventCategory,
  EventData,
  EventDataForCalendar,
  MonthlyEventData,
} from '@/types/components';
export type { CategoryFilter, CategoryConfig } from '@/types/ui';
export { CALENDAR_CATEGORY_CONFIG, LIST_CATEGORY_CONFIG } from '@/types/ui';
