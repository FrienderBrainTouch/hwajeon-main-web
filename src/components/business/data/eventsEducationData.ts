import type { EventCard, EducationCard } from '@/types/components/business';

export const eventCards: EventCard[] = [
  {
    id: 1,
    title: '화전 마을 축제',
    description: '화전 마을의 전통과 문화를 소개하는 대규모 축제입니다.',
    date: '2024.05.15',
    location: '화전 마을 광장',
    capacity: '500명',
    image: '/images/event1.jpg',
  },
  {
    id: 2,
    title: '지역 특산품 전시회',
    description: '화전 지역의 우수한 특산품들을 소개하는 전시회입니다.',
    date: '2024.06.20',
    location: '화전 문화센터',
    capacity: '200명',
    image: '/images/event2.jpg',
  },
  {
    id: 3,
    title: '가족 체험 행사',
    description: '가족 단위로 참여할 수 있는 다양한 체험 프로그램입니다.',
    date: '2024.07.10',
    location: '화전 체험관',
    capacity: '100명',
    image: '/images/event3.jpg',
  },
  {
    id: 4,
    title: '가족 체험 행사',
    description: '가족 단위로 참여할 수 있는 다양한 체험 프로그램입니다.',
    date: '2024.07.10',
    location: '화전 체험관',
    capacity: '100명',
    image: '/images/event3.jpg',
  },
];

export const educationCards: EducationCard[] = [
  {
    id: 1,
    title: '지역 문화 교육',
    description: '화전 지역의 역사와 문화를 배우는 교육 프로그램입니다.',
    period: '2024.03.01 ~ 2024.11.30',
    target: '지역주민, 관심 있는 시민',
    capacity: '40명',
    image: '/images/education1.jpg',
  },
  {
    id: 2,
    title: '환경 보전 교육',
    description: '지역 환경 보전과 지속가능한 발전에 대한 교육입니다.',
    period: '2024.04.01 ~ 2024.10.31',
    target: '환경 관심자, 학생',
    capacity: '30명',
    image: '/images/education2.jpg',
  },
];
