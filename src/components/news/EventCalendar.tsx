import { useState, useMemo } from 'react';
import { type EventDataForCalendar, type MonthlyEventData } from '@/types/components';
import { CALENDAR_CATEGORY_CONFIG } from '@/types/ui';

interface EventCalendarProps {
  events?: MonthlyEventData | Record<number, EventDataForCalendar[]>;
  onDateClick?: (date: number, events: EventDataForCalendar[]) => void;
  showCategoryLegend?: boolean;
  className?: string;
  currentDate?: Date;
  onDateChange?: (date: Date) => void;
}

function EventCalendar({
  events,
  onDateClick,
  showCategoryLegend = true,
  className = '',
  currentDate: externalCurrentDate,
  onDateChange,
}: EventCalendarProps) {
  const [internalCurrentDate, setInternalCurrentDate] = useState(new Date());

  // 외부에서 날짜를 제어하는 경우 외부 날짜를 사용, 그렇지 않으면 내부 상태 사용
  const currentDate = externalCurrentDate || internalCurrentDate;
  const setCurrentDate = onDateChange || setInternalCurrentDate;

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

  // 현재 월의 이벤트 가져오기
  const getCurrentMonthEvents = () => {
    if (!events) {
      return {};
    }

    // Record<number, EventDataForCalendar[]> 형태인 경우
    if (typeof events === 'object' && !('year' in events) && !('month' in events)) {
      return events as Record<number, EventDataForCalendar[]>;
    }

    // MonthlyEventData 형태인 경우
    const monthlyData = events as MonthlyEventData;
    if (
      monthlyData.year !== currentDate.getFullYear() ||
      monthlyData.month !== currentDate.getMonth() + 1
    ) {
      return {};
    }

    const eventsByDate: Record<number, EventDataForCalendar[]> = {};
    monthlyData.events.forEach((event) => {
      if (!eventsByDate[event.date]) {
        eventsByDate[event.date] = [];
      }
      eventsByDate[event.date].push(event);
    });

    return eventsByDate;
  };

  // 특정 날짜에 이벤트가 있는지 확인
  const hasEvent = (date: number) => {
    const currentMonthEvents = getCurrentMonthEvents();
    return currentMonthEvents[date] !== undefined;
  };

  // 특정 날짜의 이벤트들 가져오기
  const getEventsForDate = (date: number): EventDataForCalendar[] => {
    const currentMonthEvents = getCurrentMonthEvents();
    return currentMonthEvents[date] || [];
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (date: number) => {
    const eventsForDate = getEventsForDate(date);
    if (onDateClick && eventsForDate.length > 0) {
      onDateClick(date, eventsForDate);
    }
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
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      {/* 월 네비게이션 */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="이전 달"
        >
          ←
        </button>
        <h3 className="text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-semibold text-gray-900">
          {getMonthName(currentDate)} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="다음 달"
        >
          →
        </button>
      </div>

      {/* 캘린더와 범례를 가로로 배치 */}
      <div className="flex gap-6">
        {/* 캘린더 그리드 */}
        <div className="flex-1">
          <div className="grid grid-cols-7 gap-1 text-xs">
            {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
              <div key={day} className="p-2 text-center font-medium text-gray-500">
                {day}
              </div>
            ))}
            {calendarDays.map((day, i) => {
              const hasEventOnDate = hasEvent(day);
              const eventsForDate = getEventsForDate(day);
              const uniqueCategories = [...new Set(eventsForDate.map((e) => e.category))];

              return (
                <div
                  key={i}
                  className={`p-2 text-center cursor-pointer hover:bg-gray-100 rounded-lg transition-colors relative ${
                    day === 0 ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  onClick={() => handleDateClick(day)}
                  title={hasEventOnDate ? eventsForDate.map((e) => e.title).join(', ') : ''}
                >
                  {day !== 0 && day}
                  {/* 카테고리 점들로 표시 */}
                  {hasEventOnDate && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {uniqueCategories.slice(0, 3).map((category, idx) => (
                        <div
                          key={idx}
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: CALENDAR_CATEGORY_CONFIG[category].color }}
                        />
                      ))}
                      {uniqueCategories.length > 3 && (
                        <div className="w-1 h-1 rounded-full bg-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 카테고리 범례 */}
        {showCategoryLegend && (
          <div className="flex-shrink-0">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">행사 카테고리</h4>
            <div className="flex flex-col gap-2">
              {Object.entries(CALENDAR_CATEGORY_CONFIG).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }} />
                  <span className="text-sm text-gray-600">{config.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCalendar;
