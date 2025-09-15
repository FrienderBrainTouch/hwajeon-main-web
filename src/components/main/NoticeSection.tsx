import { useNavigate } from 'react-router-dom';

function NoticeSection() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
      <section className="mt-20 xs:mt-24 sm:mt-28 md:mt-32 lg:mt-36 xl:mt-40 2xl:mt-48">
        <div className="flex items-center justify-between">
          <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
            공지사항
          </h2>
          <button
            onClick={() => navigate('/member/news?tab=notice')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            더보기
          </button>
        </div>

        <div className="mt-4 xs:mt-5 sm:mt-6 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-10 space-y-4">
          {[
            { title: '[공지] 공지사항입니다.', date: '2025.07.07' },
            { title: '[휴무 안내] 공지사항입니다.', date: '2025.07.07' },
            { title: '공지사항입니다.', date: '2025.07.07' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 xs:py-4 border-b border-gray-100 last:border-b-0"
            >
              <h3 className="text-sm xs:text-base text-gray-900 hover:text-gray-700 transition-colors cursor-pointer">
                {item.title}
              </h3>
              <span className="text-xs xs:text-sm text-gray-500 ml-4 flex-shrink-0">
                {item.date}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NoticeSection;
