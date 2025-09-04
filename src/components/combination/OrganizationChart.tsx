// components/OrgChart.tsx
import React from 'react';
import { cn } from '@/lib/utils';

type Node = {
  label: string;
  variant?: 'filled' | 'outline' | 'primary';
};

interface OrgChartProps {
  top: Node; // 조합장
  second: [Node, Node, Node]; // [이사회, 사무국, 감사]
  teams: [Node, Node, Node, Node]; // 하위 4팀
  className?: string;
}

const Pill: React.FC<{ node: Node; className?: string }> = ({ node, className }) => {
  const base =
    'inline-flex items-center justify-center px-6 py-3 rounded-xl text-base md:text-lg font-medium whitespace-nowrap shadow-sm';
  const styles =
    node.variant === 'primary'
      ? 'bg-[#2f315f] text-white'
      : node.variant === 'filled'
      ? 'bg-[#9b8bd0] text-white'
      : 'bg-white text-[#2b2e3a] border border-[#9b8bd0]';
  return <div className={cn(base, styles, className)}>{node.label}</div>;
};

/**
 * OrgChart – 이미지와 동일한 3단 레이아웃
 * - 데스크톱: 가로형+연결선
 * - 모바일: 세로형+연결선 간소화
 */
export default function OrganizationChart({ top, second, teams, className }: OrgChartProps) {
  const [left, mid, right] = second;

  return (
    <section
      className={cn(
        'relative w-full rounded-[32px] bg-[#f3f1f8] p-6 md:p-10 lg:p-14',
        'shadow-[inset_0_0_0_1px_rgba(155,139,208,0.15)]',
        className
      )}
    >
      {/* 데스크톱 레이아웃 */}
      <div className="relative hidden md:block">
        {/* 상단: 조합장 */}
        <div className="flex justify-center">
          <Pill node={{ ...top, variant: 'primary' }} />
        </div>

        {/* 가운데 점 */}
        <div className="mt-6 flex justify-center">
          <span className="block h-3 w-3 rounded-full bg-[#6b6f93]" />
        </div>

        {/* 두 번째 줄: 3개 */}
        <div className="mt-6 flex items-center justify-center gap-0">
          <Pill node={{ ...left, variant: left.variant ?? 'outline' }} />
          <div className="h-px w-12 bg-[#9aa0ad]" />
          <Pill node={{ ...mid, variant: mid.variant ?? 'filled' }} />
          <div className="h-px w-12 bg-[#9aa0ad]" />
          <Pill node={{ ...right, variant: right.variant ?? 'outline' }} />
        </div>

        {/* 세 번째 줄: 4팀 */}
        <div className="mt-12 flex flex-col items-center relative">
          {/* 중앙 세로선 */}
          <div className="h-12 w-px bg-[#9aa0ad]" />

          {/* 가로 메인 라인 */}
          <div className="h-px bg-[#9aa0ad] w-[453.5px] mb-2 -translate-x-2" />

          {/* 팀 노드들 */}
          <div className="flex items-center justify-center gap-4">
            {teams.map((t, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="h-8 w-px bg-[#9aa0ad] mb-2" />
                <Pill
                  node={{ ...t, variant: t.variant ?? 'outline' }}
                  className="text-base md:text-lg px-6 py-3"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 모바일 레이아웃 (세로 스택) */}
      <div className="md:hidden space-y-6">
        <div className="flex justify-center">
          <Pill node={{ ...top, variant: 'primary' }} className="text-base px-6 py-3" />
        </div>

        <div className="flex justify-center">
          <span className="block h-2 w-2 rounded-full bg-[#6b6f93]" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <Pill node={{ ...left, variant: 'outline' }} className="text-base px-6 py-3" />
          {/* 짧은 선 */}
          <div className="h-5 w-px bg-[#9aa0ad]" />
          <Pill node={{ ...right, variant: 'outline' }} className="text-base px-6 py-3" />
          <div className="h-5 w-px bg-[#9aa0ad]" />
          <Pill node={{ ...mid, variant: 'filled' }} className="text-base px-6 py-3" />
        </div>

        <div className="mx-auto h-5 w-px bg-[#9aa0ad]" />
        <div className="mx-auto h-px w-3/4 bg-[#9aa0ad]" />

        <div className="grid grid-cols-2 gap-3">
          {teams.map((t, i) => (
            <div key={i} className="flex justify-center">
              <Pill node={{ ...t, variant: 'outline' }} className="text-sm px-5 py-2.5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
