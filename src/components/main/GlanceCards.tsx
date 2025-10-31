import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

// 인라인 SVG 아이콘들 (섹션 이미지 컨텐츠)
const SunriseIcon = () => (
  <svg viewBox="0 0 128 128" className="w-12 h-12" aria-hidden>
    <rect width="128" height="128" rx="16" fill="#FFFFFF" />
    <g fill="#F26D21">
      <circle cx="96" cy="28" r="5" />
      <circle cx="24" cy="84" r="6" />
      <circle cx="32" cy="36" r="6" />
    </g>
    <g fill="#F59A52">
      <path d="M28 88c0-22 18-40 40-40s40 18 40 40H28z" />
      <rect x="24" y="92" width="80" height="6" rx="3" />
      <rect x="32" y="102" width="64" height="6" rx="3" />
    </g>
  </svg>
);

const ChainIcon = () => (
  <svg viewBox="0 0 128 128" className="w-12 h-12" aria-hidden>
    <rect width="128" height="128" rx="16" fill="#FFFFFF" />
    <g fill="#EA4335">
      <rect x="22" y="54" width="44" height="20" rx="10" />
      <rect x="62" y="54" width="44" height="20" rx="10" />
      <rect x="50" y="40" width="28" height="48" rx="14" />
    </g>
  </svg>
);

const SproutIcon = () => (
  <svg viewBox="0 0 128 128" className="w-12 h-12" aria-hidden>
    <rect width="128" height="128" rx="16" fill="#FFFFFF" />
    <path d="M64 90c-10 0-22 4-28 10h56c-6-6-18-10-28-10z" fill="#8B5E3C" />
    <path
      d="M64 78c0-16 8-30 22-36 6-2 14-2 22 0-6 12-16 20-28 22-6 2-10 6-16 14z"
      fill="#1F9D55"
    />
    <path
      d="M64 78c0-12-8-24-20-30-6-2-14-2-22 0 6 10 16 16 28 18 6 2 10 6 14 12z"
      fill="#34D399"
    />
  </svg>
);

const HandshakeIcon = () => (
  <svg viewBox="0 0 128 128" className="w-12 h-12" aria-hidden>
    <rect width="128" height="128" rx="16" fill="#FFFFFF" />
    <path d="M20 76l22-18 16 12 16-12 22 18-14 14-10-8-10 8-10-8-10 8-12-14z" fill="#F2B415" />
  </svg>
);

function GlanceCards() {
  const navigate = useNavigate();
  const [_active, setActive] = useState(0);

  const glanceCards = [
    {
      title: '도약 – 전환의 시작',
      lines: ['도시재생 종료 이후, 지역이 스스로 지속을 설계하며 자립의 기반을 세우다.'],
      key: 'A',
      image: <SunriseIcon />,
      route: 'leap',
    },
    {
      title: '협동 – 사회적 경제의 기반',
      lines: ['주민조직이 사회적협동조합으로 성장하여, 마을운영을 기업형 시스템으로 전환하다.'],
      key: 'B',
      image: <ChainIcon />,
      route: 'cooperation',
    },
    {
      title: '변화 – 지역자원이 사회적가치로 순환되는 구조',
      lines: ['카페·케이터링·교육·돌봄 등 생활기반 사업을 통해 사회적경제 생태계를 구축하다.'],
      key: 'C',
      image: <SproutIcon />,
      route: 'change',
    },
    {
      title: '지속 – 지속가능한 지역모델 정착',
      lines: ['일자리·공간·관계를 연결하며, 사람이 머무는 지역경제 플랫폼으로 완성되다.'],
      key: 'D',
      image: <HandshakeIcon />,
      route: 'sustain',
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
                onClick={() => {
                  setActive(i);
                  if (c.route) navigate(`/member/journey/${c.route}`);
                }}
                className={[
                  'flex items-center gap-3 xs:gap-4 sm:gap-4 md:gap-4 lg:gap-5 xl:gap-6 rounded-lg xs:rounded-xl border bg-[#EAE7E1] p-3 xs:p-4 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 transition',
                  // selected ? 'border-2 border-[#4C8CF5] shadow-sm' : 'border-transparent',
                ].join(' ')}
              >
                <div className="h-12 w-12 shrink-0 rounded-xl bg-white flex items-center justify-center">
                  {c.image}
                </div>
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
