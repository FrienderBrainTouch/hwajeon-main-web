export interface AcademyCard {
  id: number;
  title: string;
  description: string;
  period: string;
  target: string;
  capacity: string;
}

export interface EducationCard {
  id: number;
  title: string;
  description: string;
  period: string;
  target: string;
  capacity: string;
}

export const academyCards: AcademyCard[] = [
  {
    id: 1,
    title: '카페 운영 실무 아카데미',
    description: '카페 운영에 필요한 실무 지식과 기술을 습득할 수 있는 교육 프로그램입니다.',
    period: '2024.03.01 ~ 2024.05.31',
    target: '카페 창업 희망자, 카페 운영자',
    capacity: '20명',
  },
  // {
  //   id: 2,
  //   title: '바리스타 전문 과정',
  //   description: '전문 바리스타가 되기 위한 커피 제조 기술과 이론을 배우는 과정입니다.',
  //   period: '2024.04.01 ~ 2024.06.30',
  //   target: '바리스타 지망생, 카페 직원',
  //   capacity: '15명',
  // },
];

export const educationCards: EducationCard[] = [
  {
    id: 1,
    title: '조합 역량 강화 교육',
    description: '조합원들의 역량을 강화하고 협동조합 운영에 필요한 지식을 제공합니다.',
    period: '2024.02.01 ~ 2024.12.31',
    target: '조합원, 지역주민',
    capacity: '50명',
  },
  {
    id: 2,
    title: '디지털 리터러시 교육',
    description: '디지털 시대에 필요한 기본적인 컴퓨터 활용 능력을 기르는 교육입니다.',
    period: '2024.03.15 ~ 2024.08.15',
    target: '중장년층, 디지털 소외계층',
    capacity: '30명',
  },
  {
    id: 3,
    title: '조합 역량 강화 교육',
    description: '조합원들의 역량을 강화하고 협동조합 운영에 필요한 지식을 제공합니다.',
    period: '2024.02.01 ~ 2024.12.31',
    target: '조합원, 지역주민',
    capacity: '50명',
  },
  {
    id: 4,
    title: '디지털 리터러시 교육',
    description: '디지털 시대에 필요한 기본적인 컴퓨터 활용 능력을 기르는 교육입니다.',
    period: '2024.03.15 ~ 2024.08.15',
    target: '중장년층, 디지털 소외계층',
    capacity: '30명',
  },
];
