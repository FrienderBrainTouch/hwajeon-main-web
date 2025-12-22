import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventCalendar } from '../news';
import { useApi } from '@/hooks/useApi';
import { memberPostsApi } from '@/api/member';
import { type EventData } from '@/types/components';
import { mapActivityTypeToEventCategory, CALENDAR_CATEGORY_CONFIG } from '@/types/ui';

function EventSchedule() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API 호출
  const getCalendarEventsApi = useApi(memberPostsApi.getCalendarEvents);

  // 날짜에 따른 requestDate 계산 함수
  const getRequestDate = (date: Date): string => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const targetYear = date.getFullYear();

    if (targetYear === currentYear) {
      return today.toISOString().split('T')[0];
    } else if (targetYear < currentYear) {
      return `${targetYear}-12-31`;
    } else {
      return `${targetYear}-01-01`;
    }
  };

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const requestDate = getRequestDate(currentDate);
        const response = await getCalendarEventsApi.execute(requestDate);

        if (response) {
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

          const sortedEventData = eventData.sort((a, b) => {
            const dateA = new Date(a.activityDate);
            const dateB = new Date(b.activityDate);
            return dateA.getTime() - dateB.getTime();
          });

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

  // 카테고리별 count 계산
  const getCategoryCounts = () => {
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const currentMonthEvents = events.filter((event) => {
      const eventDate = new Date(event.activityDate);
      return eventDate.getMonth() + 1 === currentMonth && eventDate.getFullYear() === currentYear;
    });

    const counts: Record<string, number> = {
      none: 0,
      festival: 0,
      class: 0,
      meeting: 0,
      etc: 0,
    };

    currentMonthEvents.forEach((event) => {
      if (event.category in counts) {
        counts[event.category]++;
      }
    });

    return counts;
  };

  const categoryCounts = getCategoryCounts();

  // 현재 월의 이벤트를 EventCalendar 형식으로 변환
  const getCurrentMonthEvents = () => {
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const currentMonthEvents = events.filter((event) => {
      const eventDate = new Date(event.activityDate);
      return eventDate.getMonth() + 1 === currentMonth && eventDate.getFullYear() === currentYear;
    });

    const processedEvents: { [day: number]: any[] } = {};

    currentMonthEvents.forEach((event) => {
      const eventDate = new Date(event.activityDate);
      const day = eventDate.getDate();

      if (!processedEvents[day]) {
        processedEvents[day] = [];
      }

      processedEvents[day].push({
        id: event.id,
        date: day,
        category: event.category,
        title: event.title,
        description: event.description,
        time: event.time,
        location: event.location,
      });
    });

    return processedEvents;
  };

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
          <div className="bg-white rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base xs:text-lg sm:text-lg md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl font-semibold text-gray-900 mb-4">
                행사 카테고리
              </h3>
              <div className="space-y-4">
                {Object.entries(CALENDAR_CATEGORY_CONFIG).map(([key, config]) => (
                  <div key={key} className="flex items-center gap-3">
                    <div
                      className="w-1 h-6 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="text-gray-900 font-medium">
                      {config.name} ({categoryCounts[key] || 0})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 전체 일정 보기 버튼 */}
            <button
              onClick={() => navigate('/member/news?tab=calendar')}
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-colors hover:opacity-90 mt-6"
              style={{ backgroundColor: '#2C2E5A' }}
            >
              전체 일정 보기
            </button>
          </div>

          {/* 오른쪽: 캘린더 */}
          {loading ? (
            <div className="bg-white rounded-lg p-6 flex items-center justify-center">
              <div className="text-gray-500">로딩 중...</div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg p-6 flex items-center justify-center">
              <div className="text-red-500">{error}</div>
            </div>
          ) : (
            <EventCalendar
              events={getCurrentMonthEvents()}
              showCategoryLegend={false}
              currentDate={currentDate}
              onDateChange={(date: Date) => setCurrentDate(date)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default EventSchedule;
