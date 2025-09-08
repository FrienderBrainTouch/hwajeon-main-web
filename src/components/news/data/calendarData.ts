import { type EventData, type EventDataForCalendar, type MonthlyEventData } from './types';

// 통합 이벤트 데이터 (모든 필드 포함)
export const allEventData: EventData[] = [
  // 1월 이벤트
  {
    id: 1,
    date: 5,
    category: 'festival',
    title: '신년 마을 축제',
    description: '새해를 맞이하는 전통 축제',
    content:
      '새해를 맞이하여 화전마을의 전통 문화를 체험할 수 있는 신년 축제입니다. 다양한 전통 공연과 체험 프로그램이 준비되어 있습니다.',
    imageUrl: '/images/festival_newyear.jpg',
    createdAt: '2025.01.05',
    time: '14:00',
    location: '화전마을 광장',
    month: 1, // 월 정보 추가
  },
  {
    id: 2,
    date: 12,
    category: 'class',
    title: '전통 공예 체험',
    description: '한지 공예 만들기',
    content: '전통 한지를 이용한 공예 체험 프로그램입니다. 직접 만든 작품을 가져가실 수 있습니다.',
    imageUrl: '/images/class_hanji.jpg',
    createdAt: '2025.01.12',
    time: '10:00',
    location: '화전마을 공예관',
    month: 1,
  },
  {
    id: 3,
    date: 18,
    category: 'meeting',
    title: '월간 운영위원회',
    description: '1월 정기 회의',
    content: '1월 월간 운영위원회를 개최합니다. 주요 안건은 연간 사업 계획 및 예산 심의입니다.',
    imageUrl: '/images/meeting_jan.jpg',
    createdAt: '2025.01.18',
    time: '19:00',
    location: '화전마을 회의실',
    month: 1,
  },
  {
    id: 4,
    date: 25,
    category: 'festival',
    title: '설날 행사',
    description: '전통 설날 체험',
    content:
      '전통 설날 문화를 체험할 수 있는 특별 행사입니다. 세배, 덕담, 전통 놀이 등이 준비되어 있습니다.',
    imageUrl: '/images/festival_newyear2.jpg',
    createdAt: '2025.01.25',
    time: '11:00',
    location: '화전마을 전통문화관',
    month: 1,
  },
  // 2월 이벤트
  {
    id: 5,
    date: 3,
    category: 'class',
    title: '전통 음식 만들기',
    description: '떡국 만들기 체험',
    content:
      '설날 대표 음식인 떡국을 직접 만들어보는 체험 프로그램입니다. 전통 조리법을 배울 수 있습니다.',
    imageUrl: '/images/class_food.jpg',
    createdAt: '2025.02.03',
    time: '14:00',
    location: '화전마을 요리교실',
    month: 2,
  },
  {
    id: 6,
    date: 8,
    category: 'meeting',
    title: '사업 계획 회의',
    description: '연간 사업 계획 수립',
    content:
      '2025년 연간 사업 계획을 수립하는 중요한 회의입니다. 조합원 여러분의 많은 참여를 부탁드립니다.',
    imageUrl: '/images/meeting_plan.jpg',
    createdAt: '2025.02.08',
    time: '19:00',
    location: '화전마을 회의실',
    month: 2,
  },
  {
    id: 7,
    date: 15,
    category: 'festival',
    title: '정기총회',
    description: '2025년 정기총회',
    content:
      '화전마을사회적협동조합의 2025년 정기총회를 개최합니다. 조합원 및 마을 주민 여러분의 많은 참여를 부탁드립니다.',
    imageUrl: '/images/meeting_general.jpg',
    createdAt: '2025.02.15',
    time: '14:00',
    location: '화전마을 대강당',
    month: 2,
  },
  {
    id: 8,
    date: 20,
    category: 'festival',
    title: '문화축제',
    description: '화전마을 문화축제',
    content:
      '화전마을의 전통 문화를 체험할 수 있는 가을 축제가 열립니다. 다양한 전통 공예, 음식, 놀이 체험이 준비되어 있습니다.',
    imageUrl: '/images/festival_culture.jpg',
    createdAt: '2025.02.20',
    time: '10:00',
    location: '화전마을 전체',
    month: 2,
  },
  {
    id: 9,
    date: 25,
    category: 'class',
    title: '교육 프로그램',
    description: '마을 역사 교육',
    content:
      '화전마을의 역사와 전통에 대해 배우는 교육 프로그램입니다. 마을 어르신들의 생생한 이야기를 들을 수 있습니다.',
    imageUrl: '/images/class_history.jpg',
    createdAt: '2025.02.25',
    time: '15:00',
    location: '화전마을 역사관',
    month: 2,
  },
  // 8월 이벤트 (기존 리스트 데이터)
  {
    id: 30,
    date: 4,
    category: 'festival',
    title: '마을 축제',
    description: '화전마을 전통 축제',
    content:
      '화전마을의 전통 문화를 체험할 수 있는 가을 축제가 열립니다. 다양한 전통 공예, 음식, 놀이 체험이 준비되어 있습니다.',
    imageUrl: '/images/festival1.jpg',
    createdAt: '2025.08.04',
    time: '14:00',
    location: '화전마을 광장',
    month: 8,
  },
  {
    id: 31,
    date: 7,
    category: 'meeting',
    title: '회의 일정',
    description: '월간 운영위원회',
    content: '8월 월간 운영위원회를 개최합니다. 주요 안건은 하반기 사업 계획 및 예산 심의입니다.',
    imageUrl: '/images/meeting1.jpg',
    createdAt: '2025.08.07',
    time: '19:00',
    location: '화전마을 회의실',
    month: 8,
  },
  {
    id: 32,
    date: 11,
    category: 'class',
    title: '원데이 클래스',
    description: '전통 공예 체험',
    content: '전통 한지를 이용한 공예 체험 프로그램입니다. 직접 만든 작품을 가져가실 수 있습니다.',
    imageUrl: '/images/class1.jpg',
    createdAt: '2025.08.11',
    time: '10:00',
    location: '화전마을 공예관',
    month: 8,
  },
  {
    id: 33,
    date: 14,
    category: 'meeting',
    title: '회의 일정',
    description: '사업 계획 회의',
    content: '하반기 사업 계획을 수립하는 회의입니다. 조합원 여러분의 많은 참여를 부탁드립니다.',
    imageUrl: '/images/meeting2.jpg',
    createdAt: '2025.08.14',
    time: '19:00',
    location: '화전마을 회의실',
    month: 8,
  },
  {
    id: 34,
    date: 18,
    category: 'festival',
    title: '마을 축제',
    description: '가을 수확제',
    content:
      '가을 수확의 기쁨을 나누는 마을 축제입니다. 농작물 수확 체험과 전통 음식 시식회가 준비되어 있습니다.',
    imageUrl: '/images/festival_harvest.jpg',
    createdAt: '2025.08.18',
    time: '11:00',
    location: '화전마을 농장',
    month: 8,
  },
  {
    id: 35,
    date: 19,
    category: 'class',
    title: '원데이 클래스',
    description: '요리 교실',
    content: '전통 요리를 배우는 원데이 클래스입니다. 직접 만든 음식을 맛볼 수 있습니다.',
    imageUrl: '/images/class_cooking.jpg',
    createdAt: '2025.08.19',
    time: '14:00',
    location: '화전마을 요리교실',
    month: 8,
  },
  {
    id: 36,
    date: 20,
    category: 'festival',
    title: '마을 축제',
    description: '문화 공연',
    content:
      '마을 주민들이 함께하는 화합의 장인 마을 한마당 축제입니다. 다양한 공연과 체험 프로그램이 준비되어 있습니다.',
    imageUrl: '/images/festival2.jpg',
    createdAt: '2025.08.20',
    time: '16:00',
    location: '화전마을 대강당',
    month: 8,
  },
];

// 월별 데이터 생성 함수
const createMonthlyData = (): Record<number, MonthlyEventData> => {
  const monthlyData: Record<number, MonthlyEventData> = {};

  allEventData.forEach((event) => {
    const month = event.month; // event.month 사용

    if (!monthlyData[month]) {
      monthlyData[month] = {
        year: 2025,
        month: month,
        events: [],
      };
    }

    // 캘린더용 데이터 (필요한 필드만)
    const calendarEvent: EventDataForCalendar = {
      id: event.id,
      date: event.date,
      category: event.category,
      title: event.title,
      description: event.description,
      time: event.time,
      location: event.location,
    };
    monthlyData[month].events.push(calendarEvent);
  });

  return monthlyData;
};

// 2025년 전체 월별 이벤트 데이터
export const monthlyEventData: Record<number, MonthlyEventData> = createMonthlyData();

// 이벤트 리스트 데이터 (통합 데이터에서 필요한 필드만 추출)
export const eventListData: EventData[] = allEventData;
