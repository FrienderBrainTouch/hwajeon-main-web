import type { MissionVisionData } from '@/types/components/combination';

export const missionVisionData: MissionVisionData = {
  header: {
    title: '미션과 비전, 핵심가치',
    subtitle: '화전마을관리 사회적협동조합',
    description:
      '화전지역의 상권 활성화와 주민 공동체의 자생력 강화를 통해 경제 문화공동체로 성장하여 화전의 안정적이고 풍요로운 삶에 기여하는 울타리가 되고자 합니다.',
  },
  mission: {
    title: 'Our Mission',
    subtitle: '우리의 미션',
    content: '화전지역 상권 활성화와 화전 주민 공동체의 자생력 강화',
  },
  vision: {
    title: 'Our Vision',
    subtitle: '우리의 비전',
    content: '경제 문화공동체로 화전의 안정적이고 풍요로운 삶에 기여하는 울타리',
  },
  values: {
    title: 'Core Value',
    subtitle: '핵심 가치',
    items: [
      {
        id: 1,
        title: '비상하다',
        description: '마을을 살리기 위해 늘 배우고, 익히고, 행하여 비상한다',
      },
      {
        id: 2,
        title: '나누다',
        description: '행할 수 있는 모든 것들은 나누어 함께 행하고, 행하여 얻은 것은 모두 나눈다',
      },
      {
        id: 3,
        title: '보다',
        description:
          '사람과 주인, 길과 집, 드러난 것과 가려진 것, 마을 공동체를 두루 살펴 소외됨 없이 함께 할 수 있도록 깨어 있는 눈으로 본다',
      },
    ],
  },
};
