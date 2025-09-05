export interface OrganizationNode {
  label: string;
  variant?: 'filled' | 'outline' | 'primary';
}

export interface OrganizationChartData {
  top: OrganizationNode;
  second: [OrganizationNode, OrganizationNode, OrganizationNode];
  teams: [OrganizationNode, OrganizationNode, OrganizationNode, OrganizationNode];
}

export const organizationChartData: OrganizationChartData = {
  top: {
    label: '조합장',
    variant: 'primary',
  },
  second: [
    { label: '이사회', variant: 'filled' },
    { label: '사무국', variant: 'filled' },
    { label: '감사', variant: 'filled' },
  ],
  teams: [
    { label: '기획행정팀', variant: 'outline' },
    { label: '지역사회팀', variant: 'outline' },
    { label: '교육문화팀', variant: 'outline' },
    { label: '카페27b운영팀', variant: 'outline' },
  ],
};
