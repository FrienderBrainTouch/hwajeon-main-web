// 참여하기 관련 컴포넌트 Props 타입

/**
 * FAQ 섹션 컴포넌트 Props
 */
export interface FAQSectionProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
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
