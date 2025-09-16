/**
 * 위치 지도 컴포넌트 Props
 */
export interface LocationMapProps {
  className?: string;
  lat?: number;
  lng?: number;
  level?: number;
}

/**
 * 문의 폼 데이터 타입
 */
export interface FormData {
  name: string;
  phone: string;
  email: string;
  emailDomain: string;
  subject: string;
  message: string;
  privacy: boolean;
}
