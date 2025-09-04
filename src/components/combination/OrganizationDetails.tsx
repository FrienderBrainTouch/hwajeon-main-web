import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
// import { cn } from '@/lib/utils';

interface Team {
  name: string;
  members?: Array<{
    position: string;
    name: string;
    duties: string;
  }>;
}

const teams: Team[] = [
  {
    name: '이사회 임원',
    members: [
      { position: '조합장', name: '홍길동', duties: '조합 대표자, 전체 운영 총괄' },
      { position: '대표이사', name: '홍길동', duties: '정책/사업 방향 논의 및 의결' },
      { position: '이사', name: '홍길동', duties: '교육 및 주민참여 프로그램 검토' },
    ],
  },
  {
    name: '기획행정팀',
    members: [
      { position: '팀장', name: '김철수', duties: '기획 및 행정 업무 총괄' },
      { position: '주무', name: '이영희', duties: '일반 행정 업무' },
    ],
  },
  {
    name: '지역사회팀',
    members: [
      { position: '팀장', name: '박민수', duties: '지역사회 연계 업무' },
      { position: '주무', name: '정수진', duties: '주민 참여 프로그램 운영' },
    ],
  },
  {
    name: '교육문화팀',
    members: [
      { position: '팀장', name: '최현우', duties: '교육 프로그램 기획' },
      { position: '주무', name: '한지은', duties: '문화 행사 기획' },
    ],
  },
  {
    name: '카페27b 운영팀',
    members: [
      { position: '팀장', name: '강동훈', duties: '카페 운영 총괄' },
      { position: '주무', name: '윤서연', duties: '일반 운영 업무' },
    ],
  },
];

export default function OrganizationDetails() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full mx-auto py-6">
      {/* 각 팀별 정보 */}
      <div className="space-y-0">
        {teams.map((team, index) => (
          <div key={index}>
            <button
              onClick={() => toggleSection(`team-${index}`)}
              className="flex items-center justify-between w-full p-4 bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
              {expandedSections.has(`team-${index}`) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSections.has(`team-${index}`) && team.members && (
              <div className="bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-6 py-3 text-left text-base font-semibold text-gray-900">
                          직위
                        </th>
                        <th className="px-6 py-3 text-left text-base font-semibold text-gray-900">
                          이름
                        </th>
                        <th className="px-6 py-3 text-left text-base font-semibold text-gray-900">
                          주요 업무
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {team.members.map((member, memberIndex) => (
                        <tr key={memberIndex} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {member.position}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {member.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{member.duties}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
