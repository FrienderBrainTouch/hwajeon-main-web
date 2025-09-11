import React from 'react';
import BoardWrapper from '@/components/news/BoardWrapper';

const MeetingMaterials: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      {/* 헤더 섹션 */}
      <div className="mb-8 sm:mb-12 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">정기회의 자료</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          조합의 투명한 운영과 정보 공유를 위해 정기회의 자료와 주요 회의 자료를 정리하여
          공개합니다. <br />
          필요한 자료를 자유롭게 열람하고 다운로드하실 수 있습니다.
        </p>
      </div>

      {/* 정기회의 자료 목록 - BoardWrapper 사용 */}
      <BoardWrapper title="정기회의 자료" boardType="meeting" itemsPerPage={10} showTitle={false} />
    </div>
  );
};

export default MeetingMaterials;
