function NoticeSection() {
  return (
    <section className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24">
      <div className="flex items-center justify-between">
        <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
          공지사항
        </h2>
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
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
            <span className="text-xs xs:text-sm text-gray-500 ml-4 flex-shrink-0">{item.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NoticeSection;
