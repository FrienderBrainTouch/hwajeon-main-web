import { useState } from 'react';
import emailjs from '@emailjs/browser';
import SnsGuide from './SnsGuide';
import type { FormData } from '@/types/components/contact';

const InquiryForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    emailDomain: '',
    subject: '',
    message: '',
    privacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const emailDomains = [
    'naver.com',
    'gmail.com',
    'daum.net',
    'hanmail.net',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
  ];

  const inquiryTypes = [
    '조합원 가입 문의',
    '사업 관련 문의',
    '자원봉사 문의',
    '후원 및 기부 문의',
    '시설 이용 문의',
    '기타 문의',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // EmailJS 설정
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const toEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL;

      if (!serviceId || !templateId || !publicKey || !toEmail) {
        throw new Error('EmailJS 설정이 완료되지 않았습니다.');
      }

      const fullEmail = formData.emailDomain
        ? `${formData.email}@${formData.emailDomain}`
        : formData.email;

      const templateParams = {
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: fullEmail,
        subject: formData.subject,
        message: formData.message,
        to_email: toEmail,
        reply_to: fullEmail,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        emailDomain: '',
        subject: '',
        message: '',
        privacy: false,
      });
    } catch (error) {
      console.error('이메일 전송 실패:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-6 sm:py-8">
      {/* 제목 섹션 */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            간편 문의
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-gray-900 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            궁금한 사항은 아래의 간편 문의폼을 통해 언제든지 남겨주세요.
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            담당자가 확인 후 순차적으로 답변 드립니다.
          </p>
        </div>
      </div>

      {/* 폼 섹션 - 배경색과 함께 */}
      <div className="w-full py-8 sm:py-12" style={{ backgroundColor: '#E8E4DB33' }}>
        <div className="max-w-5xl mx-auto px-4">
          {/* 성공/에러 메시지 */}
          {submitStatus === 'success' && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm sm:text-base">
              문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm sm:text-base">
              문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* 왼쪽 컬럼 */}
              <div className="space-y-4 sm:space-y-6">
                {/* 이름 */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    이름
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="이름을 입력해주세요"
                  />
                </div>

                {/* 이메일 */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    이메일
                  </label>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="flex-1 px-2 sm:px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="이메일 아이디"
                    />
                    <span className="text-gray-500 text-sm sm:text-base">@</span>
                    <select
                      name="emailDomain"
                      value={formData.emailDomain}
                      onChange={handleInputChange}
                      className="px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">선택하세요</option>
                      {emailDomains.map((domain) => (
                        <option key={domain} value={domain}>
                          {domain}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 오른쪽 컬럼 */}
              <div className="space-y-4 sm:space-y-6">
                {/* 연락처 */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    연락처
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="숫자만 입력"
                  />
                </div>

                {/* 문의사항 */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
                  >
                    문의사항
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">선택하세요</option>
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 기타 문의사항 - 전체 너비 */}
            <div>
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                기타 문의사항
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none sm:resize-y"
                placeholder="문의하실 내용을 입력해주세요."
              />
            </div>

            {/* 개인정보 동의 */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  checked={formData.privacy}
                  onChange={handleInputChange}
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5 sm:mt-1"
                />
                <label htmlFor="privacy" className="ml-2 block text-xs sm:text-sm text-gray-700">
                  개인정보 수집 및 이용에 동의합니다.
                </label>
              </div>
              <p className="text-xs text-gray-500 ml-6 leading-relaxed">
                ※ 수집된 개인정보는 명시된 목적 이외의 용도로 사용되지 않으며, 제3자에게 제공되지
                않습니다.
              </p>
            </div>

            {/* 제출 버튼 */}
            <div className="text-center pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-8 sm:px-12 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
              >
                {isSubmitting ? '전송 중...' : '문의하기'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* SNS 섹션 */}
      <div className="max-w-5xl mx-auto px-4">
        <SnsGuide />
      </div>
    </div>
  );
};

export default InquiryForm;
