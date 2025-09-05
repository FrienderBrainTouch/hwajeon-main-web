import type { AcademyCard, EducationCard } from './data';
import {
  academyCards as defaultAcademyCards,
  educationCards as defaultEducationCards,
} from './data';

interface UrbanRegenerationHubProps {
  academyCards?: AcademyCard[];
  educationCards?: EducationCard[];
}

const UrbanRegenerationHub = ({
  academyCards = defaultAcademyCards,
  educationCards = defaultEducationCards,
}: UrbanRegenerationHubProps) => {
  return (
    <div className="w-full py-8">
      {/* 헤더 섹션 */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          도시재생 거점공간 운영 사업
        </h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto px-4">
          화전마을사회적협동조합은 도시재생의 핵심 가치인 주민 주도성을 실현하기 위해 <br />
          일상 속 마을 거점공간을 직접 운영하고 있습니다. <br />이 공간은 단순한 장소를 넘어, 주민의
          만남, 논의, 실행, 공유가 이어지는 플랫폼 역할을 수행하고 있습니다.
        </p>
      </div>

      {/* 카페 운영 실무 아카데미 */}
      <div className="w-full mb-16 bg-[#E8E4DB80] p-8">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            카페 운영 실무 아카데미
          </h3>
          <h4 className="text-lg sm:text-xl text-gray-700 mb-8">카페 운영 실무 아카데미</h4>

          {/* 카드 컨테이너 */}
          {academyCards.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="grid lg:grid-cols-2">
                {/* 이미지 영역 */}
                <div className="bg-gray-200 h-64 sm:h-80 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">이미지</span>
                </div>

                {/* 정보 영역 */}
                <div className="p-6 flex flex-col h-full">
                  <h5 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h5>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{card.period}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{card.target}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-2 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{card.capacity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 조합 역량 강화 교육 */}
      <div className="mb-16 max-w-5xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">조합 역량 강화 교육</h3>
        <h4 className="text-lg sm:text-xl text-gray-700 mb-8">조합 역량 강화 교육</h4>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* 이미지 영역 */}
          <div className="bg-gray-200 rounded-lg h-64 sm:h-80 flex items-center justify-center">
            <span className="text-gray-500 text-lg">이미지</span>
          </div>

          {/* 교육 프로그램 카드들 */}
          <div className="space-y-3 h-64 sm:h-80 flex flex-col justify-between">
            {educationCards.map((card) => (
              <div
                key={card.id}
                className="bg-purple-100 rounded-lg p-4 text-center flex-1 flex items-center justify-center"
              >
                <span className="text-gray-700 font-medium">{card.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 선진지 탐방 프로그램 */}
      <div className="mb-16 max-w-5xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">선진지 탐방 프로그램</h3>
        <h4 className="text-lg sm:text-xl text-gray-700 mb-8">선진지 탐방 프로그램</h4>

        <div className="bg-gray-200 rounded-lg h-64 sm:h-80 flex items-center justify-center">
          <span className="text-gray-500 text-lg">이미지</span>
        </div>
      </div>

      {/* 하단 설명 텍스트 */}
      <div className="text-center max-w-4xl mx-auto px-4">
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          화전마을의 거점공간은 단순히 회의를 위한 장소나 일시적인 프로그램을 위한 공간이 아닙니다.
          <br />
          이곳은 주민이 직접 만나고, 이야기하고, 아이디어를 모아 실제 실행으로 옮기는 '마을 변화의
          플랫폼' 역할을 수행하고 있습니다. <br />
          무엇보다 중요한 점은, 이 공간이 주민 누구에게나 열려 있다는 것입니다. <br />
          마을을 변화시키는 일은 특별한 기획자가 아닌, 이곳을 오가며 이야기 나누는 주민들로부터
          시작되기 때문입니다. <br />
        </p>
      </div>
    </div>
  );
};

export default UrbanRegenerationHub;
