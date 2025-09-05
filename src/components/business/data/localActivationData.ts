export interface EventImage {
  id: number;
  name: string;
  src: string;
  alt: string;
}

export interface CommunityProject {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface EducationMethod {
  id: number;
  title: string;
  description: string;
}

export const eventImages: EventImage[] = [
  {
    id: 1,
    name: '이미지1',
    src: '/images/local/event1.jpg',
    alt: '지역 공동체 행사 이미지 1',
  },
  {
    id: 2,
    name: '이미지2',
    src: '/images/local/event2.jpg',
    alt: '지역 공동체 행사 이미지 2',
  },
  {
    id: 3,
    name: '이미지3',
    src: '/images/local/event3.jpg',
    alt: '지역 공동체 행사 이미지 3',
  },
];

export const communityProjects: CommunityProject[] = [
  {
    id: 1,
    title: '지역사랑 상품권',
    description: '지역 경제 활성화를 위한 상품권 발행 및 사용 촉진',
    icon: '/images/local/icon1.svg',
  },
  {
    id: 2,
    title: '지역사랑 상품권',
    description: '지역 경제 활성화를 위한 상품권 발행 및 사용 촉진',
    icon: '/images/local/icon2.svg',
  },
];

export const educationMethods: EducationMethod[] = [
  {
    id: 1,
    title: '우선순위 설정',
    description: '중요한 작업을 먼저 처리함으로써 효율성을 높일 수 있습니다.',
  },
  {
    id: 2,
    title: '시간 블록 기법',
    description: '작업에 특정 시간을 할당하여 집중력을 유지할 수 있습니다.',
  },
  {
    id: 3,
    title: 'Pomodoro 기법',
    description: '25분 집중 작업 후 5분 휴식을 반복하여 집중력과 피로를 관리할 수 있습니다.',
  },
];

export const educationSummary =
  '이러한 방법들을 통해 디지털 환경에서 효과적으로 시간을 관리할 수 있습니다.';
