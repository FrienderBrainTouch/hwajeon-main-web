export interface GreetingData {
  title: string;
  image: {
    alt: string;
  };
  greeting: {
    line1: string;
    line2: string;
  };
  content: Array<{
    id: number;
    text: string;
  }>;
  signature: {
    title: string;
    name: string;
  };
}

export const greetingData: GreetingData = {
  title: '인사말',
  image: {
    alt: '대표자 이미지',
  },
  greeting: {
    line1: '안녕하세요.',
    line2: '화전마을 사회적협동조합입니다.',
  },
  content: [
    {
      id: 1,
      text: '세계 최초의 상업 우주 관광이 시작되면서 대기자 명단이 급속도로 늘어나고 있습니다. 지구 궤도를 일주하는 일주일간의 여행을 통해 관광객들은 우주의 아름다움과 경이로움을 직접 체험할 수 있게 되었습니다.',
    },
    {
      id: 2,
      text: '우주 관광 산업은 부유층의 여가 활동을 넘어 일반 대중에게까지 확산될 가능성이 높아지고 있으며, 전문가들은 이는 새로운 관광 산업의 핵심이 될 것이며 우주 과학 기술 발전에도 기여할 것으로 보고 있습니다.',
    },
  ],
  signature: {
    title: '대표자',
    name: '홍길동',
  },
};
