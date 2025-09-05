import React from 'react';

const SnsGuide: React.FC = () => {
  return (
    <div className="mt-12 sm:mt-16">
      <div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 text-left">SNS 안내</h3>
        <p className="text-sm text-gray-500 mb-6 text-left">sns 안내</p>

        <div className="w-full flex justify-between">
          {/* 인스타그램 버튼 */}
          <a
            href="https://instagram.com/hwajeon_coop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 rounded-lg transition-colors flex-1 mr-6"
          >
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z" />
            </svg>
            <span className="text-lg font-medium">인스타그램</span>
          </a>

          {/* 네이버 블로그 버튼 */}
          <a
            href="https://blog.naver.com/hwajeon_coop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-purple-600 hover:bg-purple-700 text-white px-12 py-6 rounded-lg transition-colors flex-1"
          >
            <svg
              className="w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.273 12.845 7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845Z" />
            </svg>
            <span className="text-lg font-medium">네이버 블로그</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SnsGuide;
