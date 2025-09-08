import { useState } from 'react';
import EventCalendar from './EventCalendar';
import { monthlyEventData } from './data/calendarData';
import { type MonthlyEventData } from './data/types';

// 샘플 이벤트 데이터 (추후 API로 대체)
const sampleEventData: Record<number, MonthlyEventData> = monthlyEventData;

function EventCalendarTab() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // 현재 월의 이벤트 가져오기
  const getCurrentMonthEvents = (): MonthlyEventData | undefined => {
    const currentMonth = currentDate.getMonth() + 1;
    return sampleEventData[currentMonth];
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
    <div className="py-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">행사 캘린더</h2>
        <p className="text-gray-600">화전마을의 다양한 행사와 일정을 확인하세요.</p>
      </div>

      <div>
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
