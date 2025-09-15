/**
 * FAQ 섹션 컴포넌트 Props
 */
export interface FAQSectionProps {
  faqData: FAQItem[];
  className?: string;
}

/**
 * 자원봉사 신청 모달 컴포넌트 Props
 */
export interface VolunteerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  loading?: boolean;
}

/**
 * FAQ 아이템 타입
 */
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

/**
 * 후원금 사용처 아이템 타입
 */
export interface SponsorshipUsageItem {
  icon: any;
  title: string;
  description: string;
}

/**
 * 후원 방법 아이템 타입
 */
export interface SponsorshipMethodItem {
  icon: any;
  title: string;
  description: string;
}

/**
 * 자원봉사 신청 폼 데이터 타입
 */
export interface VolunteerFormData {
  name: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  emailDomain: string;
  address: string;
  activityFields: string[];
  availableTimes: string[];
  participationPeriod: string;
  hasExperience: string;
  motivation: string;
  privacyConsent: boolean;
}
