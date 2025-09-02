import { useState, useMemo } from 'react';

function EventSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 현재 월의 첫 날과 마지막 날 계산
  const { firstDay, daysInMonth } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    return {
      firstDay: firstDay.getDay(), // 0: 일요일, 1: 월요일, ...
      lastDay: lastDay.getDay(),
      daysInMonth,
    };
  }, [currentDate]);

  // 이전 달로 이동
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 다음 달로 이동
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 월 이름 가져오기
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('ko-KR', { month: 'long' });
  };

  // 이벤트 데이터 (추후 쉽게 수정 가능)
  const eventData: Record<
    number,
    Record<number, { type: string; title: string; description: string }>
  > = {
    // 8월 이벤트 (예시)
    8: {
      4: { type: 'blue', title: '마을 축제', description: '화전마을 전통 축제' },
      7: { type: 'orange', title: '회의 일정', description: '월간 운영위원회' },
      11: { type: 'purple', title: '원데이 클래스', description: '전통 공예 체험' },
      14: { type: 'orange', title: '회의 일정', description: '사업 계획 회의' },
      18: { type: 'blue', title: '마을 축제', description: '가을 수확제' },
      19: { type: 'purple', title: '원데이 클래스', description: '요리 교실' },
      20: { type: 'blue', title: '마을 축제', description: '문화 공연' },
    },
    // 9월 이벤트 (예시)
    9: {
      2: { type: 'purple', title: '원데이 클래스', description: '전통 음식 만들기' },
      8: { type: 'orange', title: '회의 일정', description: '분기별 실적 회의' },
      15: { type: 'blue', title: '마을 축제', description: '추석 맞이 행사' },
      22: { type: 'purple', title: '원데이 클래스', description: '한복 입기 체험' },
    },
    // 10월 이벤트 (예시)
    10: {
      5: { type: 'blue', title: '마을 축제', description: '단풍 축제' },
      12: { type: 'orange', title: '회의 일정', description: '연말 사업 회의' },
      19: { type: 'purple', title: '원데이 클래스', description: '전통 차 시음회' },
    },
  };

  // 현재 월의 이벤트 가져오기
  const getCurrentMonthEvents = () => {
    const currentMonth = currentDate.getMonth() + 1; // getMonth()는 0부터 시작
    return eventData[currentMonth] || {};
  };

  // 특정 날짜에 이벤트가 있는지 확인
  const hasEvent = (date: number) => {
    const currentMonthEvents = getCurrentMonthEvents();
    return currentMonthEvents[date] !== undefined;
  };

  // 특정 날짜의 이벤트 타입 가져오기
  const getEventType = (date: number) => {
    const currentMonthEvents = getCurrentMonthEvents();
    return currentMonthEvents[date]?.type || 'blue';
  };

  // 특정 날짜의 이벤트 제목 가져오기
  const getEventTitle = (date: number) => {
    const currentMonthEvents = getCurrentMonthEvents();
    return currentMonthEvents[date]?.title || '';
  };

  // 캘린더 날짜 배열 생성
  const calendarDays = useMemo(() => {
    const days: number[] = [];
    // 이전 달 마지막 날들
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(0); // 빈 칸으로 표시
    }
    // 현재 달 날짜들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    // 다음 달 첫 날들
    const remainingCells = 42 - (firstDay + daysInMonth); // 6주 * 7일 = 42
    for (let i = 1; i <= remainingCells; i++) {
      days.push(0); // 빈 칸으로 표시
    }
    return days;
  }, [firstDay, daysInMonth]);

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
          화전마을의 다양한 행사와 일정을 확인하세요.
        </p>

        <div className="mt-6 xs:mt-7 sm:mt-8 md:mt-8 lg:mt-9 xl:mt-10 2xl:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-7 sm:gap-8 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
          {/* 왼쪽: 행사 카테고리 */}
          <div className="space-y-4">
            <h3 className="text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-semibold text-gray-900">
              행사 카테고리
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '문화행사', count: 5, color: 'bg-blue-100 text-blue-700' },
                { label: '교육프로그램', count: 3, color: 'bg-green-100 text-green-700' },
                { label: '커뮤니티', count: 7, color: 'bg-purple-100 text-purple-700' },
                { label: '기타', count: 2, color: 'bg-gray-100 text-gray-700' },
              ].map((category, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-shadow ${category.color}`}
                >
                  <div className="text-sm font-semibold">{category.label}</div>
                  <div className="text-xs opacity-75">{category.count}개 행사</div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 캘린더 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-semibold text-gray-900">
                {getMonthName(currentDate)}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={goToNextMonth}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-xs">
              {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                <div key={day} className="p-2 text-center font-medium text-gray-500">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, i) => (
                <div
                  key={i}
                  className={`p-2 text-center cursor-pointer hover:bg-gray-100 rounded-lg transition-colors ${
                    day === 0
                      ? 'text-gray-300'
                      : hasEvent(day)
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-700'
                  }`}
                  title={hasEvent(day) ? `${getEventTitle(day)} (${getEventType(day)})` : ''}
                >
                  {day !== 0 && day}
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
