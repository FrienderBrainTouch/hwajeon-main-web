import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import logo from '@/assets/logo.svg';

export default function Footer() {
  return (
    <footer className="bg-[#2B2A4C] text-white">
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-12 xs:py-14 sm:py-16 md:py-18 lg:py-20 xl:py-22 2xl:py-24">
        {/* 상단 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xs:gap-10 sm:gap-12 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 mb-12 xs:mb-14 sm:mb-16 md:mb-18 lg:mb-20 xl:mb-22 2xl:mb-24">
          {/* 로고 및 소개 */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="화전마을 로고" className="w-10 h-10 xs:w-12 xs:h-12" />
              <div>
                <h3 className="text-xl xs:text-2xl font-bold">화전마을</h3>
                <p className="text-sm xs:text-base text-blue-200">관리 사회적협동조합</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm xs:text-base leading-relaxed">
              화전동 주민이 함께 만들어가는 마을 공동체입니다. 협동조합을 통해 마을의 가치를 높이고
              주민들의 삶의 질을 향상시키는 것을 목표로 합니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h4 className="text-lg xs:text-xl font-semibold mb-4 xs:mb-5">빠른 링크</h4>
            <ul className="space-y-2 xs:space-y-3">
              <li>
                <Link
                  to="/combination"
                  className="text-gray-300 hover:text-white transition-colors text-sm xs:text-base"
                >
                  조합 소개
                </Link>
              </li>
              <li>
                <Link
                  to="/business"
                  className="text-gray-300 hover:text-white transition-colors text-sm xs:text-base"
                >
                  사업 안내
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-gray-300 hover:text-white transition-colors text-sm xs:text-base"
                >
                  소식과 자료
                </Link>
              </li>
              <li>
                <Link
                  to="/participate"
                  className="text-gray-300 hover:text-white transition-colors text-sm xs:text-base"
                >
                  참여하기
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-lg xs:text-xl font-semibold mb-4 xs:mb-5">연락처</h4>
            <ul className="space-y-3 xs:space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 xs:w-5 xs:h-5 text-blue-300 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm xs:text-base">
                  서울특별시 강남구 화전동 123-45
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 xs:w-5 xs:h-5 text-blue-300 flex-shrink-0" />
                <span className="text-gray-300 text-sm xs:text-base">02-1234-5678</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 xs:w-5 xs:h-5 text-blue-300 flex-shrink-0" />
                <span className="text-gray-300 text-sm xs:text-base">info@hwajeon.coop</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="h-px bg-gray-600 mb-8 xs:mb-10 sm:mb-12"></div>

        {/* 하단 영역 */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-gray-400 text-sm xs:text-base">
            © 2024 화전마을 관리 사회적협동조합. All rights reserved.
          </p>
          <div className="flex space-x-6 xs:space-x-8">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-white transition-colors text-sm xs:text-base"
            >
              개인정보처리방침
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white transition-colors text-sm xs:text-base"
            >
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
