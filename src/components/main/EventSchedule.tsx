import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventCalendar } from '../news';

function EventSchedule() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

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
                {[
                  {
                    label: '마을 축제',
                    count: 0,
                    color: '#2C2E5A',
                  },
                  {
                    label: '원데이 클래스',
                    count: 0,
                    color: '#A692D1',
                  },
                  {
                    label: '회의 일정',
                    count: 0,
                    color: '#FFA484',
                  },
                ].map((category, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-1 h-6 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-gray-900 font-medium">{category.label}</span>
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
          <EventCalendar
            showCategoryLegend={false}
            currentDate={currentDate}
            onDateChange={(date: Date) => setCurrentDate(date)}
          />
        </div>
      </div>
    </section>
  );
}

export default EventSchedule;
