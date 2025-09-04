import { useState } from 'react';
import { TabNavigation, type TabItem } from '@/components/ui/TabNavigation';

function Contact() {
  const [activeTab, setActiveTab] = useState('inquiry');

  const tabs: TabItem[] = [
    { id: 'inquiry', label: '간편 문의', value: 'inquiry' },
    { id: 'location', label: '오시는 길', value: 'location' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'inquiry':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">간편 문의</h2>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      성함 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="성함을 입력해주세요"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="연락처를 입력해주세요"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="이메일을 입력해주세요"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    문의 유형 *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">문의 유형을 선택해주세요</option>
                    <option value="membership">조합원 가입 문의</option>
                    <option value="business">사업 관련 문의</option>
                    <option value="volunteer">자원봉사 문의</option>
                    <option value="donation">후원 및 기부 문의</option>
                    <option value="facility">시설 이용 문의</option>
                    <option value="other">기타 문의</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    문의 내용 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="문의하실 내용을 자세히 입력해주세요"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                    개인정보 수집 및 이용에 동의합니다. *
                  </label>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
                  >
                    문의하기
                  </button>
                </div>
              </form>

              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">연락처 정보</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p>
                      <strong>전화:</strong> 02-1234-5678
                    </p>
                    <p>
                      <strong>팩스:</strong> 02-1234-5679
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>이메일:</strong> info@hwajeon.co.kr
                    </p>
                    <p>
                      <strong>운영시간:</strong> 평일 09:00-18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'location':
        return (
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">오시는 길</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">화전 조합 사무실</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">주소</h4>
                    <p className="text-gray-600 mb-4">
                      서울특별시 강서구 화전동 123-45
                      <br />
                      화전 조합 사무실 2층
                    </p>

                    <h4 className="font-semibold mb-2">대중교통</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 지하철 5호선 화전역 2번 출구 도보 5분</li>
                      <li>• 버스: 123, 456, 789번 화전조합 정류장 하차</li>
                      <li>• 마을버스: 강서01, 강서02번</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">주차 안내</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 지하 주차장 이용 가능 (2시간 무료)</li>
                      <li>• 주차 공간이 제한적이니 대중교통 이용 권장</li>
                      <li>• 주말 및 공휴일 주차 가능</li>
                    </ul>

                    <h4 className="font-semibold mb-2 mt-4">운영시간</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 평일: 09:00 - 18:00</li>
                      <li>• 토요일: 09:00 - 13:00</li>
                      <li>• 일요일 및 공휴일: 휴무</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-lg font-semibold mb-2">지도</p>
                  <p className="text-sm">실제 지도가 여기에 표시됩니다</p>
                  <p className="text-xs mt-2">(구글 맵 또는 카카오맵 연동)</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-blue-900">주변 시설</h3>
                  <ul className="space-y-2 text-blue-800">
                    <li>• 화전역 (지하철 5호선)</li>
                    <li>• 화전시장</li>
                    <li>• 화전공원</li>
                    <li>• 화전도서관</li>
                    <li>• 화전보건소</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-green-900">찾아오시는 길</h3>
                  <ol className="space-y-2 text-green-800 text-sm">
                    <li>1. 지하철 5호선 화전역 2번 출구</li>
                    <li>2. 출구에서 직진 200m</li>
                    <li>3. 화전시장 방향으로 우회전</li>
                    <li>4. 화전조합 건물 2층</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <TabNavigation
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-8"
        />
        {renderTabContent()}
      </div>
    </div>
  );
}

export default Contact;
