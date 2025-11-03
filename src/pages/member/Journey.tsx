import { useNavigate, useParams } from 'react-router-dom';
import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';

const titleByStep: Record<string, string> = {
  leap: '도약 – 전환의 시작',
  cooperation: '협동 – 사회적 경제의 기반',
  change: '변화 – 지역자원이 사회적가치로 순환되는 구조',
  sustain: '지속 – 지속가능한 지역모델 정착',
};

const subtitleByStep: Record<string, string> = {
  leap: '도시재생 종료 이후, 지역이 스스로 지속을 설계하며 자립의 기반을 세우다.',
  cooperation: '주민조직이 사회적협동조합으로 성장하여, 마을운영을 기업형 시스템으로 전환하다.',
  change: '카페·케이터링·교육·돌봄 등 생활기반 사업을 통해 사회적경제 생태계를 구축하다.',
  sustain: '일자리·공간·관계를 연결하며, 사람이 머무는 지역경제 플랫폼으로 완성되다.',
};

export default function Journey() {
  const { step = 'leap' } = useParams();
  const navigate = useNavigate();

  const title = titleByStep[step] ?? '화전의 여정';
  const subtitle = subtitleByStep[step] ?? '';

  const tabs: TabItem[] = [
    { id: 'leap', label: '도약', value: 'leap' },
    { id: 'cooperation', label: '협동', value: 'cooperation' },
    { id: 'change', label: '변화', value: 'change' },
    { id: 'sustain', label: '지속', value: 'sustain' },
  ];

  // 이미지 매핑 (파일명은 한국어 포함)
  const leapImages: string[] = [
    new URL('@/assets/2. 도약_1.jpg', import.meta.url).href,
    new URL('@/assets/2. 도약_2.jpg', import.meta.url).href,
    new URL('@/assets/2. 도약_3.JPG', import.meta.url).href,
    new URL('@/assets/2. 도약_4.jpg', import.meta.url).href,
    new URL('@/assets/2. 도약_5.png', import.meta.url).href,
    new URL('@/assets/2. 도약_6.jpg', import.meta.url).href,
  ];

  const cooperationImages: string[] = [
    new URL('@/assets/3. 협동_1.jpg', import.meta.url).href,
    new URL('@/assets/3. 협동_2.jpg', import.meta.url).href,
    new URL('@/assets/3. 협동_3.jpg', import.meta.url).href,
    new URL('@/assets/3. 협동_4.jpg', import.meta.url).href,
    new URL('@/assets/3. 협동_5.jpg', import.meta.url).href,
    new URL('@/assets/3. 협동_6.jpg', import.meta.url).href,
    new URL('@/assets/3. 협동_7.jpg', import.meta.url).href,
  ];

  const changeImages: string[] = [
    new URL('@/assets/변화_1.jpg', import.meta.url).href,
    new URL('@/assets/변화_2.jpg', import.meta.url).href,
    new URL('@/assets/변화_3.jpg', import.meta.url).href,
    new URL('@/assets/변화_4.jpg', import.meta.url).href,
    new URL('@/assets/변화_5.jpg', import.meta.url).href,
    new URL('@/assets/변화_6.jpg', import.meta.url).href,
    new URL('@/assets/변화_7.jpg', import.meta.url).href,
  ];

  const sustainImages: string[] = [
    new URL('@/assets/지속_1.jpg', import.meta.url).href,
    new URL('@/assets/지속_2.jpg', import.meta.url).href,
    new URL('@/assets/지속_3.jpg', import.meta.url).href,
    new URL('@/assets/지속_4.jpg', import.meta.url).href,
    new URL('@/assets/지속_5.jpg', import.meta.url).href,
    new URL('@/assets/지속_6.jpg', import.meta.url).href,
    new URL('@/assets/지속_7.jpg', import.meta.url).href,
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8">
        {/* 탭 네비게이션 */}
        <div className="mt-6">
          <TabNavigation
            tabs={tabs}
            value={step}
            onValueChange={(val) => navigate(`/member/journey/${val}`)}
            className="mb-2"
          />
        </div>

        <div className="w-[90%] max-w-[1400px] min-w-[320px] mx-auto mt-4 sm:mt-6">
          <h1 className="text-center text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-center text-xs sm:text-sm text-gray-600 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* 이미지/콘텐츠 자리 배치 (사용자 이미지 교체 예정) */}
          {step === 'leap' && (
            <div className="mt-8 space-y-10">
              {/* 1) 조합 설립을 위한 교육 & 답사 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  조합 설립을 위한 교육 & 답사
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  타 지역 사례를 배우고, 설립 및 관련 교육을 통해 ‘지속 가능한 마을 운영’을
                  준비하다.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={leapImages[0]}
                      alt="도약 이미지 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={leapImages[1]}
                      alt="도약 이미지 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* 2) 드론앵커센터 착공 및 거점 구축 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  드론앵커센터 착공 및 거점 구축
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  도시재생의 결실로, 주민 거점공간이 포함된 드론앵커센터 착공으로 마을 변화의 중심이
                  되다.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={leapImages[2]}
                      alt="도약 이미지 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={leapImages[3]}
                      alt="도약 이미지 4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* 3) 브랜드/캐릭터 개발 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  화전마을 브랜드와 캐릭터 개발
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  마을의 정체성을 담은 캐릭터와 로고를 완성하며, 화전의 새로운 얼굴을 만들다.
                </p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 gap-4">
                  <div className="h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <img
                      src={leapImages[4]}
                      alt="도약 이미지 5"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                    <img
                      src={leapImages[5]}
                      alt="도약 이미지 6"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {step === 'cooperation' && (
            <div className="mt-8 space-y-10">
              {/* 1) 사회적기업·마을기업을 위한 노력 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  사회적기업·마을기업을 위한 노력
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  사회적가치를 실현하기 위해 인증과 지정을 준비하며, 지속 가능한 지역기업으로
                  나아가다.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={cooperationImages[0]}
                      alt="협동 이미지 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={cooperationImages[1]}
                      alt="협동 이미지 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={cooperationImages[2]}
                      alt="협동 이미지 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* 2) 정기총회와 주민 협의의 장 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  정기총회와 주민 협의의 장
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  조합원들이 한자리에 모여 성과를 공유하고, 마을의 미래를 함께 결정하다.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={cooperationImages[3]}
                      alt="협동 이미지 4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={cooperationImages[4]}
                      alt="협동 이미지 5"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* 3) 기업 성장을 위한 컨설팅과 역량 강화 교육 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  기업 성장을 위한 컨설팅과 역량 강화 교육
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  전문가 컨설팅과 교육을 통해 경영 체계를 다지고, 사회적경제 기업으로 성장의 방향을
                  세우다.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={cooperationImages[5]}
                      alt="협동 이미지 6"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={cooperationImages[6]}
                      alt="협동 이미지 7"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {step === 'change' && (
            <div className="mt-8 space-y-10">
              {/* 1) 지역 협력 네트워크 구축 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  지역 협력 네트워크 구축
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  지역의 다양한 주체가 모여 협력과 교류의 장을 열며, 마을과 기관이 함께 성장하는
                  발판을 마련하다.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={changeImages[0]}
                      alt="변화 이미지 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={changeImages[1]}
                      alt="변화 이미지 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={changeImages[2]}
                      alt="변화 이미지 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* 2) 돌봄 공동체 실천 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  돌봄 공동체 실천
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  지역 어르신을 위한 돌봄 서비스로, 따뜻한 공동체의 가치를 실천하다.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={changeImages[3]}
                      alt="변화 이미지 4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={changeImages[4]}
                      alt="변화 이미지 5"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* 3) 배움과 쉼이 있는 마을, 화전 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  배움과 쉼이 있는 마을, 화전
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  마을에 활력을 불어넣고, 우주항공 테마의 교육·관광 마을로서 새로운 이미지를
                  만들어가다.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={changeImages[5]}
                      alt="변화 이미지 6"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={changeImages[6]}
                      alt="변화 이미지 7"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {step === 'sustain' && (
            <div className="mt-8 space-y-10">
              {/* 1) 거점공간 카페27b 운영 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  거점공간 ‘카페27b’ 운영
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  지역주민을 우선 채용하여 일자리를 창출하고, 주민과 방문객이 함께 어울리는 지속
                  가능한 커뮤니티 공간을 운영하다.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div className="h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={sustainImages[0]}
                      alt="지속 이미지 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* 2) 케이터링 사업 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  케이터링 사업
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  행사와 모임에 서비스를 제공하며, 조합의 자립적 수익 구조를 강화하고 지역경제의
                  선순환을 실현하다.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div className="h-48 sm:h-56 md:h-64 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={sustainImages[1]}
                      alt="지속 이미지 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* 3) ‘별땅내땅’ 보드게임 개발 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  ‘별땅내땅’ 보드게임 개발
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  별자리를 주제로 한 옥션 카드게임을 통해 지역의 창의적 콘텐츠를 확장하다.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={sustainImages[2]}
                      alt="지속 이미지 3"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* 4) 도시재생 선진지 답사 교육 */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  도시재생 선진지 답사 교육
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  외부 기관과 단체가 화전으로 찾아와 현장 교육과 교류를 진행하며, 화전의 도시재생
                  모델을 배우는 창을 열다.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div className="h-44 sm:h-52 md:h-60 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={sustainImages[3]}
                      alt="지속 이미지 4"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </section>

              {/* 5) 예비마을기업/예비사회적기업 지정 (3개 문서 이미지) */}
              <section>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  예비마을기업 및 예비사회적기업 지정
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  지속 가능한 경영 기반을 인정받아 경기도 예비마을기업과 예비사회적기업으로
                  지정되며, 지역경제의 중심 주체로 성장하다.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={sustainImages[4]}
                      alt="지속 문서 1"
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>
                  <div className="h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={sustainImages[5]}
                      alt="지속 문서 2"
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>
                  <div className="h-40 sm:h-48 md:h-56 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={sustainImages[6]}
                      alt="지속 문서 3"
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* 다른 단계(step)는 우선 제목/부제만 노출. 필요 시 동일한 패턴으로 섹션 추가 */}
        </div>
      </div>
    </div>
  );
}
