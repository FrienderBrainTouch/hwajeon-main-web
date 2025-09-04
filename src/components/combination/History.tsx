import React from 'react';
import { TimelineZigzag } from '.';
import TimelineImg from '@/assets/timeline.jpg';

const History: React.FC = () => {
  const historyData = [
    // {
    //   year: 2028,
    //   bullets: [
    //     '미래 비전 실현을 위한 중장기 계획 수립',
    //     '지역 사회적 경제 생태계 완성',
    //     '화전마을 브랜드 가치 향상',
    //   ],
    // },
    // {
    //   year: 2027,
    //   bullets: [
    //     '미래 비전 실현을 위한 중장기 계획 수립',
    //     '지역 사회적 경제 생태계 완성',
    //     '화전마을 브랜드 가치 향상',
    //   ],
    // },
    // {
    //   year: 2026,
    //   bullets: [
    //     '미래 비전 실현을 위한 중장기 계획 수립',
    //     '지역 사회적 경제 생태계 완성',
    //     '화전마을 브랜드 가치 향상',
    //   ],
    // },
    {
      year: 2025,
      bullets: [
        '미래 비전 실현을 위한 중장기 계획 수립',
        '지역 사회적 경제 생태계 완성',
        '화전마을 브랜드 가치 향상',
      ],
    },
    {
      year: 2024,
      bullets: [
        '조합원 확대 및 조직 강화',
        '지속가능한 지역 순환 생태계 구축',
        '마을 공동체 네트워크 확장',
      ],
    },
    {
      year: 2023,
      bullets: [
        '행사 기획 및 교육 체험 사업 확장',
        '지역 활성화 사업 본격 추진',
        '주민 참여 프로그램 다각화',
      ],
    },
    {
      year: 2022,
      bullets: [
        '화전마을사회적협동조합 정식 설립',
        '도시재생 거점공간 운영 사업 시작',
        '카페27b 오픈',
      ],
    },
    {
      year: 2021,
      bullets: ['화전마을사회적협동조합 설립 준비', '지역 주민 의견 수렴 및 조합 설립 계획 수립'],
    },
  ];

  return (
    <div className="relative min-h-screen">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <img src={TimelineImg} alt="연혁 배경" className="w-full h-full object-cover" />
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">연혁</h2>
            <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-white text-lg max-w-3xl mx-auto leading-relaxed">
              화전의 변화는 단절이 아닌 연결의 역사입니다. 지금까지 걸어온 주요 흐름을 시간의 궤도로
              담았습니다.
            </p>
          </div>

          {/* 가로 타임라인 */}
          <TimelineZigzag items={historyData} />
        </div>
      </div>
    </div>
  );
};

export default History;
