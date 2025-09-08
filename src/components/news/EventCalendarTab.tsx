import { useState } from 'react';
import EventCalendar from './EventCalendar';
import { type MonthlyEventData } from './data/types';

interface EventCalendarTabProps {
  events: Record<number, MonthlyEventData>;
}

function EventCalendarTab({ events }: EventCalendarTabProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 현재 월의 이벤트 가져오기
  const getCurrentMonthEvents = (): MonthlyEventData | undefined => {
    const currentMonth = currentDate.getMonth() + 1;
    return events[currentMonth];
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (date: number, events: any[]) => {
    console.log(`날짜 ${date} 클릭:`, events);
    // 여기에 상세 모달이나 다른 동작을 추가할 수 있습니다
  };

  // 캘린더 날짜 변경 핸들러
  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <div className="py-2 sm:py-4 md:py-6 lg:py-8 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      {/* 헤더 섹션 */}
      <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
          행사 캘린더
        </h2>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
          화전마을의 다양한 행사와 일정을 확인하세요.
        </p>
      </div>

      {/* 캘린더 컨테이너 */}
      <div className="w-full">
        <EventCalendar
          events={getCurrentMonthEvents()}
          onDateClick={handleDateClick}
          showCategoryLegend={true}
          currentDate={currentDate}
          onDateChange={handleDateChange}
        />
      </div>
    </div>
  );
}

export default EventCalendarTab;
