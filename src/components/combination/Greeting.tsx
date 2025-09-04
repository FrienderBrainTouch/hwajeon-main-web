import React from 'react';

const Greeting: React.FC = () => {
  return (
    <div className="py-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">인사말</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* 이미지 영역 */}
        <div className="bg-gray-200 rounded-lg flex items-center justify-center aspect-[620/600] w-full max-w-[620px] mx-auto">
          <span className="text-gray-500 text-lg">이미지</span>
        </div>

        {/* 텍스트 영역 */}
        <div className="space-y-12">
          <div className="space-y-1">
            <p className="text-xl">안녕하세요.</p>
            <p className="text-xl">화전마을 사회적협동조합입니다.</p>
          </div>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p>
              세계 최초의 상업 우주 관광이 시작되면서 대기자 명단이 급속도로 늘어나고 있습니다. 지구
              궤도를 일주하는 일주일간의 여행을 통해 관광객들은 우주의 아름다움과 경이로움을 직접
              체험할 수 있게 되었습니다.
            </p>
            <p>
              우주 관광 산업은 부유층의 여가 활동을 넘어 일반 대중에게까지 확산될 가능성이 높아지고
              있으며, 전문가들은 이는 새로운 관광 산업의 핵심이 될 것이며 우주 과학 기술 발전에도
              기여할 것으로 보고 있습니다.
            </p>
          </div>

          {/* 서명 영역 */}
          <div className="flex items-center space-x-4 mt-12">
            <span className="text-gray-600 font-semibold text-xl">대표자</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-800 font-semibold text-xl">홍길동</span>
              <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
