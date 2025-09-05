import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { Team } from './data';
import { teams as defaultTeams } from './data';

interface OrganizationDetailsProps {
  teams?: Team[];
}

export default function OrganizationDetails({ teams = defaultTeams }: OrganizationDetailsProps) {
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
