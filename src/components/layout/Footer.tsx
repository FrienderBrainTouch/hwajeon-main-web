export default function Footer() {
  return (
    <footer
      className="relative bg-[rgba(90,76,147,0.1)] text-[#222222]"
      style={{ borderRadius: '30px 30px 0px 0px' }}
    >
      <div className="mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-10 xs:py-12 sm:py-14 md:py-16 lg:py-18 xl:py-20 2xl:py-22">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
          {/* 왼쪽: 정보 영역 */}
          <div className="flex-1 max-w-md">
            {/* 빠른 링크 */}
            <div className="flex items-center space-x-6 mb-8">
              <span className="text-lg font-normal">공지사항</span>
              <span className="text-lg font-normal text-[#222222]">|</span>
              <span className="text-lg font-normal">행사일정</span>
              <span className="text-lg font-normal text-[#222222]">|</span>
              <span className="text-lg font-normal">오시는길</span>
            </div>

            {/* 연락처 정보 */}
            <div className="space-y-5">
              <div className="flex">
                <span className="text-lg font-bold w-20 flex-shrink-0">주소</span>
                <span className="text-lg font-light">경기 고양시 덕양구 화랑로 3 1층</span>
              </div>
              <div className="flex">
                <span className="text-lg font-bold w-20 flex-shrink-0">대표 번호</span>
                <span className="text-lg font-light">02-3158-3001</span>
              </div>
              <div className="flex">
                <span className="text-lg font-bold w-20 flex-shrink-0">이메일</span>
                <span className="text-lg font-light">asdf123@aaa.com</span>
              </div>
            </div>
          </div>

          {/* 오른쪽: 소셜 미디어 */}
          <div className="flex items-center space-x-2.5">
            {/* Facebook */}
            <div className="w-10 h-10 bg-[#2C2E5A] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>

            {/* Instagram */}
            <div className="w-10 h-10 bg-[#2C2E5A] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>

            {/* YouTube */}
            <div className="w-10 h-10 bg-[#2C2E5A] rounded-lg flex items-center justify-center">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className="mt-8 pt-6 border-t border-gray-300">
          <p className="text-[#666666] text-sm text-center">
            © 2025 화전마을사회적협동조합. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
