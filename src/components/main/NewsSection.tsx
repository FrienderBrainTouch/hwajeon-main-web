import { useNavigate } from 'react-router-dom';

function NewsSection() {
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate('/member/news?tab=news');
  };

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
      <section className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24">
        <div className="flex items-center justify-between">
          <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
            최근 소식
          </h2>
          <button
            onClick={handleMoreClick}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            더보기
          </button>
        </div>
        <p className="mt-1 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-500">
          화전마을 사회적협동조합의 새로운 소식입니다.
        </p>

        <div className="mt-4 xs:mt-5 sm:mt-6 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
          {[
            {
              title: '화전마을 전통 문화 축제 개최 안내',
              category: '행사',
              date: '2025.01.15',
              image: '🎭',
            },
            {
              title: '2025년 신년 인사 및 사업 계획 발표',
              category: '공지',
              date: '2025.01.10',
              image: '📢',
            },
            {
              title: '겨울철 안전 관리 및 시설 점검 완료',
              category: '안전',
              date: '2025.01.08',
              image: '🔒',
            },
            {
              title: '새로운 회원 모집 및 가입 혜택 안내',
              category: '모집',
              date: '2025.01.05',
              image: '👥',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 xs:p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4 flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-300">
                {item.image}
              </div>
              <h3 className="text-sm xs:text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-xs xs:text-sm text-gray-500">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                  {item.category}
                </span>
                <span className="font-medium">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NewsSection;
