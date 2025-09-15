import { BookOpen, DollarSign, Handshake, Package, Users, Heart, Lightbulb } from 'lucide-react';
import type { SponsorshipUsageItem, SponsorshipMethodItem } from '@/types/components/participate';

export const sponsorshipUsageData: SponsorshipUsageItem[] = [
  {
    icon: BookOpen,
    title: '주민 교육 프로그램 운영',
    description: '아이부터 어르신까지, 모두의 배움터를 위한 교육 클래스',
  },
  {
    icon: Users,
    title: '커뮤니티 활동 지원',
    description: '마을 주민들의 소통과 협력을 위한 다양한 활동 지원',
  },
  {
    icon: Heart,
    title: '사회복지 서비스',
    description: '취약계층 지원 및 어르신 돌봄 서비스 운영',
  },
  {
    icon: Lightbulb,
    title: '마을 발전 프로젝트',
    description: '지속가능한 마을 환경 조성 및 인프라 개선',
  },
];

export const sponsorshipMethodData: SponsorshipMethodItem[] = [
  {
    icon: DollarSign,
    title: '정기 후원',
    description: '매월 일정한 금액으로 지속적인 마을 발전을 지원합니다',
  },
  {
    icon: Handshake,
    title: '일시 후원',
    description: '특별한 프로젝트나 이벤트에 한 번에 후원합니다',
  },
  {
    icon: Package,
    title: '물품 후원',
    description: '필요한 물품이나 장비를 직접 기부하여 도움을 줍니다',
  },
];
