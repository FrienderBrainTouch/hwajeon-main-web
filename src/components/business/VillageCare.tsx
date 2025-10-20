import image1 from '@/assets/business/3_village-care_1.jpg';
import image2 from '@/assets/business/3_village-care_2.jpg';
import image3 from '@/assets/business/3_village-care_3.jpg';

export default function VillageCare() {
  return (
    <div className="w-full py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* 마을돌봄 사업 소개 */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">마을돌봄 사업</h2>
            <div className="w-16 h-1 bg-[#2B2A4C] mx-auto mb-6"></div>
            <div className="max-w-3xl mx-auto space-y-3">
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light">
                사람과 마을이 함께 돌보는 사회적 돌봄 모델을 구축하는 사업
              </p>
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                지역 내 돌봄, 일자리, 환경관리 등을 연계하여 지속 가능한 생활돌봄 체계를 만드는 사업
              </p>
            </div>
          </div>
        </section>

        {/* 통합돌봄 사업 */}
        <section className="mb-20">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">통합돌봄 사업</h3>
            <div className="space-y-2">
              <p className="text-base text-gray-600 leading-relaxed font-light">
                세대 간 돌봄과 사회적 관계망 회복을 목표로 하는 생활지원형 프로그램
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                지역 기반의 가장 기본적인 상호돌봄 체계 구축
              </p>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap justify-start mb-6">
            <div className="bg-white border-2 border-blue-300 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-base font-semibold text-gray-900">활돌봄 네트워크 운영</p>
            </div>
            <div className="bg-white border-2 border-blue-300 px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-base font-semibold text-gray-900">세대공감 문화프로그램</p>
            </div>
          </div>

          <div className="w-full h-96 overflow-hidden rounded-2xl shadow-lg mb-6">
            <img
              src={image1}
              alt="통합돌봄 사업"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </section>

        {/* 자원봉사·노인일자리 지원 사업 */}
        <section className="mb-20">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
              자원봉사·노인일자리 지원 사업
            </h3>
            <div className="space-y-2">
              <p className="text-base text-gray-600 leading-relaxed font-light">
                사회공헌과 일자리 창출을 결합한 사회적 일자리 연계 사업
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                지역 내 공공기관 등과 협력하여 시니어 인력의 사회참여 및 일자리 기회제공
              </p>
            </div>
          </div>

          <div className="w-full h-96 overflow-hidden rounded-2xl shadow-lg mb-6">
            <img
              src={image2}
              alt="자원봉사·노인일자리 지원 사업"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100/30 border border-green-200/50 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
              <p className="text-lg font-bold text-gray-900 leading-relaxed">
                실버인력뱅크
                <br />
                연계 일자리 매칭
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100/30 border border-green-200/50 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
              <p className="text-lg font-bold text-gray-900 leading-relaxed">
                청년·주민
                <br />
                자원봉사단 운영
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100/30 border border-green-200/50 p-6 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
              <p className="text-lg font-bold text-gray-900 leading-relaxed">
                기관 협력형
                <br />
                사회서비스 지원
              </p>
            </div>
          </div>
        </section>

        {/* 마을환경관리 사업 */}
        <section className="mb-16">
          <div className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">마을환경관리 사업</h3>
            <div className="space-y-2">
              <p className="text-base text-gray-600 leading-relaxed font-light">
                깨끗하고 안전한 생활환경을 조성하기 위한 주민참여형 환경개선 사업
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                커뮤니티 공간, 공공시설, 거리 등 마을 전반의 청소·미화·조경 활동 수행
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                환경정비를 통해 마을의 지속가능성과 공동체 의식 고양
              </p>
            </div>
          </div>

          <div className="w-full h-96 overflow-hidden rounded-2xl shadow-lg">
            <img
              src={image3}
              alt="마을환경관리 사업"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
