import React from 'react';
import { cn } from '@/lib/utils';
import type { Node, TreeNode } from '@/types/components/combination';
import { treeOrganizationData } from './data/organizationChartData';

const Pill: React.FC<{ node: Node; className?: string; variant?: string }> = ({
  node,
  className,
  variant,
}) => {
  const base =
    'inline-flex items-center justify-center px-6 py-3 rounded-xl text-base md:text-lg font-medium whitespace-nowrap shadow-sm';
  const nodeVariant = variant || node.variant;
  const styles =
    nodeVariant === 'primary'
      ? 'bg-[#2f315f] text-white'
      : nodeVariant === 'filled'
      ? 'bg-[#9b8bd0] text-white'
      : nodeVariant === 'green'
      ? 'bg-green-500 text-white'
      : nodeVariant === 'yellow'
      ? 'bg-yellow-400 text-black'
      : 'bg-white text-[#2b2e3a] border border-[#9b8bd0]';
  return <div className={cn(base, styles, className)}>{node.label}</div>;
};

/**
 * TreeOrgChart – 트리 구조 조직도
 * - 사용자가 제공한 정확한 트리 구조
 */
export function TreeOrganizationChart({
  data = treeOrganizationData,
  className,
}: {
  data?: TreeNode;
  className?: string;
}) {
  const getVariant = (node: TreeNode, level: number): string => {
    if (level === 0) return 'primary'; // 총회
    if (node.name === '갈등관리위원회' || node.name === '사회적평가위원회') return 'yellow';
    if (node.name === '감사') return 'filled';
    if (node.name === '이사회') return 'filled';
    if (node.name === '운영본부') return 'green';
    if (node.children && node.children.length > 0) return 'filled'; // 부서
    return 'outline'; // 팀
  };

  const renderLevel = (level: number, nodes: TreeNode[]) => {
    if (level === 1) {
      // Level 1: 갈등관리위원회, 사회적평가위원회는 세로로 묶고, 이사회, 감사와 가로 배치
      const 위원회들 = nodes.filter(
        (node) => node.name === '갈등관리위원회' || node.name === '사회적평가위원회'
      );
      // const 나머지 = nodes.filter(
      //   (node) => node.name !== '갈등관리위원회' && node.name !== '사회적평가위원회'
      // );

      return (
        <div key={level} className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {/* 위원회들 (왼쪽) - 고정 너비 */}
            <div className="flex flex-col items-start gap-2 w-48">
              {위원회들.map((node) => (
                <div key={node.name} className="flex flex-col items-center">
                  <Pill
                    node={{ label: node.name, variant: getVariant(node, level) as any }}
                    className="text-base px-6 py-3"
                  />
                </div>
              ))}
            </div>

            {/* 가로 구분선 */}
            <div className="w-12 h-px bg-gray-300"></div>

            {/* 이사회 (가운데) - 고정 너비 */}
            <div className="flex flex-col items-center w-48">
              <Pill
                node={{
                  label: '이사회',
                  variant: getVariant({ name: '이사회' } as TreeNode, level) as any,
                }}
                className="text-base px-6 py-3"
              />
            </div>

            {/* 가로 구분선 */}
            <div className="w-12 h-px bg-gray-300"></div>

            {/* 감사 (오른쪽) - 고정 너비 */}
            <div className="flex flex-col items-center w-48">
              <Pill
                node={{
                  label: '감사',
                  variant: getVariant({ name: '감사' } as TreeNode, level) as any,
                }}
                className="text-base px-6 py-3"
              />
            </div>
          </div>
        </div>
      );
    }

    if (level === 2) {
      // Level 2: 운영본부 - 총괄기획팀, 행정지원팀 (세로 배치)
      return (
        <div key={level} className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            {nodes.map((node) => (
              <div key={node.name} className="flex flex-col items-center">
                <Pill
                  node={{ label: node.name, variant: getVariant(node, level) as any }}
                  className="text-sm px-4 py-2"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (level === 3) {
      // Level 3: 사업부들 (부서-팀 묶음) - 부서끼리는 가로 배치, 부서 내부는 세로 배치
      return (
        <div key={level} className="flex flex-col items-center gap-4">
          <div className="flex items-start gap-6">
            {nodes.map((dept) => (
              <div key={dept.name} className="flex flex-col items-center gap-2">
                {/* 사업부명 표시 (보라색 Pill) */}
                <Pill
                  node={{ label: dept.name, variant: getVariant(dept, level) as any }}
                  className="text-sm px-4 py-2"
                />
                {/* 해당 사업부의 팀들 (세로 배치) */}
                {dept.children && dept.children.length > 0 && (
                  <div className="flex flex-col items-center gap-2">
                    {dept.children.map((team) => (
                      <div key={team.name} className="flex flex-col items-center">
                        <Pill
                          node={{ label: team.name, variant: getVariant(team, level) as any }}
                          className="text-xs px-3 py-1"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 기본: 가로 배치
    return (
      <div key={level} className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          {nodes.map((node) => (
            <div key={node.name} className="flex flex-col items-center">
              <Pill
                node={{ label: node.name, variant: getVariant(node, level) as any }}
                className={level === 0 ? 'text-lg px-8 py-4' : 'text-xs px-3 py-1'}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOrganizationChart = () => {
    const level0 = [data]; // 총회
    const level1 = data.children || []; // 갈등관리위원회, 사회적평가위원회, 이사회, 감사
    const level2: TreeNode[] = []; // 운영본부, 총괄기획팀, 행정지원팀
    const level3: TreeNode[] = []; // 사업부들 (부서-팀 묶음)

    // level 2: 운영본부, 총괄기획팀, 행정지원팀
    const 이사회 = level1.find((node) => node.name === '이사회');
    if (이사회?.children) {
      const 운영본부 = 이사회.children.find((node) => node.name === '운영본부');
      if (운영본부) {
        // 운영본부 추가
        level2.push(운영본부);

        // 총괄기획팀, 행정지원팀 추가
        if (운영본부.children) {
          level2.push(
            ...운영본부.children.filter(
              (child) => child.name === '총괄기획팀' || child.name === '행정지원팀'
            )
          );
        }
      }
    }

    // level 3: 사업부들 (부서-팀 묶음)
    const 운영본부 = 이사회?.children?.find((node) => node.name === '운영본부');
    if (운영본부?.children) {
      level3.push(
        ...운영본부.children.filter(
          (child) => child.name !== '총괄기획팀' && child.name !== '행정지원팀'
        )
      );
    }

    return (
      <div className="flex flex-col items-center gap-4">
        {/* Level 0: 총회 */}
        {renderLevel(0, level0)}

        {/* 구분선 */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Level 1: 갈등관리위원회, 사회적평가위원회, 이사회, 감사 */}
        {renderLevel(1, level1)}

        {/* 구분선 */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Level 2: 운영본부, 총괄기획팀, 행정지원팀 */}
        {level2.length > 0 && renderLevel(2, level2)}

        {/* 구분선 */}
        {level2.length > 0 && <div className="w-px h-6 bg-gray-300"></div>}

        {/* Level 3: 사업부들 (부서-팀 묶음) */}
        {level3.length > 0 && renderLevel(3, level3)}
      </div>
    );
  };

  return (
    <section
      className={cn(
        'relative w-full rounded-[32px] bg-[#f3f1f8] p-6 md:p-10 lg:p-14',
        'shadow-[inset_0_0_0_1px_rgba(155,139,208,0.15)]',
        'overflow-hidden',
        'hidden md:block', // 모바일에서는 숨김
        className
      )}
    >
      <div className="flex justify-center max-w-full">{renderOrganizationChart()}</div>
    </section>
  );
}
