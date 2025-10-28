import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Rocket, Users, RefreshCw, Heart } from 'lucide-react';

function GlanceCards() {
  const [_active, setActive] = useState(0);

  const glanceCards = [
    {
      title: '도약 – 전환의 시작',
      lines: ['도시재생 종료 이후, 지역이 스스로 지속을 설계하며 자립의 기반을 세우다.'],
      key: 'A',
      icon: Rocket,
    },
    {
      title: '협동 – 사회적 경제의 기반',
      lines: ['주민조직이 사회적협동조합으로 성장하여, 마을운영을 기업형 시스템으로 전환하다.'],
      key: 'B',
      icon: Users,
    },
    {
      title: '변화 – 지역자원이 사회적가치로 순환되는 구조',
      lines: ['카페·케이터링·교육·돌봄 등 생활기반 사업을 통해 사회적경제 생태계를 구축하다.'],
      key: 'C',
      icon: RefreshCw,
    },
    {
      title: '지속 – 지속가능한 지역모델 정착',
      lines: ['일자리·공간·관계를 연결하며, 사람이 머무는 지역경제 플랫폼으로 완성되다.'],
      key: 'D',
      icon: Heart,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-6 xs:py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16 2xl:py-20">
      <section className="mt-8 xs:mt-10 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-18 2xl:mt-20">
        <h2 className="text-lg xs:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-3xl font-semibold text-gray-900">
          화전의 여정
        </h2>
        <p className="mt-1 text-xs xs:text-sm sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg text-gray-500">
          화전, 도시재생 그 이후 — 마을의 가치가 기업의 미래가 되다
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
                  <AvatarFallback className="rounded-xl text-xs text-gray-600">
                    <c.icon className="w-6 h-6" />
                  </AvatarFallback>
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
