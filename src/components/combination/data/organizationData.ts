import type { Team } from '@/types/components/combination';

export const teams: Team[] = [
  {
    id: 1,
    name: '총회',
  },
  {
    id: 2,
    name: '갈등관리위원회',
  },
  {
    id: 3,
    name: '사회적평가위원회',
  },
  {
    id: 4,
    name: '이사회',
  },
  {
    id: 5,
    name: '감사',
  },
  {
    id: 6,
    name: '운영본부',
    children: [
      { id: 61, name: '총괄기획팀' },
      { id: 62, name: '행정지원팀' },
    ],
  },
  {
    id: 7,
    name: '콘텐츠사업부',
    children: [
      { id: 71, name: '행사기획팀' },
      { id: 72, name: '교육콘텐츠팀' },
      { id: 73, name: '도시재생선진지교육팀' },
    ],
  },
  {
    id: 8,
    name: '27b사업부',
    children: [
      { id: 81, name: '카페운영팀' },
      { id: 82, name: '케이터링팀' },
    ],
  },
  {
    id: 9,
    name: '마을돌봄사업부',
    children: [
      { id: 91, name: '통합돌봄사업팀' },
      { id: 92, name: '자원봉사노인일자리팀' },
      { id: 93, name: '마을환경관리팀' },
    ],
  },
];
