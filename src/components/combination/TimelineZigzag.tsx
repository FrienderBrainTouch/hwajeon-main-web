import { useEffect, useMemo, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { TimelineZigzagProps } from '@/types/components/combination';

export default function TimelineZigzag({
  items,
  className,
  lineColor = 'rgba(255,255,255,0.9)',
  dotColor = '#ffffff',
  accentColor = '#7BD0FF',
}: TimelineZigzagProps) {
  // 연도 오름차순 정렬
  const data = useMemo(() => [...items].sort((a, b) => a.year - b.year), [items]);

  const n = data.length || 1;
  const points = useMemo(
    () =>
      data.map((_, i) => {
        // 5개 이하일 때는 기존 방식, 6개 이상일 때는 고정 간격
        const x =
          n <= 5
            ? 10 + (130 * i) / Math.max(1, n - 1) // 10% ~ 140% (기존 방식)
            : 10 + i * 30; // 6개 이상일 때는 30% 간격으로 고정
        const y = i % 2 === 0 ? 60 : 40; // 홀수 연도를 더 아래로 내려서 텍스트 잘림 방지
        return { x, y };
      }),
    [data, n]
  );

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  // 실제 선 길이에 맞춰 1회 애니메이션
  const lineRef = useRef<SVGPolylineElement | null>(null);
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;

    try {
      const len = el.getTotalLength(); // ✅ 실제 렌더된 element에서 구함
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) {
        el.style.strokeDashoffset = '0';
        el.style.animation = 'none';
      } else {
        el.style.animation = 'none';
        // 강제 리플로우로 애니메이션 재적용 (최초 1회만 필요)
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        el.getBoundingClientRect();
        el.style.animation = 'dash-once 1.6s ease-out forwards';
      }
    } catch {
      // 길이 계산 실패 시에도 표시되도록 고정값
      el.style.strokeDasharray = '1000';
      el.style.strokeDashoffset = '1000';
      el.style.animation = 'dash-once 1.6s ease-out forwards';
    }
  }, [polylinePoints]);

  // 연도 위/아래 불릿 위치 계산
  const getBulletPosition = (x: number, yearY: number, isTop: boolean) => {
    const bulletX = x - 15; // 연도 중앙에서 왼쪽으로 15% 이동
    // y 좌표가 높은(위쪽) 연도는 불릿을 위로, y 좌표가 낮은(아래쪽) 연도는 불릿을 아래로
    const bulletY = isTop ? yearY - 20 : yearY + 5;
    return { x: bulletX, y: bulletY };
  };

  return (
    <div className={cn('w-full', className)}>
      {/* 데스크톱: SVG 타임라인 */}
      <div className={cn('hidden md:block', data.length > 5 && 'overflow-x-auto')}>
        <svg
          viewBox={`0 0 ${data.length > 5 ? 10 + (data.length - 1) * 30 + 50 : 150} 100`}
          preserveAspectRatio="xMidYMid meet"
          className={cn('h-[520px]', data.length > 5 ? 'min-w-max' : 'w-full')}
        >
          {/* 선을 먼저 그려서 텍스트/점이 위에 오게 함 */}
          <polyline
            ref={lineRef}
            points={polylinePoints}
            fill="none"
            stroke={lineColor}
            strokeWidth={0.8}
            strokeLinecap="round"
          />

          {/* 포인트/텍스트 */}
          {data.map((item, i) => {
            const p = points[i];
            const isTop = p.y < 50; // y=40이 위쪽(짝수년도), y=60이 아래쪽(홀수년도)

            // 연도 텍스트 위치 (선과 겹치지 않도록 y 여유)
            const yearY = isTop ? p.y - 6 : p.y + 9;

            return (
              <g key={item.year}>
                {/* 포인트 */}
                <circle cx={p.x} cy={p.y} r={1.2} fill={dotColor} />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={2.4}
                  fill="transparent"
                  stroke={accentColor}
                  strokeWidth={0.35}
                  opacity={0.95}
                />

                {/* 연도 */}
                <text
                  x={p.x}
                  y={yearY}
                  textAnchor="middle"
                  fontSize={5.2}
                  fontWeight={800}
                  fill="#ffffff"
                  style={{ paintOrder: 'stroke' }}
                  stroke="rgba(0,0,0,0.35)"
                  strokeWidth={0.25}
                >
                  {item.year}
                </text>

                {/* 불릿 */}
                {item.bullets?.length ? (
                  // 불릿의 가로, 세로 크기 조절 영역
                  <foreignObject
                    x={getBulletPosition(p.x, yearY, isTop).x}
                    y={getBulletPosition(p.x, yearY, isTop).y}
                    width={55}
                    height={20}
                  >
                    {/* 불릿의 텍스트 크기 조절 영역 */}
                    <ul className="m-0 list-disc pl-4 text-[2.5px] leading-[1.3] text-white/90">
                      {item.bullets.map((b, idx) => (
                        <li key={idx} className="mb-[0.3px]">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </foreignObject>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      {/* 모바일: 세로 카드 목록 */}
      <div className="md:hidden space-y-3">
        {data.map((it) => (
          <div
            key={it.year}
            className="rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block size-2 rounded-full"
                style={{ background: accentColor }}
              />
              <h3 className="text-lg font-extrabold text-white">{it.year}</h3>
            </div>
            {it.bullets?.length ? (
              <ul className="mt-2 list-disc pl-5 text-sm text-white/90">
                {it.bullets.map((b, idx) => (
                  <li key={idx} className="mb-1">
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes dash-once {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
