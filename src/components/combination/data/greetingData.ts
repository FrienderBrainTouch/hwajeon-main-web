import type { GreetingData } from '@/types/components/combination';
import logo from '@/assets/logo.svg';

export const greetingData: GreetingData = {
  title: '인사말',
  image: {
    src: logo,
    alt: '화전마을관리 사회적협동조합 로고',
  },
  greeting: {
    line1: '안녕하세요.',
    line2: '화전마을관리 사회적협동조합입니다.',
  },
  content: [
    {
      id: 1,
      text: '화전의 변화는 사람에서 시작되었습니다. 화전마을관리 사회적협동조합은 주민이 함께 일하고, 함께 배우며, 함께 돌보는 사람 중심의 마을공동체를 만들어가고 있습니다.',
    },
    {
      id: 2,
      text: '도시재생의 흐름 속에서 피어난 화전의 골목과 공간, 그리고 그 안에서 살아가는 사람들의 이야기를 우리는 잇고 있습니다. 카페와 체험, 교육과 돌봄, 봉사와 나눔의 작은 실천들이 모여 하나의 커다란 변화가 되고, 오늘의 화전을 더 따뜻하게, 내일의 화전을 더 단단하게 만듭니다.',
    },
    {
      id: 3,
      text: '우리는 경제적 이익보다 사람의 관계와 마을의 지속성을 더 소중히 생각합니다. 서로에게 배우고, 함께 성장하며, 마을의 가치를 키워가는 이 길에 조합원 모두가 마음을 모아 걸어가고 있습니다.',
    },
    {
      id: 4,
      text: '사람과 마을이 함께 피어나는 곳, 화전.',
    },
  ],
  signature: {
    title: '화전마을관리 사회적협동조합 조합원 일동',
    name: '드림',
  },
};
