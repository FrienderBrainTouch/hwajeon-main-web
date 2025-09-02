import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

function GlanceCards() {
  const [active, setActive] = useState(0);

  const glanceCards = [
    { title: '대표 키워드', lines: ['간단한 설명', '간단한 설명'], key: 'A' },
    { title: '대표 키워드', lines: ['간단한 설명', '간단한 설명'], key: 'B' },
    { title: '대표 키워드', lines: ['간단한 설명', '간단한 설명'], key: 'C' },
    { title: '대표 키워드', lines: ['간단한 설명', '간단한 설명'], key: 'D' },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
      <section className="mt-8 xs:mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-18 2xl:mt-20">
        <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
          한눈에 보기
        </h2>
        <p className="mt-1 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-500">
          화전동 주민이 만드는 마을의 힘
        </p>

        <div className="mt-3 xs:mt-4 sm:mt-4 md:mt-4 lg:mt-5 xl:mt-6 2xl:mt-8 grid grid-cols-1 gap-3 xs:gap-4 sm:gap-4 md:grid-cols-2 md:gap-4 lg:gap-5 xl:gap-6 2xl:gap-8">
          {glanceCards.map((c, i) => {
            // const selected = i === active;
            return (
              <div
                key={c.key}
                role="button"
                onClick={() => setActive(i)}
                className={[
                  'flex items-center gap-3 xs:gap-4 sm:gap-4 md:gap-4 lg:gap-5 xl:gap-6 rounded-lg xs:rounded-xl border bg-[#EAE7E1] p-3 xs:p-4 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 transition',
                  // selected ? 'border-2 border-[#4C8CF5] shadow-sm' : 'border-transparent',
                ].join(' ')}
              >
                <Avatar className="h-12 w-12 shrink-0 rounded-xl bg-white">
                  <AvatarFallback className="rounded-xl text-xs text-gray-600">아이콘</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{c.title}</div>
                  <div className="mt-2 space-y-0.5 text-xs text-gray-600">
                    {c.lines.map((l, k) => (
                      <p key={k}>{l}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default GlanceCards;
