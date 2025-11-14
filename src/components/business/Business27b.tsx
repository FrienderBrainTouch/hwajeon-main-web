// import image1 from '@/assets/business/1_27b-business_1.png';
import image2 from '@/assets/business/1_27b-business_2.png';
import image3 from '@/assets/business/1_27b-business_3.jpg';
import image4 from '@/assets/business/1_27b-business_4.jpg';
import image5 from '@/assets/business/1_27b-business_5.jpg';
import image6 from '@/assets/business/1_27b-business_6.jpg';
import image7 from '@/assets/business/1_27b-business_7.jpg';
import image8 from '@/assets/fix/27b사업/27b_사업1.png';

// 카페운영 사업 데이터
const cafeServices = [
  {
    title: '27b Signature & Menu',
    subtitle: "'로컬에서 만나는 스페이스 감성'",
    description: '커피, 차, 에이드, 스무디, 주스, 샌드위치, 쿠키, 마카롱',
    image: image8,
  },
  {
    title: 'The Store at 27b',
    description: '생활용품 코너, 로컬 굿즈존, 27b 캐릭터 상품, 우주항공 문구류, 별땅내땅보드게임',
    image: image2,
  },
  {
    title: '공간 대관 서비스',
    description: 'Café 27b는 교육·회의·전시·촬영 등 다양한 목적의 소규모 대관 제공',
    image: image3,
  },
];

// 케이터링 서비스 데이터
const cateringServices = [
  {
    title: 'Daily Catering',
    subtitle: '샌드위치 & 도시락',
    description: '회의와 워크숍, 교육 현장을 위한 간편한 식사',
    image: image4,
  },
  {
    title: 'Party Catering',
    subtitle: '파티 테이블',
    description: '소규모 모임, 파티에 어울리는 감각적인 핑거푸드 구성',
    image: image5,
  },
  {
    title: 'Ceremony Catering',
    subtitle: '꽃과 케이크',
    description: '리셉션, 오프닝, 기념행사 등 품격 있는 테이블 세팅',
    image: image6,
  },
];

export default function Business27b() {
  return (
    <div className="w-full py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* 27b 사업 소개 */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">27b 사업</h2>
            <div className="w-16 h-1 bg-[#2B2A4C] mx-auto mb-6"></div>
            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
                로컬 시그니처 카페 브랜드 <span className="font-semibold text-gray-800">'27b'</span>
                를 중심으로
                <br className="hidden sm:block" />
                카페운영, 케이터링, 이동카페 등 지역 기반 식음료 사업 운영
              </p>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                지역의 자원과 사람을 연결하며, 지속 가능한 로컬 브랜드 가치 창출
              </p>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                화전의 감성을 담은 음료, 디저트, 굿즈 등 라이프스타일 콘텐츠 개발
              </p>
            </div>
          </div>
        </section>

        {/* 카페운영 사업 */}
        <section className="mb-20">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              카페운영 사업 <span className="text-xl md:text-2xl text-[#2B2A4C]">(카페 27b)</span>
            </h3>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              품질과 감각을 겸비한 로컬 시그니처 카페로서 지역 생산품을 활용한 메뉴와 편안한 공간
              제공
            </p>
          </div>

          <div className="space-y-10">
            {cafeServices.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100/50 p-8 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-2xl font-bold mb-2 text-gray-900">{service.title}</h4>
                {service.subtitle && (
                  <p className="text-base text-purple-600 mb-4 font-medium">{service.subtitle}</p>
                )}
                <p className="text-base text-gray-600 mb-5 leading-relaxed">
                  {service.description}
                </p>
                <div className="w-full h-[524px] overflow-hidden rounded-xl shadow-md">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 케이터링 사업 */}
        <section className="mb-20">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              케이터링 사업 <span className="text-xl md:text-2xl text-[#2B2A4C]">(27b table)</span>
            </h3>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              행사·기관·기업을 대상으로 샌드위치·디저트 등 간편식을 중심으로 한 케이터링 서비스 제공
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {cateringServices.map((service, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-purple-100/30 p-7 rounded-2xl flex flex-col border border-purple-200/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <h4 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h4>
                <p className="text-base font-semibold text-purple-700 mb-3">{service.subtitle}</p>
                <p className="text-sm text-gray-600 mb-5 leading-relaxed">{service.description}</p>
                <div className="w-full h-48 overflow-hidden rounded-xl mt-auto shadow-md">
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

        {/* 이동카페 사업 */}
        <section className="mb-16">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              이동카페 사업 <span className="text-xl md:text-2xl text-[#2B2A4C]">(27b mobile)</span>
            </h3>
            <p className="text-base text-gray-600 leading-relaxed font-light">
              현장을 직접 찾아가 음료와 디저트를 제공하는 이동형 카페 서비스로,
              <br className="hidden sm:block" />
              27b 브랜드의 경험을 현장으로 확장
            </p>
          </div>
          <div className="w-full max-h-96 overflow-hidden rounded-2xl shadow-lg">
            <img
              src={image7}
              alt="이동카페 서비스"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
