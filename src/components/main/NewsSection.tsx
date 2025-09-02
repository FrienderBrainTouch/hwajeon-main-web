function NewsSection() {
  return (
    <section className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24">
      <div className="flex items-center justify-between">
        <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
          최근 소식
        </h2>
        <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          더보기
        </button>
      </div>
      <p className="mt-1 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-500">
        화전마을 사회적협동조합의 새로운 소식입니다.
      </p>

      <div className="mt-4 xs:mt-5 sm:mt-6 md:mt-6 lg:mt-7 xl:mt-8 2xl:mt-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
        {[
          { title: '새로운 소식입니다.', category: '분문 글', date: '2025.07.07' },
          { title: '새로운 소식입니다.', category: '분문 글', date: '2025.07.07' },
          { title: '새로운 소식입니다.', category: '분문 글', date: '2025.07.07' },
          { title: '새로운 소식입니다.', category: '분문 글', date: '2025.07.07' },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 xs:p-5 sm:p-6 shadow-sm border border-gray-100"
          >
            <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500 text-sm">
              이미지
            </div>
            <h3 className="text-sm xs:text-base font-medium text-gray-900 mb-2">{item.title}</h3>
            <div className="flex items-center justify-between text-xs xs:text-sm text-gray-500">
              <span>{item.category}</span>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;
