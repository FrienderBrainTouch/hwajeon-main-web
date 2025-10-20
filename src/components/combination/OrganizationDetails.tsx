import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { OrganizationDetailsProps, Team } from '@/types/components/combination';
import { teams as defaultTeams } from './data';

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
              onClick={() => (team.children ? toggleSection(`team-${index}`) : undefined)}
              className={`flex items-center justify-between w-full p-4 bg-white border-b border-gray-200 transition-colors ${
                team.children ? 'cursor-pointer' : 'hover:bg-gray-50 cursor-default'
              }`}
            >
              <h3
                className={`text-lg font-semibold transition-colors ${
                  team.children ? 'text-gray-900 hover:text-purple-600' : 'text-gray-900'
                }`}
              >
                {team.name}
              </h3>
              {team.children &&
                (expandedSections.has(`team-${index}`) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ))}
            </button>

            {team.children && expandedSections.has(`team-${index}`) && (
              <div className="bg-purple-50">
                {team.children.map((child: Team, childIndex: number) => (
                  <div key={childIndex} className="ml-4 p-3 border-b border-gray-200">
                    <h4 className="text-base font-medium text-black-800">{child.name}</h4>
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
