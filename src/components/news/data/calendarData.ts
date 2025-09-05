import { type CalendarData } from './types';

export const calendarData: CalendarData = {
  events: [
    {
      id: 1,
      title: '정기총회',
      date: '2024-02-15',
      type: 'meeting',
      description: '화전 조합 정기총회 개최',
    },
    {
      id: 2,
      title: '문화축제',
      date: '2024-02-20',
      type: 'festival',
      description: '화전 지역 문화축제',
    },
    {
      id: 3,
      title: '교육 프로그램',
      date: '2024-02-25',
      type: 'education',
      description: '주민 역량 강화 교육',
    },
  ],
};
