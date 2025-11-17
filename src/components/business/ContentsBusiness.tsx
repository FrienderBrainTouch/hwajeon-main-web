import image1 from '@/assets/business/2_contents-business_1.jpg';
import image3 from '@/assets/business/2_contents-business_3.jpg';
import edu1 from '@/assets/fix/education-contents/edu_lifestyle.png';
import edu2 from '@/assets/fix/education-contents/edu_custom.png';
import edu3 from '@/assets/fix/education-contents/edu_regional.png';
import program1 from '@/assets/fix/education-contents/3-1카페운영아카데미.png';
import program2 from '@/assets/fix/education-contents/3-2선진지답사.png';
import program3 from '@/assets/fix/education-contents/3-3도시재생교육.png';

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

// 교육콘텐츠 사업 데이터
const educationServices = [
  {
    title: '취미·교양 원데이 클래스',
    subtitle: '라이프스타일 교육',
    description: '공예·드로잉·나만의 굿즈 만들기, 향·커피·푸드 메이킹 클래스',
    image: edu1,
  },
  {
    title: '역량·실무 중심 맞춤 교육',
    subtitle: '대상별 전문교실',
    description: '어르신 디지털 역량교실, 창업·메이커 교실 등',
    image: edu2,
  },
  {
    title: '지역기반 실천 프로젝트형 교육',
    subtitle: '마을디자인랩, 로컬콘텐츠 발굴교육',
    description: '환경·기후·우주과학 체험 프로젝트, 지역축제 연계',
    image: edu3,
  },
];

// 프로그램 카드 데이터
const programs = [
  {
    title: '도시재생형\n카페운영 실무아카데미',
    image: program1,
  },
  {
    title: '선진지\n탐방 프로그램',
    image: program2,
  },
  {
    title: '현장 실무자\n워크숍',
    image: program3,
  },
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

        {/* 행사기획 사업 */}
        <section className="mb-20">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              {contentSections[0].title}
            </h3>
            <div className="space-y-2">
              {contentSections[0].description.map((desc, descIndex) => (
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

          <div className="w-full h-96 overflow-hidden rounded-2xl shadow-lg">
            <img
              src={contentSections[0].image}
              alt={contentSections[0].imageAlt}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </section>

        {/* 교육콘텐츠 사업 */}
        <section className="mb-20">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">교육콘텐츠 사업</h3>
            <div className="space-y-2">
              <p className="text-base text-gray-600 leading-relaxed font-light">
                사회적경제, 협동조합, 지역문화, 창의교육 등 다양한 주제의 교육 프로그램을 개발·운영
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                대상별 맞춤형 교육콘텐츠를 제공하며 학습과 실천이 연결되는 교육 플랫폼 구축
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {educationServices.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100/30 p-7 rounded-2xl flex flex-col border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h4>
                <p className="text-base font-semibold text-blue-700 mb-3">{service.subtitle}</p>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">{service.description}</p>
                <div className="w-full aspect-square overflow-hidden rounded-xl mt-auto shadow-md">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 도시재생·선진지교육 사업 */}
        <section className="mb-16">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              {contentSections[1].title}
            </h3>
            <div className="space-y-2">
              {contentSections[1].description.map((desc, descIndex) => (
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

          {/* <div className="w-full h-96 overflow-hidden rounded-2xl shadow-lg mb-10">
            <img
              src={contentSections[1].image}
              alt={contentSections[1].imageAlt}
              className="w-full h-full object-cover object-center"
              style={
                contentSections[1].objectPosition
                  ? { objectPosition: contentSections[1].objectPosition }
                  : undefined
              }
            />
          </div> */}

          <div className="grid md:grid-cols-3 gap-6">
            {programs.map((program, programIndex) => (
              <div
                key={programIndex}
                className="bg-gradient-to-br from-green-50 to-green-100/30 border border-green-200/50 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6 text-center">
                  <p className="text-lg font-bold text-gray-900 leading-relaxed">
                    {program.title.split('\n').map((line, lineIndex) => (
                      <span key={lineIndex}>
                        {line}
                        {lineIndex < program.title.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
