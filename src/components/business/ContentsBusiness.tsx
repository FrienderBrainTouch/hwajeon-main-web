import image1 from '@/assets/business/2_contents-business_1.jpg';
import image2 from '@/assets/business/2_contents-business_2.jpg';
import image3 from '@/assets/business/2_contents-business_3.jpg';

// 콘텐츠 사업 데이터
const contentSections = [
  {
    id: 'event-planning',
    title: '행사기획 사업',
    description: [
      '축제, 전시, 포럼, 플리마켓 등 다양한 주제와 규모의 행사 기획·연출',
      '공공·민간·시민단체 등 다양한 파트너와 협업형 프로젝트 추진',
    ],
    image: image1,
    imageAlt: '행사기획 사업',
  },
  {
    id: 'education-content',
    title: '교육콘텐츠 사업',
    description: [
      '사회적경제, 협동조합, 지역문화, 창의교육 등 다양한 주제의 교육 프로그램을 개발·운영',
      '대상별 맞춤형 교육콘텐츠를 제공하며 학습과 실천이 연결되는 교육 플랫폼 구축',
    ],
    image: image2,
    imageAlt: '교육콘텐츠 사업',
  },
  {
    id: 'urban-regeneration',
    title: '도시재생·선진지교육 사업',
    description: [
      '도시재생과 지역 활성화 경험을 기반으로 전국 지자체·기관·단체를 대상으로 한 현장형 교육 및 탐방 프로그램 운영',
    ],
    image: image3,
    imageAlt: '도시재생·선진지교육 사업',
    objectPosition: 'center 65%',
  },
];

// 프로그램 카드 데이터
const programs = [
  '도시재생형\n카페운영 실무아카데미',
  '선진지\n탐방 프로그램',
  '현장 실무자\n워크숍',
];

export default function ContentsBusiness() {
  return (
    <div className="w-full py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* 콘텐츠 사업 소개 */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">콘텐츠 사업</h2>
            <div className="w-16 h-1 bg-[#2B2A4C] mx-auto mb-6"></div>
            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
                행사, 교육, 도시재생 등 다양한 분야의 문화·학습 콘텐츠를 기획·운영
              </p>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                지역의 자원과 사람, 공간을 연결하여 지속 가능한 사회적가치 콘텐츠 플랫폼으로 발전
              </p>
            </div>
          </div>
        </section>

        {/* 콘텐츠 사업 섹션들 */}
        {contentSections.map((section, index) => (
          <section
            key={section.id}
            className={index === contentSections.length - 1 ? 'mb-16' : 'mb-20'}
          >
            <div className="mb-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">{section.title}</h3>
              <div className="space-y-2">
                {section.description.map((desc, descIndex) => (
                  <p
                    key={descIndex}
                    className={
                      descIndex === 0
                        ? 'text-base text-gray-600 leading-relaxed font-light'
                        : 'text-sm text-gray-500 leading-relaxed'
                    }
                  >
                    {desc}
                  </p>
                ))}
              </div>
            </div>

            <div
              className={`w-full h-96 overflow-hidden rounded-2xl shadow-lg ${
                index === contentSections.length - 1 ? 'mb-10' : ''
              }`}
            >
              <img
                src={section.image}
                alt={section.imageAlt}
                className="w-full h-full object-cover object-center"
                style={
                  section.objectPosition ? { objectPosition: section.objectPosition } : undefined
                }
              />
            </div>

            {/* 프로그램 카드 (마지막 섹션에만) */}
            {index === contentSections.length - 1 && (
              <div className="grid md:grid-cols-3 gap-6">
                {programs.map((program, programIndex) => (
                  <div
                    key={programIndex}
                    className="bg-gradient-to-br from-green-50 to-green-100/30 border border-green-200/50 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow"
                  >
                    <p className="text-lg font-bold text-gray-900 leading-relaxed">
                      {program.split('\n').map((line, lineIndex) => (
                        <span key={lineIndex}>
                          {line}
                          {lineIndex < program.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
