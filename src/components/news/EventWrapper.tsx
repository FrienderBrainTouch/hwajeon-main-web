import React, { useState, useEffect } from 'react';
import EventCalendar from './EventCalendar';
import EventList from './EventList';
import { useApi } from '@/hooks/useApi';
import { memberPostsApi } from '@/api/member';
import {
  type EventData,
  type EventDataForCalendar,
  type EventWrapperProps,
} from '@/types/components';
import { mapActivityTypeToEventCategory } from '@/types/ui';

const EventWrapper: React.FC<EventWrapperProps> = ({ itemsPerPage = 4 }) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cachedData, setCachedData] = useState<{ [year: number]: EventData[] }>({});
  const [lastFetchedYear, setLastFetchedYear] = useState<number | null>(null);

  // API 호출
  const getCalendarEventsApi = useApi(memberPostsApi.getCalendarEvents);

  // 날짜에 따른 requestDate 계산 함수
  const getRequestDate = (date: Date): string => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const targetYear = date.getFullYear();

    if (targetYear === currentYear) {
      // 현재 연도면 오늘 날짜 사용
      return today.toISOString().split('T')[0];
    } else if (targetYear < currentYear) {
      // 이전 연도면 12월 31일
      return `${targetYear}-12-31`;
    } else {
      // 이후 연도면 1월 1일
      return `${targetYear}-01-01`;
    }
  };

  // API에서 데이터 가져오기 (연도별 캐싱)
  useEffect(() => {
    const fetchEvents = async () => {
      const currentYear = currentDate.getFullYear();

      // 이미 해당 연도의 데이터가 캐시되어 있으면 API 호출하지 않음
      if (cachedData[currentYear] && lastFetchedYear === currentYear) {
        setEvents(cachedData[currentYear]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const requestDate = getRequestDate(currentDate);
        const response = await getCalendarEventsApi.execute(requestDate);

        if (response) {
          // API 응답을 EventData 형식으로 변환
          const eventData: EventData[] = response.map((post: any) => {
            const activityDate = post.onDate ? new Date(post.onDate) : new Date();
            const createdAt = post.createdAt ? new Date(post.createdAt) : new Date();
            return {
              id: post.postId || post.id,
              postId: post.postId || post.id,
              title: post.title,
              category: mapActivityTypeToEventCategory(post.activityType || 'NONE'),
              date: activityDate.getDate(),
              month: activityDate.getMonth() + 1,
              content: post.content || '',
              description: post.content || '',
              thumbnailUrl: post.thumbnail || '',
              createdAt: createdAt.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
              activityDate: post.onDate || '',
              time: post.eventTime || '',
              location: post.eventLocation || '',
              author: post.author || '',
              files: [],
            };
          });

          // activityDate 기준으로 빠른 날짜 순으로 정렬 (전체 데이터)
          const sortedEventData = eventData.sort((a, b) => {
            const dateA = new Date(a.activityDate);
            const dateB = new Date(b.activityDate);
            return dateA.getTime() - dateB.getTime();
          });

          // 캐시에 저장
          setCachedData((prev) => ({
            ...prev,
            [currentYear]: sortedEventData,
          }));
          setLastFetchedYear(currentYear);
          setEvents(sortedEventData);
        }
      } catch (error) {
        console.error('이벤트 데이터를 가져오는 중 오류 발생:', error);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [currentDate]);

  // EventData를 EventDataForCalendar로 변환하고 월별로 그룹화 (현재 월만)
  const processedEvents = events.reduce<{
    [month: number]: { [day: number]: EventDataForCalendar[] };
  }>((acc, event) => {
    const eventDate = new Date(event.activityDate);
    const eventMonth = eventDate.getMonth() + 1;
    const eventYear = eventDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // 현재 월과 연도가 일치하는 이벤트만 처리
    if (eventMonth === currentMonth && eventYear === currentYear) {
      const day = eventDate.getDate();

      if (!acc[eventMonth]) {
        acc[eventMonth] = {};
      }
      if (!acc[eventMonth][day]) {
        acc[eventMonth][day] = [];
      }

      acc[eventMonth][day].push({
        id: event.id,
        date: day,
        category: event.category,
        title: event.title,
        description: event.description,
        time: event.time,
        location: event.location,
      });
    }

    return acc;
  }, {});

  // 현재 월의 이벤트 가져오기
  const getCurrentMonthEvents = (): Record<number, EventDataForCalendar[]> | undefined => {
    const currentMonth = currentDate.getMonth() + 1;
    return processedEvents[currentMonth];
  };

  // 날짜 클릭 핸들러
  // const handleDateClick = (date: number, events: any[]) => {
  //   // 여기에 상세 모달이나 다른 동작을 추가할 수 있습니다
  // };

  // 캘린더 날짜 변경 핸들러
  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 캘린더 섹션 */}
      <div className="py-2 sm:py-4 md:py-6 lg:py-8">
        <div className="max-w-5xl mx-auto">
          {/* 헤더 섹션 */}
          <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              행사 캘린더
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
              화전마을의 다양한 행사와 일정을 확인하세요.
            </p>
          </div>

          {/* 컨텐츠 영역 */}
          <div className="overflow-hidden">
            <EventCalendar
              events={getCurrentMonthEvents()}
              // onDateClick={handleDateClick}
              showCategoryLegend={true}
              currentDate={currentDate}
              onDateChange={handleDateChange}
            />
          </div>
        </div>
      </div>

      {/* 이벤트 리스트 */}
      <EventList events={events} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default EventWrapper;
