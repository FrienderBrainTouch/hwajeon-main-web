export interface BoardMember {
  id: number;
  name: string;
  position: string;
  department: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  duties: string;
}

export interface Team {
  id: number;
  name: string;
  description: string;
  members: TeamMember[];
}

export const boardMembers: BoardMember[] = [
  {
    id: 1,
    name: '김화전',
    position: '이사장',
    department: '이사회',
  },
  {
    id: 2,
    name: '이지역',
    position: '이사',
    department: '이사회',
  },
  {
    id: 3,
    name: '박협동',
    position: '이사',
    department: '이사회',
  },
  {
    id: 4,
    name: '최상생',
    position: '이사',
    department: '이사회',
  },
];

const boardMembersWithDuties: TeamMember[] = boardMembers.map((member) => ({
  ...member,
  duties: '조합의 운영 방향 결정 및 정책 수립',
}));

export const teams: Team[] = [
  {
    id: 1,
    name: '이사회 임원',
    description: '조합의 최고 의결기구로 조합의 운영 방향을 결정합니다.',
    members: boardMembersWithDuties,
  },
  {
    id: 2,
    name: '감사',
    description: '조합의 회계와 업무를 감사합니다.',
    members: [
      {
        id: 1,
        name: '정감사',
        position: '감사',
        department: '감사',
        duties: '조합의 회계와 업무 감사',
      },
    ],
  },
  {
    id: 3,
    name: '사무국',
    description: '조합의 일상적인 업무를 처리합니다.',
    members: [
      {
        id: 1,
        name: '한사무',
        position: '사무국장',
        department: '사무국',
        duties: '사무국 업무 총괄 및 관리',
      },
      {
        id: 2,
        name: '윤직원',
        position: '주무',
        department: '사무국',
        duties: '일반 행정 업무 처리',
      },
      {
        id: 3,
        name: '강직원',
        position: '주무',
        department: '사무국',
        duties: '일반 행정 업무 처리',
      },
    ],
  },
  {
    id: 4,
    name: '기획행정팀',
    description: '조합의 기획 및 행정 업무를 담당합니다.',
    members: [
      {
        id: 1,
        name: '김기획',
        position: '팀장',
        department: '기획행정팀',
        duties: '기획 및 행정 업무 총괄',
      },
      {
        id: 2,
        name: '이행정',
        position: '주무',
        department: '기획행정팀',
        duties: '일반 행정 업무',
      },
    ],
  },
  {
    id: 5,
    name: '지역사회팀',
    description: '지역사회 연계 업무를 담당합니다.',
    members: [
      {
        id: 1,
        name: '박지역',
        position: '팀장',
        department: '지역사회팀',
        duties: '지역사회 연계 업무',
      },
      {
        id: 2,
        name: '정주민',
        position: '주무',
        department: '지역사회팀',
        duties: '주민 참여 프로그램 운영',
      },
    ],
  },
  {
    id: 6,
    name: '교육문화팀',
    description: '교육 및 문화 프로그램을 담당합니다.',
    members: [
      {
        id: 1,
        name: '최교육',
        position: '팀장',
        department: '교육문화팀',
        duties: '교육 프로그램 기획',
      },
      {
        id: 2,
        name: '한문화',
        position: '주무',
        department: '교육문화팀',
        duties: '문화 행사 기획',
      },
    ],
  },
  {
    id: 7,
    name: '카페27b운영팀',
    description: '카페27b 운영을 담당합니다.',
    members: [
      {
        id: 1,
        name: '강카페',
        position: '팀장',
        department: '카페27b운영팀',
        duties: '카페 운영 총괄',
      },
      {
        id: 2,
        name: '윤운영',
        position: '주무',
        department: '카페27b운영팀',
        duties: '일반 운영 업무',
      },
    ],
  },
];
