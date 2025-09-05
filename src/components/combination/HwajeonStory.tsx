import type { Card as CardType, StoryImage } from './data';
import {
  cards as defaultCards,
  storyImages as defaultStoryImages,
  mainStoryImage as defaultMainStoryImage,
} from './data';

interface CardProps {
  title: string;
  description?: string;
  type: 'gradient' | 'gray' | 'image';
  gradient?: string;
}

interface HwajeonStoryProps {
  cards?: CardType[];
  storyImages?: StoryImage[];
  mainStoryImage?: { src: string; alt: string };
}

function Card({ title, description, type, gradient }: CardProps) {
  const baseClasses =
    'p-4 sm:p-6 rounded-lg w-full max-w-[280px] sm:max-w-[330px] xl:max-w-[285px] aspect-square mx-auto lg:mx-0';

  if (type === 'gradient') {
    return (
      <div className={`bg-gradient-to-br ${gradient} text-white ${baseClasses}`}>
        <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">{title}</h4>
        <p className="text-blue-100 text-sm sm:text-base">{description}</p>
      </div>
    );
  }

  if (type === 'gray') {
    return (
      <div className={`bg-gray-200 text-center ${baseClasses}`}>
        <div className="text-base sm:text-lg font-medium text-gray-600 mb-2 sm:mb-3">이미지</div>
        <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-800">{title}</h4>
        <p className="text-gray-600 text-sm sm:text-base">{description}</p>
      </div>
    );
  }

  if (type === 'image') {
    return (
      <div className={`bg-gray-200 relative overflow-hidden ${baseClasses}`}>
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">이미지</span>
        </div>
        <div className="relative z-10 text-center">
          <h4 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg">
            {title}
          </h4>
          <p className="text-white drop-shadow-lg text-sm sm:text-base">{description}</p>
        </div>
      </div>
    );
  }

  return null;
}

export default function HwajeonStory({
  cards = defaultCards,
  storyImages = defaultStoryImages,
  mainStoryImage = defaultMainStoryImage,
}: HwajeonStoryProps) {
  return (
    <div className="mx-auto py-8">
      {/* 화전 이야기 섹션 */}
      <div className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">화전 이야기</h2>
        <div className="w-16 h-1 bg-black mx-auto mb-6"></div>

        {/* 이미지 영역 - 반응형 그리드/스크롤 */}
        <div className="max-w-5xl mx-auto mb-8">
          {/* 큰 화면에서는 그리드 */}
          <div className="hidden md:grid md:grid-cols-2 gap-6">
            {storyImages.slice(0, 2).map((image, index) => (
              <div
                key={index}
                className="bg-gray-200 h-56 lg:h-64 rounded-lg flex items-center justify-center"
              >
                <span className="text-gray-500 text-lg">{image.alt}</span>
              </div>
            ))}
          </div>

          {/* 작은 화면에서는 가로 스크롤 */}
          <div className="md:hidden overflow-x-auto">
            <div className="flex gap-6 min-w-max px-4">
              {storyImages.map((image, index) => (
                <div
                  key={index}
                  className="bg-gray-200 h-48 w-80 rounded-lg flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-gray-500 text-lg">{image.alt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
          불을 지펴 농사를 짓던 땅, 화전(花田)
        </h3>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl mx-auto px-4">
          혁신적인 가상현실 게임 '넥서스'가 전 세계적으로 폭발적인 인기를 끌고 있습니다. 이 게임은
          매우 몰입감 있는 그래픽과 정교한 게임플레이를 제공하여 현실과 구분하기 어려울 정도로
          사용자들에게 완전히 새로운 경험을 선사하고 있습니다.
        </p>
      </div>

      {/* 마을의 변화와 흐름 섹션 */}
      <div className="mb-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">마을의 변화와 흐름</h2>
          <h3 className="text-base sm:text-lg text-gray-700 mb-6">
            화전은 지금, 도시와 마을의 경계 위에 서 있습니다
          </h3>
        </div>

        <div className="bg-gray-200 w-full h-48 sm:h-64 lg:h-80 rounded-lg flex items-center justify-center mb-8">
          <span className="text-gray-500 text-lg">{mainStoryImage.alt}</span>
        </div>

        <div className="max-w-5xl mx-auto px-4">
          <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
            <p>
              오랫동안 '서울 외곽의 작은 마을'로 알려져 온 화전은 지난 수십 년간 급격하게 정체성과
              풍경을 바꿔왔습니다. 과거 논과 밭, 군부대와 작은 집들이 지배하던 조용한 주거지역이었던
              화전은 이제 한국항공대 캠퍼스와 대규모 산업단지, 확장된 철도와 버스 교통망이 공존하는
              복합적인 마을 구조로 변화했습니다. 도시와 농촌, 개발과 보존, 젊은 세대와 기성세대가
              함께 어우러지는 공간이 되었습니다.
            </p>
            <p>
              화전은 더 이상 낡은 마을이 아닙니다. 변화의 전환점에 선 '플랫폼형 마을'로서, 도시와
              삶의 새로운 가능성을 실험하는 공간으로 나아가고 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 화전의 정체성 섹션 */}
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">화전의 정체성</h2>
        <h3 className="text-base sm:text-lg text-gray-700 mb-8">소제목</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* 768px 이하: 2x3 그리드 */}
          {/* 768px-1024px: 3x2 그리드 */}
          {/* 1024px 이상: 4x2 그리드 (첫 번째 행: 0,1,2번째 칸, 두 번째 행: 1,2,3번째 칸) */}

          {/* 첫 번째 행: 0, 1, 2번째 칸 */}
          {cards.slice(0, 3).map((card, index) => (
            <Card key={index} {...card} />
          ))}

          {/* 1024px 이상에서만 보이는 빈 칸 */}
          <div className="hidden lg:block"></div>

          {/* 두 번째 행: 1, 2, 3번째 칸 */}
          <div className="hidden lg:block"></div>
          {cards.slice(3).map((card, index) => (
            <Card key={index + 3} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}
