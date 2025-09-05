import React from 'react';
import { TimelineZigzag } from '.';
import TimelineImg from '@/assets/timeline.jpg';
import type { HistoryItem } from './data';
import { historyData as defaultHistoryData } from './data';

interface HistoryProps {
  historyData?: HistoryItem[];
}

const History: React.FC<HistoryProps> = ({ historyData = defaultHistoryData }) => {
  // 데이터를 TimelineZigzag가 기대하는 형식으로 변환
  const timelineData = historyData.map((item) => ({
    year: parseInt(item.year),
    bullets: [item.description],
  }));

  return (
    <div className="relative min-h-screen">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <img src={TimelineImg} alt="연혁 배경" className="w-full h-full object-cover" />
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">연혁</h2>
            <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-white text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
              화전의 변화는 단절이 아닌 연결의 역사입니다. 지금까지 걸어온 주요 흐름을 시간의 궤도로
              담았습니다.
            </p>
          </div>

          {/* 가로 타임라인 */}
          <TimelineZigzag items={timelineData} />
        </div>
      </div>
    </div>
  );
};

export default History;
