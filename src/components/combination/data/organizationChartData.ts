import type {
  OrganizationChartData,
  ExtendedOrganizationData,
  TreeNode,
} from '@/types/components/combination';

export const organizationChartData: OrganizationChartData = {
  top: {
    label: '총회',
    variant: 'primary',
  },
  second: [
    { label: '이사회', variant: 'filled' },
    { label: '감사', variant: 'filled' },
    { label: '갈등관리위원회', variant: 'filled' },
  ],
  teams: [
    { label: '사회적평가위원회', variant: 'outline' },
    { label: '운영본부', variant: 'outline' },
    { label: '콘텐츠 사업부', variant: 'outline' },
    { label: '27b 사업부', variant: 'outline' },
  ],
};

export const extendedOrganizationData: ExtendedOrganizationData = {
  top: {
    label: '총회',
    variant: 'primary',
  },
  committees: [
    { label: '이사회', variant: 'filled' },
    { label: '감사', variant: 'filled' },
  ],
  departments: [
    {
      name: '운영본부',
      variant: 'green',
      teams: [
        { label: '총괄기획팀', variant: 'outline' },
        { label: '행정지원팀', variant: 'outline' },
      ],
    },
    {
      name: '콘텐츠 사업부',
      variant: 'filled',
      teams: [
        { label: '행사기획팀', variant: 'outline' },
        { label: '교육콘텐츠팀', variant: 'outline' },
        { label: '도시재생 선진지 교육팀', variant: 'outline' },
      ],
    },
    {
      name: '27b 사업부',
      variant: 'filled',
      teams: [
        { label: '카페운영팀', variant: 'outline' },
        { label: '케이터링팀', variant: 'outline' },
      ],
    },
    {
      name: '마을돌봄 사업부',
      variant: 'filled',
      teams: [
        { label: '통합돌봄 사업팀', variant: 'outline' },
        { label: '자원봉사·노인일자리팀', variant: 'outline' },
        { label: '마을환경관리팀', variant: 'outline' },
      ],
    },
  ],
  subCommittees: [
    { label: '갈등관리위원회', variant: 'yellow' },
    { label: '사회적평가위원회', variant: 'yellow' },
  ],
};

// 새로운 트리 구조 조직도 데이터
export const treeOrganizationData: TreeNode = {
  name: '총회',
  children: [
    {
      name: '갈등관리위원회',
    },
    {
      name: '사회적평가위원회',
    },
    {
      name: '이사회',
      children: [
        {
          name: '운영본부',
          children: [
            { name: '총괄기획팀' },
            { name: '행정지원팀' },
            {
              name: '콘텐츠사업부',
              children: [
                { name: '행사기획팀' },
                { name: '교육콘텐츠팀' },
                { name: '도시재생선진지교육팀' },
              ],
            },
            {
              name: '27b사업부',
              children: [{ name: '카페운영팀' }, { name: '케이터링팀' }],
            },
            {
              name: '마을돌봄사업부',
              children: [
                { name: '통합돌봄사업팀' },
                { name: '자원봉사노인일자리팀' },
                { name: '마을환경관리팀' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: '감사',
    },
  ],
};
