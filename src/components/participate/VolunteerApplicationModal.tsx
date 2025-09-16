import React, { useState } from 'react';
import { X } from 'lucide-react';
import emailjs from '@emailjs/browser';

import { type VolunteerApplicationModalProps, type VolunteerFormData } from '@/types/components';

const VolunteerApplicationModal: React.FC<VolunteerApplicationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<VolunteerFormData>({
    name: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    emailDomain: '',
    address: '',
    activityFields: [],
    availableTimes: [],
    participationPeriod: '',
    hasExperience: '',
    motivation: '',
    privacyConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailDomains = ['naver.com', 'gmail.com', 'daum.net', 'hanmail.net', 'yahoo.com'];

  const activityFieldOptions = [
    '행사 운영',
    '카페 운영 보조',
    '마을 환경 정비',
    '프로그램 보조',
    '물품 제작',
  ];

  const availableTimeOptions = ['평일 오전', '평일 오후', '주말 오전', '주말 오후', '협의 가능'];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleCheckboxChange = (name: keyof VolunteerFormData, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[name] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return {
        ...prev,
        [name]: newArray,
      };
    });
  };

  const handleRadioChange = (name: keyof VolunteerFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS로 이메일 전송
      const templateParams = {
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: `${formData.email}@${formData.emailDomain}`,
        birth_date: formData.birthDate,
        gender: formData.gender === 'male' ? '남성' : '여성',
        address: formData.address,
        activity_fields: formData.activityFields.join(', '),
        available_times: formData.availableTimes.join(', '),
        participation_period:
          formData.participationPeriod === 'short'
            ? '단기(1일~1주)'
            : formData.participationPeriod === 'medium'
            ? '중기(1개월 이내)'
            : '장기(정기적으로 참여하고 싶어요)',
        has_experience: formData.hasExperience === 'yes' ? '있음' : '없음',
        motivation: formData.motivation || '없음',
        to_email: import.meta.env.VITE_EMAILJS_TO_EMAIL,
        reply_to: `${formData.email}@${formData.emailDomain}`,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID_VOLUNTEER,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert('자원봉사 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      onClose();

      // 폼 초기화
      setFormData({
        name: '',
        birthDate: '',
        gender: '',
        phone: '',
        email: '',
        emailDomain: '',
        address: '',
        activityFields: [],
        availableTimes: [],
        participationPeriod: '',
        hasExperience: '',
        motivation: '',
        privacyConsent: false,
      });
    } catch (error) {
      console.error('신청서 제출 실패:', error);
      alert('신청서 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-[1400px] h-[95vh] sm:h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            자원봉사 신청서
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* 폼 내용 */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-w-[1228px] mx-auto"
        >
          {/* 기본 정보 */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              기본 정보
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  이름
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="성까지 입력"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  생년월일
                </label>
                <input
                  type="text"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="8자리 입력"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  성별
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">선택하세요</option>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  연락처
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="숫자만 입력"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  이메일
                </label>
                <div className="flex items-center gap-1 sm:gap-2">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="이메일 아이디"
                  />
                  <span className="text-gray-500 text-sm">@</span>
                  <select
                    name="emailDomain"
                    value={formData.emailDomain}
                    onChange={handleInputChange}
                    className="px-2 sm:px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  거주지
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="OO시 OO구까지 입력"
                />
              </div>
            </div>
          </div>

          {/* 참여 정보 */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              참여 정보
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {/* 희망 활동 분야 */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  희망 활동 분야 (중복선택 가능)
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {activityFieldOptions.map((field) => (
                    <label key={field} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.activityFields.includes(field)}
                        onChange={() => handleCheckboxChange('activityFields', field)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-xs sm:text-sm text-gray-700">{field}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 가능한 요일/시간대 */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  가능한 요일/시간대 (중복선택 가능)
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {availableTimeOptions.map((time) => (
                    <label key={time} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.availableTimes.includes(time)}
                        onChange={() => handleCheckboxChange('availableTimes', time)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-xs sm:text-sm text-gray-700">{time}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 참여 가능 기간 */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  참여 가능 기간
                </label>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {[
                    { value: 'short', label: '단기(1일~1주)' },
                    { value: 'medium', label: '중기(1개월 이내)' },
                    { value: 'long', label: '장기(정기적으로 참여하고 싶어요)' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="participationPeriod"
                        value={option.value}
                        checked={formData.participationPeriod === option.value}
                        onChange={(e) => handleRadioChange('participationPeriod', e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-xs sm:text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 봉사 경험 여부 */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  봉사 경험 여부
                </label>
                <div className="flex gap-3 sm:gap-4">
                  {[
                    { value: 'yes', label: '있음' },
                    { value: 'no', label: '없음' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="hasExperience"
                        value={option.value}
                        checked={formData.hasExperience === option.value}
                        onChange={(e) => handleRadioChange('hasExperience', e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-xs sm:text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 신청 동기 */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  신청 동기나 하고 싶은 말 (선택 사항)
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="자유롭게 작성해주세요"
                />
              </div>
            </div>
          </div>

          {/* 개인정보 수집·이용 동의 */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
              개인정보 수집·이용 동의
            </h3>
            <div className="flex items-start">
              <input
                type="checkbox"
                name="privacyConsent"
                checked={formData.privacyConsent}
                onChange={handleInputChange}
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
              />
              <div className="ml-2">
                <label className="text-xs sm:text-sm text-gray-700">
                  ※ 수집된 정보는 자원봉사 배정 및 연락 이외의 용도로 사용되지 않습니다.
                </label>
                <div className="mt-1">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">동의합니다</label>
                </div>
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="text-center pt-3 sm:pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !formData.privacyConsent}
              className="bg-purple-600 text-white px-8 sm:px-10 py-2.5 sm:py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isSubmitting ? '제출 중...' : '제출하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VolunteerApplicationModal;
