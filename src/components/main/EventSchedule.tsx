function EventSchedule() {
  return (
    <section
      className="mt-10 xs:mt-12 sm:mt-14 md:mt-16 lg:mt-18 xl:mt-20 2xl:mt-24 py-10 xs:py-12 sm:py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-24"
      style={{
        backgroundColor: '#F3D9D04D',
        borderRadius: '200px 0px 0px 0px',
      }}
    >
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16">
        <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
          행사일정
        </h2>
        <p className="mt-1 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-500">
          다가오는 행사 일정을 확인할 수 있습니다.
        </p>

        <div className="mt-6 xs:mt-7 sm:mt-8 md:mt-8 lg:mt-9 xl:mt-10 2xl:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
          {/* 왼쪽: 이벤트 카테고리 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <span className="text-base font-medium text-gray-900">마을 축제</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
              <span className="text-base font-medium text-gray-900">원데이 클래스</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
              <span className="text-base font-medium text-gray-900">회의 일정</span>
            </div>
            <button className="mt-6 bg-[#2B2A4C] text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-[#262544] transition-colors">
              전체 일정 보기
            </button>
          </div>

          {/* 오른쪽: 캘린더 */}
          <div className="bg-white rounded-xl p-4 xs:p-5 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">←</button>
              <h3 className="text-lg font-semibold text-gray-900">8월</h3>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">→</button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className="text-center text-xs text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {/* 이전 달 마지막 날들 */}
              {[29, 30].map((date) => (
                <div key={`prev-${date}`} className="text-center py-2 text-sm text-gray-300">
                  {date}
                </div>
              ))}

              {/* 현재 달 날짜들 */}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => {
                const hasEvent = [4, 7, 11, 14, 18, 19, 20].includes(date);
                const eventType = [4, 18].includes(date)
                  ? 'blue'
                  : [7, 14].includes(date)
                  ? 'orange'
                  : [11, 19].includes(date)
                  ? 'purple'
                  : 'blue';

                return (
                  <div key={date} className="text-center py-2 text-sm relative">
                    <span className={`${hasEvent ? 'text-white' : 'text-gray-900'} relative z-10`}>
                      {date}
                    </span>
                    {hasEvent && (
                      <div
                        className={`absolute inset-0 rounded-full ${
                          eventType === 'blue'
                            ? 'bg-blue-500'
                            : eventType === 'purple'
                            ? 'bg-purple-500'
                            : 'bg-orange-500'
                        }`}
                      ></div>
                    )}
                  </div>
                );
              })}

              {/* 다음 달 첫 날들 */}
              {[1, 2].map((date) => (
                <div key={`next-${date}`} className="text-center py-2 text-sm text-gray-300">
                  {date}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventSchedule;
